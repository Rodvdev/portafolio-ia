"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CoachVirtual } from "@/components/ui/coach-virtual";
import { format } from "date-fns";

// Mock data for daily logs
const mockDailyLogs = [
  {
    id: "1",
    date: "2024-01-15",
    mood: "Motivado",
    reflection: "Hoy tuve una conversación difícil con un compañero, pero logré mantener la calma y encontrar una solución que funcionó para ambos. Me siento orgulloso de cómo manejé mi inteligencia emocional.",
    microHabits: ["Practicó escucha activa", "Mantuvo la calma bajo presión", "Buscó soluciones colaborativas"],
    emotionalInsights: ["Mejoró gestión de conflictos", "Desarrolló paciencia"],
    energyLevel: 8
  },
  {
    id: "2", 
    date: "2024-01-14",
    mood: "Reflexivo",
    reflection: "Reflexioné sobre mi estilo de comunicación después de una presentación. Noté que puedo mejorar en hacer más preguntas para involucrar a la audiencia.",
    microHabits: ["Autoevaluación post-presentación", "Identificó áreas de mejora"],
    emotionalInsights: ["Desarrolló autoconciencia", "Creció en humildad"],
    energyLevel: 6
  }
];

export default function DailyPage() {
  const [currentMood, setCurrentMood] = useState("");
  const [reflection, setReflection] = useState("");
  const [selectedMicroHabits, setSelectedMicroHabits] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [showHistory, setShowHistory] = useState(false);
  
  // Estado del cronómetro Pomodoro
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const moods = [
    { emoji: "🌟", label: "Motivado", color: "bg-yellow-100 text-yellow-800", description: "Lleno de energía y optimismo" },
    { emoji: "🧠", label: "Reflexivo", color: "bg-blue-100 text-blue-800", description: "Pensativo y analítico" },
    { emoji: "💪", label: "Determinado", color: "bg-purple-100 text-purple-800", description: "Enfocado en mis metas" },
    { emoji: "🤝", label: "Colaborativo", color: "bg-green-100 text-green-800", description: "Conectado con otros" },
    { emoji: "🌱", label: "En crecimiento", color: "bg-emerald-100 text-emerald-800", description: "Aprendiendo y mejorando" },
    { emoji: "😌", label: "Tranquilo", color: "bg-gray-100 text-gray-800", description: "En paz y equilibrio" },
    { emoji: "🔥", label: "Inspirado", color: "bg-orange-100 text-orange-800", description: "Creativo y motivado" },
    { emoji: "🤔", label: "Curioso", color: "bg-indigo-100 text-indigo-800", description: "Explorando nuevas ideas" }
  ];

  const microHabits = [
    { id: "active_listening", label: "Practiqué escucha activa", icon: "👂", category: "Comunicación" },
    { id: "empathy_moment", label: "Mostré empatía genuina", icon: "💝", category: "Empatía" },
    { id: "calm_under_pressure", label: "Mantuve la calma bajo presión", icon: "🧘", category: "Resiliencia" },
    { id: "asked_feedback", label: "Pedí feedback constructivo", icon: "🔄", category: "Crecimiento" },
    { id: "helped_colleague", label: "Ayudé a un compañero", icon: "🤝", category: "Colaboración" },
    { id: "creative_solution", label: "Propuse una solución creativa", icon: "💡", category: "Creatividad" },
    { id: "led_by_example", label: "Lideré con el ejemplo", icon: "🌟", category: "Liderazgo" },
    { id: "adapted_to_change", label: "Me adapté a un cambio", icon: "🦋", category: "Adaptabilidad" },
    { id: "positive_mindset", label: "Mantuve actitud positiva", icon: "😊", category: "Optimismo" },
    { id: "learned_something", label: "Aprendí algo nuevo", icon: "📚", category: "Aprendizaje" }
  ];

  const reflectionPrompts = [
    "¿Qué situación me retó emocionalmente hoy y cómo la manejé?",
    "¿En qué momento sentí que mis habilidades blandas marcaron la diferencia?",
    "¿Qué aprendí sobre mí mismo en mis interacciones con otros?",
    "¿Cómo puedo aplicar lo que viví hoy para crecer profesionalmente?",
    "¿Qué patrón emocional noté en mí que quiero desarrollar más?"
  ];

  const [currentPrompt] = useState(
    reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)]
  );

  // Pomodoro functions (keeping existing logic)
  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsPaused(false);
          
          if (sessionType === 'work') {
            setCompletedSessions(prev => prev + 1);
            const newSessionCount = completedSessions + 1;
            if (newSessionCount % 4 === 0) {
              setTimeLeft(15 * 60); // Long break
              setSessionType('break');
            } else {
              setTimeLeft(5 * 60); // Short break
              setSessionType('break');
            }
          } else {
            setTimeLeft(25 * 60); // Work session
            setSessionType('work');
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setIsRunning(true);
    setIsPaused(false);
  }, [sessionType, completedSessions]);

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(sessionType === 'work' ? 25 * 60 : (completedSessions % 4 === 0 ? 15 * 60 : 5 * 60));
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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

  const handleMicroHabitToggle = (habitId: string) => {
    setSelectedMicroHabits(prev => 
      prev.includes(habitId) 
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleSaveEntry = () => {
    if (!currentMood || !reflection.trim()) {
      alert("Por favor completa tu estado emocional y reflexión");
      return;
    }
    
    alert("¡Entrada guardada exitosamente! 🎉 Tu crecimiento emocional ha sido registrado.");
    setCurrentMood("");
    setReflection("");
    setSelectedMicroHabits([]);
    setEnergyLevel(5);
  };

  const canSave = currentMood && reflection.trim() && selectedMicroHabits.length > 0;

  if (showHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
          <Card className="skill-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    📚 Tu Journey Emocional
                  </CardTitle>
                  <CardDescription>
                    El registro de tu crecimiento en habilidades blandas
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setShowHistory(false)}>
                  Nueva Reflexión
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockDailyLogs.map((log) => (
              <Card key={log.id} className="skill-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {moods.find(m => m.label === log.mood)?.emoji || "🤔"}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{log.mood}</CardTitle>
                        <CardDescription>
                          {format(new Date(log.date), "dd/MM/yyyy")}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Energía</div>
                      <div className="text-lg font-bold text-purple-600">{log.energyLevel}/10</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">💭 Reflexión</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
                        {log.reflection}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">🌱 Micro-hábitos practicados</h4>
                      <div className="flex flex-wrap gap-2">
                        {log.microHabits.map((habit, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                            ✓ {habit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">🧠 Insights emocionales</h4>
                      <div className="flex flex-wrap gap-2">
                        {log.emotionalInsights.map((insight, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                            💡 {insight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4 float-animation">💭</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Reflexión Diaria
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conecta con tus emociones y desarrolla tu inteligencia emocional
          </p>
          <Button variant="outline" onClick={() => setShowHistory(true)}>
            Ver Mi Journey 📚
          </Button>
        </div>

        {/* Coach Virtual */}
        <CoachVirtual context="daily" className="animate-fade-in" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Reflection Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Selection */}
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌈 ¿Cómo te sientes hoy?
                </CardTitle>
                <CardDescription>
                  Selecciona el estado emocional que mejor te describe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {moods.map((mood) => (
                    <div
                      key={mood.label}
                      className={`mood-selector ${currentMood === mood.label ? 'active' : ''}`}
                      onClick={() => setCurrentMood(mood.label)}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{mood.emoji}</div>
                        <div className="font-medium text-sm">{mood.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{mood.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Energy Level */}
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚡ Nivel de Energía
                </CardTitle>
                <CardDescription>
                  ¿Qué tan energético te sientes? (1 = Muy bajo, 10 = Muy alto)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Muy bajo</span>
                    <span className="text-2xl font-bold text-purple-600">{energyLevel}</span>
                    <span className="text-sm text-gray-600">Muy alto</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="grid grid-cols-10 gap-1 text-xs text-gray-400">
                    {Array.from({length: 10}, (_, i) => (
                      <div key={i} className="text-center">{i + 1}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reflection */}
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📝 Reflexión del Día
                </CardTitle>
                <CardDescription>
                  Pregunta guía: {currentPrompt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Comparte tu reflexión sobre el día, enfocándote en tus emociones, interacciones y aprendizajes..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={6}
                  className="text-base leading-relaxed"
                />
              </CardContent>
            </Card>

            {/* Micro-habits */}
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌱 Micro-hábitos de Hoy
                </CardTitle>
                <CardDescription>
                  Selecciona las habilidades blandas que practicaste hoy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {microHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedMicroHabits.includes(habit.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => handleMicroHabitToggle(habit.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{habit.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{habit.label}</div>
                          <div className="text-xs text-gray-500">{habit.category}</div>
                        </div>
                        {selectedMicroHabits.includes(habit.id) && (
                          <div className="text-purple-600">✓</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Badge className="bg-purple-100 text-purple-800">
                    {selectedMicroHabits.length} hábitos seleccionados
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Card className="skill-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="font-semibold text-lg">¿Listo para registrar tu crecimiento?</h3>
                  <p className="text-gray-600">
                    Tu reflexión será analizada para generar insights personalizados sobre tu desarrollo emocional
                  </p>
                  <Button 
                    size="lg" 
                    onClick={handleSaveEntry}
                    disabled={!canSave}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
                  >
                    Guardar Mi Reflexión ✨
                  </Button>
                  {!canSave && (
                    <p className="text-sm text-gray-500">
                      Completa tu estado emocional, reflexión y al menos un micro-hábito
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Pomodoro Timer */}
          <div className="space-y-6">
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🍅 Enfoque Profundo
                </CardTitle>
                <CardDescription>
                  Técnica Pomodoro avanzada con mantras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-purple-600">
                    {formatTime(timeLeft)}
                  </div>
                  
                  <Progress value={getProgress()} className="h-3" />
                  
                  <div className="text-sm text-gray-600">
                    {sessionType === 'work' ? '💭 Tiempo de reflexión' : '☕ Descanso'}
                  </div>
                  
                  <div className="flex gap-2">
                    {!isRunning && !isPaused && (
                      <Button onClick={startTimer} size="sm" className="flex-1">
                        Iniciar
                      </Button>
                    )}
                    {isRunning && (
                      <Button onClick={pauseTimer} size="sm" variant="outline" className="flex-1">
                        Pausar
                      </Button>
                    )}
                    {isPaused && (
                      <Button onClick={startTimer} size="sm" className="flex-1">
                        Continuar
                      </Button>
                    )}
                    <Button onClick={resetTimer} size="sm" variant="outline">
                      Reset
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Sesiones completadas: {completedSessions}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.location.href = '/focus'}
                    >
                      🚀 Enfoque Avanzado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card className="skill-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Tu Progreso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">7</div>
                      <div className="text-xs text-gray-600">Días activos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round((completedSessions * 25 + 180) / 60 * 10) / 10}h
                      </div>
                      <div className="text-xs text-gray-600">Tiempo reflexión</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">23</div>
                      <div className="text-xs text-gray-600">Micro-hábitos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">🌟</div>
                      <div className="text-xs text-gray-600">Estado promedio</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 