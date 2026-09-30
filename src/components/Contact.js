'use client';

import { portfolioData } from '@/data/portfolioData';
import { Mail, Linkedin, Github, FileText, MessageCircle, ArrowUpRight } from 'lucide-react';
import { XIcon } from './BrandIcons';
import styles from './Contact.module.css';

export default function Contact() {
  const { personalInfo: p } = portfolioData;

  const cards = [
    { href: `mailto:${p.email}`, icon: <Mail size={20} />, title: 'Email', value: p.email },
    { href: p.linkedin, icon: <Linkedin size={20} />, title: 'LinkedIn', value: 'in/anujarora0502', external: true },
    { href: p.github, icon: <Github size={20} />, title: 'GitHub', value: 'anujarora0502', external: true },
    { href: p.twitter, icon: <XIcon size={18} />, title: 'X (Twitter)', value: '@eight_bit_byte', external: true },
    { href: p.resume, icon: <FileText size={20} />, title: 'Resume', value: 'Download the PDF', external: true },
  ];

  return (
    <>
      <section id="contact" className="row">
        <h2 className="row-label"><span>05</span>Contact</h2>
        <div>
          <h3 className={`serif ${styles.heading}`}>Let&apos;s talk.</h3>
          <p className={`muted ${styles.sub}`}>
            Happy to chat about backend systems, AI agents, ad-tech or whatever you&apos;re building.
            Email is the quickest way to reach me.
          </p>

          <div className={`card-grid ${styles.grid}`}>
            {cards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className={`card ${styles.card}`}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.icon}>{c.icon}</span>
                <span className={styles.text}>
                  <span className={styles.title}>{c.title}</span>
                  <span className={styles.value}>{c.value}</span>
                </span>
                <ArrowUpRight size={16} className={styles.arrow} aria-hidden="true" />
              </a>
            ))}
            <button
              type="button"
              className={`card ${styles.card}`}
              onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
            >
              <span className={styles.icon}><MessageCircle size={20} /></span>
              <span className={styles.text}>
                <span className={styles.title}>Ask my AI assistant</span>
                <span className={styles.value}>It knows my work history</span>
              </span>
              <ArrowUpRight size={16} className={styles.arrow} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>{p.name}, {new Date().getFullYear()}</span>
        <span>Bangalore, India</span>
      </footer>
    </>
  );
}
