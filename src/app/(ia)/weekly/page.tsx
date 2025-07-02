"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockWeeklySummary } from "@/data/mockData";

export default function WeeklyPage() {
  const shareToLinkedIn = () => {
    const text = encodeURIComponent(mockWeeklySummary.shareableHighlights);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://portafolio-ia.com&text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Resumen Semanal
          </CardTitle>
          <CardDescription>
            Semana del {mockWeeklySummary.weekStart} al {mockWeeklySummary.weekEnd}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Logros de la semana */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Nuevas Badges Obtenidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            {mockWeeklySummary.badgesEarned.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 p-4 border-2 border-dashed border-green-300 bg-green-50 rounded-lg">
                <div className="text-3xl">🏆</div>
                <div>
                  <div className="font-medium text-green-800">{badge}</div>
                  <div className="text-sm text-green-600">¡Recién obtenida!</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights principales */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Insights de tu Progreso</CardTitle>
          <CardDescription>
            Análisis automático de tu rendimiento semanal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWeeklySummary.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-600 mt-1">
                  {index === 0 ? '📈' : index === 1 ? '💪' : index === 2 ? '🚀' : '⭐'}
                </div>
                <div className="text-blue-800 text-sm">{insight}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas de la semana */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📚 Actividad de Aprendizaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Proyectos Completados</span>
                <span className="font-bold">3/3</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Días Activos</span>
                <span className="font-bold">5/7</span>
              </div>
              <Progress value={71} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Tiempo de Enfoque</span>
                <span className="font-bold">12.5h</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Objetivos Cumplidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-green-500">✅</div>
                <div className="text-sm">Completar reto de finanzas</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-green-500">✅</div>
                <div className="text-sm">Escribir 5 reflexiones diarias</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-green-500">✅</div>
                <div className="text-sm">Obtener certificación básica</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-yellow-500">⏳</div>
                <div className="text-sm">Conectar con 3 profesionales</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparación con semanas anteriores */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Tendencias de Progreso</CardTitle>
          <CardDescription>
            Comparación con las últimas 4 semanas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+15%</div>
              <div className="text-sm text-green-700">Tiempo de enfoque</div>
              <div className="text-xs text-green-600">vs semana anterior</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">+2</div>
              <div className="text-sm text-blue-700">Proyectos completados</div>
              <div className="text-xs text-blue-600">Nuevo récord personal</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-purple-700">Consistencia diaria</div>
              <div className="text-xs text-purple-600">Excelente racha</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">A+</div>
              <div className="text-sm text-orange-700">Calidad promedio</div>
              <div className="text-xs text-orange-600">Mejorando constantemente</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones para la próxima semana */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Recomendaciones para la Próxima Semana</CardTitle>
          <CardDescription>
            Sugerencias personalizadas basadas en tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🚀 Desafío Semanal</h4>
              <p className="text-sm text-blue-800">
                Intenta completar el reto de Marketing Digital avanzado. Basado en tu fortaleza en análisis, 
                te será más fácil conectar ambas disciplinas.
              </p>
            </div>
            
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">💡 Área de Mejora</h4>
              <p className="text-sm text-green-800">
                Considera dedicar 30 minutos adicionales diarios a networking profesional. 
                Tu perfil técnico está fuerte, ahora es momento de ampliar tu red.
              </p>
            </div>
            
            <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">🎓 Oportunidad de Crecimiento</h4>
              <p className="text-sm text-purple-800">
                Hay una certificación en Análisis de Datos que encaja perfectamente con tu trayectoria. 
                Podrías completarla en 2-3 sesiones de estudio.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compartir logros */}
      <Card>
        <CardHeader>
          <CardTitle>🌟 Comparte tus Logros</CardTitle>
          <CardDescription>
            Celebra tu progreso y motiva a otros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border rounded-lg">
              <p className="text-sm font-medium mb-2">Post sugerido para LinkedIn:</p>
              <p className="text-sm text-gray-700 italic">
                "{mockWeeklySummary.shareableHighlights}"
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={shareToLinkedIn} className="flex-1">
                Compartir en LinkedIn 💼
              </Button>
              <Button variant="outline" className="flex-1">
                Copiar al Portapapeles 📋
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navegación */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">¿Listo para la próxima semana?</h3>
              <p className="text-sm text-gray-600">
                Continúa construyendo tu portafolio profesional
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.location.href = '/daily'}>
                Diario Hoy 📔
              </Button>
              <Button onClick={() => window.location.href = '/portfolio'}>
                Nuevos Retos 🚀
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 