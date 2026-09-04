export interface EducationItem {
  startYear: number;
  endYear: number;
  institution: string;
  degree: string;
  field: string;
}

export interface EducationData {
  education: EducationItem[];
}
