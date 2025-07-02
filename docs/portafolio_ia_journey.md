# 🧠 Plataforma IA para Estudiantes - Product Specifications (v1)

## 🎯 Propósito General

Construir un sistema modular para que estudiantes de Administración y Negocios Digitales (como en UTEC) validen sus habilidades sin necesidad de experiencia laboral previa, generando un portafolio profesional desde la práctica real.

Framework técnico: Next.js 15 + App Router, TypeScript, TailwindCSS, ShadCN, Prisma + PostgreSQL, GraphQL (Apollo).

---

## 🧍‍♂️ Usuario Principal

- Estudiantes autodidactas, egresados o recién titulados.
- Con conocimientos adquiridos en cursos, pero sin forma clara de validarlos.

---

## 📦 Módulos Principales del Journey

### 1. Onboarding & Diagnóstico Inicial

**Objetivo:** Recoger metas, intereses y habilidades base.

- Componente: `<Onboarding />`
- Flujo:
  1. Registro (email/red social)
  2. Pregunta IA: "¿Qué quieres lograr?"
  3. Cuestionario gamificado (5–7 min):
     - Intereses (Producto, Finanzas, Marketing...)
     - Habilidades blandas y técnicas
     - Nivel emocional inicial

📄 Output: `ProfileDraft` con campos:

```ts
{
  id: string;
  userId: string;
  interests: string[];
  skillLevels: Record<string, 'Básico' | 'Intermedio' | 'Avanzado'>;
  emotionalTone: string;
  goals: string;
}
```

### 2. Diagnóstico

**Objetivo:** Identificar brechas, fortalezas y rutas personalizadas.

- Componente: `<Diagnostic />`
- Pruebas:
  - Cognitivas (lógica, datos)
  - Situacionales (ética, toma de decisiones)
  - Técnicas personalizadas por área (ver más abajo)
  - Soft skills (comunicación, negociación)

📄 Output: `DiagnosticResult`

```ts
{
  profileId: string;
  testResults: TestResult[];
  recommendedPaths: string[];
}
```

### 3. Construcción del Portafolio

**Objetivo:** Validar habilidades por medio de retos prácticos.

- Componente: `<PortfolioBuilder />`
- Funcionalidad:
  - Cursos y retos tipo microproyecto (vía API o mock data)
  - Cada reto genera `PortafolioItem`
  - IA redacta "qué aprendí y cómo lo apliqué"

📄 Output: `PortfolioItem`

```ts
{
  id: string;
  profileId: string;
  title: string;
  description: string;
  category: 'Finanzas' | 'Producto' | 'Marketing' | ...
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  feedback: string;
  badgeUrl?: string;
}
```

### 4. Seguimiento Diario

**Objetivo:** Refuerzo emocional, disciplina y constancia.

- Componente: `<DailyTracker />`
- Funcionalidad:
  - Diario personal con IA (`mood`, `reflexión`)
  - Cronómetro de estudio / enfoque (opcional `ChronoEngine`)
  - Recordatorios suaves (“Hoy es un buen día para avanzar en tu ruta”)

📄 Output: `DailyLog`

```ts
{
  id: string;
  profileId: string;
  date: string;
  mood: string;
  reflection: string;
  actionsSuggested: string[];
}
```

### 5. Resumen Semanal

**Objetivo:** Revisión de progreso y motivación visual.

- Componente: `<WeeklySummary />`
- Funcionalidad:
  - Stats: retos completados, habilidades mejoradas, nuevas insignias
  - Sugerencias: seguir ruta actual o explorar nueva

📄 Output: `WeeklySummary`

```ts
{
  profileId: string;
  weekStart: string;
  weekEnd: string;
  insights: string[];
  badgesEarned: string[];
  shareableHighlights: string;
}
```

### 6. Perfil Profesional y Exportación

**Objetivo:** Mostrar talento en el mundo real.

- Componente: `<PublicProfile />`
- Funcionalidad:
  - Landing page autogenerada
  - Exportar CV en PDF
  - Botón "Aplicar con este perfil" a oportunidades reales

📄 Output: `PublicProfile`

```ts
{
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
```

---

## 🧪 Detalle: Pruebas Técnicas Personalizadas (por módulo)

| Área          | Tipo                       | Ejemplo                   |
| ------------- | -------------------------- | ------------------------- |
| Contabilidad  | Caso práctico              | Analizar flujo de caja    |
| Investigación | Diseño encuesta + análisis | Segmentación de testeo    |
| Finanzas      | Excel avanzado             | Solver y presupuesto      |
| Big Data      | SQL / Python               | Query y visualización     |
| Marketing     | Campaña + KPIs             | ROI de Ads + segmentación |
| Producto      | Wireframe + validación     | App con feedback real     |
| Operaciones   | Simulación logística       | SCM digitalizada          |

📄 Output: `TestResult`

```ts
{
  id: string;
  profileId: string;
  area: string;
  score: number;
  strengths: string[];
  improvementAreas: string[];
}
```

---

## 🧠 IA Integraciones

- Redacción automática de aprendizajes por item.
- Feedback inmediato tras pruebas.
- Adaptación de rutas.
- Notificaciones personalizadas.

---

## 🛠️ Roadmap Técnico

1. Crear esquema en Prisma para `User`, `ProfileDraft`, `DiagnosticResult`, `PortfolioItem`, `DailyLog`, `WeeklySummary`, `PublicProfile`, `TestResult`.
2. Definir GraphQL schema y resolvers por entidad.
3. Maquetar mock UI con ShadCN (Onboarding → Diagnóstico → Portfolio → Diario → Perfil).
4. Integrar sistema básico de usuarios con NextAuth.

---

## ✨ Bonus

- Gamificación:
  - Progreso por barra y niveles.
  - Ranking entre talentos destacados.
- Compartir logros en LinkedIn directo.
- Integración futura con convocatorias laborales reales.

---

> Esta especificación puede ser usada directamente para modelar la base de datos en Prisma, estructurar tipos de GraphQL y crear interfaces en Next.js + ShadCN.

