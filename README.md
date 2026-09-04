# Veer Patwa — Software Developer Portfolio & DEV.OS

[![Java 21](https://img.shields.io/badge/Java-21%20LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

> **A dual-layer, truthful personal developer portfolio engineered for Java & Backend Engineering.**
> Built with an **HR-First portfolio landing page** for rapid recruiter evaluation and an optional **DEV.OS interactive developer environment** for technical deep-dives.

---

## 🌟 Architecture Highlights

This repository implements a **two-tier architecture** designed to satisfy both hiring managers and technical interviewers:

```
                                  [ VISITOR LANDING ]
                                           │
                        ┌──────────────────┴──────────────────┐
                        ▼                                     ▼
             [ 1. HR-First Portfolio ]               [ 2. DEV.OS IDE Mode ]
           • 30-Second Recruiter Overview         • Desktop IDE Terminal & Explorer
           • Sticky Navigation & Dynamic Exp      • Spring 5-Layer & Modernization Arch
           • Featured Repositories & Focus        • JVM 21 Specs & Tab Context Menus
           • 100% Mobile & Desktop Responsive     • Mobile Blocker (Enforces PC Mode)
                        │                                     │
                        └──────────────────┬──────────────────┘
                                           ▼
                    [ Centralized JSON Data Store (SSOT) ]
              profile.json • experience.json • projects.json
              skills.json  • education.json  • links.json
```

### 1. Layer 1: HR-First Portfolio (Default Landing)
- **Immediate Clarity**: Communicates identity, primary specialization (Java & Backend Engineering), career status, and dynamic experience within 30 seconds.
- **Sticky Navigation Header**: Smooth-scrolling, high-contrast navbar pinned to the top of the viewport (`sticky top-0 z-50`).
- **Dynamic Experience Calculation**: Computes exact duration automatically from `careerStartDate: "2025-02-01"` without hardcoded values.
- **Engineering Competencies**: Structured visual hierarchy prioritizing Java 21, Spring Boot, Microservices, and DSA over secondary stacks.
- **Direct Communication Channels**: One-click connections for Email (`mailto:`), LinkedIn, GitHub, LeetCode, Phone, and Resume PDF.

### 2. Layer 2: DEV.OS Interactive IDE (Secondary Layer)
- **Authentic IDE Interface**: VS Code / IntelliJ-inspired environment with virtual file explorer, search, git history, and tabs.
- **Tab Bar Context Menu**: Right-click on any tab for **Close (`⌘W`)**, **Close Others**, and **Close All (`⌘K ⌘W`)** actions with empty-state fallbacks.
- **System Environment & Runtime Matrix**: Zero fake telemetry, fake percentages, or simulated traffic. Displays verified browser runtime details, client protocol, and documented Cognizant modernization benchmarks (~250K records, 250–260 MB payload <1 min).
- **Interactive CLI Terminal**: Terminal prompt supporting commands (`help`, `whoami`, `skills`, `projects`, `experience`, `architecture`, `java --version`, `system`, `exit`).
- **Dev Agent**: Client-side intent assistant answering technical questions using centralized portfolio models.
- **Mobile Blocker**: Enforces PC/Desktop mode for DEV.OS with an informative guidance screen and single-click return to the HR portfolio.

---

## 📁 Repository Structure

```text
portfolio2/
├── public/                     # Static assets (Favicon, Logo, Resume PDF)
│   ├── favicon.png             # Browser tab icon (32x32 or 64x64 PNG)
│   ├── logo.png                # Brand logo displayed across Navbar, TopBar & Footer
│   └── resume/                 # PDF resume file (veer-patwa-resume.pdf)
├── src/
│   ├── data/                   # ★ SINGLE SOURCE OF TRUTH (JSON Store)
│   │   ├── profile.json        # Name, title, status, career start date, summary
│   │   ├── experience.json     # Cognizant & BISAG-N verified experience
│   │   ├── projects.json       # Real projects (Medical POS, CRMS, Mobile App)
│   │   ├── skills.json         # Java 21, Spring Boot, categorized competencies
│   │   ├── education.json      # University degree & timeline
│   │   ├── links.json          # Social links, resume path, contact info
│   │   ├── architecture.json   # Modernization & Spring Boot layered flow
│   │   └── site.json           # Site metadata & navigation
│   ├── types/                  # TypeScript data models and interfaces
│   ├── utils/                  # Dynamic date & experience calculation utilities
│   ├── store/                  # Zustand state management (IDE layout, tabs, terminal)
│   └── components/
│       ├── portfolio/          # HR-First landing page sections (Navbar, Hero, etc.)
│       ├── editor/             # DEV.OS file views, TabBar with context menu
│       ├── sidebar/            # File explorer, search, git commits panel
│       ├── panels/             # System Matrix & JVM 21 Runtime panel
│       ├── terminal/           # Integrated interactive terminal
│       ├── agent/              # Dev Agent conversational AI widget
│       └── common/             # Shared SVGs, Mobile Blocker, Command Palette
├── index.html                  # HTML5 entry with SEO tags, favicon, and fonts
├── vite.config.ts              # Vite configuration
└── package.json                # Project scripts and dependencies
```

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Core Framework** | [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Build & Tooling** | [Vite 6](https://vitejs.dev/) + [OxLint](https://oxc.rs/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Styling & Icons** | [TailwindCSS 4](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Target Specialization** | **Java 21 LTS**, **Spring Boot 3**, **Microservices**, **MySQL**, **Docker** |

---

## ⚙️ How to Customize Your Portfolio

All personal data, skills, and projects are centralized in `src/data/`. **You do not need to modify UI code to update your portfolio:**

1. **Update Personal Info**: Edit [`src/data/profile.json`](file:///d:/project/anti-gravity-projects/portfolio2/src/data/profile.json) (name, title, status, career start date).
2. **Add / Update Projects**: Edit [`src/data/projects.json`](file:///d:/project/anti-gravity-projects/portfolio2/src/data/projects.json).
3. **Update Work History**: Edit [`src/data/experience.json`](file:///d:/project/anti-gravity-projects/portfolio2/src/data/experience.json).
4. **Update Skills**: Edit [`src/data/skills.json`](file:///d:/project/anti-gravity-projects/portfolio2/src/data/skills.json).
5. **Change Contact Links**: Edit [`src/data/links.json`](file:///d:/project/anti-gravity-projects/portfolio2/src/data/links.json). Any blank field is automatically hidden from the UI.
6. **Add Favicon & Logo**: Place your PNG files directly into the `public/` directory:
   - Favicon: `public/favicon.png`
   - Brand Logo: `public/logo.png`
7. **Add Resume PDF**: Place your resume file into the `public/resume/` directory:
   - Resume: `public/resume/veer-patwa-resume.pdf`
   *(Or adjust the path in `src/data/links.json` if using a custom file name).*

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/veer-patwa-portfolio.git

# Navigate into the project folder
cd veer-patwa-portfolio

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Linting
```bash
# Type-check and build production bundle
npm run build

# Run OxLint linter
npm run lint
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to star ⭐ the repository if you found it useful!
