export interface ProfileDraft {
  id: string;
  userId: string;
  interests: string[];
  skillLevels: Record<string, 'Básico' | 'Intermedio' | 'Avanzado'>;
  emotionalTone: string;
  goals: string;
}

export interface TestResult {
  id: string;
  profileId: string;
  area: string;
  score: number;
  strengths: string[];
  improvementAreas: string[];
}

export interface DiagnosticResult {
  profileId: string;
  testResults: TestResult[];
  recommendedPaths: string[];
}

export interface PortfolioItem {
  id: string;
  profileId?: string;
  title: string;
  description: string;
  category?: 'Finanzas' | 'Producto' | 'Marketing' | 'Contabilidad' | 'Investigación' | 'Big Data' | 'Operaciones';
  level?: 'Básico' | 'Intermedio' | 'Avanzado';
  feedback?: string;
  badgeUrl?: string;
  // Nuevos campos para habilidades blandas
  situation?: string;
  actions?: string;
  results?: string;
  reflection?: string;
  skills?: string[];
  evidenceType?: "document" | "link" | "video" | "presentation";
  evidenceUrl?: string;
  evidenceDescription?: string;
  impact?: string;
  collaboration?: string;
  challenges?: string;
  learnings?: string;
  createdAt?: string;
  score?: number;
}

export interface DailyLog {
  id: string;
  profileId: string;
  date: string;
  mood: string;
  reflection: string;
  actionsSuggested: string[];
}

export interface WeeklySummary {
  profileId: string;
  weekStart: string;
  weekEnd: string;
  insights: string[];
  badgesEarned: string[];
  shareableHighlights: string;
}

export interface PublicProfile {
  profileId: string;
  url: string;
  fullName: string;
  summary: string;
  portfolioItems: PortfolioItem[];
  badges: string[];
  links: {
    linkedin?: string;
    github?: string;
  };
}

export type SkillLevel = 'Básico' | 'Intermedio' | 'Avanzado';
export type Category = 'Finanzas' | 'Producto' | 'Marketing' | 'Contabilidad' | 'Investigación' | 'Big Data' | 'Operaciones'; 