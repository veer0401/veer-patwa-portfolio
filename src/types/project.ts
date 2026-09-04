export interface ProjectItem {
  id: string;
  name: string;
  featured: boolean;
  status: string;
  type: string;
  description: string;
  technologies: string[];
  features: string[];
  links: {
    github: string;
    live: string;
  };
}

export interface ProjectsData {
  projects: ProjectItem[];
}
