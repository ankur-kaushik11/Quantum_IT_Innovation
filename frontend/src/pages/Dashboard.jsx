import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  ShieldCheck, 
  Users, 
  Activity, 
  Calendar, 
  Mail, 
  User as UserIcon,
  Search,
  Sliders,
  MoreVertical,
  Plus
} from 'lucide-react';
import '../App.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Helper to format Date of Birth beautifully
  const formatDOB = (dobString) => {
    if (!dobString) return 'N/A';
    try {
      const date = new Date(dobString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dobString;
    }
  };

  // Mock static data representing beautiful data rows
  const mockTableData = [
    {
      id: 'usr-1',
      name: 'Olivia Vance',
      email: 'olivia.vance@nexus.io',
      dob: '1992-04-12',
      role: 'Administrator',
      status: 'Active',
      joined: 'May 12, 2024'
    },
    {
      id: 'usr-2',
      name: 'Liam Harrington',
      email: 'liam.h@nexus.io',
      dob: '1988-11-22',
      role: 'Premium User',
      status: 'Active',
      joined: 'Jan 08, 2025'
    },
    {
      id: 'usr-3',
      name: 'Sophia Chen',
      email: 'sophia.chen@nexus.io',
      dob: '1995-07-31',
      role: 'Premium User',
      status: 'Pending',
      joined: 'Mar 15, 2026'
    },
    {
      id: 'usr-4',
      name: 'Ethan Ross',
      email: 'ethan.ross@nexus.io',
      dob: '1990-09-05',
      role: 'Standard User',
      status: 'Active',
      joined: 'Feb 20, 2025'
    },
    {
      id: 'usr-5',
      name: 'Isabella Silva',
      email: 'isabella.s@nexus.io',
      dob: '1994-01-18',
      role: 'Standard User',
      status: 'Inactive',
      joined: 'Jul 04, 2024'
    }
  ];

  // Insert current logged in user at the top of mock data to make it feel personalized!
  const completeTableData = user 
    ? [
        {
          id: user.id || 'curr-session',
          name: `${user.name} (You)`,
          email: user.email,
          dob: user.dob,
          role: 'Administrator',
          status: 'Active',
          joined: 'Current Session'
        },
        ...mockTableData
      ]
    : mockTableData;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-layout">
      {/* Background ambient lighting */}
      <div className="bg-glow-1" style={{ top: '-10%', left: '10%', opacity: 0.4 }}></div>
      <div className="bg-glow-2" style={{ bottom: '-10%', right: '10%', opacity: 0.4 }}></div>

      {/* Modern Navigation Header */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="brand-header" style={{ marginBottom: 0 }}>
            <div className="brand-logo" style={{ width: 34, height: 34 }}>
              <ShieldCheck size={18} />
            </div>
            <span className="brand-name" style={{ fontSize: '1.25rem' }}>Quantum IT Innovation!</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {user && (
              <div className="nav-user">
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-details">
                  <span className="user-name-text">{user.name}</span>
                  <span className="user-role-text">{user.email}</span>
                </div>
              </div>
            )}
            
            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Space */}
      <main className="dashboard-main">
        {/* Welcome and Status Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">
            Welcome back, {user ? user.name.split(' ')[0] : 'User'}
          </h1>
          <p className="dashboard-subtitle">
            Secure session authorized via JWT token. Here is your dashboard overview.
          </p>
        </header>

        {/* Dynamic Statistics Cards */}
        <section className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">
              <Users size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Active Directory Members</span>
              <span className="metric-value">{completeTableData.length} Users</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Activity size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">System Performance</span>
              <span className="metric-value" style={{ color: 'var(--color-success)' }}>Optimal</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <ShieldCheck size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Security Protocol</span>
              <span className="metric-value">JWT Secure</span>
            </div>
          </div>
        </section>

        {/* Table Filter / Title Panel */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h2 style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: '1.25rem', 
            fontWeight: 600,
            color: 'white'
          }}>
            User Management Directory
          </h2>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search records..." 
                disabled
                style={{
                  background: 'var(--bg-tertiary)',
                  border: 'var(--border-glass)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem 0.75rem 0.4rem 2rem',
                  fontSize: '0.85rem',
                  color: 'white',
                  width: '180px',
                  cursor: 'not-allowed'
                }}
              />
            </div>
            <button 
              disabled 
              style={{
                background: 'var(--bg-tertiary)',
                border: 'var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.75rem',
                color: 'white',
                fontSize: '0.85rem',
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Sliders size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Glassmorphic Static Table */}
        <section className="table-container">
          <div className="table-responsive">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Profile / Name</th>
                  <th>Email Address</th>
                  <th>Date of Birth</th>
                  <th>System Role</th>
                  <th>Status</th>
                  <th>Authorized Date</th>
                </tr>
              </thead>
              <tbody>
                {completeTableData.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-cell-avatar">
                          {record.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-cell-info">
                          <span className="user-cell-name">{record.name}</span>
                          <span className="user-cell-email">ID: {record.id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <Mail size={14} style={{ color: 'var(--color-text-muted)' }} />
                        {record.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />
                        {formatDOB(record.dob)}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        record.role === 'Administrator' ? 'badge-role-admin' : 'badge-role'
                      }`}>
                        {record.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        record.status === 'Active' ? 'badge-active' :
                        record.status === 'Pending' ? 'badge-pending' : 'badge-inactive'
                      }`}>
                        <span style={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          background: record.status === 'Active' ? '#10b981' : record.status === 'Pending' ? '#f59e0b' : '#ef4444',
                          display: 'inline-block'
                        }}></span>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                        {record.joined}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Small security assurance tag */}
        <footer style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <p>© 2026 Quantum IT Innovation! hiring assessment test. All access logs are encrypted and monitored.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
