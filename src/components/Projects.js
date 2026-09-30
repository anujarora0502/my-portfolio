import { portfolioData } from '@/data/portfolioData';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className="row">
      <h2 className="row-label"><span>02</span>Projects</h2>

      <div>
        <p className={`muted ${styles.note}`}>Things I build outside work, because I enjoy it.</p>

        <ul className={styles.list}>
          {portfolioData.projects.map((p) => (
            <li key={p.title} className={`card ${styles.project}`}>
              <div className={styles.head}>
                <h3 className={styles.title}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                    <span className="serif">{p.title}</span>
                  </a>
                </h3>
                <span className={styles.year}>{p.year}</span>
              </div>
              <p className={styles.desc}>{p.description}</p>
              <p className={styles.meta}>
                <span className="muted">Tech: {p.stack}.</span>{' '}
                <a className={`link ${styles.visit}`} href={p.url} target="_blank" rel="noopener noreferrer">
                  Visit {p.linkLabel}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
