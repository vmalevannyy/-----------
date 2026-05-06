import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import Roadmap from '@/components/Roadmap';
import ContactsSection from '@/components/ContactsSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <Roadmap />
        <ContactsSection />
      </main>
    </>
  );
}
