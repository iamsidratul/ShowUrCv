
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
}

export type TemplateType = 
  | 'neo-brutalist' 
  | 'soft-pastel' 
  | 'dark-tech' 
  | 'magazine' 
  | 'minimal-pro'
  | 'vibrant-sidebar'
  | 'gradient-header'
  | 'classic-clean';

export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  grammarCheck: string;
  coachAdvice: string;
}
