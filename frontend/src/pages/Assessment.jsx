import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Zap, AlertCircle, ArrowRight, Activity, Info } from 'lucide-react';
import { predictionAPI } from '../services/api';

export default function Assessment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    patientName: 'John Doe',
    age: 54,
    gender: 'Male',
    chest_pain_type: 2, // 0: Typical, 1: Atypical, 2: Non-anginal, 3: Asymptomatic
    resting_bp: 135,
    cholesterol: 240,
    fasting_bs: 0,
    resting_ecg: 1,
    max_heart_rate: 145,
    exercise_angina: 0,
    oldpeak: 1.2,
    st_slope: 1,
    bmi: 27.5,
    smoking: 1
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const loadPreset = (type) => {
    if (type === 'high_risk') {
      setFormData({
        patientName: 'Robert Smith',
        age: 65,
        gender: 'Male',
        chest_pain_type: 3,
        resting_bp: 160,
        cholesterol: 290,
        fasting_bs: 1,
        resting_ecg: 1,
        max_heart_rate: 115,
        exercise_angina: 1,
        oldpeak: 2.8,
        st_slope: 2,
        bmi: 31.2,
        smoking: 1
      });
    } else {
      setFormData({
        patientName: 'Sarah Jenkins',
        age: 34,
        gender: 'Female',
        chest_pain_type: 0,
        resting_bp: 118,
        cholesterol: 180,
        fasting_bs: 0,
        resting_ecg: 0,
        max_heart_rate: 172,
        exercise_angina: 0,
        oldpeak: 0.0,
        st_slope: 0,
        bmi: 22.4,
        smoking: 0
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await predictionAPI.createPrediction(formData);
      navigate('/result', { state: { prediction: response.data.prediction } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to submit prediction assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-sky-600" /> Patient Health Risk Assessment
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Enter patient physiological indicators to calculate heart disease risk probability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadPreset('high_risk')}
            className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 transition flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5" /> High Risk Sample
          </button>
          <button
            type="button"
            onClick={() => loadPreset('low_risk')}
            className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5" /> Low Risk Sample
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Patient Demographics */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-100 pb-2">
            1. Patient Demographics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
              <input
                type="number"
                name="age"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Biological Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cardiovascular Indicators */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-100 pb-2">
            2. Cardiovascular Indicators
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Resting Blood Pressure (mm Hg)</label>
              <input
                type="number"
                name="resting_bp"
                value={formData.resting_bp}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Serum Cholesterol (mg/dl)</label>
              <input
                type="number"
                name="cholesterol"
                value={formData.cholesterol}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Max Heart Rate Achieved</label>
              <input
                type="number"
                name="max_heart_rate"
                value={formData.max_heart_rate}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Chest Pain Type</label>
              <select
                name="chest_pain_type"
                value={formData.chest_pain_type}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value={0}>Typical Angina</option>
                <option value={1}>Atypical Angina</option>
                <option value={2}>Non-Anginal Pain</option>
                <option value={3}>Asymptomatic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fasting Blood Sugar &gt; 120 mg/dl</label>
              <select
                name="fasting_bs"
                value={formData.fasting_bs}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value={0}>False (&lt; 120 mg/dl)</option>
                <option value={1}>True (&gt; 120 mg/dl)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Resting ECG Results</label>
              <select
                name="resting_ecg"
                value={formData.resting_ecg}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value={0}>Normal</option>
                <option value={1}>ST-T Wave Abnormality</option>
                <option value={2}>Left Ventricular Hypertrophy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Exercise Induced Angina</label>
              <select
                name="exercise_angina"
                value={formData.exercise_angina}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Oldpeak (ST Depression)</label>
              <input
                type="number"
                step="0.1"
                name="oldpeak"
                value={formData.oldpeak}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ST Slope</label>
              <select
                name="st_slope"
                value={formData.st_slope}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value={0}>Upsloping</option>
                <option value={1}>Flat</option>
                <option value={2}>Downsloping</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 border-b border-slate-100 pb-2">
            3. Body Mass Index & Lifestyle
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Body Mass Index (BMI)</label>
              <input
                type="number"
                step="0.1"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Smoking Status</label>
              <select
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              >
                <option value={0}>Non-Smoker</option>
                <option value={1}>Active Smoker</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Activity className="w-5 h-5 animate-spin" /> Evaluating ML Risk...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Predict Risk Probability <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
