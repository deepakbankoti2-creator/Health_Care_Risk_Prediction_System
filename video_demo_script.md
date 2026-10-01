# Video Demonstration Script: Healthcare Risk Prediction System (CardioRisk AI)

**Estimated Duration:** 4 - 5 Minutes  
**Target Audience:** Recruiters, Data Science / Full-Stack Interviewers, & Technical Peers  
**Tone:** Professional, engaging, and structured  

---

## 🎬 Video Overview & Scene Timeline

| Scene | Timestamp | Screen Focus | Key Topic |
| :--- | :---: | :--- | :--- |
| **Scene 1** | 0:00 - 0:45 | Home Landing Page | Hook, Project Purpose & Medical Disclaimer |
| **Scene 2** | 0:45 - 1:30 | Architecture Diagram / IDE | Microservice Architecture (React, Express, FastAPI, MongoDB) |
| **Scene 3** | 1:30 - 3:00 | Patient Assessment & Result Page | Live Risk Prediction, Gauge Meter & SHAP Factor Breakdown |
| **Scene 4** | 3:00 - 4:00 | Dashboard & ML Models Page | Recharts Analytics, ROC-AUC Comparison & Confusion Matrix |
| **Scene 5** | 4:00 - 4:30 | Code / Docker Compose | Containerization, Key Takeaways & Call to Action |

---

## 🎙️ Scene-by-Scene Script

### Scene 1: Introduction & Project Overview (0:00 - 0:45)

**Visual Cue:**  
*Screen open on the **CardioRisk AI Home Page** (`http://localhost:3000`). Scroll smoothly past the hero section, data pipeline cards, and highlight the medical disclaimer banner.*

**Voiceover / Speaker Script:**  
> "Hi everyone! Welcome to this demonstration of **CardioRisk AI**—an end-to-end AI-powered Healthcare Risk Prediction System.
>
> Cardiovascular conditions remain one of the leading global health challenges. The objective of this project is to build an intelligent decision-support platform that analyzes patient physiological indicators—such as blood pressure, cholesterol, resting ECG, maximum heart rate, BMI, and smoking status—to estimate disease risk probabilities.
>
> Important note: This platform is designed for research and educational decision-support purposes, serving as a powerful demonstration of how machine learning and explainable AI can assist healthcare analytics."

---

### Scene 2: Architecture & Data Science Pipeline (0:45 - 1:30)

**Visual Cue:**  
*Switch to the **End-to-End Data Science Pipeline** section on the Home page or display the architecture diagram showing React, Node.js/Express, FastAPI, and MongoDB.*

**Voiceover / Speaker Script:**  
> "Behind the user interface is a multi-tier microservice architecture:
> 1. **React.js Frontend** built with Tailwind CSS and Recharts for interactive visualizations.
> 2. **Node.js & Express REST API** handling user authentication with JWT and patient record management using MongoDB.
> 3. **Python FastAPI ML Microservice** serving trained classification models and real-time SHAP explainability calculations.
>
> The data science workflow covers complete preprocessing—from feature scaling with `StandardScaler` to evaluating classification models like Logistic Regression, Random Forests, and XGBoost."

---

### Scene 3: Live Demo – Risk Assessment & SHAP Explainability (1:30 - 3:00)

**Visual Cue:**  
*Navigate to the **Risk Assessment Page** (`/assessment`). Click the **"High Risk Sample"** preset button to auto-fill the form with clinical data (Age: 65, BP: 160, Cholesterol: 290, Smoking: Yes). Click **Predict Risk Probability**.*

**Voiceover / Speaker Script:**  
> "Let me show you a live demonstration.
>
> On the Risk Assessment page, a clinician or researcher enters 13 key physiological metrics. I'll click the 'High Risk Sample' preset to quickly populate parameters for a 65-year-old patient with elevated blood pressure and cholesterol.
>
> When we submit the form, our Express API validates the payload and calls the Python FastAPI service in real-time."

**Visual Cue:**  
*The page redirects to the **Prediction Result Page** (`/result`). Hover over the **72% Risk Gauge**, the **High Risk** badge, and highlight the **SHAP Feature Factor Analysis** cards.*

**Voiceover / Speaker Script:**  
> "Here are the results! The model calculates a **72% Risk Probability**, categorizing the patient under **Higher Estimated Risk** with high confidence.
>
> What sets this project apart is **Explainable AI powered by SHAP**. Rather than treating the ML model as a black box, the system breaks down patient-specific factors:
> - Elevated Resting BP (+160 mmHg) and Serum Cholesterol (+290 mg/dl) actively increased the calculated risk score.
> - Meanwhile, protective indicators are displayed separately.
> This transparency helps healthcare professionals understand *why* the model arrived at its conclusion."

---

### Scene 4: Analytics Dashboard & Model Benchmarks (3:00 - 4:00)

**Visual Cue:**  
*Navigate to the **Analytics Dashboard** (`/dashboard`). Point to the overview stat cards (Total Assessments, High Risk Patients, Avg Age), then scroll to the Donut Chart, Age Group Bar Chart, and Feature Importance visualizer.*

**Voiceover / Speaker Script:**  
> "Next, let's explore the **Healthcare Analytics Dashboard**.
>
> Here, administrators can track cohort statistics in real-time. We have stat cards tracking total assessments, high-risk percentages, and average patient age. Using Recharts, we visualize risk distribution donuts, age group breakdowns, and global SHAP feature importances across the entire patient cohort."

**Visual Cue:**  
*Navigate to the **ML Models Page** (`/metrics`). Highlight the model evaluation table comparing Logistic Regression, Decision Tree, Random Forest, and XGBoost, followed by the Confusion Matrix visualizer.*

**Voiceover / Speaker Script:**  
> "On the **ML Models Page**, we compare our trained algorithms. Instead of relying solely on accuracy, we evaluate across Precision, Sensitivity/Recall, Specificity, F1-Score, and ROC-AUC.
>
> Our top-performing model achieved a **99.7% ROC-AUC** score. We also display interactive Confusion Matrix cards to ensure critical metrics like False Negatives are rigorously monitored."

---

### Scene 5: Conclusion & Technical Wrap-Up (4:00 - 4:30)

**Visual Cue:**  
*Show the project directory structure in the IDE or `docker-compose.yml` file.*

**Voiceover / Speaker Script:**  
> "The entire project is containerized using `docker-compose.yml`, orchestrating MongoDB, FastAPI, Express, and React into a production-ready setup.
>
> Thank you for watching! The full source code, dataset scripts, and documentation are available on GitHub. Feel free to reach out if you have any questions."

---

## 📌 Video Production Tips

1. **Recording Tools:** Use OBS Studio, Loom, or Camtasia at 1080p 60fps.
2. **Browser Window:** Keep browser zoom at 100% or 110% for crisp typography.
3. **Pacing:** Speak clearly at a steady pace and highlight UI elements with your cursor as you speak.
4. **Thumbnail Suggestion:** Use the Prediction Result Gauge Card with a title text: *"Building an AI Healthcare Risk Platform with XGBoost & SHAP"*.
