import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from prediction.predictor import RiskPredictor

app = FastAPI(
    title="Healthcare Risk Prediction ML Microservice",
    description="FastAPI service serving XGBoost/Random Forest models with SHAP explanations for patient disease risk estimation.",
    version="1.0.0"
)

# Initialize Predictor on startup
predictor = None

@app.on_event("startup")
def load_ml_components():
    global predictor
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    if not os.path.exists(os.path.join(models_dir, 'model.joblib')):
        from training.train_models import train_and_evaluate
        train_and_evaluate()
    predictor = RiskPredictor(models_dir)

class PatientDataInput(BaseModel):
    age: float = Field(..., example=52)
    gender: float = Field(..., example=1, description="1: Male, 0: Female")
    chest_pain_type: float = Field(..., example=2, description="0: Typical, 1: Atypical, 2: Non-anginal, 3: Asymptomatic")
    resting_bp: float = Field(..., example=140, description="Resting Blood Pressure (mm Hg)")
    cholesterol: float = Field(..., example=240, description="Serum Cholesterol (mg/dl)")
    fasting_bs: float = Field(..., example=0, description="Fasting Blood Sugar > 120 mg/dl (1 = true; 0 = false)")
    resting_ecg: float = Field(..., example=1, description="Resting ECG results")
    max_heart_rate: float = Field(..., example=150, description="Maximum Heart Rate achieved")
    exercise_angina: float = Field(..., example=0, description="Exercise Induced Angina (1 = yes; 0 = no)")
    oldpeak: float = Field(..., example=1.5, description="ST depression induced by exercise")
    st_slope: float = Field(..., example=1, description="Slope of peak exercise ST segment")
    bmi: float = Field(..., example=27.5, description="Body Mass Index")
    smoking: float = Field(..., example=1, description="Smoking status (1 = yes; 0 = no)")

@app.get("/")
def read_root():
    return {
        "service": "Healthcare Risk Prediction ML API",
        "status": "online",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": predictor is not None}

@app.get("/model-info")
def get_model_info():
    if not predictor:
        raise HTTPException(status_code=500, detail="ML Model not initialized")
    return predictor.metadata

@app.post("/predict")
def predict_risk(patient: PatientDataInput):
    if not predictor:
        raise HTTPException(status_code=500, detail="ML Model not initialized")
    try:
        data_dict = patient.dict()
        result = predictor.predict_patient_risk(data_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
