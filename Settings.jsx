import React from 'react';
import { Smartphone, Shield, Key } from 'lucide-react';

const Settings = () => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Settings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Configure your WhatsApp Business API and account preferences.</p>
            </header>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Shield size={24} style={{ color: 'var(--primary)' }} />
                    <h2 style={{ fontSize: '1.25rem' }}>WhatsApp Cloud API Configuration</h2>
                </div>

                <form>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phone Number ID</label>
                        <input type="text" placeholder="Enter Phone Number ID" />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Meta Business Portfolio ID (WABA ID)</label>
                        <input type="text" placeholder="Enter WABA ID" />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Permanent Access Token</label>
                        <input type="password" placeholder="Enter Access Token" />
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Generate a system user token with `whatsapp_business_messaging` and `whatsapp_business_management` permissions.
                        </p>
                    </div>

                    <button className="btn-primary">
                        <Key size={18} />
                        <span>Connect WhatsApp API</span>
                    </button>
                </form>
            </div>

            <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Smartphone size={24} style={{ color: 'var(--secondary)' }} />
                    <h2 style={{ fontSize: '1.25rem' }}>Webhook Configuration</h2>
                </div>
                <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Use this URL to receive real-time message updates and replies from Meta.</p>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <code style={{ color: 'var(--primary)' }}>https://your-domain.com/webhook</code>
                    <span style={{ fontSize: '0.8rem', cursor: 'pointer', opacity: 0.7 }}>Copy URL</span>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Verify Token</label>
                    <input type="text" value="your_secret_verify_token" readOnly style={{ opacity: 0.6 }} />
                </div>
            </div>
        </div>
    );
};

export default Settings;
