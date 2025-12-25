import Image from 'next/image';
import { portfolioData } from '@/data/portfolioData';
import { Download } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const { personalInfo } = portfolioData;

  return (
    <section className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/images/profile.png" 
              alt={personalInfo.name} 
              width={300} 
              height={300} 
              className={styles.profileImage}
              priority
            />
          </div>
          <div className={styles.textContent}>
            <h1 className={styles.name}>
              Hi, I'm <span className={styles.highlight}>{personalInfo.name}</span>
            </h1>
            <h2 className={styles.title}>{personalInfo.title}</h2>
            <p className={styles.bio}>{personalInfo.bio}</p>
            
            <a 
              href="https://drive.google.com/uc?export=download&id=1FacmJJel4A1lybrDR_hM0Wv3szlY9BKZ" 
              className={styles.resumeBtn}
              download
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
