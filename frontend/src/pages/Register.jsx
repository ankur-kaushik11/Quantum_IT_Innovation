import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Mail, Lock, UserPlus, ShieldAlert, Loader2, ShieldCheck } from 'lucide-react';
import '../App.css';

const Register = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated } = useAuth();
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
    setSuccessMessage('');

    // Frontend validations
    if (!name || !dob || !email || !password) {
      setErrorMessage('Please fill in all registration fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    // Validate DOB is not in the future
    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      setErrorMessage('Date of birth cannot be in the future.');
      return;
    }

    setIsSubmitting(true);

    const result = await register(name, dob, email, password);

    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage('Account established successfully! Preparing access dashboard...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setErrorMessage(result.error || 'Registration failed. Please try again.');
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
            <UserPlus size={22} />
          </div>
          <span className="brand-name">Quantum IT Innovation!</span>
        </div>

        <h1 className="form-title">Create account</h1>
        <p className="form-subtitle">Register to explore our secure systems</p>

        {/* Dynamic Error Alert */}
        {errorMessage && (
          <div className="alert-card alert-error">
            <ShieldAlert size={20} style={{ flexShrink: 0 }} />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Dynamic Success Alert */}
        {successMessage && (
          <div className="alert-card alert-success">
            <ShieldCheck size={20} style={{ flexShrink: 0 }} />
            <div>{successMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name Input */}
          <div className="form-group">
            <label className="input-label" htmlFor="name">Full Name</label>
            <div className="input-container">
              <User className="input-icon" size={18} />
              <input
                id="name"
                type="text"
                className="input-field"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Date of Birth Input */}
          <div className="form-group">
            <label className="input-label" htmlFor="dob">Date of Birth</label>
            <div className="input-container">
              <Calendar className="input-icon" size={18} />
              <input
                id="dob"
                type="date"
                className="input-field"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <span className="dob-helper">Required format: MM/DD/YYYY</span>
          </div>

          {/* Email Address Input */}
          <div className="form-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="input-label" htmlFor="password">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spinner" />
                Registering...
              </>
            ) : (
              <>
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="auth-footer">
          Already have an account?
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
