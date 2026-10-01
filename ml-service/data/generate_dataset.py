import pandas as pd
import numpy as np

# Seed for reproducibility
np.random.seed(42)
n_samples = 1000

# Generate realistic clinical & lifestyle features
age = np.random.randint(29, 78, size=n_samples)
gender = np.random.choice([1, 0], size=n_samples, p=[0.65, 0.35]) # 1: Male, 0: Female
chest_pain_type = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.48, 0.17, 0.28, 0.07]) # 0: Typical, 1: Atypical, 2: Non-anginal, 3: Asymptomatic
resting_bp = np.random.normal(131, 17, size=n_samples).astype(int)
resting_bp = np.clip(resting_bp, 94, 200)

cholesterol = np.random.normal(246, 50, size=n_samples).astype(int)
cholesterol = np.clip(cholesterol, 126, 564)

fasting_bs = (np.random.rand(n_samples) < (0.15 + 0.003 * (age - 30))).astype(int) # 1 if > 120 mg/dl
resting_ecg = np.random.choice([0, 1, 2], size=n_samples, p=[0.49, 0.48, 0.03])

max_heart_rate = (210 - 0.8 * age + np.random.normal(0, 15, size=n_samples)).astype(int)
max_heart_rate = np.clip(max_heart_rate, 71, 202)

exercise_angina = (np.random.rand(n_samples) < (0.2 + 0.005 * (age - 30) + 0.1 * chest_pain_type)).astype(int)
exercise_angina = np.clip(exercise_angina, 0, 1)

oldpeak = np.round(np.random.exponential(scale=1.0, size=n_samples), 1)
oldpeak = np.clip(oldpeak, 0.0, 6.2)

st_slope = np.random.choice([0, 1, 2], size=n_samples, p=[0.2, 0.5, 0.3]) # 0: Upsloping, 1: Flat, 2: Downsloping

bmi = np.round(np.random.normal(27.5, 5.0, size=n_samples), 1)
bmi = np.clip(bmi, 18.5, 45.0)

smoking = (np.random.rand(n_samples) < (0.25 + 0.002 * (age - 30))).astype(int)

# Logistic risk function incorporating medical domain logic to generate target label
log_odds = (
    -4.5
    + 0.04 * (age - 50)
    + 0.4 * gender
    + 0.8 * (chest_pain_type >= 2)
    + 0.02 * (resting_bp - 120)
    + 0.015 * (cholesterol - 200)
    + 0.5 * fasting_bs
    - 0.03 * (max_heart_rate - 140)
    + 0.9 * exercise_angina
    + 0.7 * oldpeak
    + 0.6 * (st_slope == 1) + 1.1 * (st_slope == 2)
    + 0.05 * (bmi - 25)
    + 0.6 * smoking
)

prob = 1 / (1 + np.exp(-log_odds))
target = (prob > 0.5).astype(int)

df = pd.DataFrame({
    'age': age,
    'gender': gender,
    'chest_pain_type': chest_pain_type,
    'resting_bp': resting_bp,
    'cholesterol': cholesterol,
    'fasting_bs': fasting_bs,
    'resting_ecg': resting_ecg,
    'max_heart_rate': max_heart_rate,
    'exercise_angina': exercise_angina,
    'oldpeak': oldpeak,
    'st_slope': st_slope,
    'bmi': bmi,
    'smoking': smoking,
    'target': target
})

df.to_csv('d:/Health Care Predication System/ml-service/data/heart_disease.csv', index=False)
print(f"Dataset generated successfully with {len(df)} records. Class balance:")
print(df['target'].value_counts(normalize=True))
