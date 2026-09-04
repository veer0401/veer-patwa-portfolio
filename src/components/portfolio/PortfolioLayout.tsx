import { Terminal } from 'lucide-react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { ExperienceSection } from './ExperienceSection';
import { ProjectsSection } from './ProjectsSection';
import { EngineeringFocusSection } from './EngineeringFocusSection';
import { SkillsSection } from './SkillsSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';
import { DevOsPromoBanner } from './DevOsPromoBanner';
import { Footer } from './Footer';
import { useIDEStore } from '../../store/ideStore';

export function PortfolioLayout() {
  const setViewMode = useIDEStore((s) => s.setViewMode);

  return (
    <div className="min-h-screen bg-[#080A0D] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <EngineeringFocusSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <DevOsPromoBanner />
      </main>

      <Footer />

      {/* Floating DEV.OS Access Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setViewMode('devos')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-emerald-500/50 bg-[#0d1217]/90 hover:bg-emerald-950/80 text-emerald-400 font-mono text-xs font-semibold shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-400 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
        >
          <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Explore DEV.OS</span>
        </button>
      </div>
    </div>
  );
}
