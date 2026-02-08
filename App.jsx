import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Contacts from './pages/Contacts';
import CRMChat from './pages/CRMChat';
import Settings from './pages/Settings';
import {
    LayoutDashboard,
    Send,
    Users,
    MessageSquare,
    Settings as SettingsIcon,
    LogOut
} from 'lucide-react';

function App() {
    return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <div className="brand" style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--gradient)', width: '32px', height: '32px', borderRadius: '8px' }}></div>
            <h2 style={{ fontSize: '1.25rem' }}>WhatsApp CRM</h2>
          </div>
          
          <nav>
            <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <SidebarLink to="/campaigns" icon={<Send size={20} />} label="Campaigns" />
            <SidebarLink to="/contacts" icon={<Users size={20} />} label="Contacts" />
            <SidebarLink to="/chat" icon={<MessageSquare size={20} />} label="CRM Chat" />
            <SidebarLink to="/settings" icon={<SettingsIcon size={20} />} label="Settings" />
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: var(--text-muted) }}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/chat" element={<CRMChat />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div >
    </Router >
  );
}

function SidebarLink({ to, icon, label }) {
    return (
        <Link to={to} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.85rem 1rem',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            marginBottom: '0.5rem',
            transition: 'all 0.2s ease',
            background: window.location.pathname === to ? 'var(--glass)' : 'transparent'
        }}>
            {icon}
            <span style={{ fontWeight: 500 }}>{label}</span>
        </Link>
    );
}

export default App;
