import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Search, Filter, Calendar, ArrowUpRight, Activity } from 'lucide-react';
import { predictionAPI } from '../services/api';

export default function History() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await predictionAPI.getPredictions();
        setPredictions(response.data.predictions || []);
      } catch (err) {
        console.error("Failed to load prediction history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredPredictions = predictions.filter(p => {
    const matchesSearch = (p.patientName || 'Anonymous Patient').toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterCategory === 'ALL' || p.riskCategory === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-sky-600" /> Patient Prediction History
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            View, filter, and inspect previous patient risk assessment records.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-56"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="High Risk">High Risk Only</option>
            <option value="Low Risk">Low Risk Only</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Activity className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading Patient Prediction Records...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredPredictions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No patient prediction records found matching your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6">Assessment Date</th>
                    <th className="py-3.5 px-4">Patient Name</th>
                    <th className="py-3.5 px-4">Age / Gender</th>
                    <th className="py-3.5 px-4">Risk Probability</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Model Used</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredPredictions.map((pred) => {
                    const isHigh = pred.riskCategory === 'High Risk';
                    const dateStr = new Date(pred.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    });

                    return (
                      <tr key={pred._id} className="hover:bg-slate-50 transition">
                        <td className="py-4 px-6 text-xs text-slate-500 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {dateStr}
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-900">{pred.patientName || 'Anonymous Patient'}</td>
                        <td className="py-4 px-4 text-xs">
                          {pred.inputData?.age} yrs / {pred.inputData?.gender === 1 ? 'Male' : 'Female'}
                        </td>
                        <td className="py-4 px-4 font-bold font-mono">
                          {pred.riskPercentage !== undefined ? `${pred.riskPercentage}%` : `${Math.round(pred.probability * 100)}%`}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${isHigh ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {pred.riskCategory}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-500 font-mono">{pred.modelName}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => navigate('/result', { state: { prediction: pred } })}
                            className="px-3 py-1.5 text-xs font-medium text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition inline-flex items-center gap-1"
                          >
                            View SHAP <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
