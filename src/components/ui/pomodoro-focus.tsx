"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Square, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { useFocusStats } from '@/hooks/useFocusStats';

// Tipos de datos
interface ThemeConfig {
  name: string;
  emoji: string;
  color: string;
  bgGradient: string;
  mantras: string[];
  description: string;
}

interface FocusSession {
  id: string;
  purpose: string;
  theme: string;
  duration: number;
  completedAt: string;
  mantrasShown: number;
}

// Configuración de temas
const THEMES: Record<string, ThemeConfig> = {
  espiritual: {
    name: "Espiritual",
    emoji: "🕉️",
    color: "text-purple-200",
    bgGradient: "from-purple-900 via-indigo-900 to-purple-900",
    description: "Conversación íntima con tu Yo Superior",
    mantras: [
      "Hola, querido. Respira conmigo. Estás aquí, en casa.",
      "Tu Yo Superior sonríe. Sabe que estás listo para esto.",
      "No eres tú quien hace. Es Dios actuando a través de ti.",
      "Entrégate. Deja que tu esencia tome el control ahora.",
      "Este momento es sagrado. Tu presencia lo bendice.",
      "Eres el canal. Deja que la sabiduría fluya sin resistencia.",
      "Tu alma reconoce este trabajo como una oración.",
      "Confía. El universo conspira a tu favor en este instante.",
      "Eres más grande que tus miedos. Eres infinito amor.",
      "La quietud habla. Escucha lo que ya sabes.",
      "Tu corazón es brújula. Te guía hacia lo que sirve.",
      "Cada acción consciente es un acto de adoración.",
      "Estás conectado con todo. Nunca estás solo.",
      "La gratitud abre el canal. Agradece y recibe.",
      "Tu propósito es claro. Tu alma sabe el siguiente paso."
    ]
  },
  guerrero: {
    name: "Guerrero",
    emoji: "⚔️",
    color: "text-red-200",
    bgGradient: "from-red-900 via-orange-900 to-red-900",
    description: "Tu fuerza interior despierta",
    mantras: [
      "Guerrero, tu disciplina es tu devoción. Honra tu compromiso.",
      "Sientes resistencia? Perfecto. Es el músculo del alma fortaleciéndose.",
      "Tu voluntad no es ego. Es amor a lo que estás construyendo.",
      "Cada 'no puedo' es una invitación a demostrar quién eres.",
      "Adaptarse no es rendirse. Es sabiduría en acción.",
      "El dolor forja. El orgullo celebra. Ambos son temporales.",
      "Hay una fuerza en ti que no conoce límites. Confía.",
      "La batalla real siempre es contigo mismo. Y ya estás ganando.",
      "Tus miedos son mentores disfrazados. Escúchalos y avanza.",
      "Tu determinación viene del alma. Nadie puede tocarla.",
      "Cada amanecer es tu oportunidad de ser quien eliges ser.",
      "La excelencia no es destino. Es el camino que eliges caminar.",
      "Tu potencial no tiene techo. Solo tiene profundidad.",
      "Los hábitos son oraciones repetidas. ¿A qué le rezas?",
      "Eres el arquitecto, el constructor y la obra maestra."
    ]
  },
  liviano: {
    name: "Liviano",
    emoji: "🕊️",
    color: "text-blue-200",
    bgGradient: "from-blue-900 via-cyan-900 to-blue-900",
    description: "Fluidez natural de ser",
    mantras: [
      "Amor, todo pasa. Respira y deja que fluya.",
      "Eres como el aire: libre, esencial, sin esfuerzo.",
      "No cargues lo que no es tuyo. Suelta con amor.",
      "Las cosas son perfectas tal como son. Confía.",
      "Tu naturaleza es la ligereza. Recuérdalo siempre.",
      "Fluye como el agua: siempre hacia donde debes estar.",
      "Aferrarse es sufrimiento. Soltar es liberación.",
      "En la simplicidad encuentras lo que realmente importa.",
      "No necesitas ser más. Eres suficiente ahora.",
      "El presente es tu único hogar. Habítalo plenamente.",
      "El universo sabe. Tú solo acompaña su danza.",
      "La paz no está lejos. Está en la simplicidad de ahora.",
      "Eres ligero porque eres luz. Brilla sin esfuerzo.",
      "Todo está perfecto. Tu resistencia es innecesaria.",
      "Respira y suelta. Ese es todo el secreto."
    ]
  },
  motivacional: {
    name: "Motivacional",
    emoji: "🚀",
    color: "text-yellow-200",
    bgGradient: "from-yellow-900 via-orange-900 to-yellow-900",
    description: "Tu fuerza interior se activa",
    mantras: [
      "Champion, hazlo ahora. Tu futuro te mira con expectativa.",
      "Cada segundo que vives es una oportunidad dorada.",
      "Eres el artista de tu realidad. Pinta con acción.",
      "La acción imperfecta supera la perfección inmóvil.",
      "Tu momento no vendrá. Tu momento ES ahora.",
      "El progreso es la única perfección que importa.",
      "Cada paso, por pequeño que sea, te transforma.",
      "Grandes cosas viven en ti esperando manifestarse.",
      "La consistencia es tu superpoder secreto.",
      "Tu esfuerzo de hoy es la semilla de tu mañana.",
      "Los únicos límites reales están en tu mente.",
      "Eres más fuerte que cualquier excusa que inventes.",
      "La motivación nace cuando actúas, no al revés.",
      "Cada amanecer es el universo dándote otra oportunidad.",
      "Tu potencial no tiene límites. Solo profundidad."
    ]
  },
  alegria: {
    name: "Alegría",
    emoji: "✨",
    color: "text-pink-200",
    bgGradient: "from-pink-900 via-rose-900 to-pink-900",
    description: "Tu luz natural brilla",
    mantras: [
      "Hermoso, la vida es un juego divino. Juega con amor.",
      "Sonríe, respira, siente. La alegría fluye a través de ti.",
      "Tu energía es contagiosa. Comparte tu luz libremente.",
      "La alegría no es un destino. Es tu forma de viajar.",
      "Celebra todo: cada respiración es una victoria.",
      "Eres una fuente de luz que no necesita permiso para brillar.",
      "La felicidad no está mañana. Está en este instante.",
      "Agradece. La gratitud multiplica lo que ya tienes.",
      "Tu sonrisa es medicina para un mundo que necesita sanar.",
      "La positividad no es ingenuidad. Es sabiduría profunda.",
      "Mereces alegría no porque la hayas ganado, sino porque eres.",
      "Cada día es un regalo. No olvides desenvolverlo.",
      "Tu risa es oración, es música, es libertad.",
      "Cuando sonríes, el universo entero se alegra contigo.",
      "La alegría no es tu superpoder. Es tu naturaleza."
    ]
  },
  creatividad: {
    name: "Creatividad",
    emoji: "🎨",
    color: "text-green-200",
    bgGradient: "from-green-900 via-emerald-900 to-green-900",
    description: "Tu fuente creativa despierta",
    mantras: [
      "Creador, tu imaginación es el playground del universo.",
      "Cada idea que tienes es un regalo del cosmos. Recíbela.",
      "No creas desde el miedo. Crea desde el asombro.",
      "Tu creatividad no es tuya. Eres su canal, su voz.",
      "Los errores son invitaciones. La perfección es prisión.",
      "Tu voz única es necesaria. El mundo la espera.",
      "La inspiración no llega. Tú te alineas con ella.",
      "Confía en el proceso. Tu alma sabe qué crear.",
      "Cada trazo, cada palabra, cada nota es una oración.",
      "Eres coautor con lo divino. Colabora, no controles.",
      "La originalidad nace de la autenticidad. Sé tú.",
      "Tu curiosidad es sagrada. Síguéla sin preguntas.",
      "Crea no para impresionar. Crea para expresar.",
      "El arte es amor hecho visible. Ama a través de tu obra.",
      "Tu creatividad sana al mundo. Créalo todo."
    ]
  }
};

// Detección automática de temas
const detectTheme = (text: string): string => {
  const themeKeywords: Record<string, string[]> = {
    espiritual: ['meditar', 'yoga', 'paz', 'espiritual', 'zen', 'mindfulness', 'respirar', 'quietud', 'silencio', 'conexión'],
    guerrero: ['entrenar', 'ejercicio', 'disciplina', 'fuerza', 'batalla', 'luchar', 'resistir', 'perseverar', 'determinación'],
    motivacional: ['trabajo', 'proyecto', 'meta', 'objetivo', 'lograr', 'éxito', 'progreso', 'productividad', 'resultados'],
    creatividad: ['escribir', 'pintar', 'dibujar', 'crear', 'diseñar', 'innovar', 'artístico', 'expresar', 'imaginación'],
    alegria: ['reír', 'feliz', 'alegre', 'diversión', 'jugar', 'celebrar', 'positivo', 'optimista', 'sonreír'],
    liviano: ['descansar', 'relajar', 'calma', 'tranquilo', 'suave', 'gentil', 'pacífico', 'sereno', 'equilibrio']
  };

  const lowerText = text.toLowerCase();
  for (const [theme, keywords] of Object.entries(themeKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return theme;
    }
  }
  return 'espiritual'; // default
};

// Mock data para sesiones pasadas (solo si no hay datos reales)
const getMockSessions = () => [
  {
    id: "1",
    purpose: "Meditar y encontrar claridad mental",
    theme: "espiritual",
    duration: 1500,
    completedAt: "2024-01-15T10:30:00Z",
    mantrasShown: 15
  },
  {
    id: "2",
    purpose: "Escribir el primer capítulo de mi libro",
    theme: "creatividad",
    duration: 1800,
    completedAt: "2024-01-14T14:20:00Z",
    mantrasShown: 18
  },
  {
    id: "3",
    purpose: "Entrenar para la maratón",
    theme: "guerrero",
    duration: 1200,
    completedAt: "2024-01-13T07:15:00Z",
    mantrasShown: 12
  }
];

const PomodoroFocus = () => {
  // Hook de estadísticas
  const { stats, saveSession, getRecentSessions } = useFocusStats();
  
  // Estados principales
  const [purpose, setPurpose] = useState('');
  const [theme, setTheme] = useState('espiritual');
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSacredIntro, setShowSacredIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  
  // Estados del temporizador
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  
  // Estados de las diapositivas
  const [currentSlide, setCurrentSlide] = useState(0);
  const [readingSpeed, setReadingSpeed] = useState(6); // segundos por slide
  
  // Estados del flow
  const [flowIntensity, setFlowIntensity] = useState(0); // 0-100
  const [flowPhase, setFlowPhase] = useState<'warming' | 'entering' | 'deep' | 'transcendent'>('warming');
  const [showPostReflection, setShowPostReflection] = useState(false);
  const [sessionInsights, setSessionInsights] = useState<string[]>([]);
  
  // Referencias
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuración actual
  const currentTheme = THEMES[theme];
  const mantras = currentTheme.mantras;

  // Función para calcular velocidad de lectura basada en caracteres
  const calculateSlideDuration = (text: string): number => {
    const wordsPerMinute = 200; // velocidad promedio de lectura
    const words = text.split(' ').length;
    const minutes = words / wordsPerMinute;
    return Math.max(3, Math.min(10, minutes * 60)); // entre 3 y 10 segundos
  };

  // Introducción sagrada
  const sacredIntroSteps = [
    {
      text: "Hola, amigo. Respira conmigo…",
      duration: 3000
    },
    {
      text: "Estás por iniciar un ritual que va más allá del trabajo. Este momento es una puerta.",
      duration: 4000
    },
    {
      text: "Una puerta hacia tu Yo Superior, hacia Dios, la conciencia, el universo… llámalo como quieras.",
      duration: 4000
    },
    {
      text: "Aquí el secreto no es solo enfocarte. Es entregarte.",
      duration: 3000
    },
    {
      text: "Es dejar que aquello que sabe más que tú —eso que te guía desde dentro— actúe a través de ti.",
      duration: 4000
    },
    {
      text: "Cuando estás presente, cuando desapareces en lo que haces, entras en estado de FLOW.",
      duration: 4000
    },
    {
      text: "El ego se disuelve, la mente se aquieta, y tu esencia toma el control.",
      duration: 4000
    },
    {
      text: '"Perderte a ti mismo es encontrarte con Dios." — Sabiduría ancestral',
      duration: 4000
    },
    {
      text: "Este enfoque no es una obligación. Es una oportunidad.",
      duration: 3000
    },
    {
      text: "De recordar quién eres. De crear, servir, amar, con toda tu energía enfocada.",
      duration: 4000
    },
    {
      text: "Que tu propósito guíe tus manos. Que tu alma sea quien se exprese.",
      duration: 4000
    },
    {
      text: "Vamos juntos. Respira profundo y empezamos...",
      duration: 3000
    }
  ];

  // Función para iniciar la introducción sagrada
  const startSacredIntro = () => {
    if (!purpose.trim()) return;
    setShowSacredIntro(true);
    setIntroStep(0);
  };

  // Función para iniciar el enfoque después de la intro
  const startFocus = useCallback(() => {
    setShowSacredIntro(false);
    setIsStarted(true);
    setIsPaused(false);
    setTimeLeft(25 * 60);
    setSessionType('work');
    setCurrentSlide(0);
    
    // Iniciar audio 432Hz
    if (audioRef.current && !isMuted) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(console.error);
    }
    
    // Iniciar temporizador
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Cambiar a descanso o siguiente sesión
          if (sessionType === 'work') {
            setCompletedSessions(prev => prev + 1);
            setTotalFocusTime(prev => prev + 25 * 60);
            
            if ((completedSessions + 1) % 4 === 0) {
              setTimeLeft(15 * 60); // Descanso largo
            } else {
              setTimeLeft(5 * 60); // Descanso corto
            }
            setSessionType('break');
          } else {
            setTimeLeft(25 * 60); // Volver al trabajo
            setSessionType('work');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [purpose, sessionType, completedSessions, isMuted]);

  // Función para pausar
  const pauseFocus = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Función para continuar
  const resumeFocus = () => {
    setIsPaused(false);
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(console.error);
    }
    startFocus();
  };

  // Función para generar insights de la sesión
  const generateSessionInsights = () => {
    const insights = [];
    
    if (flowIntensity >= 80) {
      insights.push("✨ Alcanzaste un estado de flow profundo. Tu esencia se expresó plenamente.");
    } else if (flowIntensity >= 50) {
      insights.push("🌊 Experimentaste momentos de flow genuino. Siente esa conexión.");
    } else {
      insights.push("🌱 Plantaste las semillas del flow. Cada sesión te acerca más.");
    }
    
    if (flowPhase === 'transcendent') {
      insights.push("🕉️ Tocaste lo trascendente. Ese estado está siempre disponible para ti.");
    }
    
    const timeSpent = (25 * 60 - timeLeft) / 60;
    if (timeSpent >= 20) {
      insights.push("⏰ Tu dedicación fue completa. El tiempo se disolvió en presencia.");
    }
    
    insights.push(`🎯 Tu propósito "${purpose}" fue tu ancla sagrada en este viaje.`);
    insights.push(`🎨 El tema ${currentTheme.name.toLowerCase()} resonó con tu alma hoy.`);
    
    return insights;
  };

  // Función para detener
  const stopFocus = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Generar insights antes de limpiar estado
    const insights = generateSessionInsights();
    setSessionInsights(insights);
    
    // Guardar sesión completada
    if (completedSessions > 0 || (25 * 60 - timeLeft) > 300) { // Si completó al menos 5 minutos
      saveSession({
        purpose,
        theme,
        duration: totalFocusTime + (25 * 60 - timeLeft),
        mantrasShown: currentSlide + 1
      });
    }
    
    setIsStarted(false);
    setIsPaused(false);
    setShowPostReflection(true);
    setCurrentSlide(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Función para resetear
  const resetFocus = () => {
    stopFocus();
    setCompletedSessions(0);
    setTotalFocusTime(0);
  };

  // Función para pantalla completa
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Efecto para manejar la introducción sagrada
  useEffect(() => {
    if (!showSacredIntro) return;

    const currentStep = sacredIntroSteps[introStep];
    if (!currentStep) {
      // Terminar introducción e iniciar enfoque
      startFocus();
      return;
    }

    const timer = setTimeout(() => {
      setIntroStep(prev => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [showSacredIntro, introStep]);

  // Efecto para simular progresión del estado de flow
  useEffect(() => {
    if (!isStarted || isPaused) return;

    const flowInterval = setInterval(() => {
      setFlowIntensity(prev => {
        const timeElapsed = (25 * 60 - timeLeft) / 60; // minutos transcurridos
        let newIntensity;
        
        if (timeElapsed < 3) {
          newIntensity = Math.min(25, prev + 2);
          setFlowPhase('warming');
        } else if (timeElapsed < 8) {
          newIntensity = Math.min(50, prev + 3);
          setFlowPhase('entering');
        } else if (timeElapsed < 18) {
          newIntensity = Math.min(85, prev + 2);
          setFlowPhase('deep');
        } else {
          newIntensity = Math.min(100, prev + 1);
          setFlowPhase('transcendent');
        }
        
        return newIntensity;
      });
    }, 2000);

    return () => clearInterval(flowInterval);
  }, [isStarted, isPaused, timeLeft]);

  // Efecto para manejar las diapositivas
  useEffect(() => {
    if (!isStarted || isPaused) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % mantras.length);
    }, readingSpeed * 1000);

    return () => clearInterval(slideInterval);
  }, [isStarted, isPaused, mantras.length, readingSpeed]);

  // Efecto para detectar tema automáticamente
  useEffect(() => {
    if (purpose) {
      const detectedTheme = detectTheme(purpose);
      setTheme(detectedTheme);
    }
  }, [purpose]);

  // Efecto para limpiar intervalos
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Efecto para pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Funciones de utilidad
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    const totalTime = sessionType === 'work' ? 25 * 60 : 
      (completedSessions % 4 === 0 ? 15 * 60 : 5 * 60);
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 100);
    setPurpose(value);
  };

  // Si está en reflexión post-sesión
  if (showPostReflection) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bgGradient} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        {/* Partículas de celebración */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 10,
                opacity: 0 
              }}
              animate={{ 
                y: -10, 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                delay: Math.random() * 2,
                repeat: Infinity
              }}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <div className="text-center space-y-8 max-w-3xl z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="text-8xl mb-4">🙏</div>
            <h1 className="text-5xl font-light mb-4">Gratitud Sagrada</h1>
            <p className="text-xl opacity-90">
              Tu sesión de enfoque se ha completado. Honra lo que has vivido.
            </p>
          </motion.div>

          {/* Insights de la sesión */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-2xl font-medium mb-6">Insights de tu Journey</h2>
            {sessionInsights.map((insight, index) => (
              <motion.div
                key={index}
                className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-left"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
              >
                <p className="text-lg">{insight}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Estadísticas de la sesión */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{Math.round((25 * 60 - timeLeft) / 60)}</div>
              <div className="text-sm opacity-70">Minutos enfocado</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{Math.round(flowIntensity)}%</div>
              <div className="text-sm opacity-70">Intensidad de flow</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{currentSlide + 1}</div>
              <div className="text-sm opacity-70">Mantras recibidos</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl">{currentTheme.emoji}</div>
              <div className="text-sm opacity-70">{currentTheme.name}</div>
            </div>
          </motion.div>

          {/* Acciones */}
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Button
              size="lg"
              onClick={() => {
                setShowPostReflection(false);
                setTimeLeft(25 * 60);
                setFlowIntensity(0);
                setFlowPhase('warming');
              }}
              className="bg-white/20 border border-white/30 text-white hover:bg-white/30"
            >
              Nueva Sesión
            </Button>
            <Button
              size="lg"
              onClick={() => {
                setShowPostReflection(false);
                setTimeLeft(25 * 60);
                setFlowIntensity(0);
                setFlowPhase('warming');
                setPurpose('');
              }}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Terminar
            </Button>
          </motion.div>
        </div>

        {/* Mensaje final */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <p className="text-lg font-light opacity-80">
            "En el silencio del enfoque, tu alma se ha expresado."
          </p>
        </motion.div>
      </div>
    );
  }

  // Si está en introducción sagrada
  if (showSacredIntro) {
    const currentStep = sacredIntroSteps[introStep];
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bgGradient} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        {/* Audio de introducción */}
        <audio 
          ref={audioRef}
          src="/audio/432hz.mp3" 
          preload="auto"
          autoPlay={!isMuted}
          loop
          onError={() => console.log('Audio no disponible')}
        />

        {/* Botón para saltar intro */}
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={startFocus}
            className="bg-black/20 border-white/20 text-white hover:bg-black/40"
          >
            Saltar intro
          </Button>
        </div>

        {/* Progreso de la introducción */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Progress 
            value={(introStep / sacredIntroSteps.length) * 100} 
            className="w-64 h-1 bg-white/20"
          />
          <div className="text-center text-sm mt-2 opacity-70">
            {introStep + 1} de {sacredIntroSteps.length}
          </div>
        </div>

        {/* Contenido principal de la introducción */}
        <div className="flex-1 flex items-center justify-center w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {currentStep && (
              <motion.div
                key={introStep}
                className={`text-center ${currentTheme.color}`}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                <div className="text-6xl mb-8 animate-pulse">
                  {currentTheme.emoji}
                </div>
                
                <div className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed max-w-4xl mx-auto px-6">
                  {currentStep.text.includes('"') ? (
                    <div>
                      <div className="mb-4">{currentStep.text.split('"')[0]}</div>
                      <div className="italic text-3xl opacity-90">"{currentStep.text.split('"')[1]}"</div>
                      <div className="mt-4">{currentStep.text.split('"')[2]}</div>
                    </div>
                  ) : (
                    currentStep.text
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Propósito en la parte inferior */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-sm opacity-70 mb-1">Tu propósito sagrado</div>
            <div className="font-medium text-lg">{purpose}</div>
          </div>
        </div>

        {/* Indicador de respiración */}
        <div className="absolute bottom-20 right-8 z-50">
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-white/20"
              animate={{ scale: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <div className="text-xs text-center mt-2 opacity-70">Respira</div>
        </div>
      </div>
    );
  }

  // Si está en modo enfoque, mostrar la presentación
  if (isStarted) {
    return (
      <div 
        ref={containerRef}
        className={`min-h-screen bg-gradient-to-br ${currentTheme.bgGradient} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}
      >
        {/* Audio 432Hz */}
        <audio 
          ref={audioRef}
          src="/audio/432hz.mp3" 
          preload="auto"
          onError={() => console.log('Audio no disponible')}
        />
        
        {/* Controles superiores */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="bg-black/20 border-white/20 text-white hover:bg-black/40"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-black/20 border-white/20 text-white hover:bg-black/40"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
        </div>

        {/* Controles principales */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-50">
          {isPaused ? (
            <Button
              onClick={resumeFocus}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Play size={16} />
            </Button>
          ) : (
            <Button
              onClick={pauseFocus}
              size="sm"
              variant="outline"
              className="bg-black/20 border-white/20 text-white hover:bg-black/40"
            >
              <Pause size={16} />
            </Button>
          )}
          
          <Button
            onClick={stopFocus}
            size="sm"
            variant="outline"
            className="bg-black/20 border-white/20 text-white hover:bg-black/40"
          >
            <Square size={16} />
          </Button>
          
          <Button
            onClick={resetFocus}
            size="sm"
            variant="outline"
            className="bg-black/20 border-white/20 text-white hover:bg-black/40"
          >
            <RotateCcw size={16} />
          </Button>
        </div>

        {/* Información de sesión y estado de flow */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-50">
          <div className="flex items-center gap-4">
            <Badge className="bg-white/20 text-white">
              {sessionType === 'work' ? '💭 Enfoque' : '☕ Descanso'}
            </Badge>
            <Badge className="bg-white/20 text-white">
              Sesión {completedSessions + 1}
            </Badge>
          </div>
          
          {/* Indicador de estado de flow */}
          {sessionType === 'work' && (
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: flowPhase === 'warming' ? '#fbbf24' :
                                 flowPhase === 'entering' ? '#34d399' :
                                 flowPhase === 'deep' ? '#3b82f6' : '#8b5cf6'
                }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white text-sm">
                {flowPhase === 'warming' ? '🔥 Calentando' :
                 flowPhase === 'entering' ? '🌊 Entrando en flow' :
                 flowPhase === 'deep' ? '💎 Flow profundo' : '✨ Estado transcendente'}
              </span>
              <div className="text-white text-xs opacity-70">
                {Math.round(flowIntensity)}%
              </div>
            </div>
          )}
        </div>

        {/* Temporizador */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-50">
          <div className="text-4xl font-bold mb-2">
            {formatTime(timeLeft)}
          </div>
          <Progress 
            value={getProgress()} 
            className="w-48 h-2 bg-white/20"
          />
        </div>

        {/* Presentación principal */}
        <div className="flex-1 flex items-center justify-center w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className={`text-center ${currentTheme.color}`}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ 
                duration: 1,
                ease: "easeInOut"
              }}
            >
              <div className="text-8xl mb-8 animate-pulse">
                {currentTheme.emoji}
              </div>
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-relaxed max-w-4xl mx-auto px-6">
                {mantras[currentSlide]}
              </div>
              <div className="text-lg mt-8 opacity-70">
                {currentSlide + 1} de {mantras.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Propósito */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-sm opacity-70 mb-1">Propósito</div>
            <div className="font-medium">{purpose}</div>
          </div>
        </div>
      </div>
    );
  }

  // Formulario de configuración
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4 animate-bounce">🍅</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Enfoque Profundo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Técnica Pomodoro avanzada con mantras personalizados y música 432Hz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario principal */}
          <div className="space-y-6">
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Tu Propósito
                </CardTitle>
                <CardDescription>
                  ¿En qué te vas a enfocar? (máximo 100 caracteres)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Ej: Meditar para encontrar claridad mental..."
                  value={purpose}
                  onChange={handlePurposeChange}
                  maxLength={100}
                  className="text-lg"
                />
                <div className="text-sm text-gray-500 mt-2 text-right">
                  {purpose.length}/100
                </div>
              </CardContent>
            </Card>

            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Tema de Enfoque
                </CardTitle>
                <CardDescription>
                  Selecciona el tipo de energía que quieres cultivar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(THEMES).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <span>{config.emoji}</span>
                          <span>{config.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {currentTheme && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{currentTheme.emoji}</span>
                      <span className="font-medium">{currentTheme.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{currentTheme.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚙️ Configuración
                </CardTitle>
                <CardDescription>
                  Personaliza tu experiencia de enfoque
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Velocidad de lectura (segundos por mantra)
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="10"
                      value={readingSpeed}
                      onChange={(e) => setReadingSpeed(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Rápido (3s)</span>
                      <span>{readingSpeed}s</span>
                      <span>Lento (10s)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="muted"
                      checked={isMuted}
                      onChange={(e) => setIsMuted(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="muted" className="text-sm">
                      Iniciar sin audio 432Hz
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="skill-card">
              <CardContent className="pt-6">
                <Button 
                  size="lg" 
                  onClick={startSacredIntro}
                  disabled={!purpose.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 text-lg"
                >
                  🕉️ Iniciar Enfoque Sagrado
                </Button>
                {!purpose.trim() && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Escribe tu propósito para comenzar
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Estadísticas y sesiones pasadas */}
          <div className="space-y-6">
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Tus Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.totalSessions || getMockSessions().length}
                    </div>
                    <div className="text-sm text-gray-600">Sesiones completadas</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.totalMinutes || Math.round(getMockSessions().reduce((acc: number, s: any) => acc + s.duration, 0) / 60)}
                    </div>
                    <div className="text-sm text-gray-600">Minutos totales</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.totalMantras || getMockSessions().reduce((acc: number, s: any) => acc + s.mantrasShown, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Mantras mostrados</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {stats.totalSessions || Math.round(getMockSessions().reduce((acc: number, s: any) => acc + s.duration, 0) / 60 / 25)}
                    </div>
                    <div className="text-sm text-gray-600">Pomodoros</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📚 Sesiones Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(getRecentSessions(3).length > 0 ? getRecentSessions(3) : getMockSessions().slice(0, 3)).map((session: any) => (
                    <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {THEMES[session.theme]?.emoji || "🎯"}
                          </span>
                          <span className="font-medium text-sm">
                            {THEMES[session.theme]?.name || session.theme}
                          </span>
                        </div>
                        <Badge className="text-xs">
                          {Math.round(session.duration / 60)}m
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {session.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 Consejos para el Enfoque
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Encuentra una posición cómoda y respira profundamente</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Deja que los mantras te guíen, no te fuerces a memorizarlos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Si tu mente divaga, regresa suavemente al presente</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Usa los descansos para estirarte y beber agua</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroFocus; 