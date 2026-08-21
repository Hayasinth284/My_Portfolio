import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-accent)',
      boxShadow: 'var(--shadow-glow)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'var(--text-primary)',
      animation: 'fadeIn 0.3s ease'
    }}>
      <CheckCircle2 size={20} color="var(--accent-emerald)" />
      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
        <X size={16} />
      </button>
    </div>
  );
}
