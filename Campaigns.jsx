import React from 'react';
import { Plus, Send, Clock, CheckCircle, MoreVertical } from 'lucide-react';

const Campaigns = () => {
    return (
        <div>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Campaigns</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create and manage your WhatsApp message campaigns.</p>
                </div>
                <button className="btn-primary">
                    <Plus size={20} />
                    <span>New Campaign</span>
                </button>
            </header>

            <div className="glass-card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem' }}>Campaign Name</th>
                            <th style={{ padding: '1rem' }}>Template</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Sent</th>
                            <th style={{ padding: '1rem' }}>Delivered</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CampaignRow name="Winter Promo" template="welcome_back" status="COMPLETED" sent="1,200" delivered="1,150" />
                        <CampaignRow name="Weekly Newsletter" template="news_update" status="RUNNING" sent="450" delivered="400" />
                        <CampaignRow name="Product Launch" template="launch_alert" status="SCHEDULED" sent="0" delivered="0" />
                        <CampaignRow name="Test Campaign" template="hello_world" status="DRAFT" sent="0" delivered="0" />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CampaignRow = ({ name, template, status, sent, delivered }) => (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
        <td style={{ padding: '1rem', fontWeight: 600 }}>{name}</td>
        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{template}</td>
        <td style={{ padding: '1rem' }}>
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: status === 'COMPLETED' ? 'rgba(37, 211, 102, 0.1)' : status === 'RUNNING' ? 'rgba(52, 183, 241, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                color: status === 'COMPLETED' ? '#25D366' : status === 'RUNNING' ? '#34B7F1' : 'white'
            }}>
                {status}
            </span>
        </td>
        <td style={{ padding: '1rem' }}>{sent}</td>
        <td style={{ padding: '1rem' }}>{delivered}</td>
        <td style={{ padding: '1rem' }}><MoreVertical size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} /></td>
    </tr>
);

export default Campaigns;
