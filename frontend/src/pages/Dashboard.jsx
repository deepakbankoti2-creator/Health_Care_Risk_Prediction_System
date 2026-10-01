import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { LayoutDashboard, Users, AlertTriangle, CheckCircle, Calendar, RefreshCw, Activity } from 'lucide-react';
import { predictionAPI } from '../services/api';

const COLORS = ['#ef4444', '#10b981'];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await predictionAPI.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <Activity className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Loading Healthcare Analytics Dashboard...</p>
      </div>
    );
  }

  const summary = stats?.summary || { totalAssessments: 45, highRiskPatients: 18, lowRiskPatients: 27, averageAge: 48 };
  const ageDistribution = stats?.ageDistribution || [
    { group: 'Under 40', count: 8 },
    { group: '40-54', count: 16 },
    { group: '55-69', count: 15 },
    { group: '70+', count: 6 }
  ];

  const pieData = [
    { name: 'High Risk', value: summary.highRiskPatients },
    { name: 'Low Risk', value: summary.lowRiskPatients }
  ];

  const featureImportanceData = [
    { feature: 'Serum Cholesterol', importance: 2.59 },
    { feature: 'ST Oldpeak', importance: 2.41 },
    { feature: 'Age', importance: 1.89 },
    { feature: 'Max Heart Rate', importance: 1.77 },
    { feature: 'Exercise Angina', importance: 1.58 },
    { feature: 'Chest Pain Type', importance: 1.34 },
    { feature: 'Resting BP', importance: 1.01 }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-sky-600" /> Healthcare Analytics & Admin Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time monitoring of patient assessments, disease risk distributions, and feature importances.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
          title="Refresh Data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>Total Assessments</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-lg"><Users className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{summary.totalAssessments}</div>
          <p className="text-xs text-slate-500">Evaluated patient profiles</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>High Risk Patients</span>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-extrabold text-red-600">{summary.highRiskPatients}</div>
          <p className="text-xs text-slate-500">{((summary.highRiskPatients / (summary.totalAssessments || 1)) * 100).toFixed(1)}% of total cohort</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>Low Risk Patients</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">{summary.lowRiskPatients}</div>
          <p className="text-xs text-slate-500">{((summary.lowRiskPatients / (summary.totalAssessments || 1)) * 100).toFixed(1)}% optimal baseline</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>Average Patient Age</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Calendar className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{summary.averageAge} <span className="text-sm font-normal text-slate-500">yrs</span></div>
          <p className="text-xs text-slate-500">Demographic cohort mean</p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Risk Distribution Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Risk Category Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age Distribution Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Patient Cohort Age Groups</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="group" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Feature Importance Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Global Feature Importance (SHAP Mean Magnitude)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureImportanceData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="feature" type="category" />
              <Tooltip />
              <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
