import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, Loader2, Linkedin, Globe } from 'lucide-react';

export default function ContactSection({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        if (showToast) showToast('Message saved successfully to SQLite database!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setErrorMsg(data.error || 'Failed to submit message');
      }
    } catch (err) {
      setErrorMsg('Network error. Make sure backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="section-header">
        <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
          <MessageSquare size={14} /> <span>Get In Touch</span>
        </div>
        <h2>Contact <span className="gradient-text">Hayasinth M</span></h2>
        <p>Feel free to reach out for opportunities, projects, collaboration, or inquiries.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px'
      }}>
        {/* Left Column: Direct Contact Info Cards */}
        <div style={{ display: 'grid', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 242, 254, 0.1)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <Mail size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Email Address</div>
              <a href="mailto:hayasinth284@gmail.com" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
                hayasinth284@gmail.com
              </a>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(79, 172, 254, 0.1)',
              border: '1px solid rgba(79, 172, 254, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-blue)'
            }}>
              <Phone size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Mobile Number</div>
              <a href="tel:+918122208962" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
                +91 8122208962
              </a>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 242, 254, 0.1)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <Linkedin size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>LinkedIn Profile</div>
              <a href="https://www.linkedin.com/in/hayasinth284" target="_blank" rel="noreferrer" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
                linkedin.com/in/hayasinth284
              </a>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(127, 86, 217, 0.1)',
              border: '1px solid rgba(127, 86, 217, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)'
            }}>
              <MapPin size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>College & Location</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Jeppiaar Engineering College
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Chennai, Tamil Nadu, India</div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>
            Send Me a Message
          </h3>

          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)'
            }}>
              <CheckCircle size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Message Sent Successfully!</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '16px' }}>
                Thank you for reaching out. Your message has been saved in the backend database.
              </p>
              <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              {errorMsg && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Hiring"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Hayasinth, I would like to discuss..."
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
