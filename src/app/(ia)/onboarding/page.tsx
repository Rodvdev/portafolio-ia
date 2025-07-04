"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CoachVirtual } from "@/components/ui/coach-virtual";

const TOTAL_STEPS = 5;

// Soft Skills focused data
const softSkillsInterests = [
  "Comunicación Efectiva",
  "Liderazgo de Equipos", 
  "Inteligencia Emocional",
  "Resolución de Conflictos",
  "Trabajo en Equipo",
  "Adaptabilidad",
  "Creatividad e Innovación",
  "Negociación",
  "Empatía",
  "Pensamiento Crítico",
  "Gestión del Tiempo",
  "Resiliencia"
];

const softSkillsToEvaluate = [
  { skill: "Comunicación", icon: "💬", description: "Expresar ideas claramente" },
  { skill: "Liderazgo", icon: "👑", description: "Guiar e inspirar a otros" },
  { skill: "Empatía", icon: "💝", description: "Comprender emociones ajenas" },
  { skill: "Adaptabilidad", icon: "🦋", description: "Ajustarse a cambios" },
  { skill: "Creatividad", icon: "🎨", description: "Generar ideas innovadoras" },
  { skill: "Resiliencia", icon: "🌱", description: "Superar adversidades" }
];

const personalityTones = [
  { tone: "Optimista y Motivado", icon: "🌟", description: "Veo oportunidades en cada desafío" },
  { tone: "Reflexivo y Analítico", icon: "🤔", description: "Me gusta pensar profundamente antes de actuar" },
  { tone: "Colaborativo y Social", icon: "🤝", description: "Disfruto trabajando con otros" },
  { tone: "Determinado y Ambicioso", icon: "🚀", description: "Tengo metas claras y trabajo duro por ellas" },
  { tone: "Curioso y Aprendiz", icon: "🧠", description: "Siempre busco aprender algo nuevo" },
  { tone: "Cauteloso pero Decidido", icon: "⚖️", description: "Evalúo cuidadosamente antes de decidir" }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    interests: [] as string[],
    confidenceLevels: {} as Record<string, string>,
    personalityTone: "",
    goals: ""
  });
  const [isCompleting, setIsCompleting] = useState(false);
  const [profileGenerated, setProfileGenerated] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<{
    name: string;
    profileType: string;
    topInterests: string[];
    strongSkills: string[];
    developmentAreas: string[];
    personalityRecommendations: {
      approach: string;
      tips: string[];
    };
    nextSteps: string[];
    estimatedJourneyTime: string;
    coachingStyle: string;
  } | null>(null);

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const handleInterestToggle = (interest: string) => {
    setUserData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleConfidenceChange = (skill: string, level: string) => {
    setUserData(prev => ({
      ...prev,
      confidenceLevels: {
        ...prev.confidenceLevels,
        [skill]: level
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Función para generar el perfil personalizado
  const generatePersonalizedProfile = () => {
    const topInterests = userData.interests.slice(0, 3);
    const strongSkills = Object.entries(userData.confidenceLevels)
      .filter(([, level]) => level === 'Alto')
      .map(([skill]) => skill);
    const developmentAreas = Object.entries(userData.confidenceLevels)
      .filter(([, level]) => level === 'Bajo')
      .map(([skill]) => skill);

    // Generar recomendaciones basadas en la personalidad
    const getPersonalityRecommendations = (tone: string) => {
      switch (tone) {
        case "Optimista y Motivado":
          return {
            approach: "Enfoque energético con metas desafiantes",
            tips: ["Lidera proyectos inspiradores", "Motiva a otros con tu energía", "Mantén el optimismo en crisis"]
          };
        case "Reflexivo y Analítico":
          return {
            approach: "Desarrollo profundo y estratégico",
            tips: ["Analiza casos complejos", "Documenta tus reflexiones", "Busca patrones en tus interacciones"]
          };
        case "Colaborativo y Social":
          return {
            approach: "Crecimiento a través de la conexión humana",
            tips: ["Facilita dinámicas de equipo", "Practica mediación", "Construye redes profesionales"]
          };
        default:
          return {
            approach: "Desarrollo equilibrado y constante",
            tips: ["Establece rutinas de práctica", "Busca feedback regular", "Celebra pequeños logros"]
          };
      }
    };

    const personalityRec = getPersonalityRecommendations(userData.personalityTone);

    return {
      name: userData.name,
      profileType: userData.personalityTone,
      topInterests,
      strongSkills,
      developmentAreas,
      personalityRecommendations: personalityRec,
      nextSteps: [
        "Completar evaluación de casos interactivos",
        "Comenzar seguimiento diario de emociones",
        "Establecer metas semanales de habilidades blandas"
      ],
      estimatedJourneyTime: "4-6 semanas para ver resultados significativos",
      coachingStyle: personalityRec.approach
    };
  };

  const handleFinish = async () => {
    setIsCompleting(true);
    
    // Simular procesamiento del perfil
    setTimeout(() => {
      const profile = generatePersonalizedProfile();
      setGeneratedProfile(profile);
      
      // Guardar en localStorage (en una app real sería en base de datos)
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.setItem('currentStep', 'diagnostic');
      
      setProfileGenerated(true);
      setIsCompleting(false);
    }, 2000);
  };

  const handleContinueToNext = () => {
    // Redirigir al diagnóstico
    window.location.href = '/diagnostic';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 float-animation">🌱</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ¡Comencemos tu Journey!
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Descubre tu potencial humano y desarrolla las habilidades que realmente importan en el mundo profesional
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  ¿Cómo te llamas? 👋
                </label>
                <Input
                  placeholder="Tu nombre completo"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-lg py-3"
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  ¿Qué te gustaría lograr con tu crecimiento personal y profesional? 🎯
                </label>
                <Textarea
                  placeholder="Ejemplo: Quiero desarrollar mi capacidad de liderazgo para poder dirigir equipos de manera efectiva y crear un ambiente de trabajo positivo..."
                  value={userData.goals}
                  onChange={(e) => setUserData(prev => ({ ...prev, goals: e.target.value }))}
                  rows={4}
                  className="text-base"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 float-animation">🎯</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tus Habilidades de Interés
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Selecciona las habilidades blandas que más te interesan desarrollar
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {softSkillsInterests.map((interest) => (
                <Button
                  key={interest}
                  variant={userData.interests.includes(interest) ? "default" : "outline"}
                  onClick={() => handleInterestToggle(interest)}
                  className={`h-auto py-4 px-6 text-left justify-start transition-all duration-200 ${
                    userData.interests.includes(interest) 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'hover:shadow-md hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {userData.interests.includes(interest) ? '✨' : '🎭'}
                    </span>
                    <span className="font-medium">{interest}</span>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="text-center">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                {userData.interests.length} habilidad{userData.interests.length !== 1 ? 'es' : ''} seleccionada{userData.interests.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 float-animation">💪</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Autoevaluación de Confianza
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                ¿Qué tan confiado te sientes en estas habilidades blandas?
              </p>
            </div>
            
            <div className="space-y-6">
              {softSkillsToEvaluate.map((item) => (
                <Card key={item.skill} className="skill-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.skill}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['Bajo', 'Medio', 'Alto'].map((level) => (
                        <Button
                          key={level}
                          size="sm"
                          variant={userData.confidenceLevels[item.skill] === level ? "default" : "outline"}
                          onClick={() => handleConfidenceChange(item.skill, level)}
                          className={`flex-1 ${
                            userData.confidenceLevels[item.skill] === level 
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                              : 'hover:bg-orange-50'
                          }`}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 float-animation">🌈</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Tu Personalidad
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                ¿Cómo te describes a ti mismo en tu enfoque hacia el crecimiento?
              </p>
            </div>
            
            <div className="space-y-4">
              {personalityTones.map((item) => (
                <Card 
                  key={item.tone}
                  className={`skill-card cursor-pointer transition-all duration-200 ${
                    userData.personalityTone === item.tone 
                      ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-pink-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setUserData(prev => ({ ...prev, personalityTone: item.tone }))}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{item.tone}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      {userData.personalityTone === item.tone && (
                        <div className="text-2xl">✨</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {userData.personalityTone && (
              <div className="coach-message">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      ¡Perfecto! Vamos a personalizar tu experiencia basándose en tu personalidad.
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Tu journey será adaptado para maximizar tu potencial único.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        if (profileGenerated && generatedProfile) {
          return (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4 float-animation">🎉</div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ¡Tu Perfil está Listo!
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Hemos creado tu perfil personalizado de habilidades blandas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Perfil Principal */}
                <Card className="skill-card emotional-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">👤</span>
                      Tu Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Hola, {generatedProfile.name}! 👋</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Tipo: <span className="font-medium text-purple-600">{generatedProfile.profileType}</span>
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">🎯 Tus intereses principales:</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedProfile.topInterests.map((interest: string, index: number) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {generatedProfile.strongSkills.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">💪 Tus fortalezas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {generatedProfile.strongSkills.map((skill: string, index: number) => (
                            <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                              ✓ {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {generatedProfile.developmentAreas.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">🌱 Áreas de crecimiento:</h4>
                        <div className="flex flex-wrap gap-2">
                          {generatedProfile.developmentAreas.map((area: string, index: number) => (
                            <Badge key={index} className="bg-orange-100 text-orange-800 text-xs">
                              📈 {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recomendaciones */}
                <Card className="skill-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      Tu Plan Personalizado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">🧠 Enfoque recomendado:</h4>
                      <p className="text-sm text-gray-700 bg-purple-50 p-3 rounded-lg">
                        {generatedProfile.personalityRecommendations.approach}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">💡 Consejos personalizados:</h4>
                      <div className="space-y-2">
                        {generatedProfile.personalityRecommendations.tips.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span className="text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">⏱️ Tiempo estimado:</h4>
                      <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                        {generatedProfile.estimatedJourneyTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Próximos Pasos */}
              <Card className="skill-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    Tus Próximos Pasos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {generatedProfile.nextSteps.map((step: string, index: number) => (
                      <div key={index} className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="text-2xl mb-2">
                          {index === 0 ? '🎭' : index === 1 ? '💭' : '📈'}
                        </div>
                        <p className="text-sm font-medium text-gray-800">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      size="lg" 
                      onClick={handleContinueToNext}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8"
                    >
                      Comenzar Evaluación de Casos 🎭
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Tu perfil ha sido guardado y estará disponible en todo momento
                    </p>
                  </div>
                </CardContent>
              </Card>

              <CoachVirtual context="progress" className="animate-fade-in" />
            </div>
          );
        }

        if (isCompleting) {
          return (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4 animate-spin">⚙️</div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Generando tu Perfil...
                </h2>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  Estamos analizando tus respuestas para crear tu experiencia personalizada
                </p>
              </div>
              
              <div className="space-y-4">
                <Progress value={85} className="h-3" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Procesando tu personalidad y preferencias...
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg animate-pulse">
                  <div className="text-2xl mb-2">🧠</div>
                  <p className="text-sm font-medium">Analizando personalidad</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg animate-pulse">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-sm font-medium">Identificando fortalezas</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg animate-pulse">
                  <div className="text-2xl mb-2">📋</div>
                  <p className="text-sm font-medium">Creando plan personalizado</p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 float-animation">✨</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Resumen de tu Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Revisa tu información antes de generar tu perfil personalizado
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="skill-card">
                <CardHeader>
                  <CardTitle className="text-lg">📝 Tu información</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Nombre:</span> {userData.name}
                  </div>
                  <div>
                    <span className="font-medium">Personalidad:</span> {userData.personalityTone}
                  </div>
                  <div>
                    <span className="font-medium">Intereses ({userData.interests.length}):</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userData.interests.slice(0, 3).map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {userData.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{userData.interests.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="skill-card">
                <CardHeader>
                  <CardTitle className="text-lg">💪 Autoevaluación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(userData.confidenceLevels).map(([skill, level]) => (
                    <div key={skill} className="flex justify-between items-center">
                      <span className="text-sm">{skill}:</span>
                      <Badge 
                        className={`text-xs ${
                          level === 'Alto' ? 'bg-green-100 text-green-800' :
                          level === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {level}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleFinish}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
              >
                Generar Mi Perfil Personalizado ✨
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return userData.name.trim() !== "" && userData.goals.trim() !== "";
      case 1:
        return userData.interests.length > 0;
      case 2:
        return Object.keys(userData.confidenceLevels).length >= 3;
      case 3:
        return userData.personalityTone !== "";
      case 4:
        return true; // El último paso siempre puede proceder
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="skill-card emotional-glow">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-purple-600 border-purple-300">
                Paso {currentStep + 1} de {TOTAL_STEPS}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {currentStep === 4 ? 'Perfil Completo' : 'Autoconocimiento'}
              </Badge>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <CardDescription className="text-base">
              {currentStep === 4 ? 'Tu perfil personalizado de habilidades blandas' : 'Construyendo tu perfil de habilidades blandas'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            {renderStep()}
            
            {currentStep < 4 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="px-6"
                >
                  ← Anterior
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index <= currentStep 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {currentStep === 3 ? 'Finalizar ✨' : 'Siguiente →'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 