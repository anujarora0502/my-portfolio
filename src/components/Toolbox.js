import { portfolioData } from '@/data/portfolioData';
import styles from './Toolbox.module.css';

export default function Toolbox() {
  const { skills, education, interests } = portfolioData;

  return (
    <>
      <section id="skills" className="row">
        <h2 className="row-label"><span>03</span>Skills</h2>
        <ul className={`card-grid ${styles.grid}`}>
          {Object.entries(skills).map(([group, items]) => (
            <li key={group} className="card">
              <h3 className={styles.cardTitle}>{group}</h3>
              <p className={styles.cardText}>{items}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="education" className="row">
        <h2 className="row-label"><span>04</span>Education and more</h2>
        <div className={`card-grid ${styles.grid}`}>
          {education.map((e) => (
            <div key={e.institution} className="card">
              <p className={styles.period}>{e.period}</p>
              <h3 className={styles.cardTitle}>{e.degree}</h3>
              <p className={styles.cardText}>
                {e.institution}, {e.score}
              </p>
            </div>
          ))}
          {interests.map((i) => (
            <div key={i.title} className="card">
              <h3 className={styles.cardTitle}>{i.title}</h3>
              <p className={styles.cardText}>{i.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
