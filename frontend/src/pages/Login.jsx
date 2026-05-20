import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ShieldAlert, Loader2 } from 'lucide-react';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Quick frontend check
    if (!email || !password) {
      setErrorMessage('Please fill in all credentials.');
      return;
    }

    setIsSubmitting(true);

    const result = await login(email, password);

    setIsSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setErrorMessage(result.error || 'Invalid credentials. Please verify and retry.');
    }
  };

  return (
    <div className="auth-page">
      {/* Background ambient lighting */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <div className="glass-card">
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-logo">
            <LogIn size={22} />
          </div>
          <span className="brand-name">Quantum IT Innovation!</span>
        </div>

        <h1 className="form-title">Welcome back</h1>
        <p className="form-subtitle">Access your protected dashboard credentials</p>

        {/* Dynamic Alert Banner */}
        {errorMessage && (
          <div className="alert-card alert-error">
            <ShieldAlert size={20} style={{ flexShrink: 0 }} />
            <div>{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Form Group */}
          <div className="form-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Form Group */}
          <div className="form-group">
            <label className="input-label" htmlFor="password">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spinner" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="auth-footer">
          Don't have an account?
          <Link to="/register" className="auth-link">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
