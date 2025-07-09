"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function DiagnosticPage() {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // 10 Casos interactivos de habilidades blandas del archivo markdown
  const softSkillsCases = [
    {
      id: "feedback_management",
      title: "Primer Feedback con tu Líder",
      skill: "Gestión del Tiempo y Comunicación",
      icon: "⏰",
      scenario: "Llevas dos semanas como practicante. Tu jefa agenda una reunión para darte retroalimentación, pero llega tarde y solo quedan 10 minutos antes de tu siguiente clase.",
      question: "¿Cómo gestionas este espacio de feedback?",
      options: [
        "Cancelas la reunión para otro día y sales rápido a tu clase",
        "Propones re-agendar, explicando tu limitación de tiempo y agradeciendo la oportunidad de recibir feedback",
        "Te quedas y aceptas la retroalimentación aunque pierdas tu clase",
        "Pides que te envíe los comentarios por correo para evitar otra reunión"
      ],
      correct: 1,
      feedback: {
        0: "Cancelar sin comunicar adecuadamente puede verse como falta de interés en tu desarrollo profesional.",
        1: "¡Excelente! Demuestras respeto por el tiempo de ambos, profesionalismo y valoración del feedback.",
        2: "Aunque muestra dedicación, no gestionar tus compromisos académicos puede generar problemas a largo plazo.",
        3: "Evitar la interacción directa puede limitar la calidad del feedback y la relación con tu supervisor."
      }
    },
    {
      id: "unclear_instructions",
      title: "Entrega con Instrucciones Poco Claras",
      skill: "Iniciativa y Resolución de Problemas",
      icon: "🤔",
      scenario: "Te asignan hacer un reporte, pero el alcance no está definido y tu supervisor está de viaje.",
      question: "¿Qué haces primero?",
      options: [
        "Avanzas el reporte como creas conveniente para no perder tiempo",
        "Contactas a un compañero con más experiencia, aclaras objetivos y confirmas por chat con el supervisor",
        "Esperas a que regrese el supervisor, sin empezar el trabajo",
        "Entregas un resumen de tus dudas y pides que otro compañero tome la tarea"
      ],
      correct: 1,
      feedback: {
        0: "Avanzar sin claridad puede resultar en trabajo no útil y demostrar falta de planificación.",
        1: "¡Perfecto! Muestras iniciativa, colaboración y comunicación proactiva para resolver la ambigüedad.",
        2: "Esperar sin tomar acción puede interpretarse como falta de iniciativa y proactividad.",
        3: "Transferir responsabilidades sin intentar resolverlas puede afectar tu reputación profesional."
      }
    },
    {
      id: "time_management",
      title: "Gestión de Tiempo en un Día Cargado",
      skill: "Equilibrio Trabajo-Estudio",
      icon: "⚖️",
      scenario: "Mañana tienes examen universitario y hoy te asignan una tarea urgente que lleva 4 horas.",
      question: "¿Cómo manejas tu tiempo y la expectativa del equipo?",
      options: [
        "No mencionas el examen y trabajas toda la noche para cumplir",
        "Informas tu limitación, propones un plan dividido en dos días y ofreces adelantar la parte crítica hoy",
        "Solicitas que asignen la tarea a otro, alegando motivos personales",
        "Haces la mitad de la tarea y asumes que entenderán la demora"
      ],
      correct: 1,
      feedback: {
        0: "Sacrificar el estudio constantemente puede afectar tu rendimiento académico y bienestar.",
        1: "¡Excelente! Demuestras transparencia, planificación estratégica y compromiso con ambas responsabilidades.",
        2: "Evitar responsabilidades sin proponer alternativas puede dañar tu credibilidad en el equipo.",
        3: "Asumir comprensión sin comunicar puede generar expectativas no cumplidas y desconfianza."
      }
    },
    {
      id: "remote_collaboration",
      title: "Colaboración Remota",
      skill: "Comunicación Virtual y Liderazgo",
      icon: "💻",
      scenario: "Estás en tu primer proyecto remoto. Durante la reunión por Zoom nadie enciende cámara y reina el silencio.",
      question: "¿Cómo fomentas la participación sin ser la persona con menor jerarquía?",
      options: [
        "Permaneces callado para no incomodar",
        "Rompes el hielo: activas tu cámara, saludas al equipo y planteas una pregunta concreta sobre la agenda",
        "Escribes tus ideas en el chat y sigues sin hablar",
        "Envías un correo después con tus comentarios para evitar interrumpir la reunión"
      ],
      correct: 1,
      feedback: {
        0: "Permanecer pasivo puede limitarte profesionalmente y reduce el valor que aportas al equipo.",
        1: "¡Perfecto! Demuestras liderazgo natural, iniciativa y habilidades de facilitación grupal.",
        2: "Usar solo chat puede ser un inicio, pero no genera la dinámica colaborativa necesaria.",
        3: "Comunicar después puede ser útil, pero no aborda el problema inmediato de participación grupal."
      }
    },
    {
      id: "personality_conflict",
      title: "Conflicto de Personalidades",
      skill: "Resolución de Conflictos y Asertividad",
      icon: "🤝",
      scenario: "Comparten cubículo con otro practicante muy extrovertido que habla fuerte y te distrae.",
      question: "¿Cómo abordas la situación?",
      options: [
        "Te pones audífonos sin decir nada",
        "Hablas en privado, explicas tu dificultad para concentrarte y acuerdan señales o espacios de conversación",
        "Pides al supervisor que cambie tu lugar, sin explicar motivo",
        "Envías un mensaje pasivo-agresivo en el chat grupal para que 'alguien' baje el volumen"
      ],
      correct: 1,
      feedback: {
        0: "Evitar la comunicación puede empeorar el problema y no desarrolla habilidades de resolución de conflictos.",
        1: "¡Excelente! Demuestras comunicación asertiva, respeto mutuo y habilidad para encontrar soluciones colaborativas.",
        2: "Escalar sin intentar resolver directamente puede verse como falta de habilidades interpersonales.",
        3: "La comunicación pasivo-agresiva puede dañar relaciones y crear un ambiente laboral tóxico."
      }
    },
    {
      id: "own_error_initiative",
      title: "Iniciativa Frente a un Error Propio",
      skill: "Responsabilidad y Transparencia",
      icon: "🔍",
      scenario: "Notas que cargaste un dato incorrecto en el CRM; el cliente aún no se ve afectado.",
      question: "¿Qué acción tomas?",
      options: [
        "Corriges el dato en silencio, confiando en que nadie lo notará",
        "Corriges el dato, documentas el cambio y avisas a tu encargado con el aprendizaje para evitar futuros errores",
        "Informas el error pero pides que otro compañero lo solucione para no equivocarte de nuevo",
        "Esperas a ver si surge un problema antes de actuar"
      ],
      correct: 1,
      feedback: {
        0: "Ocultar errores, aunque parezcan menores, puede generar problemas mayores y afectar la confianza.",
        1: "¡Perfecto! Demuestras integridad, responsabilidad y mentalidad de mejora continua.",
        2: "Reconocer el error es bueno, pero transferir la solución puede verse como evasión de responsabilidad.",
        3: "Ser reactivo en lugar de proactivo puede permitir que problemas menores se conviertan en crisis."
      }
    },
    {
      id: "priority_changes",
      title: "Adaptación a Cambios de Prioridad",
      skill: "Adaptabilidad y Mentalidad de Crecimiento",
      icon: "🔄",
      scenario: "A mitad de la semana cambian el objetivo del proyecto y parte de tu trabajo ya no se usará.",
      question: "¿Cómo reaccionas?",
      options: [
        "Te molestas y comentas con tus compañeros que fue tiempo perdido",
        "Aceptas el cambio, extraes lo reutilizable de tu trabajo y ofreces aplicarlo al nuevo objetivo",
        "Sigues trabajando en el plan original porque ya estaba avanzado",
        "Preguntas si puedes salir temprano porque tu tarea quedó 'sin efecto'"
      ],
      correct: 1,
      feedback: {
        0: "Expresar frustración públicamente puede dañar la moral del equipo y tu imagen profesional.",
        1: "¡Excelente! Demuestras flexibilidad, optimización de recursos y enfoque en soluciones.",
        2: "Resistirse a cambios puede resultar en trabajo innecesario y conflictos con la dirección del proyecto.",
        3: "Desvincularse cuando hay cambios puede verse como falta de compromiso y adaptabilidad."
      }
    },
    {
      id: "mentor_support",
      title: "Solicitud de Apoyo a un Mentor",
      skill: "Búsqueda de Ayuda y Autodirección",
      icon: "🎯",
      scenario: "Te encargan usar una herramienta que nunca has visto. Hay tutoriales, pero el plazo es corto y tu mentor está ocupado.",
      question: "¿Cómo pides ayuda?",
      options: [
        "No pides ayuda; intentas solo y esperas aprender lo básico",
        "Preparas preguntas concretas, agendas 15 min con tu mentor y luego practicas con los tutoriales",
        "Envías mensajes insistentes hasta que el mentor responda",
        "Declinas la tarea porque 'no estás capacitado'"
      ],
      correct: 1,
      feedback: {
        0: "Evitar pedir ayuda puede llevar a resultados subóptimos y perder oportunidades de aprendizaje.",
        1: "¡Perfecto! Demuestras preparación, respeto por el tiempo ajeno y estrategia eficiente de aprendizaje.",
        2: "Ser insistente sin considerar la disponibilidad ajena puede dañar relaciones profesionales.",
        3: "Declinar responsabilidades por falta de conocimiento previo puede limitar tu crecimiento profesional."
      }
    },
    {
      id: "good_news_communication",
      title: "Comunicación de Buenas Noticias",
      skill: "Comunicación de Logros y Humildad",
      icon: "📈",
      scenario: "Te enteras de que el equipo batió récord de ventas gracias a tu análisis, pero nadie lo ha compartido.",
      question: "¿Cómo comunicas el logro sin parecer arrogante?",
      options: [
        "Publicas en el chat general: '¡Yo hice el análisis que logró el récord!'",
        "Informas a tu líder con datos, propones que se reconozca al equipo completo y ofreces presentar insights",
        "Esperas a que otro lo anuncie; no quieres figurar",
        "Mandas tu CV al director resaltando el récord como mérito propio"
      ],
      correct: 1,
      feedback: {
        0: "Auto-promoción directa puede verse como arrogante y no reconoce la contribución del equipo.",
        1: "¡Excelente! Demuestras humildad, visión de equipo y enfoque en el valor aportado más que en el crédito personal.",
        2: "Ser demasiado modesto puede hacer que tus contribuciones pasen desapercibidas.",
        3: "Promocionarse sin contexto apropiado puede verse como oportunista y poco profesional."
      }
    },
    {
      id: "ethical_dilemma",
      title: "Dilema Ético con Recursos de la Empresa",
      skill: "Ética Profesional e Integridad",
      icon: "⚖️",
      scenario: "Un amigo te pide la licencia de software que la empresa te dio 'porque solo la usas en prácticas'.",
      question: "¿Cómo respondes?",
      options: [
        "Le compartes la licencia; 'no le hace daño a nadie'",
        "Rechazas la petición, explicas que es propiedad de la empresa y ofreces alternativas gratuitas",
        "Ignoras el mensaje para evitar conflicto",
        "Le respondes que pregunte a TI, sin mencionar que ya sabes la política"
      ],
      correct: 1,
      feedback: {
        0: "Compartir recursos empresariales sin autorización viola políticas y puede tener consecuencias legales.",
        1: "¡Perfecto! Demuestras integridad profesional, conocimiento de políticas y disposición a ayudar éticamente.",
        2: "Evitar responder a dilemas éticos puede interpretarse como falta de principios claros.",
        3: "Transferir la responsabilidad sin educar sobre la política puede perpetuar comportamientos inapropiados."
      }
    }
  ];

  const currentCaseData = softSkillsCases[currentCase];
  const totalCases = softSkillsCases.length;
  const progress = ((currentCase + 1) / totalCases) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentCaseData.id]: optionIndex
    }));
  };

  const handleExplanationChange = (value: string) => {
    setExplanations(prev => ({
      ...prev,
      [currentCaseData.id]: value
    }));
  };

  const nextCase = () => {
    if (currentCase < totalCases - 1) {
      setCurrentCase(currentCase + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevCase = () => {
    if (currentCase > 0) {
      setCurrentCase(currentCase - 1);
    }
  };

  const calculateResults = () => {
    const results = softSkillsCases.map(caseData => {
      const selectedOption = selectedOptions[caseData.id];
      const isCorrect = selectedOption === caseData.correct;
      
      // Sistema de puntuación más sofisticado
      let score = 0;
      if (isCorrect) {
        score = 100;
      } else {
        // Puntuación parcial basada en qué tan cerca está de la respuesta correcta
        const distance = Math.abs(selectedOption - caseData.correct);
        if (distance === 1) score = 75; // Respuesta cercana
        else if (distance === 2) score = 50; // Respuesta media
        else score = 25; // Respuesta distante
      }
      
      // Análisis cualitativo de la explicación
      const explanation = explanations[caseData.id] || "";
      let explanationQuality = 0;
      if (explanation.length > 50) explanationQuality += 20;
      if (explanation.includes("porque") || explanation.includes("debido") || explanation.includes("ya que")) explanationQuality += 15;
      if (explanation.includes("equipo") || explanation.includes("colabora") || explanation.includes("comunica")) explanationQuality += 10;
      if (explanation.length > 100) explanationQuality += 5;
      
      const finalScore = Math.min(100, score + explanationQuality);
      
      return {
        id: caseData.id,
        title: caseData.title,
        skill: caseData.skill,
        icon: caseData.icon,
        score: finalScore,
        rawScore: score,
        explanationBonus: explanationQuality,
        isCorrect,
        selectedOption,
        feedback: caseData.feedback[selectedOption as keyof typeof caseData.feedback] || "No se seleccionó una opción",
        explanation: explanation || "Sin explicación proporcionada"
      };
    });

    return results;
  };

  const getSkillCategoryAnalysis = (results: ReturnType<typeof calculateResults>) => {
    const categories = {
      "Comunicación": {
        skills: ["Gestión del Tiempo y Comunicación", "Comunicación Virtual y Liderazgo", "Comunicación de Logros y Humildad"],
        icon: "💬",
        description: "Tu capacidad para transmitir ideas y conectar con otros"
      },
      "Liderazgo y Gestión": {
        skills: ["Comunicación Virtual y Liderazgo", "Resolución de Conflictos y Asertividad", "Búsqueda de Ayuda y Autodirección"],
        icon: "👑",
        description: "Tu habilidad para guiar, influir y tomar decisiones"
      },
      "Adaptabilidad": {
        skills: ["Adaptabilidad y Mentalidad de Crecimiento", "Equilibrio Trabajo-Estudio"],
        icon: "🔄",
        description: "Tu flexibilidad ante cambios y situaciones nuevas"
      },
      "Ética e Integridad": {
        skills: ["Ética Profesional e Integridad", "Responsabilidad y Transparencia"],
        icon: "⚖️",
        description: "Tu compromiso con principios morales y profesionales"
      },
      "Resolución de Problemas": {
        skills: ["Iniciativa y Resolución de Problemas", "Búsqueda de Ayuda y Autodirección"],
        icon: "🎯",
        description: "Tu capacidad para enfrentar desafíos y encontrar soluciones"
      }
    };

    return Object.entries(categories).map(([category, info]) => {
      const relevantResults = results.filter(r => 
        info.skills.some(skill => r.skill.includes(skill) || skill.includes(r.skill))
      );
      
      const averageScore = relevantResults.length > 0 
        ? relevantResults.reduce((sum, r) => sum + r.score, 0) / relevantResults.length 
        : 0;
      
      return {
        category,
        icon: info.icon,
        description: info.description,
        score: Math.round(averageScore),
        resultsCount: relevantResults.length,
        level: averageScore >= 80 ? "Avanzado" : averageScore >= 60 ? "Intermedio" : "En Desarrollo"
      };
    });
  };

  const canProceed = () => {
    const hasSelectedOption = selectedOptions[currentCaseData.id] !== undefined;
    const hasExplanation = explanations[currentCaseData.id]?.trim() !== "";
    return hasSelectedOption && hasExplanation;
  };

  if (showResults) {
    const results = calculateResults();
    const averageScore = results.reduce((sum, result) => sum + result.score, 0) / results.length;
    const strongSkills = results.filter(r => r.score >= 80);
    const developmentAreas = results.filter(r => r.score < 60);
    const categoryAnalysis = getSkillCategoryAnalysis(results);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4 float-animation">🎯</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Resultados de tu Evaluación
            </h1>
            <p className="text-xl text-gray-600">
              Descubre tus fortalezas y áreas de crecimiento en habilidades blandas
            </p>
          </div>

          {/* Score Overview */}
          <Card className="skill-card emotional-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Tu Puntuación General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {Math.round(averageScore)}%
                </div>
                <div className="coach-message">
                  <p className="text-blue-800 font-medium">
                    🤖 &ldquo;{averageScore >= 80 
                      ? 'Excelente desempeño! Demuestras madurez profesional y habilidades blandas bien desarrolladas.'
                      : averageScore >= 65
                      ? 'Buen rendimiento general. Tienes una base sólida de habilidades blandas con áreas específicas para pulir.'
                      : averageScore >= 50
                      ? 'Rendimiento prometedor. Tus respuestas muestran potencial, con oportunidades claras de crecimiento.'
                      : 'Gran oportunidad de desarrollo. Tus respuestas indican un espacio significativo para fortalecer estas habilidades clave.'
                    }&rdquo;
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white/50 p-2 rounded">
                      <strong>Casos perfectos:</strong> {results.filter(r => r.isCorrect).length}/{results.length}
                    </div>
                    <div className="bg-white/50 p-2 rounded">
                      <strong>Puntuación base:</strong> {Math.round(results.reduce((sum, r) => sum + r.rawScore, 0) / results.length)}%
                    </div>
                    <div className="bg-white/50 p-2 rounded">
                      <strong>Bonus análisis:</strong> +{Math.round(results.reduce((sum, r) => sum + r.explanationBonus, 0) / results.length)}%
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Category Analysis */}
          <Card className="skill-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Análisis por Categorías de Habilidades
              </CardTitle>
              <CardDescription>
                Tu perfil de competencias organizadas por áreas clave
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryAnalysis.map((category, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{category.category}</h3>
                        <Badge className={`text-xs ${
                          category.level === 'Avanzado' ? 'bg-green-100 text-green-800' :
                          category.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {category.level}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">{category.score}%</div>
                      <div className="text-xs text-gray-500">
                        {category.resultsCount} caso{category.resultsCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <Card key={index} className="skill-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{result.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{result.title}</CardTitle>
                        <CardDescription>{result.skill}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        result.score >= 80 ? 'bg-green-100 text-green-800' :
                        result.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {result.score}%
                      </Badge>
                      {result.explanationBonus > 0 && (
                        <div className="text-xs text-green-600 mt-1">
                          +{result.explanationBonus}% análisis
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Performance indicator */}
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${
                        result.isCorrect ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <span className={result.isCorrect ? 'text-green-700' : 'text-orange-700'}>
                        {result.isCorrect ? 'Respuesta óptima seleccionada' : 'Oportunidad de mejora identificada'}
                      </span>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Feedback profesional:</strong> {result.feedback}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Tu razonamiento:</strong> {result.explanation}
                      </p>
                      {result.explanation.length > 100 && (
                        <div className="text-xs text-green-600 mt-2">
                          ✓ Análisis detallado proporcionado
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Strengths and Development Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💪</span>
                  Fortalezas Identificadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {strongSkills.length > 0 ? (
                    strongSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="text-xl">{skill.icon}</div>
                        <div>
                          <div className="font-medium text-green-800">{skill.skill}</div>
                          <div className="text-sm text-green-600">{skill.score}% - Excelente desempeño</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Todas las habilidades tienen potencial de crecimiento</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  Áreas de Crecimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {developmentAreas.length > 0 ? (
                    developmentAreas.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl">{skill.icon}</div>
                        <div>
                          <div className="font-medium text-orange-800">{skill.skill}</div>
                          <div className="text-sm text-orange-600">Gran potencial de desarrollo</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">¡Excelente! Todas las habilidades están bien desarrolladas</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Recommendations */}
          <Card className="skill-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Recomendaciones Personalizadas
              </CardTitle>
              <CardDescription>
                Plan de acción específico basado en tu evaluación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Priority Areas */}
                {developmentAreas.length > 0 && (
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-800 mb-2">🎯 Prioridad Alta - Enfócate en:</h3>
                    <div className="space-y-2">
                      {developmentAreas.slice(0, 2).map((area, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="text-lg">{area.icon}</div>
                          <div>
                            <span className="font-medium">{area.skill}</span>
                            <p className="text-sm text-orange-700">
                              {area.skill.includes('Comunicación') && 'Practica técnicas de comunicación asertiva y feedback constructivo.'}
                              {area.skill.includes('Liderazgo') && 'Desarrolla habilidades de liderazgo a través de proyectos grupales.'}
                              {area.skill.includes('Adaptabilidad') && 'Trabaja en ejercicios de flexibilidad mental y manejo del cambio.'}
                              {area.skill.includes('Ética') && 'Reflexiona sobre casos éticos y construye un marco de valores sólido.'}
                              {area.skill.includes('Resolución') && 'Practica metodologías de resolución de problemas como Design Thinking.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Strengths to Leverage */}
                {strongSkills.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">💪 Fortalezas para Potenciar:</h3>
                    <div className="space-y-2">
                      {strongSkills.slice(0, 2).map((strength, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="text-lg">{strength.icon}</div>
                          <div>
                            <span className="font-medium">{strength.skill}</span>
                            <p className="text-sm text-green-700">
                              Usa esta fortaleza como mentor para otros y incluye ejemplos específicos en tu portafolio.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="skill-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Tu Plan de Acción Personalizado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <h3 className="font-semibold text-purple-800">Construye tu Portafolio</h3>
                    <p className="text-sm text-purple-600 mt-1">
                      Documenta casos reales que demuestren estas habilidades
                    </p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">
                      Prioridad {averageScore >= 70 ? 'Alta' : 'Media'}
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl mb-2">💭</div>
                    <h3 className="font-semibold text-blue-800">Reflexión Dirigida</h3>
                    <p className="text-sm text-blue-600 mt-1">
                      {developmentAreas.length > 0 
                        ? 'Enfócate en situaciones que desafíen tus áreas de oportunidad'
                        : 'Mantén un diario de situaciones complejas y tus respuestas'
                      }
                    </p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">
                      {developmentAreas.length > 2 ? 'Crítico' : 'Recomendado'}
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl mb-2">📈</div>
                    <h3 className="font-semibold text-green-800">Seguimiento Inteligente</h3>
                    <p className="text-sm text-green-600 mt-1">
                      {averageScore >= 75 
                        ? 'Evalúa casos más complejos y lidera iniciativas'
                        : 'Re-evalúa estas habilidades en 2-3 semanas'
                      }
                    </p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Seguimiento en {averageScore >= 75 ? '4' : '2'} semanas
                    </Badge>
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
                    onClick={() => {
                      // Guardar resultados en localStorage para el portafolio
                      localStorage.setItem('softSkillsEvaluation', JSON.stringify({
                        results,
                        averageScore: Math.round(averageScore),
                        categoryAnalysis,
                        completedAt: new Date().toISOString(),
                        strongSkills: strongSkills.map(s => s.skill),
                        developmentAreas: developmentAreas.map(s => s.skill)
                      }));
                      window.location.href = '/portfolio';
                    }}
                  >
                    Generar Portafolio Profesional 🏆
                  </Button>
                  <p className="text-sm text-gray-600">
                    Tus resultados se integrarán automáticamente en tu portafolio de habilidades
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="skill-card emotional-glow">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-purple-600 border-purple-300">
                Caso {currentCase + 1} de {totalCases}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {currentCaseData.skill}
              </Badge>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <div className="space-y-2">
              <div className="text-4xl">{currentCaseData.icon}</div>
              <CardTitle className="text-2xl">{currentCaseData.title}</CardTitle>
              <CardDescription className="text-base">
                Caso interactivo de {currentCaseData.skill.toLowerCase()}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              {/* Scenario */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">📖 Situación</h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentCaseData.scenario}
                </p>
              </div>

              {/* Question */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-xl border border-orange-200">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">❓ Pregunta</h3>
                <p className="text-gray-700 font-medium">
                  {currentCaseData.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-800">Selecciona tu respuesta:</h3>
                {currentCaseData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedOptions[currentCaseData.id] === index ? "default" : "outline"}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full h-auto p-4 text-left justify-start transition-all duration-200 ${
                      selectedOptions[currentCaseData.id] === index
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'hover:shadow-md hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="text-sm leading-relaxed">
                        {option}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Explanation */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-800">
                  💭 Explica tu razonamiento:
                </h3>
                <Textarea
                  placeholder="¿Por qué elegiste esta opción? ¿Qué factores consideraste en tu decisión? ¿Cómo crees que tu respuesta demuestra esta habilidad blanda?"
                  value={explanations[currentCaseData.id] || ""}
                  onChange={(e) => handleExplanationChange(e.target.value)}
                  rows={4}
                  className="text-base"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevCase}
                disabled={currentCase === 0}
                className="px-6"
              >
                ← Anterior
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalCases }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index <= currentCase 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={nextCase}
                disabled={!canProceed()}
                className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {currentCase === totalCases - 1 ? 'Ver Resultados ✨' : 'Siguiente →'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 