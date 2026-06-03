'use client';

import styles from '../../app/home.module.css';

export default function ContactSection() {
  return (
    <section id="contact" className="container section-spacer" style={{ marginBottom: '100px' }}>
      <p className="section-label fade-up" style={{ textAlign: 'center' }}>Get in Touch</p>
      <div className={`spotlight-card ${styles.contactCard} fade-up`}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Let&apos;s Connect</h2>
        <p style={{ textAlign: 'center', marginBottom: '32px' }}>
          Interested in building something together? Drop me a line.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <input type="text" className="form-input" placeholder="Your Name" />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" className="form-input" placeholder="Your Email" />
          </div>
          <div className={styles.inputGroup}>
            <textarea className="form-input" rows={4} placeholder="Message" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Send Message
          </button>
        </form>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a href="https://www.linkedin.com/in/vivek-bhati-94324063/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>LinkedIn</a>
          <a href="https://github.com/bhativivek" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>GitHub</a>
          <a href="mailto:vivekbhati9192@gmail.com" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Email</a>
        </div>
      </div>
    </section>
  );
}
