"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockDiagnosticResult, mockTestResults } from "@/data/mockData";

export default function DiagnosticPage() {
  const [currentTest, setCurrentTest] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const testData = [
    {
      id: "finanzas",
      title: "Análisis Financiero",
      description: "Evalúa tu capacidad para interpretar estados financieros",
      questions: [
        {
          id: "q1",
          question: "¿Qué ratio indica mejor la liquidez a corto plazo de una empresa?",
          options: [
            "ROE (Return on Equity)",
            "Ratio de liquidez corriente",
            "Ratio de endeudamiento",
            "Margen de utilidad neta"
          ],
          correct: 1
        },
        {
          id: "q2", 
          question: "Si una empresa tiene un flujo de caja negativo, significa que:",
          options: [
            "La empresa está en bancarrota",
            "Los gastos superan los ingresos en efectivo",
            "La empresa no es rentable",
            "Todas las anteriores"
          ],
          correct: 1
        }
      ]
    },
    {
      id: "marketing",
      title: "Marketing Digital",
      description: "Mide tu conocimiento en estrategias digitales",
      questions: [
        {
          id: "q3",
          question: "¿Qué métrica es más importante para medir el éxito de una campaña de awareness?",
          options: [
            "CTR (Click Through Rate)",
            "Impresiones y alcance",
            "Conversiones directas", 
            "ROI inmediato"
          ],
          correct: 1
        },
        {
          id: "q4",
          question: "En el funnel de marketing, ¿cuál es la etapa TOFU?",
          options: [
            "Conversión final",
            "Top of Funnel - Conciencia",
            "Retención de clientes",
            "Optimización de ventas"
          ],
          correct: 1
        }
      ]
    },
    {
      id: "softskills",
      title: "Habilidades Blandas",
      description: "Evalúa tu capacidad de comunicación y liderazgo",
      questions: [
        {
          id: "q5",
          question: "Tu equipo tiene opiniones divididas sobre un proyecto. ¿Cuál es tu primera acción?",
          options: [
            "Imponer tu criterio como líder",
            "Facilitar una reunión para escuchar todas las perspectivas",
            "Delegar la decisión al más experimentado",
            "Votar democráticamente"
          ],
          correct: 1
        },
        {
          id: "q6",
          question: "¿Cómo manejas el feedback negativo constructivo?",
          options: [
            "Lo tomo personal y me defiendo",
            "Lo ignoro si no estoy de acuerdo",
            "Agradezco, reflexiono y busco mejorar",
            "Pido ejemplos específicos únicamente"
          ],
          correct: 2
        }
      ]
    }
  ];

  const currentTestData = testData[currentTest];
  const totalTests = testData.length;
  const progress = ((currentTest + 1) / totalTests) * 100;

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex.toString()
    }));
  };

  const calculateScore = (testQuestions: any[]) => {
    let correct = 0;
    testQuestions.forEach(q => {
      if (answers[q.id] && parseInt(answers[q.id]) === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / testQuestions.length) * 100);
  };

  const nextTest = () => {
    if (currentTest < totalTests - 1) {
      setCurrentTest(currentTest + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevTest = () => {
    if (currentTest > 0) {
      setCurrentTest(currentTest - 1);
    }
  };

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎉 Resultados del Diagnóstico
            </CardTitle>
            <CardDescription>
              Aquí tienes tu perfil de habilidades personalizado
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {mockTestResults.map((result, index) => (
            <Card key={result.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{result.area}</CardTitle>
                  <Badge variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"}>
                    {result.score}%
                  </Badge>
                </div>
                <Progress value={result.score} className="mt-2" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">💪 Fortalezas</h4>
                    <ul className="text-sm space-y-1">
                      {result.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">🎯 Áreas de Mejora</h4>
                    <ul className="text-sm space-y-1">
                      {result.improvementAreas.map((area, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-blue-500">→</span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>🗺️ Rutas Recomendadas</CardTitle>
            <CardDescription>
              Basado en tus resultados, te sugerimos estos caminos de desarrollo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDiagnosticResult.recommendedPaths.map((path, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="text-2xl">
                    {index === 0 ? '🏆' : index === 1 ? '🚀' : '💡'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{path}</h4>
                  </div>
                  <Button size="sm" variant="outline">
                    Comenzar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">¿Listo para el siguiente paso?</h3>
              <p className="text-gray-600">
                Comienza a construir tu portafolio con retos prácticos
              </p>
              <Button size="lg" onClick={() => window.location.href = '/portfolio'}>
                Ir al Portafolio 📁
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Diagnóstico Personalizado</CardTitle>
              <CardDescription>
                Test {currentTest + 1} de {totalTests}: {currentTestData.title}
              </CardDescription>
            </div>
            <Badge variant="secondary">
              {Math.round(progress)}%
            </Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-2">{currentTestData.title}</h2>
            <p className="text-gray-600">{currentTestData.description}</p>
          </div>

          <div className="space-y-6">
            {currentTestData.questions.map((question, qIndex) => (
              <Card key={question.id} className="border-2">
                <CardHeader>
                  <CardTitle className="text-base">
                    Pregunta {qIndex + 1}: {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <Button
                        key={optIndex}
                        variant={answers[question.id] === optIndex.toString() ? "default" : "outline"}
                        onClick={() => handleAnswer(question.id, optIndex)}
                        className="w-full h-auto py-3 text-left justify-start"
                      >
                        <span className="mr-3 font-bold">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between pt-6 mt-6 border-t">
            <Button
              variant="outline"
              onClick={prevTest}
              disabled={currentTest === 0}
            >
              Test Anterior
            </Button>

            <Button
              onClick={nextTest}
              disabled={currentTestData.questions.some(q => !answers[q.id])}
            >
              {currentTest === totalTests - 1 ? 'Ver Resultados' : 'Siguiente Test'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="mt-6 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Progreso Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            {testData.map((test, index) => (
              <div key={test.id} className={`p-2 rounded ${index <= currentTest ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div className="text-sm font-medium">{test.title}</div>
                <div className="text-xs text-gray-600">
                  {index < currentTest ? '✅ Completado' : index === currentTest ? '🔄 En progreso' : '⏳ Pendiente'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 