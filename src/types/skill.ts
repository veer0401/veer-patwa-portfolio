export interface EngineeringFocusArea {
  title: string;
  description: string;
}

export interface SkillCategories {
  java: string[];
  spring: string[];
  backend: string[];
  database: string[];
  devops: string[];
  frontend: string[];
  other: string[];
}

export interface SkillsData {
  primary: string[];
  categories: SkillCategories;
  focusAreas: EngineeringFocusArea[];
}
