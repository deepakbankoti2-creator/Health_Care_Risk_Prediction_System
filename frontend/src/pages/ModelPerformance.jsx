import React, { useState, useEffect } from 'react';
import { Cpu, Award, CheckCircle, BarChart3, Activity } from 'lucide-react';
import { predictionAPI } from '../services/api';

export default function ModelPerformance() {
  const [loading, setLoading] = useState(true);
  const [modelInfo, setModelInfo] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await predictionAPI.getModelMetrics();
        setModelInfo(response.data);
      } catch (err) {
        console.error("Failed to load model metrics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Activity className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Fetching Machine Learning Model Metrics...</p>
      </div>
    );
  }

  const metrics = modelInfo?.metrics || {};
  const activeModel = modelInfo?.model_name || "XGBoost Classifier";

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-sky-600" /> Machine Learning Model Evaluation & Comparison
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Comparative performance evaluation across classification algorithms trained on Heart Disease dataset.
          </p>
        </div>

        <div className="bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl flex items-center gap-2">
          <Award className="w-5 h-5 text-sky-600" />
          <div className="text-xs">
            <span className="text-slate-500 block">Selected Best Model</span>
            <strong className="text-sky-900 font-bold text-sm">{activeModel}</strong>
          </div>
        </div>
      </div>

      {/* Model Performance Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-900">Algorithm Performance Comparison</h3>
          <span className="text-xs text-slate-500">Evaluated on 20% stratified test split</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Algorithm Model</th>
                <th className="py-3.5 px-4">Accuracy</th>
                <th className="py-3.5 px-4">Precision</th>
                <th className="py-3.5 px-4">Recall (Sensitivity)</th>
                <th className="py-3.5 px-4">Specificity</th>
                <th className="py-3.5 px-4">F1 Score</th>
                <th className="py-3.5 px-4">ROC-AUC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {Object.keys(metrics).map((modelName) => {
                const m = metrics[modelName];
                const isSelected = modelName === activeModel;
                return (
                  <tr key={modelName} className={isSelected ? 'bg-sky-50/60 font-semibold' : 'hover:bg-slate-50'}>
                    <td className="py-4 px-6 flex items-center gap-2">
                      {isSelected && <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />}
                      <span className={isSelected ? 'text-sky-900 font-bold' : 'text-slate-800'}>{modelName}</span>
                      {isSelected && <span className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded-full">Active</span>}
                    </td>
                    <td className="py-4 px-4 font-mono">{(m.accuracy * 100).toFixed(1)}%</td>
                    <td className="py-4 px-4 font-mono">{(m.precision * 100).toFixed(1)}%</td>
                    <td className="py-4 px-4 font-mono">{(m.recall * 100).toFixed(1)}%</td>
                    <td className="py-4 px-4 font-mono">{(m.specificity * 100).toFixed(1)}%</td>
                    <td className="py-4 px-4 font-mono">{(m.f1_score * 100).toFixed(1)}%</td>
                    <td className="py-4 px-4 font-mono text-sky-700 font-bold">{(m.roc_auc * 100).toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confusion Matrix Breakdown */}
      {metrics[activeModel] && metrics[activeModel].confusion_matrix && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Confusion Matrix Breakdown ({activeModel})
          </h3>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-center font-mono">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-xs text-emerald-800 font-sans font-medium block">True Negative (TN)</span>
              <span className="text-2xl font-bold text-emerald-900">{metrics[activeModel].confusion_matrix.tn}</span>
              <span className="text-[10px] text-emerald-700 block">Correctly identified low risk</span>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <span className="text-xs text-amber-800 font-sans font-medium block">False Positive (FP)</span>
              <span className="text-2xl font-bold text-amber-900">{metrics[activeModel].confusion_matrix.fp}</span>
              <span className="text-[10px] text-amber-700 block">Low risk misclassified as high</span>
            </div>
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
              <span className="text-xs text-rose-800 font-sans font-medium block">False Negative (FN)</span>
              <span className="text-2xl font-bold text-rose-900">{metrics[activeModel].confusion_matrix.fn}</span>
              <span className="text-[10px] text-rose-700 block">High risk missed (Critical)</span>
            </div>
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-1">
              <span className="text-xs text-sky-800 font-sans font-medium block">True Positive (TP)</span>
              <span className="text-2xl font-bold text-sky-900">{metrics[activeModel].confusion_matrix.tp}</span>
              <span className="text-[10px] text-sky-700 block">Correctly identified high risk</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
