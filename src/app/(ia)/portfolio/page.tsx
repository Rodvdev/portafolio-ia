"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockPortfolioItems, mockChallenges } from "@/data/mockData";

export default function PortfolioPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Finanzas': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-purple-100 text-purple-800', 
      'Producto': 'bg-green-100 text-green-800',
      'Investigación': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'Básico': 'bg-green-500',
      'Intermedio': 'bg-yellow-500', 
      'Avanzado': 'bg-red-500'
    };
    return colors[level] || 'bg-gray-500';
  };

  if (showPortfolio) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  📁 Mi Portafolio Profesional
                </CardTitle>
                <CardDescription>
                  Proyectos completados que validan tus habilidades
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setShowPortfolio(false)}>
                Nuevos Retos
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {mockPortfolioItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getLevelColor(item.level)}`}
                      >
                        {item.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  {item.badgeUrl && (
                    <div className="text-3xl">🏆</div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">💬 Feedback IA</h4>
                    <p className="text-sm text-blue-800">
                      {item.feedback}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Ver Detalle
                    </Button>
                    <Button size="sm" variant="outline">
                      Descargar
                    </Button>
                    <Button size="sm" variant="outline">
                      Compartir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>📊 Resumen de Competencias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Proyectos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">Áreas de Especialización</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">78%</div>
                <div className="text-sm text-gray-600">Score Promedio</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedChallenge) {
    const challenge = mockChallenges.find(c => c.id === selectedChallenge);
    if (!challenge) return null;

    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedChallenge(null)}>
                Volver
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className={getCategoryColor(challenge.category)}>
                  {challenge.category}
                </Badge>
                <Badge variant="secondary">{challenge.level}</Badge>
                <Badge variant="outline">⏱️ {challenge.duration}</Badge>
              </div>

              <div>
                <h3 className="font-medium mb-2">🎯 Habilidades que desarrollarás:</h3>
                <div className="flex gap-2 flex-wrap">
                  {challenge.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">📋 Instrucciones del Reto</h3>
                <div className="space-y-3 text-sm">
                  <p><strong>Paso 1:</strong> Analiza el archivo de datos proporcionado</p>
                  <p><strong>Paso 2:</strong> Identifica patrones y métricas clave</p>
                  <p><strong>Paso 3:</strong> Crea un dashboard con insights actionables</p>
                  <p><strong>Paso 4:</strong> Presenta tus recomendaciones estratégicas</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Entregables Esperados</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Archivo Excel con análisis completo</li>
                  <li>• Presentación de máximo 10 slides</li>
                  <li>• Resumen ejecutivo de 1 página</li>
                  <li>• Video explicativo de 3-5 minutos</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Button size="lg" className="w-full">
                  🚀 Comenzar Reto
                </Button>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-medium">Progreso</div>
                    <Progress value={0} className="mt-1" />
                  </div>
                  <div>
                    <div className="font-medium">Tiempo</div>
                    <div className="text-gray-600">0/180 min</div>
                  </div>
                  <div>
                    <div className="font-medium">Status</div>
                    <div className="text-gray-600">No iniciado</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                💼 Constructor de Portafolio
              </CardTitle>
              <CardDescription>
                Completa retos prácticos para validar tus habilidades
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setShowPortfolio(true)}>
              Ver Portafolio
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockChallenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(challenge.category)}>
                  {challenge.category}
                </Badge>
                <Badge 
                  variant="secondary"
                  className={`text-white ${getLevelColor(challenge.level)}`}
                >
                  {challenge.level}
                </Badge>
              </div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">⏱️ Duración:</span>
                  <span className="font-medium">{challenge.duration}</span>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">🎯 Habilidades:</div>
                  <div className="flex gap-1 flex-wrap">
                    {challenge.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {challenge.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{challenge.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => setSelectedChallenge(challenge.id)}
                >
                  Comenzar Reto
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🎯 Ruta de Aprendizaje Sugerida</CardTitle>
          <CardDescription>
            Basado en tu diagnóstico, te recomendamos este orden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockChallenges.map((challenge, index) => (
              <div key={challenge.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="text-2xl">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{challenge.title}</h4>
                  <p className="text-sm text-gray-600">{challenge.category} - {challenge.level}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {challenge.duration}
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedChallenge(challenge.id)}
                >
                  Iniciar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 