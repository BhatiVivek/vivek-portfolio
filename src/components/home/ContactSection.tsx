'use client';

import { useRef, useState } from 'react';
import styles from '../../app/home.module.css';

type FormFields = { name: string; email: string; message: string; honeypot: string };
type FieldErrors = { name?: string; email?: string; message?: string };

const INITIAL_FORM: FormFields = { name: '', email: '', message: '', honeypot: '' };

function validate({ name, email, message }: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = 'Name is required.';
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!message.trim()) errors.message = 'Message is required.';
  if (name.length > 100) errors.name = 'Name is too long.';
  if (message.length > 2000) errors.message = 'Message must be under 2000 characters.';
  return errors;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const loadedAt = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Date.now() - loadedAt.current < 1500) return;

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, website: form.honeypot }),
      });

      if (res.status === 429) {
        setStatus('error');
        setErrors({ message: 'Too many messages sent. Please try again in 30 minutes.' });
        return;
      }

      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    borderColor: hasError ? '#ef4444' : undefined,
  });

  return (
    <section id="contact" className="container section-spacer" style={{ marginBottom: '100px' }}>
      <p className="section-label fade-up" style={{ textAlign: 'center' }}>Get in Touch</p>
      <div className={`spotlight-card ${styles.contactCard} fade-up`}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Let&apos;s Connect</h2>
        <p style={{ textAlign: 'center', marginBottom: '32px' }}>
          Interested in building something together? Drop me a line.
        </p>

        {status === 'sent' ? (
          <div style={{
            textAlign: 'center', padding: '40px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
            </svg>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem', margin: 0 }}>
              Message sent!
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              I&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn btn-secondary"
              style={{ marginTop: '8px' }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            {/* Honeypot — hidden from real users, catches bots that fill all inputs */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="new-password"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            />

            <div className={styles.inputGroup}>
              <input
                id="contact-name"
                type="text"
                name="name"
                className="form-input"
                placeholder="Your Name *"
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                style={fieldStyle(!!errors.name)}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</p>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Your Email *"
                maxLength={254}
                value={form.email}
                onChange={handleChange}
                style={fieldStyle(!!errors.email)}
              />
              {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</p>}
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="message"
                className="form-input"
                rows={4}
                placeholder="Message *"
                maxLength={2000}
                value={form.message}
                onChange={handleChange}
                style={fieldStyle(!!errors.message)}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                {errors.message
                  ? <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{errors.message}</p>
                  : <span />
                }
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0 }}>
                  {form.message.length}/2000
                </p>
              </div>
            </div>

            {status === 'error' && !errors.message && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a href="https://www.linkedin.com/in/vivek-bhati-94324063/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>LinkedIn</a>
          <a href="https://github.com/bhativivek" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>GitHub</a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-name')?.focus();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
