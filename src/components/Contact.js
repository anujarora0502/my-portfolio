import { portfolioData } from '@/data/portfolioData';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';
import { XIcon } from './BrandIcons';
import styles from './Contact.module.css';

export default function Contact() {
  const { personalInfo } = portfolioData;

  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className={styles.subtitle}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        
        <div className={styles.grid}>
          <a href={`mailto:${personalInfo.email}`} className={styles.card}>
            <div className={styles.iconWrapper}>
              <Mail size={32} />
            </div>
            <h3 className={styles.cardTitle}>Email Me</h3>
            <p className={styles.cardValue}>{personalInfo.email}</p>
            <span className={styles.action}>Send Email <ArrowRight size={16} /></span>
          </a>

          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.card}>
            <div className={styles.iconWrapper}>
              <Linkedin size={32} />
            </div>
            <h3 className={styles.cardTitle}>LinkedIn</h3>
            <p className={styles.cardValue}>Connect professionally</p>
            <span className={styles.action}>View Profile <ArrowRight size={16} /></span>
          </a>

          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.card}>
            <div className={styles.iconWrapper}>
              <Github size={32} />
            </div>
            <h3 className={styles.cardTitle}>GitHub</h3>
            <p className={styles.cardValue}>Check out my code</p>
            <span className={styles.action}>View Projects <ArrowRight size={16} /></span>
          </a>

          <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className={styles.card}>
            <div className={styles.iconWrapper}>
              <XIcon size={32} />
            </div>
            <h3 className={styles.cardTitle}>X (Twitter)</h3>
            <p className={styles.cardValue}>@eight_bit_byte</p>
            <span className={styles.action}>Follow Me <ArrowRight size={16} /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
