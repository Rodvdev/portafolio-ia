"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { mockDailyLogs } from "@/data/mockData";
import { format } from "date-fns";

export default function DailyPage() {
  const [currentMood, setCurrentMood] = useState("");
  const [reflection, setReflection] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  
  // Estado del cronómetro Pomodoro
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos en segundos
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const moods = [
    { emoji: "😊", label: "Motivado", color: "bg-green-100 text-green-800" },
    { emoji: "🤔", label: "Reflexivo", color: "bg-blue-100 text-blue-800" },
    { emoji: "😤", label: "Desafiado", color: "bg-orange-100 text-orange-800" },
    { emoji: "😴", label: "Cansado", color: "bg-gray-100 text-gray-800" },
    { emoji: "🚀", label: "Productivo", color: "bg-purple-100 text-purple-800" },
    { emoji: "😰", label: "Ansioso", color: "bg-red-100 text-red-800" }
  ];

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    
    if (sessionType === 'work') {
      setCompletedSessions(prev => prev + 1);
      // Después de 4 sesiones de trabajo, break largo
      const nextBreakTime = completedSessions % 4 === 3 ? 15 * 60 : 5 * 60;
      setTimeLeft(nextBreakTime);
      setSessionType('break');
      alert(`¡Excelente! 🎉\nSesión de enfoque completada.\nToma un descanso de ${nextBreakTime === 15 * 60 ? '15' : '5'} minutos.`);
    } else {
      setTimeLeft(25 * 60);
      setSessionType('work');
      alert('¡Descanso terminado! 💪\n¿Listo para otra sesión de enfoque?');
    }
  }, [sessionType, completedSessions]);

  // Efecto para el cronómetro
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, handleTimerComplete]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };



  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (sessionType === 'work') {
      setTimeLeft(25 * 60);
    } else {
      const breakTime = completedSessions % 4 === 0 ? 15 * 60 : 5 * 60;
      setTimeLeft(breakTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = sessionType === 'work' ? 25 * 60 : 
      (completedSessions % 4 === 0 ? 15 * 60 : 5 * 60);
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handleSaveEntry = () => {
    if (!currentMood || !reflection) {
      alert("Por favor completa tanto tu estado de ánimo como tu reflexión");
      return;
    }
    
    alert("¡Entrada guardada exitosamente! 🎉");
    setCurrentMood("");
    setReflection("");
  };

  if (showHistory) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  📚 Historial de Reflexiones
                </CardTitle>
                <CardDescription>
                  Tu journey de aprendizaje día a día
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setShowHistory(false)}>
                Nueva Entrada
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {mockDailyLogs.map((log) => (
            <Card key={log.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">
                      {moods.find(m => m.label === log.mood)?.emoji || "🤔"}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{log.mood}</CardTitle>
                      <CardDescription>
                        {format(new Date(log.date), "dd/MM/yyyy")}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {log.actionsSuggested.length} sugerencias
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">💭 Reflexión del día</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {log.reflection}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">🎯 Sugerencias IA</h4>
                    <div className="space-y-2">
                      {log.actionsSuggested.map((action, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                          <div className="text-blue-600">→</div>
                          <div className="text-sm text-blue-800">{action}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                📔 Diario de Aprendizaje
              </CardTitle>
              <CardDescription>
                Reflexiona sobre tu progreso diario
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setShowHistory(true)}>
              Ver Historial
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>¿Cómo te sientes hoy?</CardTitle>
          <CardDescription>
            Selecciona tu estado de ánimo actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.label}
                variant={currentMood === mood.label ? "default" : "outline"}
                onClick={() => setCurrentMood(mood.label)}
                className="h-auto py-4 flex flex-col gap-2"
              >
                <div className="text-2xl">{mood.emoji}</div>
                <div className="text-sm">{mood.label}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reflexión del día</CardTitle>
          <CardDescription>
            Comparte tus aprendizajes, retos y pensamientos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="¿Qué aprendiste hoy? ¿Qué retos enfrentaste? ¿Cómo te sientes sobre tu progreso?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={6}
            />
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Preguntas guía</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• ¿Qué concepto nuevo aprendiste?</li>
                <li>• ¿Qué habilidad practicaste?</li>
                <li>• ¿Con qué dificultades te encontraste?</li>
                <li>• ¿Cómo aplicarías lo aprendido?</li>
                <li>• ¿Qué quieres mejorar mañana?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cronómetro Pomodoro Funcional */}
      <Card className={`border-2 ${sessionType === 'work' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                ⏱️ Cronómetro de Enfoque
                {sessionType === 'work' ? '🎯' : '☕'}
              </CardTitle>
              <CardDescription>
                {sessionType === 'work' 
                  ? 'Sesión de enfoque Pomodoro (25 min)' 
                  : `Descanso ${completedSessions % 4 === 0 ? 'largo (15 min)' : 'corto (5 min)'}`
                }
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Sesiones completadas</div>
              <div className="text-2xl font-bold text-blue-600">{completedSessions}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className={`text-5xl font-mono font-bold ${
              sessionType === 'work' ? 'text-blue-600' : 'text-green-600'
            }`}>
              {formatTime(timeLeft)}
            </div>
            
            <Progress 
              value={getProgress()} 
              className={`h-3 ${sessionType === 'work' ? '' : 'bg-green-100'}`}
            />
            
            <div className="flex justify-center gap-2">
              {!isRunning ? (
                <Button onClick={startTimer} size="lg">
                  {isPaused ? 'Reanudar' : 'Iniciar'} ▶️
                </Button>
              ) : (
                <Button onClick={pauseTimer} variant="outline" size="lg">
                  Pausar ⏸️
                </Button>
              )}
              
              <Button onClick={resetTimer} variant="outline" size="lg">
                Reset 🔄
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium">Estado</div>
                <div className={`text-xs px-2 py-1 rounded ${
                  isRunning ? 'bg-green-100 text-green-800' : 
                  isPaused ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {isRunning ? (isPaused ? 'Pausado' : 'Corriendo') : 'Detenido'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Tipo</div>
                <div className={`text-xs px-2 py-1 rounded ${
                  sessionType === 'work' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {sessionType === 'work' ? 'Enfoque' : 'Descanso'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Progreso</div>
                <div className="text-xs text-gray-600">
                  {Math.round(getProgress())}%
                </div>
              </div>
            </div>
            
            {completedSessions > 0 && (
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-800">
                  🎉 ¡Has completado {completedSessions} sesión{completedSessions > 1 ? 'es' : ''} de enfoque hoy!
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Tiempo total: {Math.round(completedSessions * 25)} minutos
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">¿Listo para guardar tu entrada?</h3>
              <p className="text-sm text-gray-600">
                Tu reflexión será analizada por IA para sugerencias personalizadas
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleSaveEntry}
              disabled={!currentMood || !reflection}
            >
              Guardar Entrada 💾
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas actualizadas */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Tu Progreso Esta Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">Días Activos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((completedSessions * 25 + 200) / 60 * 10) / 10}h
              </div>
              <div className="text-sm text-gray-600">Tiempo Enfocado</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">😊</div>
              <div className="text-sm text-gray-600">Mood Promedio</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 