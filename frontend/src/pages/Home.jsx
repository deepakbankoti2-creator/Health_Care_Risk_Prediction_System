import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowRight, ShieldCheck, Activity, Cpu, BarChart3, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-8 md:p-14 shadow-2xl border border-slate-800">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            AI-Powered Clinical Decision Support
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Healthcare Risk Prediction System
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed">
            Analyze key patient physiological metrics—including blood pressure, cholesterol, resting ECG, maximum heart rate, and smoking status—using machine learning classification models and SHAP-based explainable AI.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/assessment"
              className="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-sky-500/25 flex items-center gap-2 transition"
            >
              Start Risk Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/metrics"
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl flex items-center gap-2 transition"
            >
              Explore ML Models <Cpu className="w-4 h-4 text-sky-400" />
            </Link>
          </div>

          {/* Key Disclaimer Callout */}
          <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-200 text-xs leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Important Notice:</strong> This system is designed strictly for educational and decision-support demonstration. It generates risk estimation probabilities using statistical models and does not substitute for qualified clinical diagnoses.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Pipeline */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">End-to-End Data Science Pipeline</h2>
          <p className="text-slate-600 text-sm">
            From raw physiological inputs to trained classifier algorithms and interpretable SHAP factor explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="p-3 bg-sky-100 text-sky-700 rounded-xl w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">1. Data Collection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accepts 13 clinical parameters including Age, BP, Cholesterol, ECG, Max HR, and Lifestyle factors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">2. Preprocessing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Applies StandardScaler, handles missing data, encodes categorical fields, and prevents data leakage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-xl w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">3. ML Models</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates Logistic Regression, Decision Trees, Random Forests, and XGBoost with ROC-AUC scoring.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl w-fit">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">4. SHAP Explainability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extracts patient-level feature contributions showing top factors increasing vs. decreasing estimated risk.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="bg-slate-100 rounded-3xl p-8 md:p-10 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Key System Capabilities</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div><strong>Validated Risk Classification:</strong> Real-time risk probability calculation for heart disease screening.</div>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div><strong>Explainable AI (SHAP):</strong> Transparent factor breakdowns explaining why a patient is categorized as high or low risk.</div>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div><strong>Analytics Dashboard:</strong> Recharts visualizer tracking assessment distributions, age groups, and model ROC curves.</div>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div><strong>Multi-Tier Architecture:</strong> Decoupled React frontend, Node/Express REST API, and Python FastAPI ML microservice.</div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="font-semibold text-slate-800 text-sm">Sample Risk Assessment Output</span>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">72% Probability</span>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-red-500 h-3 rounded-full w-[72%]"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Category: Higher Estimated Risk</span>
              <span>Model: XGBoost Classifier</span>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100 text-xs">
            <p className="font-medium text-slate-700">Top Factors Increasing Risk:</p>
            <div className="text-red-600 flex justify-between"><span>+ Resting BP (145 mmHg)</span><span>+0.14 SHAP</span></div>
            <div className="text-red-600 flex justify-between"><span>+ Serum Cholesterol (250 mg/dl)</span><span>+0.11 SHAP</span></div>
          </div>
        </div>
      </div>

    </div>
  );
}
