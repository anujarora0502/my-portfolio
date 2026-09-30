'use client';

import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.bar} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.inner}`} aria-label="Main">
        <a href="#top" className={styles.home} aria-label="Anuj Arora, back to top">
          <Image src="/images/profile.png" alt="" width={28} height={28} className={styles.avatar} priority />
          <span className={styles.homeText}>Anuj Arora</span>
        </a>

        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </a>
          ))}
          <button
            className={styles.navLink}
            onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
          >
            Ask AI
          </button>
          <button onClick={toggleTheme} className={styles.theme} aria-label="Toggle light and dark theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
