# 🧠 Plataforma IA para Estudiantes - Product Specifications (v2: Soft Skills Focus)

## 🎯 Propósito General

Crear una plataforma modular para que estudiantes de Administración y Negocios Digitales (como en UTEC) validen sus **habilidades blandas** a través de retos y casos interactivos, generando un portafolio profesional con evidencia concreta de sus fortalezas humanas.

Framework técnico: Next.js 15 + App Router, TypeScript, TailwindCSS + ShadCN (UI mejorado), Prisma + PostgreSQL, GraphQL (Apollo).

---

## 🧍‍♂️ Usuario Principal

- Estudiantes autodidactas o recién egresados sin experiencia laboral.
- Con potencial humano, pero sin forma clara de demostrarlo en entornos profesionales.

---

## 🏠 Módulos Principales del Journey

### 1. Onboarding & Perfil Inicial

- **Componente:** `<Onboarding />`
- Registro simplificado + IA: "¿Qué te gustaría lograr con tu crecimiento personal y profesional?"
- Cuestionario de intereses + autoevaluación de habilidades blandas.

📄 `ProfileDraft`
```ts
{
  id: string;
  userId: string;
  softSkillsInterest: string[];
  confidenceLevels: Record<string, 'Bajo' | 'Medio' | 'Alto'>;
  goals: string;
  tone: string;
}
```

---

### 2. Evaluación de Habilidades Blandas

**Objetivo:** Diagnosticar habilidades mediante **retos tipo caso**.

- **Componente:** `<SoftSkillsTest />`
- Cada caso activa una situación real:
  - Ej: Resolución de conflicto, Negociación, Manejo de emociones, Trabajo bajo presión
- UI inspirada en storytelling interactivo (tipo Notion + Typeform + juego serio).
- Formato: Mini historia + opciones + justificación escrita.
- IA da retroalimentación y puntaje.

📄 `SoftSkillResult`
```ts
{
  id: string;
  profileId: string;
  caseId: string;
  skillEvaluated: string;
  score: number;
  explanation: string;
  aiFeedback: string;
}
```

---

### 3. Portafolio de Habilidades Humanas

- **Componente:** `<HumanPortfolio />`
- Por cada caso aprobado, se genera una tarjeta tipo logro:
  - "Manejé un conflicto simulando un equipo de trabajo remoto"
  - Incluye badge visual, feedback de IA y nivel alcanzado.

📄 `PortfolioItem`
```ts
{
  id: string;
  profileId: string;
  title: string;
  skill: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  summary: string;
  badgeUrl?: string;
}
```

---

### 4. Tracker Diario (opcional)

- **Componente:** `<DailyFlow />`
- Registro emocional, reflexión guiada y sugerencias para mejorar interacción humana.

📄 `DailyLog`
```ts
{
  id: string;
  profileId: string;
  date: string;
  mood: string;
  insight: string;
  suggestedMicroHabits: string[];
}
```

---

### 5. Resumen Semanal Visual

- **Componente:** `<SoftSkillSummary />`
- Tarjetas interactivas de progreso, badges ganados y sugerencias de mejora.

📄 `WeeklySummary`
```ts
{
  profileId: string;
  weekStart: string;
  insights: string[];
  badges: string[];
}
```

---

### 6. Perfil Compartible

- **Componente:** `<SoftSkillProfile />`
- Mini landing generada automáticamente con badges, logros, reflexiones.
- Exportable en PDF y compartible tipo "mi esencia profesional".

📄 `PublicProfile`
```ts
{
  profileId: string;
  fullName: string;
  summary: string;
  skills: string[];
  portfolioItems: PortfolioItem[];
  badges: string[];
  links: { linkedin?: string; github?: string; };
}
```

---

## 🚀 Mejora de UI con ShadCN

- Card UI por habilidad con colores suaves + iconos personalizados.
- Badges animados por nivel alcanzado (SVG o Lottie).
- Visuales modulares con avatar del usuario, progresión y mensajes inspiradores tipo "coach digital".

---

## 🧪 Roadmap Técnico

1. Implementar esquema Prisma con modelos centrados en `ProfileDraft`, `SoftSkillResult`, `PortfolioItem`, `PublicProfile`.
2. Crear GraphQL Schema modular por cada entidad.
3. Diseñar UI con sistema de tarjetas (ShadCN Cards, Accordion para preguntas, AlertDialog para feedback).
4. Implementar flujo completo con mock data (foco en UX pulido).

---

## ✨ Bonus Experiencial

- Coach virtual con frases motivadoras al completar casos.
- Visualización de mapa emocional: "¡Estás desarrollando tu inteligencia emocional!"
- Módulo futuro: comparativa entre estudiantes, mapas de energía humana por perfil.

---

> Esta versión está optimizada para enfocarse en el desarrollo consciente de habilidades blandas, con visuales amigables, microinteracciones y diseño centrado en el humano. Listo para prototipar o testear MVP.