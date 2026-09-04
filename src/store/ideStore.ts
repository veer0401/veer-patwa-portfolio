import { create } from 'zustand';
import type { Tab, SidebarPanel, AgentState, AgentMessage, TerminalLine, AppViewMode } from '../types';
import { getAgentResponse } from '../data/agentResponses';
import profileData from '../data/profile.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import architectureData from '../data/architecture.json';
import { calculateExperience } from '../utils/experience';

interface IDEState {
  // App View Mode
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;

  // Boot
  isBooted: boolean;
  setBooted: (val: boolean) => void;

  // Tabs & Files
  openTabs: Tab[];
  activeTabId: string;
  openFile: (path: string, name: string, icon?: string, language?: string) => void;
  closeTab: (id: string) => void;
  closeOtherTabs: (id: string) => void;
  closeAllTabs: () => void;
  setActiveTab: (id: string) => void;

  // Sidebar
  activePanel: SidebarPanel | null;
  isSidebarOpen: boolean;
  setActivePanel: (panel: SidebarPanel | null) => void;
  toggleSidebar: () => void;

  // Terminal
  isTerminalOpen: boolean;
  terminalLines: TerminalLine[];
  toggleTerminal: () => void;
  setTerminalOpen: (open: boolean) => void;
  executeCommand: (cmd: string) => void;
  clearTerminal: () => void;

  // Dev Agent
  isAgentOpen: boolean;
  agentState: AgentState;
  agentMessages: AgentMessage[];
  toggleAgent: () => void;
  setAgentOpen: (open: boolean) => void;
  sendAgentMessage: (text: string) => void;

  // Command Palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  // Observability & JVM modal
  isObservabilityOpen: boolean;
  setObservabilityOpen: (open: boolean) => void;
  toggleObservability: () => void;

  isJvmPanelOpen: boolean;
  toggleJvmPanel: () => void;

  // Mobile drawer
  isMobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
}

const initialTabs: Tab[] = [
  {
    id: '/README.md',
    name: 'README.md',
    path: '/README.md',
    language: 'markdown',
    icon: 'file-text',
    isActive: true,
  },
];

const initialTerminalLines: TerminalLine[] = [
  { id: '1', type: 'system', content: 'DEV.OS Java Runtime Environment v21.0.2 [build 21.0.2+13-LTS]' },
  { id: '2', type: 'system', content: 'Single Source of Truth: Centralized JSON Architecture Loaded' },
  { id: '3', type: 'system', content: 'Type "help" for a list of available commands or "exit" to return to HR Overview.' },
];

const initialAgentMessages: AgentMessage[] = [
  {
    id: 'msg-init',
    sender: 'agent',
    text: `Hello! I am DEV AGENT, powered by Veer Patwa's portfolio data. Ask me about his featured project (Inventory Medical POS), Java 21 & Spring Boot expertise, or Cognizant modernization experience.`,
    state: 'IDLE',
    timestamp: Date.now(),
  },
];

export const useIDEStore = create<IDEState>((set, get) => ({
  // View Mode: default is HR-First Portfolio!
  viewMode: 'hr-portfolio',
  setViewMode: (mode) => set({ viewMode: mode }),

  // Boot
  isBooted: false,
  setBooted: (val) => set({ isBooted: val }),

  // Tabs & Files
  openTabs: initialTabs,
  activeTabId: '/README.md',

  openFile: (path, name, icon = 'file-code', language = 'java') => {
    const { openTabs } = get();
    const existing = openTabs.find((t) => t.path === path);
    if (existing) {
      set({ activeTabId: existing.id });
    } else {
      const newTab: Tab = {
        id: path,
        name,
        path,
        icon,
        language,
        isActive: true,
      };
      set({
        openTabs: [...openTabs, newTab],
        activeTabId: newTab.id,
      });
    }
  },

  closeTab: (id) => {
    const { openTabs, activeTabId } = get();
    const filtered = openTabs.filter((t) => t.id !== id);
    let nextActive = activeTabId;
    if (activeTabId === id) {
      const index = openTabs.findIndex((t) => t.id === id);
      const nextTab = openTabs[index - 1] || openTabs[index + 1] || filtered[0];
      nextActive = nextTab ? nextTab.id : '';
    }
    set({ openTabs: filtered, activeTabId: nextActive });
  },

  closeOtherTabs: (id) => {
    const { openTabs } = get();
    const target = openTabs.find((t) => t.id === id);
    if (target) {
      set({ openTabs: [target], activeTabId: target.id });
    }
  },

  closeAllTabs: () => {
    set({ openTabs: [], activeTabId: '' });
  },

  setActiveTab: (id) => set({ activeTabId: id }),

  // Sidebar
  activePanel: 'explorer',
  isSidebarOpen: true,
  setActivePanel: (panel) => {
    const current = get().activePanel;
    if (current === panel && get().isSidebarOpen) {
      set({ isSidebarOpen: false });
    } else {
      set({ activePanel: panel, isSidebarOpen: true });
    }
  },
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  // Terminal
  isTerminalOpen: true,
  terminalLines: initialTerminalLines,
  toggleTerminal: () => set((s) => ({ isTerminalOpen: !s.isTerminalOpen })),
  setTerminalOpen: (open) => set({ isTerminalOpen: open }),

  executeCommand: (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    const inputLine: TerminalLine = {
      id: String(Date.now()),
      type: 'input',
      content: `$ ${cmd}`,
      timestamp: Date.now(),
    };

    const lines = [...get().terminalLines, inputLine];

    const addOutput = (content: string, type: 'output' | 'error' | 'success' | 'system' = 'output') => {
      lines.push({
        id: String(Date.now() + Math.random()),
        type,
        content,
        timestamp: Date.now(),
      });
    };

    if (lower === 'clear' || lower === 'cls') {
      set({ terminalLines: [] });
      return;
    } else if (lower === 'help') {
      addOutput('DEV.OS CLI Commands:');
      addOutput('  help            Show available commands');
      addOutput('  whoami          Display developer profile summary');
      addOutput('  skills          Open & list Java engineering skill matrix');
      addOutput('  projects        Open & list backend projects');
      addOutput('  experience      View career history (Cognizant, BISAG-N)');
      addOutput('  architecture    Open system architecture & modernization');
      addOutput('  contact         Open contact coordinates');
      addOutput('  java --version  Inspect JVM runtime specifications');
      addOutput('  system          Inspect system status');
      addOutput('  sudo hire veer  Execute recruitment check');
      addOutput('  exit            Exit DEV.OS and return to HR Overview');
      addOutput('  clear           Clear terminal buffer');
    } else if (lower === 'whoami') {
      const exp = calculateExperience(profileData.careerStartDate);
      addOutput(`${profileData.name} — ${profileData.title}`);
      addOutput(`Specialization: ${profileData.specialization}`);
      addOutput(`Experience: ${exp.formatted} (${exp.detailed})`);
      addOutput(`Summary: ${profileData.summary}`);
      get().openFile('/src/about/AboutDeveloper.java', 'AboutDeveloper.java', 'coffee', 'java');
    } else if (lower === 'skills') {
      addOutput('PRIMARY SKILLS:');
      skillsData.primary.forEach((sk) => addOutput(`  • ${sk}`));
      addOutput('JAVA CORE: ' + skillsData.categories.java.join(', '));
      addOutput('SPRING: ' + skillsData.categories.spring.join(', '));
      addOutput('BACKEND: ' + skillsData.categories.backend.join(', '));
      get().openFile('/src/skills/JavaStack.java', 'JavaStack.java', 'coffee', 'java');
    } else if (lower === 'projects') {
      addOutput('PROJECTS IN REPOSITORY:');
      projectsData.projects.forEach((p) => {
        addOutput(`  • [${p.featured ? 'FEATURED' : 'PROJECT'}] ${p.name} (${p.status}) - ${p.technologies.join(', ')}`);
      });
      get().openFile('/src/projects/InventoryMedicalPOS.java', 'InventoryMedicalPOS.java', 'coffee', 'java');
    } else if (lower === 'experience') {
      addOutput('CAREER COMMIT HISTORY:');
      experienceData.experiences.forEach((exp) => {
        addOutput(`  • ${exp.company} — ${exp.role} (${exp.startDate} -> ${exp.endDate || 'Present'})`);
        addOutput(`    ${exp.description}`);
      });
      get().openFile('/src/experience/Experience.java', 'Experience.java', 'git-commit-horizontal', 'java');
    } else if (lower === 'architecture') {
      addOutput(`Opening system architecture: ${architectureData.modernization.title}`);
      addOutput(`Modernization: RMI -> Microservices (~250K records / 250-260 MB in <1 min)`);
      get().openFile('/architecture/microservices.arch', 'microservices.arch', 'network', 'architecture');
    } else if (lower === 'contact') {
      addOutput('Opening Contact.java coordinates...');
      get().openFile('/src/contact/Contact.java', 'Contact.java', 'mail', 'java');
    } else if (lower === 'java --version' || lower === 'java -version') {
      addOutput(`openjdk ${profileData.javaVersion}.0.2 2024-01-16 LTS`, 'success');
      addOutput('Java Runtime: READY');
      addOutput('JVM STATUS: ONLINE | Garbage Collector: G1GC | ClassLoader: Verified', 'system');
    } else if (lower === 'system') {
      addOutput('DEV.OS RUNTIME STATUS:', 'system');
      addOutput(`JAVA RUNTIME     ● ONLINE (Java ${profileData.javaVersion} LTS)`);
      addOutput('SPRING BOOT      ● READY');
      addOutput('DATA LAYER       ● CENTRALIZED JSON (Single Source of Truth)');
      addOutput('MODERNIZATION    ● RMI to Microservices Architecture');
      addOutput('DEV AGENT        ● READY');
    } else if (lower === 'sudo hire veer' || lower === 'hire veer' || lower === 'hire') {
      addOutput('Checking authorization credentials...', 'system');
      addOutput('ACCESS GRANTED: Candidate Veer Patwa demonstrates strong Java/backend engineering fundamentals.', 'success');
      addOutput('Recommendation: Contact Veer Patwa for interviews and engineering roles.', 'output');
      get().openFile('/src/contact/Contact.java', 'Contact.java', 'mail', 'java');
    } else if (lower === 'exit' || lower === 'quit') {
      addOutput('Exiting DEV.OS... Returning to HR Overview view.', 'system');
      set({ viewMode: 'hr-portfolio' });
    } else if (lower.startsWith('sudo ')) {
      addOutput('User is not in the sudoers file. This incident will be reported to the JVM daemon.', 'error');
    } else {
      addOutput(`command not found: ${cmd}. Type "help" for available commands.`, 'error');
    }

    set({ terminalLines: lines });
  },

  clearTerminal: () => set({ terminalLines: [] }),

  // Dev Agent
  isAgentOpen: true,
  agentState: 'IDLE',
  agentMessages: initialAgentMessages,
  toggleAgent: () => set((s) => ({ isAgentOpen: !s.isAgentOpen })),
  setAgentOpen: (open) => set({ isAgentOpen: open }),

  sendAgentMessage: (text) => {
    if (!text.trim()) return;

    const userMsg: AgentMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    set((s) => ({
      agentMessages: [...s.agentMessages, userMsg],
      agentState: 'ANALYZING',
    }));

    setTimeout(() => {
      set({ agentState: 'RESPONDING' });
      const resp = getAgentResponse(text);

      setTimeout(() => {
        const agentMsg: AgentMessage = {
          id: String(Date.now() + 1),
          sender: 'agent',
          text: resp.text,
          action: resp.action,
          timestamp: Date.now(),
        };

        set((s) => ({
          agentMessages: [...s.agentMessages, agentMsg],
          agentState: resp.action ? 'EXECUTING' : 'IDLE',
        }));

        if (resp.action) {
          setTimeout(() => {
            const { openFile, setObservabilityOpen } = get();
            switch (resp.action) {
              case 'open_about':
                openFile('/src/about/AboutDeveloper.java', 'AboutDeveloper.java', 'coffee', 'java');
                break;
              case 'open_java':
                openFile('/src/skills/JavaStack.java', 'JavaStack.java', 'coffee', 'java');
                break;
              case 'open_spring':
                openFile('/src/skills/SpringBoot.java', 'SpringBoot.java', 'leaf', 'java');
                break;
              case 'open_skills':
                openFile('/src/skills/JavaStack.java', 'JavaStack.java', 'coffee', 'java');
                break;
              case 'open_projects':
                openFile('/src/projects/InventoryMedicalPOS.java', 'InventoryMedicalPOS.java', 'coffee', 'java');
                break;
              case 'open_experience':
                openFile('/src/experience/Experience.java', 'Experience.java', 'git-commit-horizontal', 'java');
                break;
              case 'open_architecture':
                openFile('/architecture/microservices.arch', 'microservices.arch', 'network', 'architecture');
                break;
              case 'open_contact':
                openFile('/src/contact/Contact.java', 'Contact.java', 'mail', 'java');
                break;
              case 'open_resume':
                openFile('/README.md', 'README.md', 'file-text', 'markdown');
                break;
              case 'system_status':
                setObservabilityOpen(true);
                break;
            }
            set({ agentState: 'IDLE' });
          }, 400);
        }
      }, 300);
    }, 300);
  },

  // Command Palette
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  toggleCommandPalette: () => set((s) => ({ isCommandPaletteOpen: !s.isCommandPaletteOpen })),

  // Observability & JVM
  isObservabilityOpen: false,
  setObservabilityOpen: (open) => set({ isObservabilityOpen: open }),
  toggleObservability: () => set((s) => ({ isObservabilityOpen: !s.isObservabilityOpen })),

  isJvmPanelOpen: false,
  toggleJvmPanel: () => set((s) => ({ isJvmPanelOpen: !s.isJvmPanelOpen })),

  // Mobile drawer
  isMobileDrawerOpen: false,
  setMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),
}));
