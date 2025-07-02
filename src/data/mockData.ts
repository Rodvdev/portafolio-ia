import { ProfileDraft, TestResult, DiagnosticResult, PortfolioItem, DailyLog, WeeklySummary, PublicProfile } from '@/types';

export const mockProfileDraft: ProfileDraft = {
  id: "profile-1",
  userId: "user-1",
  interests: ["Finanzas", "Marketing", "Producto"],
  skillLevels: {
    "Análisis de Datos": "Intermedio",
    "Excel": "Avanzado", 
    "Marketing Digital": "Básico",
    "Gestión de Proyectos": "Intermedio",
    "Comunicación": "Avanzado"
  },
  emotionalTone: "Motivado y dispuesto a aprender",
  goals: "Conseguir mi primera oportunidad laboral en el área de finanzas corporativas y desarrollar habilidades de análisis de datos para tomar mejores decisiones de inversión."
};

export const mockTestResults: TestResult[] = [
  {
    id: "test-1",
    profileId: "profile-1",
    area: "Finanzas",
    score: 78,
    strengths: ["Análisis de flujo de caja", "Interpretación de estados financieros", "Cálculo de ratios financieros"],
    improvementAreas: ["Modelado financiero avanzado", "Análisis de riesgo", "Valuación de empresas"]
  },
  {
    id: "test-2", 
    profileId: "profile-1",
    area: "Marketing",
    score: 65,
    strengths: ["Segmentación de mercado", "Análisis de competencia"],
    improvementAreas: ["Marketing digital", "Métricas de ROI", "Automatización de marketing"]
  },
  {
    id: "test-3",
    profileId: "profile-1", 
    area: "Soft Skills",
    score: 85,
    strengths: ["Comunicación efectiva", "Trabajo en equipo", "Resolución de problemas"],
    improvementAreas: ["Liderazgo", "Negociación", "Presentaciones ejecutivas"]
  }
];

export const mockDiagnosticResult: DiagnosticResult = {
  profileId: "profile-1",
  testResults: mockTestResults,
  recommendedPaths: [
    "Especialización en Análisis Financiero",
    "Desarrollo de habilidades en Marketing Digital",
    "Certificación en Gestión de Proyectos"
  ]
};

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-1",
    profileId: "profile-1",
    title: "Análisis Financiero - Startup TechFlow",
    description: "Desarrollé un modelo financiero completo para una startup tecnológica, incluyendo proyecciones de flujo de caja, análisis de punto de equilibrio y escenarios de crecimiento. Utilicé Excel avanzado con funciones de sensibilidad y simulación Monte Carlo.",
    category: "Finanzas",
    level: "Intermedio",
    feedback: "Excelente capacidad para estructurar modelos financieros complejos. Demostró comprensión sólida de métricas clave para startups como CAC, LTV y burn rate. Recomiendo profundizar en valuación de empresas tecnológicas.",
    badgeUrl: "/badges/financial-analyst.svg"
  },
  {
    id: "portfolio-2", 
    profileId: "profile-1",
    title: "Campaña Digital - Lanzamiento App Fitness",
    description: "Diseñé y ejecuté una campaña de marketing digital completa para el lanzamiento de una app de fitness. Incluí estrategia de contenido, segmentación de audiencias, métricas de conversión y análisis de ROI en Facebook Ads y Google Ads.",
    category: "Marketing",
    level: "Básico",
    feedback: "Buen entendimiento de los fundamentos del marketing digital. La segmentación fue efectiva y las métricas bien definidas. Para mejorar: optimización avanzada de campañas y marketing automation.",
    badgeUrl: "/badges/digital-marketer.svg"
  },
  {
    id: "portfolio-3",
    profileId: "profile-1", 
    title: "Investigación de Mercado - E-commerce Sostenible",
    description: "Realicé una investigación exhaustiva sobre el mercado de productos sostenibles en e-commerce. Incluí encuestas, entrevistas, análisis de tendencias y recomendaciones estratégicas para entrada al mercado.",
    category: "Investigación",
    level: "Intermedio", 
    feedback: "Metodología de investigación sólida y insights valiosos. Excelente capacidad para sintetizar información cualitativa y cuantitativa. Recomiendo profundizar en técnicas estadísticas avanzadas.",
    badgeUrl: "/badges/market-researcher.svg"
  }
];

export const mockDailyLogs: DailyLog[] = [
  {
    id: "log-1",
    profileId: "profile-1",
    date: "2024-01-15",
    mood: "Motivado",
    reflection: "Hoy completé el reto de análisis financiero. Me siento más confiado en mi capacidad para crear modelos en Excel. Aprendí sobre la importancia de validar supuestos en las proyecciones.",
    actionsSuggested: [
      "Practicar más con funciones avanzadas de Excel",
      "Revisar casos de estudio de empresas reales", 
      "Conectar con profesionales del sector financiero en LinkedIn"
    ]
  },
  {
    id: "log-2",
    profileId: "profile-1", 
    date: "2024-01-16",
    mood: "Desafiado",
    reflection: "El reto de marketing digital fue más complejo de lo esperado. Tuve dificultades con la optimización de campañas, pero logré entender mejor las métricas de conversión.",
    actionsSuggested: [
      "Estudiar casos de éxito en marketing digital",
      "Practicar con herramientas como Google Analytics", 
      "Tomar curso específico en Facebook Ads Manager"
    ]
  }
];

export const mockWeeklySummary: WeeklySummary = {
  profileId: "profile-1",
  weekStart: "2024-01-15",
  weekEnd: "2024-01-21", 
  insights: [
    "Completaste 3 retos prácticos esta semana",
    "Tu fortaleza principal sigue siendo el análisis financiero",
    "Has mejorado significativamente en marketing digital",
    "Mantuviste consistencia en tu diario de aprendizaje"
  ],
  badgesEarned: ["Analista Financiero", "Investigador de Mercado"],
  shareableHighlights: "🎉 Esta semana completé 3 proyectos profesionales y gané 2 nuevas certificaciones en mi camino hacia una carrera en finanzas. #DesarrolloProfesional #Finanzas"
};

export const mockPublicProfile: PublicProfile = {
  profileId: "profile-1", 
  url: "https://portafolio-ia.com/profile/maria-gonzalez",
  fullName: "María González López",
  summary: "Estudiante de Administración con especialización en finanzas corporativas. Apasionada por el análisis de datos y la toma de decisiones basada en evidencia. Busco mi primera oportunidad profesional donde pueda aplicar mis habilidades analíticas y contribuir al crecimiento empresarial.",
  portfolioItems: mockPortfolioItems,
  badges: ["Analista Financiero", "Investigador de Mercado", "Marketing Digital Básico"],
  links: {
    linkedin: "https://linkedin.com/in/maria-gonzalez-lopez",
    github: "https://github.com/maria-gonzalez"
  }
};

// Datos para diferentes steps del onboarding
export const mockOnboardingData = {
  interests: [
    "Finanzas", "Marketing", "Producto", "Contabilidad", 
    "Investigación", "Big Data", "Operaciones", "Recursos Humanos"
  ],
  skills: [
    "Excel", "PowerPoint", "Análisis de Datos", "SQL", "Python",
    "Marketing Digital", "Gestión de Proyectos", "Comunicación",
    "Liderazgo", "Negociación", "Ventas"
  ],
  emotionalTones: [
    "Motivado y entusiasta", "Ansioso pero determinado", "Confiado en mis habilidades",
    "Inseguro pero dispuesto a aprender", "Ambicioso y enfocado"
  ]
};

// Datos para challenges disponibles
export const mockChallenges = [
  {
    id: "challenge-1",
    title: "Análisis de Rentabilidad - Retail",
    description: "Analiza la rentabilidad de una cadena de retail usando datos reales de ventas",
    category: "Finanzas" as const,
    level: "Intermedio" as const,
    duration: "2-3 horas",
    skills: ["Excel", "Análisis Financiero", "KPIs"]
  },
  {
    id: "challenge-2", 
    title: "Campaña de Lanzamiento - App Mobile",
    description: "Diseña una estrategia completa de marketing para el lanzamiento de una app",
    category: "Marketing" as const,
    level: "Básico" as const,
    duration: "3-4 horas", 
    skills: ["Marketing Digital", "Segmentación", "Métricas"]
  },
  {
    id: "challenge-3",
    title: "Wireframe y Validación - E-commerce",
    description: "Crea wireframes para una plataforma e-commerce y valida con usuarios reales",
    category: "Producto" as const,
    level: "Intermedio" as const,
    duration: "4-5 horas",
    skills: ["UX/UI", "Validación", "Prototipado"]
  }
]; 