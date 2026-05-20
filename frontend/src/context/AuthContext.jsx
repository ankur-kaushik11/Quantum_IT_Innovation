import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token & user from localStorage on initialization
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('nexus_token');
      const storedUser = localStorage.getItem('nexus_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse stored authentication data:', error);
      // Clean corrupted storage
      localStorage.removeItem('nexus_token');
      localStorage.removeItem('nexus_user');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle Login API Request
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please verify credentials.');
      }

      // Save to state
      setToken(data.token);
      setUser(data.user);

      // Save to localStorage
      localStorage.setItem('nexus_token', data.token);
      localStorage.setItem('nexus_user', JSON.stringify(data.user));

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login Auth Error:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Handle Registration API Request
  const register = async (name, dob, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, dob, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      // Save to state
      setToken(data.token);
      setUser(data.user);

      // Save to localStorage
      localStorage.setItem('nexus_token', data.token);
      localStorage.setItem('nexus_user', JSON.stringify(data.user));

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Registration Auth Error:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Handle Logout Action
  const logout = () => {
    // Clear state
    setToken(null);
    setUser(null);

    // Clear localStorage
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook to consume Auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an AuthProvider');
  }
  return context;
};
