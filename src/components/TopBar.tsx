import React, { useState } from 'react';
import { useIDEStore } from '../store/ideStore';
import { Coffee, Command, Menu, ArrowLeft, Sun, Moon } from 'lucide-react';
import profileData from '../data/profile.json';

export const TopBar: React.FC = () => {
  const {
    toggleCommandPalette,
    toggleJvmPanel,
    toggleObservability,
    toggleTerminal,
    openFile,
    setMobileDrawerOpen,
    setViewMode,
    theme,
    toggleTheme,
  } = useIDEStore();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: Record<string, { label: string; action: () => void }[]> = {
    File: [
      { label: 'Open README.md', action: () => openFile('/README.md', 'README.md', 'file-text', 'markdown') },
      { label: 'Open AboutDeveloper.java', action: () => openFile('/src/about/AboutDeveloper.java', 'AboutDeveloper.java', 'coffee', 'java') },
      { label: 'Open Experience.java', action: () => openFile('/src/experience/Experience.java', 'Experience.java', 'git-commit-horizontal', 'java') },
      { label: 'Open pom.xml', action: () => openFile('/pom.xml', 'pom.xml', 'file-code', 'xml') },
      { label: 'Open Contact.java', action: () => openFile('/src/contact/Contact.java', 'Contact.java', 'mail', 'java') },
    ],
    Edit: [
      { label: 'Find in Files (⌘K)', action: toggleCommandPalette },
    ],
    View: [
      { label: 'Microservices Architecture', action: () => openFile('/architecture/microservices.arch', 'microservices.arch', 'network', 'architecture') },
      { label: 'JVM Runtime Specifications', action: toggleJvmPanel },
      { label: 'System Environment & Runtime Matrix', action: toggleObservability },
      { label: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme', action: toggleTheme },
    ],
    Projects: [
      { label: 'Inventory Medical POS (Featured)', action: () => openFile('/src/projects/InventoryMedicalPOS.java', 'InventoryMedicalPOS.java', 'coffee', 'java') },
      { label: 'Criminal Record Management', action: () => openFile('/src/projects/CriminalRecordManagement.cs', 'CriminalRecordManagement.cs', 'file-code', 'csharp') },
      { label: 'Java Shopping App', action: () => openFile('/src/projects/JavaShoppingApp.java', 'JavaShoppingApp.java', 'coffee', 'java') },
    ],
    Terminal: [
      { label: 'Toggle Integrated Terminal', action: toggleTerminal },
      { label: 'Clear Terminal Buffer', action: () => useIDEStore.getState().clearTerminal() },
    ],
    Help: [
      { label: 'DEV.OS Documentation', action: () => openFile('/README.md', 'README.md', 'file-text', 'markdown') },
      { label: 'Dev Agent Assistant', action: () => useIDEStore.getState().toggleAgent() },
    ],
  };

  return (
    <header className="h-10 bg-[#080A0D] border-b border-[#1C2636] flex items-center justify-between px-3 select-none text-xs text-slate-300 z-30">
      {/* Left: Exit button + Brand + Menu */}
      <div className="flex items-center gap-3">
        {/* Return to HR Portfolio Button */}
        <button
          onClick={() => setViewMode('hr-portfolio')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-semibold transition-all cursor-pointer shadow-xs"
          title="Return to standard HR portfolio overview"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to HR View</span>
        </button>

        {/* Mobile drawer toggle */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden p-1 text-slate-400 hover:text-white rounded hover:bg-[#141B24]"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2 pr-3 border-r border-[#1C2636]">
          <div className="w-5 h-5 rounded bg-[#10151C] border border-[#1C2636] flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/logo.png"
              alt="DEV.OS Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                }
              }}
            />
            <div style={{ display: 'none' }} className="w-2 h-2 rounded-full bg-[#F89820] shadow-sm shadow-[#F89820]/60 animate-pulse" />
          </div>
          <span className="font-bold tracking-wider text-slate-100 flex items-center gap-1.5 font-mono">
            DEV.OS
            <span className="hidden sm:inline-block text-[10px] text-zinc-400 font-normal">
              {profileData.name.toUpperCase()}
            </span>
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 relative" aria-label="Main Navigation">
          {Object.keys(menuItems).map((menuName) => (
            <div key={menuName} className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === menuName ? null : menuName)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMenu === menuName
                    ? 'bg-slate-200 dark:bg-[#141B24] text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#10151C]'
                }`}
              >
                {menuName}
              </button>

              {/* Dropdown */}
              {activeMenu === menuName && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setActiveMenu(null)}
                  />
                  <div className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-[#0B0F14] border border-slate-200 dark:border-[#1C2636] rounded-md shadow-xl py-1 z-50 text-xs">
                    {menuItems[menuName].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          item.action();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-[#141B24] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Environment Info & Command Palette */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* JVM status button */}
        <button
          onClick={toggleJvmPanel}
          title="Click to view JVM runtime details"
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#10151C] dark:hover:bg-[#141B24] border border-slate-300 dark:border-[#1C2636] hover:border-amber-500/50 transition-all text-amber-600 dark:text-[#F89820] cursor-pointer font-mono"
        >
          <Coffee className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11px]">JAVA {profileData.javaVersion}</span>
        </button>

        {/* System Environment Matrix Badge */}
        <button
          onClick={toggleObservability}
          title="Click to view System Environment & Architecture Matrix"
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#10151C] dark:hover:bg-[#141B24] border border-slate-300 dark:border-[#1C2636] hover:border-emerald-500/50 text-slate-700 dark:text-slate-300 text-[11px] transition-all cursor-pointer font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-xs shadow-emerald-400 animate-pulse" />
          <span>SYSTEM MATRIX</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className="flex items-center justify-center p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#10151C] dark:hover:bg-[#141B24] border border-slate-300 dark:border-[#1C2636] hover:border-amber-400 text-amber-500 dark:text-amber-400 transition-all cursor-pointer text-[11px]"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={toggleCommandPalette}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#10151C] dark:hover:bg-[#141B24] border border-slate-300 dark:border-[#1C2636] hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all text-[11px] cursor-pointer"
          title="Command Palette"
        >
          <Command className="w-3 h-3 text-blue-600 dark:text-[#4DA3FF]" />
          <span className="hidden sm:inline">⌘K</span>
        </button>
      </div>
    </header>
  );
};
