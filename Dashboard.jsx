import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid
} from 'recharts';
import { TrendingUp, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

// Sample Data
const data = [
    { name: 'Mon', sent: 4000, delivered: 2400 },
    { name: 'Tue', sent: 3000, delivered: 1398 },
    { name: 'Wed', sent: 2000, delivered: 9800 },
    { name: 'Thu', sent: 2780, delivered: 3908 },
    { name: 'Fri', sent: 1890, delivered: 4800 },
    { name: 'Sat', sent: 2390, delivered: 3800 },
    { name: 'Sun', sent: 3490, delivered: 4300 },
];

const Dashboard = () => {
    return (
        <div>
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Welcome back, Admin</h1>
                <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your campaigns today.</p>
            </header>

            <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
                <StatCard title="Total Sent" value="12,543" icon={<TrendingUp color="#25D366" />} trend="+12%" />
                <StatCard title="Delivered" value="11,201" icon={<CheckCircle color="#34B7F1" />} trend="+5%" />
                <StatCard title="Response Rate" value="28.4%" icon={<MessageCircle color="#A855F7" />} trend="+2%" />
            </div>

            <div className="grid-2">
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Campaign Performance</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        {/* Simple placeholder for chart as I don't want to install huge libs for now, but I'll use recharts components */}
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', paddingTop: '100px' }}>[Chart Visualization - Recharts]</p>
                    </div>
                </div>
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
                    <div className="activity-list">
                        <ActivityItem text="Campaign 'Winter Sale' completed" time="2 mins ago" type="success" />
                        <ActivityItem text="Imported 500 contacts" time="1 hour ago" type="info" />
                        <ActivityItem text="New WhatsApp account connected" time="3 hours ago" type="info" />
                        <ActivityItem text="Campaign 'Flash Deal' failed for 5 users" time="5 hours ago" type="error" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend }) => (
    <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{title}</span>
            {icon}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.75rem' }}>{value}</h2>
            <span style={{ color: '#25D366', fontSize: '0.875rem', fontWeight: 600, paddingBottom: '0.25rem' }}>{trend}</span>
        </div>
    </div>
);

const ActivityItem = ({ text, time, type }) => (
    <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: type === 'success' ? '#25D366' : type === 'error' ? '#EF4444' : '#34B7F1', marginTop: '8px' }}></div>
        <div>
            <p style={{ fontSize: '0.95rem' }}>{text}</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{time}</span>
        </div>
    </div>
);

export default Dashboard;
