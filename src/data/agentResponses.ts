import type { AgentResponse, Intent } from '../types';
import profileData from './profile.json';
import experienceData from './experience.json';
import projectsData from './projects.json';
import skillsData from './skills.json';
import linksData from './links.json';
import architectureData from './architecture.json';
import { calculateExperience } from '../utils/experience';

// Intent keyword mappings
const intentKeywords: Record<Intent, string[]> = {
  about: ['about', 'who', 'introduce', 'yourself', 'tell me', 'developer', 'person', 'background', 'bio', 'veer', 'patwa'],
  java: ['java', 'jvm', 'jdk', 'core java', 'collections', 'streams', 'concurrency', 'oop', 'solid'],
  spring: ['spring', 'spring boot', 'security', 'jpa', 'hibernate', 'rest api', 'mvc'],
  skills: ['skills', 'technologies', 'tech stack', 'tools', 'expertise', 'know', 'proficient', 'stack', 'dsa'],
  projects: ['project', 'work', 'built', 'portfolio', 'strongest', 'best', 'showcase', 'application', 'inventory', 'pos'],
  experience: ['experience', 'career', 'job', 'role', 'company', 'worked', 'history', 'years', 'cognizant', 'bisag'],
  architecture: ['architecture', 'system design', 'microservice', 'distributed', 'design', 'modernization', 'rmi', 'scale'],
  contact: ['contact', 'reach', 'email', 'hire', 'connect', 'talk', 'message', 'get in touch', 'phone'],
  github: ['github', 'repo', 'repository', 'code', 'source', 'git'],
  resume: ['resume', 'cv', 'download', 'pdf'],
  system: ['system', 'status', 'runtime', 'health', 'server', 'online'],
  database: ['database', 'db', 'sql', 'mysql'],
  unknown: [],
};

export function getAgentResponse(input: string): AgentResponse {
  const normalized = input.toLowerCase().trim();
  const expDuration = calculateExperience(profileData.careerStartDate);
  const featuredProject = projectsData.projects.find((p) => p.featured) || projectsData.projects[0];

  if (normalized.includes('strongest') || normalized.includes('best project') || normalized.includes('featured')) {
    return {
      text: `The featured project is **${featuredProject.name}**.\n\nDescription: ${featuredProject.description}\nType: ${featuredProject.type} (${featuredProject.status})\nTechnologies: ${featuredProject.technologies.join(', ')}\n\nOpening project workspace: InventoryMedicalPOS.java...`,
      action: 'open_projects',
    };
  }

  // Check intent score
  let bestIntent: Intent = 'unknown';
  let bestScore = 0;

  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (intent === 'unknown') continue;
    for (const keyword of keywords) {
      if (normalized.includes(keyword)) {
        const score = keyword.length;
        if (score > bestScore) {
          bestScore = score;
          bestIntent = intent as Intent;
        }
      }
    }
  }

  switch (bestIntent) {
    case 'about':
      return {
        text: `**${profileData.name}** — ${profileData.title}\nSpecialization: ${profileData.specialization}\nExperience: ${expDuration.formatted}\nSummary: ${profileData.summary}\nStatus: ${profileData.status}\n\nOpening AboutDeveloper.java...`,
        action: 'open_about',
      };

    case 'java':
      return {
        text: `Java Expertise (Java 21):\n• OOP, Collections, Streams, Concurrency\n• JVM Fundamentals & SOLID Principles\n• Clean code and low-level design patterns.\n\nOpening JavaStack.java...`,
        action: 'open_java',
      };

    case 'spring':
      return {
        text: `Spring Stack:\n• ${skillsData.categories.spring.join('\n• ')}\n\nFocusing on clean microservices, robust REST APIs, and database persistence.\n\nOpening SpringBoot.java...`,
        action: 'open_spring',
      };

    case 'skills':
      return {
        text: `Primary Engineering Stack:\n• ${skillsData.primary.join('\n• ')}\n\nCore Focus: Java & Backend Engineering.\n\nOpening JavaStack.java...`,
        action: 'open_skills',
      };

    case 'projects':
      return {
        text: `Projects in portfolio:\n1. ${projectsData.projects[0]?.name} (Featured - ${projectsData.projects[0]?.status})\n2. ${projectsData.projects[1]?.name}\n3. ${projectsData.projects[2]?.name}\n\nOpening project workspace: InventoryMedicalPOS.java...`,
        action: 'open_projects',
      };

    case 'experience':
      return {
        text: `Career Experience:\n• **${experienceData.experiences[0]?.company}** (${experienceData.experiences[0]?.role}): ${experienceData.experiences[0]?.description}\n• **${experienceData.experiences[1]?.company}** (${experienceData.experiences[1]?.role}): ${experienceData.experiences[1]?.description}\n\nTotal Experience: ${expDuration.formatted}\n\nOpening Experience.java...`,
        action: 'open_experience',
      };

    case 'architecture':
      return {
        text: `Architecture Focus: Modernization from legacy RMI to Microservices.\nHigh-volume data retrieval: ${architectureData.modernization.scaleMetric.records} (${architectureData.modernization.scaleMetric.payload}) in ${architectureData.modernization.scaleMetric.latency}.\n\nOpening microservices.arch...`,
        action: 'open_architecture',
      };

    case 'contact':
    case 'github':
      return {
        text: `Contact & Coordinates:\n• Status: ${profileData.status}\n• Resume: ${linksData.resume || 'Available'}\n${linksData.email ? `• Email: ${linksData.email}\n` : ''}${linksData.linkedin ? `• LinkedIn: ${linksData.linkedin}\n` : ''}${linksData.github ? `• GitHub: ${linksData.github}\n` : ''}\nOpening Contact.java...`,
        action: 'open_contact',
      };

    case 'resume':
      return {
        text: `Resume is configured at: ${linksData.resume || 'resume.pdf'}\n\nOpening README.md / Resume...`,
        action: 'open_resume',
      };

    case 'database':
      return {
        text: `Database Stack:\n• ${skillsData.categories.database.join(', ')}\n• Spring Data JPA & Hibernate integration\n• Relational data modeling & query handling.`,
        action: 'open_skills',
      };

    case 'system':
      return {
        text: `DEV.OS Runtime Status:\n• Java: OpenJDK 21 LTS\n• Architecture: Microservices modernization\n• Data Source: Single Source of Truth JSON\n• Status: ONLINE`,
        action: 'system_status',
      };

    default:
      return {
        text: `I am DEV AGENT, powered by Veer Patwa's portfolio data.\n\nYou can ask:\n• "Show me his strongest project"\n• "Show me Java skills"\n• "Show me his experience"\n• "Show me architecture"\n• "Show me his resume"`,
      };
  }
}

export const suggestedQuestions = [
  "Show me his strongest project",
  "Show me Java skills",
  "Show me his experience",
  "Show me architecture",
  "Show me his resume",
  "How can I contact Veer?",
];
