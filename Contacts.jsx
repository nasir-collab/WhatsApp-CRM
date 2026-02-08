import React from 'react';
import { Upload, Download, Tag, Search, Plus } from 'lucide-react';

const Contacts = () => {
    return (
        <div>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Contacts</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Upload CSV and manage your audience with tags.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                        <Upload size={20} />
                        <span>Import CSV</span>
                    </button>
                    <button className="btn-primary">
                        <Plus size={20} />
                        <span>Add Contact</span>
                    </button>
                </div>
            </header>

            <div className="glass-card">
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            style={{ paddingLeft: '2.5rem', marginBottom: '0' }}
                        />
                    </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Phone Number</th>
                            <th style={{ padding: '1rem' }}>Tags</th>
                            <th style={{ padding: '1rem' }}>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ContactRow name="John Doe" phone="+1234567890" tags={['Customer', 'VIP']} date="Oct 24, 2023" />
                        <ContactRow name="Sarah Smith" phone="+1987654321" tags={['Lead']} date="Oct 25, 2023" />
                        <ContactRow name="Mike Johnson" phone="+1122334455" tags={['Support']} date="Oct 26, 2023" />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ContactRow = ({ name, phone, tags, date }) => (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
        <td style={{ padding: '1rem', fontWeight: 600 }}>{name}</td>
        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{phone}</td>
        <td style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {tags.map(tag => (
                    <span key={tag} style={{
                        padding: '0.15rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border)'
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </td>
        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{date}</td>
    </tr>
);

export default Contacts;
