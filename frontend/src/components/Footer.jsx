import React from 'react';
import { HeartPulse, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-3">
              <HeartPulse className="w-5 h-5 text-sky-400" />
              <span>CardioRisk AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An AI-powered healthcare risk prediction platform built to demonstrate end-to-end data science pipelines, model evaluation, and SHAP explainability.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Prediction Modules</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span> Heart Disease Risk Model</li>
              <li className="flex items-center gap-2 text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Diabetes Risk (Phase 2)</li>
              <li className="flex items-center gap-2 text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Hypertension Risk (Phase 2)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Educational Disclaimer</h4>
            <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-lg text-amber-200 text-xs leading-relaxed flex gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Educational Notice:</strong> This platform is designed for research, decision-support, and demonstration purposes only. It does not provide certified medical diagnoses. Always consult a qualified physician for health concerns.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © 2026 Healthcare Risk Prediction System. End-to-End Machine Learning & Web Architecture.
        </div>
      </div>
    </footer>
  );
}
