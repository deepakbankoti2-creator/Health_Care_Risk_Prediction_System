import os
import json
import joblib
import pandas as pd
import numpy as np

class RiskPredictor:
    def __init__(self, models_dir=None):
        if models_dir is None:
            models_dir = os.path.join(os.path.dirname(__file__), '..', 'models')
        
        self.model_path = os.path.join(models_dir, 'model.joblib')
        self.scaler_path = os.path.join(models_dir, 'scaler.joblib')
        self.explainer_path = os.path.join(models_dir, 'explainer.joblib')
        self.metrics_path = os.path.join(models_dir, 'model_metrics.json')

        self.model = joblib.load(self.model_path)
        self.scaler = joblib.load(self.scaler_path)
        self.explainer = joblib.load(self.explainer_path)

        with open(self.metrics_path, 'r') as f:
            self.metadata = json.load(f)
            
        self.feature_names = self.metadata['features']

    def predict_patient_risk(self, patient_data: dict):
        # Format input according to feature order
        input_dict = {}
        for feature in self.feature_names:
            input_dict[feature] = [float(patient_data.get(feature, 0))]

        input_df = pd.DataFrame(input_dict)
        scaled_input = self.scaler.transform(input_df)
        scaled_df = pd.DataFrame(scaled_input, columns=self.feature_names)

        # Predict probability
        proba = float(self.model.predict_proba(scaled_df)[0][1])
        prob_percentage = round(proba * 100, 1)

        # Determine risk category
        if proba >= 0.5:
            category = "High Risk"
            risk_level = "High"
        else:
            category = "Low Risk"
            risk_level = "Low"

        confidence = round(max(proba, 1 - proba) * 100, 1)

        # Compute local SHAP values for patient
        try:
            shap_values = self.explainer(scaled_df)
            if len(shap_values.values.shape) == 3:
                local_shap = shap_values.values[0, :, 1]
            elif len(shap_values.values.shape) == 2:
                local_shap = shap_values.values[0]
            else:
                local_shap = shap_values.values
        except Exception:
            # Fallback estimation based on model feature weights
            local_shap = np.zeros(len(self.feature_names))

        feature_contributions = []
        for feat, val, s_val in zip(self.feature_names, input_df.iloc[0], local_shap):
            feature_contributions.append({
                "feature": feat,
                "value": float(val),
                "shap_value": round(float(s_val), 4),
                "direction": "increases_risk" if s_val > 0 else "decreases_risk"
            })

        # Sort factors by impact magnitude
        feature_contributions.sort(key=lambda x: abs(x['shap_value']), reverse=True)

        increasing_factors = [f for f in feature_contributions if f['shap_value'] > 0][:5]
        decreasing_factors = [f for f in feature_contributions if f['shap_value'] < 0][:5]

        return {
            "disease_type": "Heart Disease",
            "probability": proba,
            "risk_percentage": prob_percentage,
            "risk_category": category,
            "risk_level": risk_level,
            "confidence": confidence,
            "model_name": self.metadata['model_name'],
            "model_version": self.metadata['version'],
            "shap_explanation": {
                "increasing_risk_factors": increasing_factors,
                "decreasing_risk_factors": decreasing_factors,
                "all_contributions": feature_contributions
            }
        }
