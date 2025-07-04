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

  // Casos interactivos de habilidades blandas
  const softSkillsCases = [
    {
      id: "communication",
      title: "Comunicación en Crisis",
      skill: "Comunicación",
      icon: "💬",
      scenario: "Eres el coordinador de un proyecto importante. El equipo acaba de descubrir un error crítico que podría retrasar la entrega por una semana. Tu jefe está en una reunión importante y el cliente espera una actualización en 30 minutos.",
      question: "¿Cómo comunicas esta situación al cliente?",
      options: [
        "Espero a que mi jefe salga de la reunión para decidir juntos qué decir",
        "Llamo inmediatamente al cliente, explico la situación con transparencia y propongo soluciones",
        "Envío un email genérico diciendo que hay un 'pequeño retraso' sin dar detalles",
        "Pido a un compañero que hable con el cliente porque no me siento preparado"
      ],
      correct: 1,
      feedback: {
        0: "Esperar puede generar más desconfianza. La comunicación proactiva es clave en situaciones críticas.",
        1: "¡Excelente! La transparencia y las soluciones proactivas construyen confianza, incluso en momentos difíciles.",
        2: "Minimizar el problema puede dañar la relación a largo plazo. Los clientes valoran la honestidad.",
        3: "Evitar la responsabilidad no resuelve el problema y puede afectar tu credibilidad profesional."
      }
    },
    {
      id: "leadership",
      title: "Liderazgo en Conflicto",
      skill: "Liderazgo",
      icon: "👑",
      scenario: "Lideras un equipo de 5 personas. Dos miembros clave han tenido una fuerte discusión sobre la dirección del proyecto. El ambiente se ha vuelto tenso y está afectando la productividad de todo el equipo. Ambos son talentosos pero tienen personalidades muy diferentes.",
      question: "Como líder, ¿cuál es tu primera acción?",
      options: [
        "Ignoro la situación esperando que se resuelva sola con el tiempo",
        "Hablo por separado con cada uno para entender sus perspectivas antes de tomar acción",
        "Llamo a una reunión grupal inmediatamente para resolver el conflicto públicamente",
        "Tomo una decisión unilateral sobre el proyecto para evitar más conflictos"
      ],
      correct: 1,
      feedback: {
        0: "Los conflictos no resueltos tienden a empeorar y afectar a todo el equipo.",
        1: "¡Perfecto! Entender todas las perspectivas es fundamental para un liderazgo efectivo y resolución de conflictos.",
        2: "Los conflictos públicos pueden intensificar las tensiones. Es mejor entender primero las perspectivas individuales.",
        3: "Las decisiones unilaterales pueden resolver el síntoma pero no la causa raíz del conflicto."
      }
    },
    {
      id: "empathy",
      title: "Empatía en Acción",
      skill: "Empatía",
      icon: "💝",
      scenario: "Un compañero de trabajo que siempre es puntual y eficiente ha llegado tarde tres veces esta semana. Su rendimiento ha bajado notablemente y parece distraído. Otros colegas han comenzado a comentar negativamente sobre su comportamiento.",
      question: "¿Cómo manejas esta situación?",
      options: [
        "Me uno a los comentarios porque su comportamiento está afectando al equipo",
        "Me acerco de manera privada para preguntarle si está todo bien y si necesita apoyo",
        "Reporto inmediatamente su comportamiento a recursos humanos",
        "Ignoro la situación porque no es mi responsabilidad"
      ],
      correct: 1,
      feedback: {
        0: "Participar en comentarios negativos puede empeorar la situación y dañar la moral del equipo.",
        1: "¡Excelente! La empatía y el apoyo pueden ayudar a identificar y resolver problemas subyacentes.",
        2: "Reportar sin intentar entender primero puede ser prematuro y dañar la relación.",
        3: "Mostrar preocupación por los colegas fortalece las relaciones y el ambiente laboral."
      }
    },
    {
      id: "adaptability",
      title: "Adaptabilidad Bajo Presión",
      skill: "Adaptabilidad",
      icon: "🦋",
      scenario: "Estás a mitad de un proyecto de 6 meses cuando la empresa decide cambiar completamente la tecnología que están usando. Esto significa que todo el trabajo realizado hasta ahora debe ser replanteado. El equipo está frustrado y algunos consideran renunciar.",
      question: "¿Cómo respondes a este cambio?",
      options: [
        "Me resisto al cambio y trato de convencer a la gerencia de mantener el enfoque original",
        "Acepto el cambio y me enfoco en encontrar formas de aprovechar el trabajo ya realizado",
        "Me quejo constantemente sobre lo injusto de la situación",
        "Busco inmediatamente otro trabajo porque no me gustan los cambios"
      ],
      correct: 1,
      feedback: {
        0: "Resistirse al cambio puede limitar oportunidades de crecimiento y innovación.",
        1: "¡Perfecto! La adaptabilidad positiva y la búsqueda de soluciones son clave en entornos dinámicos.",
        2: "Quejarse constantemente puede afectar la moral del equipo y tu reputación profesional.",
        3: "Evitar los cambios puede limitar tu desarrollo profesional en un mundo laboral dinámico."
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
      const score = isCorrect ? 100 : Math.max(0, 100 - Math.abs(selectedOption - caseData.correct) * 25);
      
      return {
        skill: caseData.skill,
        icon: caseData.icon,
        score,
        isCorrect,
                 feedback: caseData.feedback[selectedOption as keyof typeof caseData.feedback] || "No se seleccionó una opción",
        explanation: explanations[caseData.id] || "Sin explicación proporcionada"
      };
    });

    return results;
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
                    🤖 &ldquo;Has demostrado un gran potencial en habilidades blandas. 
                    Tus respuestas muestran reflexión y comprensión de situaciones complejas.&rdquo;
                  </p>
                </div>
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
                        <CardTitle className="text-lg">{result.skill}</CardTitle>
                        <CardDescription>Caso {index + 1}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`${
                      result.score >= 80 ? 'bg-green-100 text-green-800' :
                      result.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.score}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Feedback:</strong> {result.feedback}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Tu explicación:</strong> {result.explanation}
                      </p>
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

          {/* Next Steps */}
          <Card className="skill-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Próximos Pasos Recomendados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <h3 className="font-semibold text-purple-800">Construye tu Portafolio</h3>
                    <p className="text-sm text-purple-600 mt-1">
                      Valida tus habilidades con casos prácticos
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl mb-2">💭</div>
                    <h3 className="font-semibold text-blue-800">Reflexión Diaria</h3>
                    <p className="text-sm text-blue-600 mt-1">
                      Desarrolla autoconciencia emocional
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl mb-2">📈</div>
                    <h3 className="font-semibold text-green-800">Seguimiento Semanal</h3>
                    <p className="text-sm text-green-600 mt-1">
                      Monitorea tu progreso continuo
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
                    onClick={() => window.location.href = '/portfolio'}
                  >
                    Comenzar Portafolio Humano 🏆
                  </Button>
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