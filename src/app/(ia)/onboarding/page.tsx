"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TOTAL_STEPS = 4;

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
      default:
        return false;
    }
  };

  const handleFinish = () => {
    alert("¡Onboarding completado! 🎉 Tu perfil ha sido creado exitosamente.");
    // Aquí se guardarían los datos en la base de datos
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
                Autoconocimiento
              </Badge>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <CardDescription className="text-base">
              Construyendo tu perfil de habilidades blandas
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            {renderStep()}
            
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
              
              {currentStep === TOTAL_STEPS - 1 ? (
                <Button
                  onClick={handleFinish}
                  disabled={!canProceed()}
                  className="px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Finalizar ✨
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Siguiente →
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 