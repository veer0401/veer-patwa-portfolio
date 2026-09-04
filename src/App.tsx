import { useState, useEffect } from 'react';
import { useIDEStore } from './store/ideStore';
import { BootSequence } from './components/BootSequence';
import { IDELayout } from './components/IDELayout';
import { PortfolioLayout } from './components/portfolio/PortfolioLayout';
import { CommandPalette } from './components/CommandPalette';
import { MobileDevOsBlocker } from './components/common/MobileDevOsBlocker';
import { AnimatePresence, motion } from 'framer-motion';

export function App() {
  const viewMode = useIDEStore((s) => s.viewMode);
  const isBooted = useIDEStore((s) => s.isBooted);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`w-full bg-[#080A0D] ${viewMode === 'devos' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* Global Command Palette */}
      <CommandPalette />

      {viewMode === 'hr-portfolio' ? (
        // Primary Default: HR-First Portfolio Experience (Natural Window Scroll for 100% Sticky Header)
        <PortfolioLayout />
      ) : isMobile ? (
        // Mobile Blocker for DEV.OS: Enforces PC / Desktop Mode
        <MobileDevOsBlocker />
      ) : (
        // Secondary Layer: Interactive DEV.OS Developer IDE for Desktop
        <div className="w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            {!isBooted ? (
              <BootSequence key="boot" />
            ) : (
              <motion.div
                key="ide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full h-full"
              >
                <IDELayout />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default App;
