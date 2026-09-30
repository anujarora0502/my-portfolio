import { portfolioData } from '@/data/portfolioData';
import AskButton from './AskButton';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const { personalInfo: p } = portfolioData;

  return (
    <section id="top" className={`container ${styles.hero}`}>
      <div className={styles.text}>
        <p className={styles.kicker}>
          {p.title} <span className={styles.dot}>|</span> {p.location}
        </p>
        <h1 className={`serif ${styles.name}`}>Anuj Arora</h1>
        <p className={styles.intro}>{p.intro}</p>
        <p className={`muted ${styles.about}`}>{p.about}</p>

        <ul className={styles.links}>
          <li>
            <a className="link" href={p.resume} target="_blank" rel="noopener noreferrer">
              Resume (PDF)
            </a>
          </li>
          <li>
            <a className="link" href={`mailto:${p.email}`}>Email</a>
          </li>
          <li>
            <a className="link" href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a className="link" href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a className="link" href={p.twitter} target="_blank" rel="noopener noreferrer">X</a>
          </li>
        </ul>

        <p className={styles.ask}>
          Short on time?{' '}
          <AskButton className={`link ${styles.askBtn}`}>Ask my AI assistant</AskButton>{' '}
          anything about my work.
        </p>
      </div>

      <div className={styles.figure}>
        <Image
          src="/images/profile.png"
          alt={`Photo of ${p.name}`}
          width={800}
          height={800}
          priority
          className={styles.photo}
          sizes="(max-width: 860px) 260px, 380px"
        />
      </div>
    </section>
  );
}
