import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, precision_recall_curve, auc, confusion_matrix
)
import shap

def train_and_evaluate():
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'heart_disease.csv')
    models_dir = os.path.join(os.path.dirname(__file__), '..', 'models')
    os.makedirs(models_dir, exist_ok=True)

    if not os.path.exists(data_path):
        import sys
        import subprocess
        gen_script = os.path.join(os.path.dirname(__file__), '..', 'data', 'generate_dataset.py')
        subprocess.run([sys.executable, gen_script], check=True)

    df = pd.read_csv(data_path)
    X = df.drop(columns=['target'])
    y = df['target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Convert back to DataFrame for feature names preservation
    X_train_scaled_df = pd.DataFrame(X_train_scaled, columns=X.columns)
    X_test_scaled_df = pd.DataFrame(X_test_scaled, columns=X.columns)

    models = {
        "Logistic Regression": LogisticRegression(random_state=42, max_iter=1000),
        "Decision Tree": DecisionTreeClassifier(random_state=42, max_depth=5),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "XGBoost": XGBClassifier(n_estimators=100, learning_rate=0.05, max_depth=4, random_state=42, eval_metric='logloss')
    }

    metrics_results = {}
    fitted_models = {}

    for name, model in models.items():
        if name in ["Logistic Regression"]:
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_test_scaled)
            y_proba = model.predict_proba(X_test_scaled)[:, 1]
        else:
            model.fit(X_train_scaled_df, y_train)
            y_pred = model.predict(X_test_scaled_df)
            y_proba = model.predict_proba(X_test_scaled_df)[:, 1]

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred)
        rec = recall_score(y_test, y_pred) # Sensitivity
        f1 = f1_score(y_test, y_pred)
        roc_auc = roc_auc_score(y_test, y_proba)

        cm = confusion_matrix(y_test, y_pred)
        tn, fp, fn, tp = cm.ravel()
        specificity = tn / (tn + fp) if (tn + fp) > 0 else 0.0

        p_curve, r_curve, _ = precision_recall_curve(y_test, y_proba)
        pr_auc = auc(r_curve, p_curve)

        metrics_results[name] = {
            "accuracy": round(float(acc), 4),
            "precision": round(float(prec), 4),
            "recall": round(float(rec), 4),
            "specificity": round(float(specificity), 4),
            "f1_score": round(float(f1), 4),
            "roc_auc": round(float(roc_auc), 4),
            "pr_auc": round(float(pr_auc), 4),
            "confusion_matrix": {
                "tn": int(tn), "fp": int(fp), "fn": int(fn), "tp": int(tp)
            }
        }
        fitted_models[name] = model

    # Select best model based on ROC-AUC / Recall balance
    best_model_name = max(metrics_results, key=lambda k: metrics_results[k]['roc_auc'])
    best_model = fitted_models[best_model_name]
    print(f"Selected Best Model: {best_model_name} with ROC-AUC = {metrics_results[best_model_name]['roc_auc']}")

    # Fit SHAP explainer on best model
    try:
        explainer = shap.TreeExplainer(best_model)
    except Exception:
        explainer = shap.Explainer(best_model, X_train_scaled_df)

    # Calculate global feature importance
    shap_values = explainer(X_train_scaled_df)
    if len(shap_values.shape) == 3: # multi-class/binary format
        vals = np.abs(shap_values.values[:, :, 1]).mean(0)
    else:
        vals = np.abs(shap_values.values).mean(0)

    feature_importances = dict(zip(X.columns, [round(float(v), 4) for v in vals]))

    # Save artifacts
    joblib.dump(best_model, os.path.join(models_dir, 'model.joblib'))
    joblib.dump(scaler, os.path.join(models_dir, 'scaler.joblib'))
    joblib.dump(explainer, os.path.join(models_dir, 'explainer.joblib'))

    model_metadata = {
        "model_name": best_model_name,
        "version": "1.0.0",
        "training_date": "2026-10-01",
        "features": list(X.columns),
        "feature_importances": feature_importances,
        "metrics": metrics_results,
        "sample_count": len(df)
    }

    with open(os.path.join(models_dir, 'model_metrics.json'), 'w') as f:
        json.dump(model_metadata, f, indent=2)

    print("All models trained and artifacts successfully saved to:", models_dir)

if __name__ == "__main__":
    train_and_evaluate()
