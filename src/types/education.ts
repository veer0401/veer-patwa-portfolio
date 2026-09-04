export interface EducationItem {
  startYear: number;
  endYear: number;
  institution: string;
  degree: string;
  field: string;
  cgpa?: string | number;
}

export interface EducationData {
  education: EducationItem[];
}
