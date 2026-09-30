import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Toolbox from '@/components/Toolbox';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Anuj Arora",
            url: "https://anujarora.net",
            image: "https://anujarora.net/images/profile.png",
            sameAs: [
              "https://github.com/anujarora0502",
              "https://www.linkedin.com/in/anujarora0502",
              "https://x.com/eight_bit_byte"
            ],
            jobTitle: "Lead Engineer",
            worksFor: {
              "@type": "Organization",
              name: "Samsung Research Institute, Bangalore"
            },
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Maharaja Agrasen Institute of Technology"
            }
          })
        }}
      />
      <Navbar />
      <div className="page-content">
        <Hero />
        <div className="container">
          <Experience />
          <Projects />
          <Toolbox />
          <Contact />
        </div>
      </div>
      <Chatbot />
    </main>
  );
}
