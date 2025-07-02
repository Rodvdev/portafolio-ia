# 🧠 Plataforma IA para Estudiantes - Mock App

Una aplicación demo completa que implementa el sistema modular para que estudiantes de Administración y Negocios Digitales validen sus habilidades sin experiencia laboral previa, generando un portafolio profesional desde la práctica real.

## 🎯 Demo en Vivo

La aplicación está corriendo en desarrollo. Para verla:

```bash
npm run dev
```

Luego visita `http://localhost:3000`

## 🚀 Características Implementadas

### ✅ Módulos Principales

- **🏠 Dashboard Principal**: Overview con progreso y navegación
- **👋 Onboarding**: Flujo gamificado de 4 pasos con captura de intereses, habilidades y metas
- **🧪 Diagnóstico**: Sistema de evaluación con 3 tests personalizados y resultados detallados
- **💼 Constructor de Portafolio**: Retos prácticos con feedback IA y gestión de proyectos
- **📔 Diario Diario**: Reflexiones personales, tracking de mood y cronómetro Pomodoro
- **📊 Resumen Semanal**: Analytics de progreso con insights y recomendaciones
- **👤 Perfil Profesional**: Landing page autogenerada con exportación y compartir

### 🛠️ Stack Técnico

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS + CSS Variables
- **Componentes**: ShadCN UI Components
- **Datos**: Mock data estático (sin backend)
- **Iconos**: Emojis nativos + Lucide React
- **Utilidades**: date-fns, clsx, tailwind-merge

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (ia)/                    # Grupo de rutas principales
│   │   ├── onboarding/         # Configuración inicial
│   │   ├── diagnostic/         # Evaluaciones
│   │   ├── portfolio/          # Constructor de proyectos
│   │   ├── daily/              # Seguimiento diario
│   │   ├── weekly/             # Resumen semanal
│   │   └── profile/            # Perfil profesional
│   ├── globals.css             # Estilos globales + variables CSS
│   ├── layout.tsx              # Layout principal
│   └── page.tsx                # Dashboard inicial
├── components/
│   ├── layout/
│   │   └── Navigation.tsx      # Navegación lateral
│   └── ui/                     # Componentes ShadCN
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── progress.tsx
│       └── ...
├── data/
│   └── mockData.ts             # Todos los datos simulados
├── types/
│   └── index.ts                # Definiciones TypeScript
└── utilities/
    └── ui.ts                   # Helpers de ShadCN
```

## 🎮 Flujo de Usuario

### 1. **Dashboard Principal** (`/`)
- Overview del progreso actual
- Navegación rápida a todos los módulos
- Estadísticas visuales del journey

### 2. **Onboarding** (`/onboarding`)
- **Paso 1**: Información personal y metas
- **Paso 2**: Selección de intereses (Finanzas, Marketing, etc.)
- **Paso 3**: Autoevaluación de habilidades (Básico/Intermedio/Avanzado)
- **Paso 4**: Estado emocional y motivación

### 3. **Diagnóstico** (`/diagnostic`)
- **Test Finanzas**: Preguntas sobre análisis financiero
- **Test Marketing**: Estrategias digitales y métricas
- **Test Soft Skills**: Comunicación y liderazgo
- **Resultados**: Scores, fortalezas, áreas de mejora y rutas recomendadas

### 4. **Portafolio** (`/portfolio`)
- **Vista Retos**: Grid de challenges disponibles por categoría
- **Vista Detalle**: Instrucciones, entregables y progreso
- **Vista Portafolio**: Proyectos completados con feedback IA

### 5. **Diario Diario** (`/daily`)
- Selector de mood visual
- Área de reflexión con preguntas guía
- Cronómetro Pomodoro integrado
- Historial de entradas anteriores

### 6. **Resumen Semanal** (`/weekly`)
- Métricas de progreso
- Badges obtenidas
- Insights automáticos de IA
- Comparación con semanas anteriores
- Post sugerido para LinkedIn

### 7. **Perfil Profesional** (`/profile`)
- Landing page completa estilo CV
- Showcasing de proyectos y certificaciones
- Enlaces a redes sociales
- CTA para reclutadores

## 📊 Tipos de Datos

La aplicación utiliza interfaces TypeScript bien definidas:

```typescript
interface ProfileDraft {
  id: string;
  userId: string;
  interests: string[];
  skillLevels: Record<string, 'Básico' | 'Intermedio' | 'Avanzado'>;
  emotionalTone: string;
  goals: string;
}

interface PortfolioItem {
  id: string;
  profileId: string;
  title: string;
  description: string;
  category: 'Finanzas' | 'Producto' | 'Marketing' | ...;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  feedback: string;
  badgeUrl?: string;
}

// Y muchas más...
```

## 🎨 Diseño y UX

### Principios de Diseño
- **Gamificación**: Progress bars, badges, achievements
- **Colores Semánticos**: Verde (logros), Azul (información), Naranja (advertencias)
- **Navegación Intuitiva**: Sidebar fijo con iconos descriptivos
- **Responsive**: Funciona en desktop, tablet y móvil
- **Micro-interacciones**: Hover effects, transitions suaves

### Componentes Clave
- Cards con hover effects
- Progress indicators
- Badge system
- Interactive buttons
- Form inputs con validación visual

## 🔄 Datos Mock

Toda la información está simulada pero es realista:

- **Usuario ejemplo**: María González López
- **3 proyectos completos** con feedback detallado
- **Múltiples test results** con scores reales
- **Historial de reflexiones** diarias
- **Métricas de progreso** semanales

## 🚀 Próximos Pasos (Roadmap)

### Fase 1: Backend Real
- [ ] Integrar Prisma + PostgreSQL
- [ ] Crear API Routes en Next.js
- [ ] Sistema de autenticación con NextAuth
- [ ] GraphQL con Apollo

### Fase 2: IA Integración
- [ ] OpenAI para feedback automático
- [ ] Análisis de texto en reflexiones
- [ ] Recomendaciones personalizadas
- [ ] Generación automática de contenido

### Fase 3: Funcionalidades Avanzadas
- [ ] Exportación real a PDF
- [ ] Integración con LinkedIn API
- [ ] Sistema de notificaciones
- [ ] Analytics avanzados

### Fase 4: Escalabilidad
- [ ] Multi-tenancy para universidades
- [ ] Dashboard para educadores
- [ ] Integración con LMS
- [ ] APIs para third-party

## 💻 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Build
npm run build        # Build para producción
npm run start        # Servidor de producción

# Linting
npm run lint         # Verificar código
```

## 🎯 Para Desarrolladores

### Agregar Nueva Página
1. Crear en `src/app/(ia)/nueva-pagina/page.tsx`
2. Agregar ruta en `Navigation.tsx`
3. Crear datos mock en `mockData.ts`
4. Definir tipos en `types/index.ts`

### Agregar Componente ShadCN
1. Crear en `src/components/ui/`
2. Usar patrón de forwardRef
3. Aplicar clases con `cn()` utility
4. Exportar desde index si necesario

### Modificar Tema
- Editar variables CSS en `globals.css`
- Colores están en formato HSL
- Dark mode automático basado en preferencias

## 📝 Notas de Implementación

- **Estado local**: Cada página maneja su propio estado con `useState`
- **Navegación**: Client-side routing con Next.js App Router
- **Styling**: Utility-first con Tailwind + componentes reutilizables
- **Responsivo**: Mobile-first approach con breakpoints estándar
- **Performance**: Componentes optimizados, lazy loading donde corresponde

---

**🎉 La aplicación está lista para demostrar el concepto completo de la Plataforma IA para Estudiantes!**

Desarrollado con ❤️ usando Next.js 15 + TypeScript + TailwindCSS + ShadCN
