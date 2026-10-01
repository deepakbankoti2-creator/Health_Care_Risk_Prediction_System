import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, HeartPulse, LayoutDashboard, History, Cpu, LogIn, UserPlus, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'text-sky-600 font-semibold border-b-2 border-sky-600' : 'text-slate-600 hover:text-sky-600';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl shadow">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-sky-900 to-sky-700 bg-clip-text text-transparent">
                CardioRisk AI
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-bold text-sky-600">
                Healthcare Risk Prediction
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`py-5 text-sm flex items-center gap-1.5 transition ${isActive('/')}`}>
              <Activity className="w-4 h-4" /> Home
            </Link>
            <Link to="/assessment" className={`py-5 text-sm flex items-center gap-1.5 transition ${isActive('/assessment')}`}>
              <HeartPulse className="w-4 h-4" /> Risk Assessment
            </Link>
            <Link to="/dashboard" className={`py-5 text-sm flex items-center gap-1.5 transition ${isActive('/dashboard')}`}>
              <LayoutDashboard className="w-4 h-4" /> Analytics Dashboard
            </Link>
            <Link to="/metrics" className={`py-5 text-sm flex items-center gap-1.5 transition ${isActive('/metrics')}`}>
              <Cpu className="w-4 h-4" /> ML Models
            </Link>
            <Link to="/history" className={`py-5 text-sm flex items-center gap-1.5 transition ${isActive('/history')}`}>
              <History className="w-4 h-4" /> History
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <User className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  <span className="text-[10px] bg-sky-100 text-sky-700 font-semibold uppercase px-1.5 py-0.5 rounded">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-sm flex items-center gap-1 transition"
                >
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
