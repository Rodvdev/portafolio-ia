"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUserProgress } from "@/hooks/useLocalStorage";
import { CheckCircle, Clock, Users, Target, Lightbulb } from "lucide-react";

interface TestQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    points: number;
    skill: string;
  }[];
  category: string;
  scenario?: string;
}

interface TestResult {
  totalScore: number;
  skillScores: Record<string, number>;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

interface InteractiveTestProps {
  testType: "communication" | "leadership" | "teamwork" | "problem-solving";
  onComplete: (result: TestResult) => void;
}

export function InteractiveTest({ testType, onComplete }: InteractiveTestProps) {
  const { addPoints } = useUserProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const testQuestions: Record<string, TestQuestion[]> = {
    communication: [
      {
        id: "comm1",
        question: "Tu jefe te pide que presentes un proyecto importante mañana, pero no te sientes preparado. ¿Qué haces?",
        scenario: "Estás en una reunión de equipo y necesitas comunicar un retraso inesperado en tu proyecto.",
        options: [
          { id: "a", text: "Le explico honestamente mi situación y propongo una nueva fecha realista", points: 10, skill: "honestidad" },
          { id: "b", text: "Acepto el reto y trabajo toda la noche para estar listo", points: 6, skill: "compromiso" },
          { id: "c", text: "Busco ayuda de mi equipo para complementar mi presentación", points: 8, skill: "colaboración" },
          { id: "d", text: "Pido una extensión sin dar explicaciones detalladas", points: 3, skill: "comunicación" }
        ],
        category: "Comunicación"
      },
      {
        id: "comm2",
        question: "Durante una reunión, un colega presenta una idea que consideras incorrecta. ¿Cómo respondes?",
        scenario: "La decisión podría afectar el proyecto de todo el equipo.",
        options: [
          { id: "a", text: "Espero a que termine y presento mi punto de vista con datos", points: 10, skill: "respeto" },
          { id: "b", text: "Lo interrumpo inmediatamente para corregir el error", points: 4, skill: "asertividad" },
          { id: "c", text: "Hago preguntas para que llegue a la conclusión correcta", points: 9, skill: "diplomacia" },
          { id: "d", text: "No digo nada durante la reunión pero hablo con él después", points: 5, skill: "evitación" }
        ],
        category: "Comunicación"
      },
      {
        id: "comm3",
        question: "Un cliente está muy molesto por un error en su pedido. ¿Cuál es tu primera reacción?",
        scenario: "El cliente está gritando y otros clientes están observando la situación.",
        options: [
          { id: "a", text: "Me disculpo sinceramente y busco una solución inmediata", points: 10, skill: "empatía" },
          { id: "b", text: "Explico que el error no fue culpa mía", points: 2, skill: "defensiva" },
          { id: "c", text: "Mantengo la calma y lo escucho activamente", points: 9, skill: "paciencia" },
          { id: "d", text: "Le ofrezco una compensación antes de escuchar su problema", points: 6, skill: "resolución" }
        ],
        category: "Comunicación"
      }
    ],
    leadership: [
      {
        id: "lead1",
        question: "Tu equipo está desmotivado después de un proyecto fallido. ¿Qué haces como líder?",
        scenario: "El proyecto fracasó por factores externos, pero el equipo se siente responsable.",
        options: [
          { id: "a", text: "Organizo una reunión para analizar qué aprendimos y celebrar el esfuerzo", points: 10, skill: "motivación" },
          { id: "b", text: "Les doy un tiempo libre para que se recuperen", points: 5, skill: "cuidado" },
          { id: "c", text: "Inmediatamente comenzamos un nuevo proyecto más pequeño", points: 7, skill: "acción" },
          { id: "d", text: "Hablo individualmente con cada miembro del equipo", points: 8, skill: "personalización" }
        ],
        category: "Liderazgo"
      },
      {
        id: "lead2",
        question: "Dos miembros de tu equipo están en conflicto y afecta el trabajo. ¿Cómo intervienes?",
        scenario: "El conflicto es personal pero está impactando los resultados del equipo.",
        options: [
          { id: "a", text: "Los reúno para mediar y encontrar una solución conjunta", points: 10, skill: "mediación" },
          { id: "b", text: "Hablo con cada uno por separado primero", points: 8, skill: "investigación" },
          { id: "c", text: "Establezco reglas claras de trabajo profesional", points: 6, skill: "autoridad" },
          { id: "d", text: "Los reorganizo para que no trabajen juntos", points: 4, skill: "evitación" }
        ],
        category: "Liderazgo"
      },
      {
        id: "lead3",
        question: "Tu equipo debe decidir entre dos estrategias importantes. Las opiniones están divididas. ¿Qué haces?",
        scenario: "Ambas estrategias tienen pros y contras, y el tiempo es limitado.",
        options: [
          { id: "a", text: "Facilito una sesión de pros y contras para decidir juntos", points: 10, skill: "facilitación" },
          { id: "b", text: "Tomo la decisión basándome en mi experiencia", points: 6, skill: "decisión" },
          { id: "c", text: "Propongo una estrategia híbrida que combine ambas", points: 9, skill: "innovación" },
          { id: "d", text: "Pido opinión a mi jefe antes de decidir", points: 3, skill: "dependencia" }
        ],
        category: "Liderazgo"
      }
    ],
    teamwork: [
      {
        id: "team1",
        question: "Un miembro de tu equipo no está contribuyendo lo suficiente. ¿Cómo lo manejas?",
        scenario: "El resto del equipo está empezando a notar y comentar la situación.",
        options: [
          { id: "a", text: "Hablo con él para entender qué está pasando", points: 10, skill: "comprensión" },
          { id: "b", text: "Redistribuyo su trabajo entre el resto del equipo", points: 4, skill: "compensación" },
          { id: "c", text: "Reporto la situación al supervisor", points: 5, skill: "escalamiento" },
          { id: "d", text: "Le ofrezco ayuda para mejorar su desempeño", points: 9, skill: "apoyo" }
        ],
        category: "Trabajo en Equipo"
      },
      {
        id: "team2",
        question: "Tu equipo tiene ideas muy diferentes sobre cómo abordar un proyecto. ¿Qué propones?",
        scenario: "Cada miembro defiende fuertemente su aproximación.",
        options: [
          { id: "a", text: "Sugiero combinar las mejores ideas de cada propuesta", points: 10, skill: "síntesis" },
          { id: "b", text: "Propongo votar por la mejor opción", points: 6, skill: "democracia" },
          { id: "c", text: "Busco un experto externo para que decida", points: 4, skill: "delegación" },
          { id: "d", text: "Propongo hacer una prueba piloto con cada idea", points: 8, skill: "experimentación" }
        ],
        category: "Trabajo en Equipo"
      }
    ],
    "problem-solving": [
      {
        id: "prob1",
        question: "Tu sistema principal falla justo antes de una presentación importante. ¿Cuál es tu estrategia?",
        scenario: "Tienes 30 minutos antes de la presentación y los clientes ya están llegando.",
        options: [
          { id: "a", text: "Preparo una presentación alternativa sin el sistema", points: 10, skill: "adaptabilidad" },
          { id: "b", text: "Busco ayuda técnica urgente para reparar el sistema", points: 7, skill: "recursos" },
          { id: "c", text: "Retraso la presentación hasta resolver el problema", points: 4, skill: "precaución" },
          { id: "d", text: "Uso mi laptop personal como respaldo", points: 8, skill: "improvisación" }
        ],
        category: "Resolución de Problemas"
      },
      {
        id: "prob2",
        question: "Un cliente solicita una funcionalidad que es técnicamente imposible con tu presupuesto. ¿Qué haces?",
        scenario: "El cliente insiste en que es esencial para el éxito del proyecto.",
        options: [
          { id: "a", text: "Explico las limitaciones y propongo alternativas viables", points: 10, skill: "comunicación" },
          { id: "b", text: "Busco tecnologías alternativas que puedan funcionar", points: 9, skill: "innovación" },
          { id: "c", text: "Propongo aumentar el presupuesto para hacerlo posible", points: 6, skill: "negociación" },
          { id: "d", text: "Acepto el reto y busco la manera de hacerlo gratis", points: 3, skill: "compromiso" }
        ],
        category: "Resolución de Problemas"
      }
    ]
  };

  const questions = testQuestions[testType] || [];
  const currentQ = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let totalScore = 0;
    const skillScores: Record<string, number> = {};
    const skillCounts: Record<string, number> = {};

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.id === answer);
        if (option) {
          totalScore += option.points;
          if (!skillScores[option.skill]) {
            skillScores[option.skill] = 0;
            skillCounts[option.skill] = 0;
          }
          skillScores[option.skill] += option.points;
          skillCounts[option.skill] += 1;
        }
      }
    });

    // Normalize skill scores
    Object.keys(skillScores).forEach(skill => {
      skillScores[skill] = skillScores[skill] / skillCounts[skill];
    });

    const avgScore = totalScore / questions.length;
    const strengths = Object.entries(skillScores)
      .filter(([, score]) => score >= 8)
      .map(([skill]) => skill);
    
    const improvements = Object.entries(skillScores)
      .filter(([, score]) => score < 6)
      .map(([skill]) => skill);

    const recommendations = generateRecommendations(skillScores, testType);

    const result: TestResult = {
      totalScore: Math.round(avgScore * 10),
      skillScores,
      strengths,
      improvements,
      recommendations
    };

    setResult(result);
    setIsCompleted(true);
    
    // Award points based on performance
    const pointsAwarded = Math.round(avgScore * 10);
    addPoints(pointsAwarded);
    
    onComplete(result);
  };

  const generateRecommendations = (skillScores: Record<string, number>, testType: string): string[] => {
    const recommendations: string[] = [];
    
    const avgScore = Object.values(skillScores).reduce((a, b) => a + b, 0) / Object.values(skillScores).length;
    
    if (avgScore >= 8) {
      recommendations.push("¡Excelente! Tus habilidades están muy desarrolladas.");
      recommendations.push("Considera mentorear a otros en estas áreas.");
    } else if (avgScore >= 6) {
      recommendations.push("Buen desempeño general. Identifica áreas específicas para mejorar.");
    } else {
      recommendations.push("Hay oportunidades importantes de crecimiento.");
    }

    // Specific recommendations based on test type
    switch (testType) {
      case "communication":
        recommendations.push("Practica la escucha activa en tus conversaciones diarias.");
        break;
      case "leadership":
        recommendations.push("Busca oportunidades para liderar proyectos pequeños.");
        break;
      case "teamwork":
        recommendations.push("Participa más activamente en actividades de equipo.");
        break;
      case "problem-solving":
        recommendations.push("Practica técnicas de pensamiento crítico.");
        break;
    }

    return recommendations;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTestIcon = (type: string) => {
    switch (type) {
      case "communication": return <Users className="h-5 w-5" />;
      case "leadership": return <Target className="h-5 w-5" />;
      case "teamwork": return <Users className="h-5 w-5" />;
      case "problem-solving": return <Lightbulb className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
    }
  };

  if (isCompleted && result) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl">¡Test Completado!</CardTitle>
            <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatTime(timeElapsed)}
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                {questions.length} preguntas
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {result.totalScore}%
            </div>
            <p className="text-gray-600">Puntuación Total</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">💪 Fortalezas</h3>
              <ul className="text-sm text-green-700 space-y-1">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="capitalize">• {strength}</li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">🎯 Áreas de Mejora</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                {result.improvements.map((improvement, index) => (
                  <li key={index} className="capitalize">• {improvement}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🚀 Recomendaciones</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              {result.recommendations.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 text-center">
            <Badge className="bg-purple-100 text-purple-800">
              +{result.totalScore} puntos ganados
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQ) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <p>No hay preguntas disponibles para este test.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTestIcon(testType)}
            <CardTitle className="capitalize">{testType.replace("-", " ")}</CardTitle>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatTime(timeElapsed)}
            </div>
            <Badge variant="outline">
              {currentQuestion + 1} de {questions.length}
            </Badge>
          </div>
        </div>
        <Progress value={(currentQuestion + 1) / questions.length * 100} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {currentQ.scenario && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">📋 Contexto:</h4>
            <p className="text-sm text-gray-700">{currentQ.scenario}</p>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-lg mb-4">{currentQ.question}</h3>
          
          <RadioGroup value={answers[currentQ.id] || ""} onValueChange={handleAnswer}>
            {currentQ.options.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!answers[currentQ.id]}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {currentQuestion === questions.length - 1 ? "Finalizar Test" : "Siguiente"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 