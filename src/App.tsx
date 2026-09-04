import { useState, useEffect } from 'react';
import { useIDEStore } from './store/ideStore';
import { BootSequence } from './components/BootSequence';
import { IDELayout } from './components/IDELayout';
import { PortfolioLayout } from './components/portfolio/PortfolioLayout';
import { CommandPalette } from './components/CommandPalette';
import { MobileDevOsBlocker } from './components/common/MobileDevOsBlocker';
import { NotFoundPage } from './components/common/NotFoundPage';
import { AnimatePresence, motion } from 'framer-motion';

export function App() {
  const viewMode = useIDEStore((s) => s.viewMode);
  const setViewMode = useIDEStore((s) => s.setViewMode);
  const isBooted = useIDEStore((s) => s.isBooted);
  const theme = useIDEStore((s) => s.theme);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  // Check URL pathname on mount and popstate for 404 detection & view mode
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;
      const search = new URLSearchParams(window.location.search);
      const redirectedPath = search.get('path');

      if (redirectedPath && redirectedPath !== '/' && redirectedPath !== '/index.html') {
        setViewMode('not-found');
        return;
      }

      // Root paths
      if (path === '/' || path === '' || path === '/index.html') {
        if (search.get('view') === 'devos') {
          setViewMode('devos');
        } else {
          setViewMode('hr-portfolio');
        }
      } else {
        // Any unrecognized URL path triggers the 404 page
        setViewMode('not-found');
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, [setViewMode]);

  // Screen resize listener for mobile desktop detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`w-full transition-colors duration-200 ${
      theme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#080A0D] text-zinc-100'
    } ${viewMode === 'devos' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* Global Command Palette */}
      <CommandPalette />

      {viewMode === 'not-found' ? (
        // Professional 404 Page (Linked to Previous Page, HR View, or DEV.OS)
        <NotFoundPage />
      ) : viewMode === 'hr-portfolio' ? (
        // Primary Default: HR-First Portfolio Experience
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
