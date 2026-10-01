import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, ArrowLeft, RefreshCw, BarChart2, CheckCircle, TrendingUp, TrendingDown, Info, Award } from 'lucide-react';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction = location.state?.prediction;

  if (!prediction) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">No Assessment Data Found</h2>
        <p className="text-slate-600 text-sm">Please complete a patient assessment form to view risk predictions.</p>
        <Link to="/assessment" className="inline-block px-5 py-2.5 bg-sky-600 text-white rounded-lg font-medium text-sm">
          Go to Assessment Form
        </Link>
      </div>
    );
  }

  const {
    patientName,
    diseaseType,
    probability,
    riskPercentage,
    riskCategory,
    confidence,
    modelName,
    modelVersion,
    shapExplanation,
    inputData
  } = prediction;

  const isHighRisk = riskCategory === 'High Risk';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/assessment')}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-sky-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> New Assessment
        </button>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Model: <strong className="text-slate-700">{modelName}</strong> (v{modelVersion})</span>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
        
        {/* Card Header with Risk Level styling */}
        <div className={`p-8 border-b ${isHighRisk ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white' : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit block">
                {diseaseType} Risk Assessment
              </span>
              <h1 className="text-3xl font-extrabold">{patientName || 'Patient Assessment'}</h1>
              <p className="text-sm opacity-90">Age: {inputData?.age || 'N/A'} | Gender: {inputData?.gender === 1 ? 'Male' : 'Female'}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center space-y-1">
              <span className="text-xs uppercase font-medium opacity-80">Estimated Risk Probability</span>
              <div className="text-4xl font-extrabold tracking-tight">{riskPercentage}%</div>
              <div className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 inline-block">
                {riskCategory}
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Risk Gauge Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <span>Risk Probability Gauge</span>
              <span>Model Confidence: {confidence}%</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
              <div
                className={`h-full transition-all duration-1000 ${isHighRisk ? 'bg-red-500' : 'bg-emerald-500'}`}
                style={{ width: `${riskPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>0% (Optimal)</span>
              <span>50% (Threshold)</span>
              <span>100% (High Risk)</span>
            </div>
          </div>

          {/* SHAP Explainability Breakdown */}
          {shapExplanation && (
            <div className="space-y-6 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-sky-600" /> SHAP Feature Factor Analysis
                  </h3>
                  <p className="text-xs text-slate-500">
                    Patient-specific factors contributing to calculated risk estimation probability.
                  </p>
                </div>
                <span className="text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-md font-medium">
                  Explainable AI (SHAP)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Factors Increasing Risk */}
                <div className="p-5 bg-red-50/60 rounded-2xl border border-red-100 space-y-3">
                  <h4 className="text-sm font-bold text-red-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-red-600" /> Factors Increasing Estimated Risk
                  </h4>
                  <ul className="space-y-2">
                    {shapExplanation.increasing_risk_factors && shapExplanation.increasing_risk_factors.length > 0 ? (
                      shapExplanation.increasing_risk_factors.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-red-100 shadow-2xs">
                          <span className="font-semibold text-slate-800 capitalize">
                            + {item.feature.replace(/_/g, ' ')} ({item.value})
                          </span>
                          <span className="font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                            +{item.shap_value} SHAP
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">No significant elevated risk factors identified.</p>
                    )}
                  </ul>
                </div>

                {/* Factors Decreasing Risk */}
                <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-3">
                  <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-600" /> Factors Lowering Estimated Risk
                  </h4>
                  <ul className="space-y-2">
                    {shapExplanation.decreasing_risk_factors && shapExplanation.decreasing_risk_factors.length > 0 ? (
                      shapExplanation.decreasing_risk_factors.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                          <span className="font-semibold text-slate-800 capitalize">
                            - {item.feature.replace(/_/g, ' ')} ({item.value})
                          </span>
                          <span className="font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                            {item.shap_value} SHAP
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">No protective factors identified.</p>
                    )}
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* Educational Disclaimer Banner */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Medical Disclaimer:</strong> This result is generated by a machine-learning statistical model for educational and informational purposes only. It is not a medical diagnosis or treatment advice. Please consult a qualified healthcare professional.
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <Link
              to="/assessment"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl flex items-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4" /> New Patient Assessment
            </Link>

            <Link
              to="/dashboard"
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 transition"
            >
              <BarChart2 className="w-4 h-4" /> View Analytics Dashboard
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
