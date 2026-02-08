import React from 'react';
import { Search, Send, User } from 'lucide-react';

const CRMChat = () => {
    return (
        <div style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 10rem)' }}>
            {/* Contact List */}
            <div className="glass-card" style={{ width: '350px', padding: '0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            style={{ paddingLeft: '2.5rem', marginBottom: '0' }}
                        />
                    </div>
                </div>
                <div style={{ overflowY: 'auto' }}>
                    <ChatListItem name="John Doe" lastMsg="Thanks for the offer!" time="10m" active />
                    <ChatListItem name="Sarah Smith" lastMsg="Interested in the product." time="1h" />
                    <ChatListItem name="Mike Johnson" lastMsg="Can you help me?" time="3h" />
                    <ChatListItem name="Emma Wilson" lastMsg="Sent you a message." time="1d" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="glass-card" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1rem' }}>John Doe</h3>
                        <span style={{ fontSize: '0.8rem', color: '#25D366' }}>Online</span>
                    </div>
                </div>

                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ChatMessage text="Hello! How can I help you today?" time="10:00 AM" direction="out" />
                    <ChatMessage text="I saw your campaign message about the winter sale." time="10:05 AM" direction="in" />
                    <ChatMessage text="Yes, we have a 20% discount on all items." time="10:06 AM" direction="out" />
                    <ChatMessage text="Thanks for the offer!" time="10:10 AM" direction="in" />
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="text" placeholder="Type a message..." style={{ marginBottom: '0' }} />
                        <button className="btn-primary" style={{ padding: '0.75rem' }}>
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatListItem = ({ name, lastMsg, time, active }) => (
    <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        transition: 'background 0.2s ease'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 600 }}>{name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{time}</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lastMsg}</p>
    </div>
);

const ChatMessage = ({ text, time, direction }) => (
    <div style={{
        alignSelf: direction === 'out' ? 'flex-end' : 'flex-start',
        maxWidth: '70%',
        background: direction === 'out' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
        padding: '0.75rem 1rem',
        borderRadius: direction === 'out' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        color: direction === 'out' ? 'white' : 'var(--text-main)'
    }}>
        <p style={{ fontSize: '0.95rem' }}>{text}</p>
        <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.25rem', display: 'block', textAlign: 'right' }}>{time}</span>
    </div>
);

export default CRMChat;
