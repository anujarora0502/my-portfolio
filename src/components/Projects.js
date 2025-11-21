import { portfolioData } from '@/data/portfolioData';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className={styles.grid}>
          {portfolioData.projects.map((project, index) => (
            <div key={index} className={`card ${styles.card}`}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
