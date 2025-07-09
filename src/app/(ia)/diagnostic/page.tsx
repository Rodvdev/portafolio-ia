"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InteractiveTest } from "@/components/ui/interactive-test";
import { SocialSharing } from "@/components/ui/social-sharing";
import { useUserProgress } from "@/hooks/useLocalStorage";

interface TestResult {
  totalScore: number;
  skillScores: Record<string, number>;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

export default function DiagnosticPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { } = useUserProgress(); // useUserProgress available for future features

  const availableTests = [
    {
      id: "communication",
      title: "Comunicación Efectiva",
      description: "Evalúa tu capacidad para comunicarte claramente en situaciones profesionales",
      icon: "💬",
      color: "bg-blue-100 text-blue-800",
      estimatedTime: "8-10 min"
    },
    {
      id: "leadership",
      title: "Liderazgo",
      description: "Mide tu potencial para liderar equipos y tomar decisiones difíciles",
      icon: "👑",
      color: "bg-purple-100 text-purple-800",
      estimatedTime: "10-12 min"
    },
    {
      id: "teamwork",
      title: "Trabajo en Equipo",
      description: "Evalúa tu habilidad para colaborar y trabajar efectivamente con otros",
      icon: "🤝",
      color: "bg-green-100 text-green-800",
      estimatedTime: "6-8 min"
    },
    {
      id: "problem-solving",
      title: "Resolución de Problemas",
      description: "Mide tu capacidad para analizar y resolver desafíos complejos",
      icon: "🧩",
      color: "bg-orange-100 text-orange-800",
      estimatedTime: "8-10 min"
    }
  ];

  const handleTestComplete = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
    setSelectedTest(null);
      setShowResults(true);
  };

  const handleStartTest = (testId: string) => {
    setSelectedTest(testId);
    setShowResults(false);
  };

  const getOverallScore = () => {
    if (testResults.length === 0) return 0;
    return Math.round(testResults.reduce((sum, result) => sum + result.totalScore, 0) / testResults.length);
  };

  const getAllStrengths = () => {
    const strengths = testResults.flatMap(result => result.strengths);
    return [...new Set(strengths)];
  };

  const getAllImprovements = () => {
    const improvements = testResults.flatMap(result => result.improvements);
    return [...new Set(improvements)];
  };

  if (selectedTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTest(null)}
              className="mb-4"
            >
              ← Volver a Tests
            </Button>
          </div>

          <InteractiveTest 
            testType={selectedTest as "communication" | "leadership" | "teamwork" | "problem-solving"}
            onComplete={handleTestComplete}
          />
                    </div>
                  </div>
    );
  }

  if (showResults && testResults.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">🎯 Resultados del Diagnóstico</CardTitle>
                  <CardDescription>
                    Análisis completo de tus habilidades blandas
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowResults(false)}
                >
                  Hacer Más Tests
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="text-center">
                <CardTitle className="text-green-800">Puntuación General</CardTitle>
                </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {getOverallScore()}%
                    </div>
                <Progress value={getOverallScore()} className="h-2" />
                <p className="text-sm text-green-700 mt-2">
                  Basado en {testResults.length} test{testResults.length > 1 ? 's' : ''} completado{testResults.length > 1 ? 's' : ''}
                </p>
                </CardContent>
              </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="text-center">
                <CardTitle className="text-purple-800">Fortalezas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getAllStrengths().slice(0, 3).map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm capitalize">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader className="text-center">
                <CardTitle className="text-orange-800">Áreas de Mejora</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getAllImprovements().slice(0, 3).map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-orange-500">→</span>
                      <span className="text-sm capitalize">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
            <CardHeader>
                <CardTitle>📊 Detalle por Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  {testResults.map((result, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Test {index + 1}</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {result.totalScore}%
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <strong>Fortalezas:</strong> {result.strengths.join(', ')}
                          </div>
                        </div>
                      ))}
              </div>
            </CardContent>
          </Card>

            <SocialSharing 
              type="progress"
              title="Completé mi diagnóstico de habilidades blandas"
              description={`Puntuación: ${getOverallScore()}% - ${testResults.length} tests completados`}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🚀 Próximos Pasos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Construye tu Portafolio</h4>
                  <p className="text-sm text-blue-700">
                    Aplica tus habilidades en proyectos reales y obtén feedback de IA
                  </p>
                  <Button className="mt-2 bg-blue-600 hover:bg-blue-700" size="sm">
                    Ir al Portafolio
                  </Button>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Reflexión Diaria</h4>
                  <p className="text-sm text-green-700">
                    Desarrolla tus habilidades día a día con práctica consciente
                  </p>
                  <Button className="mt-2 bg-green-600 hover:bg-green-700" size="sm">
                    Comenzar Hoy
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <CardTitle className="text-3xl">Diagnóstico de Habilidades Blandas</CardTitle>
              <CardDescription className="text-lg mt-2">
                Descubre tus fortalezas y áreas de mejora a través de casos interactivos
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{test.icon}</div>
                  <Badge className={test.color}>
                    {test.estimatedTime}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Evalúa:</strong> Situaciones profesionales reales
              </div>
                  <div className="text-sm text-gray-600">
                    <strong>Formato:</strong> Casos interactivos con feedback
              </div>
                  <Button
                    onClick={() => handleStartTest(test.id)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Comenzar Test
                  </Button>
                </div>
              </CardContent>
            </Card>
                ))}
              </div>

        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>📈 Tu Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Tests completados: {testResults.length} de {availableTests.length}
                  </p>
                  <Progress 
                    value={(testResults.length / availableTests.length) * 100} 
                    className="mt-2 w-64"
                />
              </div>
              <Button
                variant="outline"
                  onClick={() => setShowResults(true)}
                >
                  Ver Resultados
              </Button>
            </div>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
} 