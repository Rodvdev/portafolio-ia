"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockOnboardingData } from "@/data/mockData";

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    interests: [] as string[],
    skillLevels: {} as Record<string, string>,
    emotionalTone: "",
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

  const handleSkillLevelChange = (skill: string, level: string) => {
    setUserData(prev => ({
      ...prev,
      skillLevels: {
        ...prev.skillLevels,
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
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">👋 ¡Bienvenido!</h2>
              <p className="text-gray-600">
                Comencemos conociendo un poco sobre ti
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  ¿Cómo te llamas?
                </label>
                <Input
                  placeholder="Tu nombre completo"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  ¿Qué quieres lograr con esta plataforma?
                </label>
                <Textarea
                  placeholder="Describe tus metas profesionales y qué esperas conseguir..."
                  value={userData.goals}
                  onChange={(e) => setUserData(prev => ({ ...prev, goals: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">🎯 Tus Intereses</h2>
              <p className="text-gray-600">
                Selecciona las áreas que más te llaman la atención
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {mockOnboardingData.interests.map((interest) => (
                <Button
                  key={interest}
                  variant={userData.interests.includes(interest) ? "default" : "outline"}
                  onClick={() => handleInterestToggle(interest)}
                  className="h-auto py-3 text-left"
                >
                  {interest}
                </Button>
              ))}
            </div>
            
            <div className="text-center">
              <Badge variant="secondary">
                {userData.interests.length} área{userData.interests.length !== 1 ? 's' : ''} seleccionada{userData.interests.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">💪 Tus Habilidades</h2>
              <p className="text-gray-600">
                Evalúa tu nivel actual en diferentes competencias
              </p>
            </div>
            
            <div className="space-y-4">
              {mockOnboardingData.skills.map((skill) => (
                <div key={skill} className="space-y-2">
                  <label className="block text-sm font-medium">{skill}</label>
                  <div className="flex gap-2">
                    {['Básico', 'Intermedio', 'Avanzado'].map((level) => (
                      <Button
                        key={level}
                        size="sm"
                        variant={userData.skillLevels[skill] === level ? "default" : "outline"}
                        onClick={() => handleSkillLevelChange(skill, level)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">😊 Tu Estado Actual</h2>
              <p className="text-gray-600">
                ¿Cómo te sientes respecto a tu desarrollo profesional?
              </p>
            </div>
            
            <div className="space-y-3">
              {mockOnboardingData.emotionalTones.map((tone) => (
                <Button
                  key={tone}
                  variant={userData.emotionalTone === tone ? "default" : "outline"}
                  onClick={() => setUserData(prev => ({ ...prev, emotionalTone: tone }))}
                  className="w-full h-auto py-3 text-left justify-start"
                >
                  {tone}
                </Button>
              ))}
            </div>
            
            {userData.emotionalTone && (
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Perfecto! Vamos a personalizar tu experiencia basándose en esto.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Configuración Inicial</CardTitle>
              <CardDescription>
                Paso {currentStep + 1} de {TOTAL_STEPS}
              </CardDescription>
            </div>
            <Badge variant="secondary">
              {Math.round(progress)}%
            </Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent className="pt-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6 mt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>
            
            <Button
              onClick={currentStep === TOTAL_STEPS - 1 ? () => {
                // Simular completar onboarding
                alert('¡Onboarding completado! 🎉\nTus datos han sido guardados.');
                window.location.href = '/diagnostic';
              } : nextStep}
              disabled={
                (currentStep === 0 && (!userData.name || !userData.goals)) ||
                (currentStep === 1 && userData.interests.length === 0) ||
                (currentStep === 2 && Object.keys(userData.skillLevels).length === 0) ||
                (currentStep === 3 && !userData.emotionalTone)
              }
            >
              {currentStep === TOTAL_STEPS - 1 ? 'Completar' : 'Siguiente'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Debug Panel - Solo para demo */}
      <Card className="mt-6 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Debug - Datos capturados</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(userData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
} 