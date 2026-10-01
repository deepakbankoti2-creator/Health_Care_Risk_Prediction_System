# Healthcare Risk Prediction System (CardioRisk AI)

An **AI-powered Healthcare Risk Prediction System** that analyzes patient clinical parameters and physiological indicators to predict heart disease risk probability using Machine Learning classifiers and SHAP (SHapley Additive exPlanations) explainability.

> **Medical Disclaimer:** This system is an educational and decision-support project for demonstration purposes. It does not provide medical diagnoses or replace consultations with qualified healthcare professionals.

---

## 🚀 Key Features

* **End-to-End Data Science Pipeline:** Automated dataset generation, missing value imputation, feature scaling (`StandardScaler`), model training, evaluation, and serialization (`joblib`).
* **Multi-Model Comparison:** Evaluates and compares **Logistic Regression, Decision Trees, Random Forests, and XGBoost** across Accuracy, Precision, Recall/Sensitivity, Specificity, F1-Score, ROC-AUC, PR-AUC, and Confusion Matrices.
* **Explainable AI (SHAP Integration):** Provides patient-level local factor explanations displaying top physiological factors increasing vs. decreasing estimated risk.
* **Modern Web Application:**
  * **React.js (Vite) + Tailwind CSS Frontend:** Responsive interface with interactive risk assessment forms, risk gauge visualizer, and preset sample data loaders.
  * **Analytics & Admin Dashboard:** Real-time summary statistics, cohort age distributions, risk donut charts, and global feature importance visualizers built with Recharts.
  * **Express Backend (Node.js & MongoDB):** REST API with JWT authentication, role-based access control (`admin`, `healthcare_professional`, `user`), and MongoDB database integration (with resilient in-memory fallback mode).
  * **Python FastAPI Microservice:** Serves real-time probability estimates and SHAP explanations from trained model artifacts.
* **Docker Containerization:** Ready-to-deploy `docker-compose.yml` orchestrating MongoDB, FastAPI ML Service, Express Backend, and React Frontend.

---

## 🏗️ System Architecture

```
                  ┌─────────────────────────────────────────┐
                  │          React Frontend (Vite)          │
                  │   Tailwind CSS + Recharts + Lucide Icons │
                  └────────────────────┬────────────────────┘
                                       │ HTTP / REST
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │       Express Backend API (Node.js)     │
                  │  JWT Auth + Input Validation + Router   │
                  └──────────┬──────────────────┬───────────┘
                             │                  │
                MongoDB      │                  │  HTTP Internal REST
               (Database) ◄──┘                  ▼
                                   ┌────────────────────────┐
                                   │   FastAPI ML Service   │
                                   │ Python + Scikit-Learn  │
                                   │ XGBoost + SHAP Engine  │
                                   └────────────────────────┘
```

---

## 🛠️ Project Structure

```text
healthcare-risk-prediction/
│
├── frontend/                     # React.js (Vite + Tailwind CSS + Recharts)
│   ├── src/
│   │   ├── components/          # Navbar, Footer
│   │   ├── pages/               # Home, Assessment, Result, Dashboard, ModelPerformance, History, Login, Register
│   │   ├── services/            # Axios API client wrapper
│   │   ├── App.jsx              # Router configuration
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express + MongoDB REST API
│   ├── controllers/             # authController, predictionController
│   ├── middleware/              # JWT auth and RBAC middleware
│   ├── models/                  # User, Patient, Prediction Mongoose schemas
│   ├── routes/                  # API endpoints router
│   ├── server.js                # Server entry point
│   └── package.json
│
├── ml-service/                   # Python FastAPI ML Microservice
│   ├── data/                    # Dataset generator & CSV data
│   ├── models/                  # Serialized model, scaler, explainer, & metrics JSON
│   ├── prediction/              # Predictor class & SHAP extractor
│   ├── training/                # Model training & evaluation pipeline script
│   ├── app.py                   # FastAPI REST server
│   └── requirements.txt
│
├── docker-compose.yml            # Multi-container deployment orchestrator
└── README.md
```

---

## 📊 ML Model Evaluation Metrics

| Algorithm Model | Accuracy | Precision | Recall (Sensitivity) | Specificity | F1 Score | ROC-AUC |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression (Active Best)** | **97.5%** | **93.8%** | **90.9%** | **98.8%** | **92.3%** | **99.7%** |
| **XGBoost Classifier** | 96.5% | 96.4% | 81.8% | 99.4% | 88.5% | 98.4% |
| **Random Forest** | 93.0% | 95.2% | 60.6% | 99.4% | 74.1% | 97.4% |
| **Decision Tree** | 82.5% | 47.8% | 66.7% | 85.6% | 55.7% | 83.0% |

---

## ⚙️ Quick Start & Running Locally

### 1. Run Python ML Service
```bash
cd ml-service
python -m venv venv
.\venv\Scripts\activate      # Windows
pip install -r requirements.txt
python training/train_models.py
uvicorn app:app --port 8000 --reload
```

### 2. Run Express Backend
```bash
cd backend
npm install
npm start
```

### 3. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🐳 Docker Deployment

To launch the full stack using Docker:
```bash
docker-compose up --build
```

---

## 📄 Resume Description

> **Healthcare Risk Prediction System**
> Developed an end-to-end machine-learning healthcare risk assessment platform using Python, Scikit-learn, XGBoost, SHAP, React, Node.js, Express, and MongoDB. Implemented data preprocessing pipelines, exploratory data analysis, classification models, model evaluation (ROC-AUC 99.7%), and SHAP explainability. Built REST APIs, JWT authentication, patient prediction history, and interactive analytics dashboards with separate ML model-serving architecture for deployment.
