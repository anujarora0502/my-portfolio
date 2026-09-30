import { portfolioData } from '@/data/portfolioData';
import styles from './Experience.module.css';

export default function Experience() {
  const { work } = portfolioData;

  return (
    <section id="work" className="row">
      <h2 className="row-label"><span>01</span>Work</h2>

      <div>
        <p className={styles.company}>
          <span className="serif">{work.team}</span>
          <span className="muted">, {work.company}</span>
        </p>

        {work.roles.map((role) => (
          <div key={role.title} className={styles.role}>
            <div className={styles.roleHead}>
              <h3 className={styles.roleTitle}>{role.title}</h3>
              <span className={styles.period}>{role.period}</span>
            </div>
            <ul className={`card-grid ${styles.items}`}>
              {role.items.map((item) => (
                <li key={item.name} className="card">
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemText}>{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className={styles.beyond}>{work.beyond}</p>
      </div>
    </section>
  );
}
