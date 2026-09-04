export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ExperienceData {
  experiences: ExperienceItem[];
}
