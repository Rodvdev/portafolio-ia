"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUserProgress } from "@/hooks/useLocalStorage";
import { SocialSharing } from "@/components/ui/social-sharing";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Circle, 
  Plus,
  Clock,
  Users,
  Brain,
  Zap
} from "lucide-react";

interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  type: 'projects' | 'tests' | 'daily_logs' | 'streak' | 'points' | 'custom';
  completed: boolean;
  createdAt: string;
}

interface WeeklyInsight {
  type: 'improvement' | 'strength' | 'recommendation' | 'achievement';
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function WeeklyPage() {
  const { progress } = useUserProgress();
  const [currentWeek] = useState(getCurrentWeek());
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: 1,
    type: 'projects' as WeeklyGoal['type']
  });

  // Obtener semana actual
  function getCurrentWeek() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return {
      start: startOfWeek,
      end: endOfWeek,
      weekNumber: getWeekNumber(now),
      year: now.getFullYear()
    };
  }

  function getWeekNumber(date: Date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }

  // Obtener objetivos semanales
  const getWeeklyGoals = (): WeeklyGoal[] => {
    const weekKey = `${currentWeek.year}-W${currentWeek.weekNumber}`;
    const goals = localStorage.getItem(`weeklyGoals-${weekKey}`);
    return goals ? JSON.parse(goals) : [];
  };

  // Guardar objetivos semanales
  const saveWeeklyGoals = (goals: WeeklyGoal[]) => {
    const weekKey = `${currentWeek.year}-W${currentWeek.weekNumber}`;
    localStorage.setItem(`weeklyGoals-${weekKey}`, JSON.stringify(goals));
  };

  // Calcular métricas semanales
  const calculateWeeklyMetrics = () => {
    const weekStart = currentWeek.start.toISOString().split('T')[0];
    const weekEnd = currentWeek.end.toISOString().split('T')[0];

    // Actividad de la semana
    const weeklyProjects = progress.portfolioItems.filter(item => {
      if (!item.createdAt) return false;
      const createdDate = new Date(item.createdAt).toISOString().split('T')[0];
      return createdDate >= weekStart && createdDate <= weekEnd;
    });

    const weeklyLogs = progress.dailyLogs.filter(log => {
      return log.date >= weekStart && log.date <= weekEnd;
    });

    // Habilidades desarrolladas esta semana
    const weeklySkills = weeklyProjects.flatMap(item => item.skills || []);
    const skillCounts = weeklySkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageScore = weeklyProjects.length > 0 
      ? Math.round(weeklyProjects.reduce((sum, item) => sum + (item.score || 0), 0) / weeklyProjects.length)
      : 0;

    return {
      projectsCompleted: weeklyProjects.length,
      dailyLogsCount: weeklyLogs.length,
      skillsDeveloped: Object.keys(skillCounts).length,
      topSkills: Object.entries(skillCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([skill, count]) => ({ skill, count })),
      averageScore,
      pointsEarned: weeklyProjects.reduce((sum, item) => sum + (item.score || 0) * 10, 0),
      activeDays: weeklyLogs.length,
      weeklyProjects,
      weeklyLogs
    };
  };

  // Generar insights automáticos
  const generateInsights = (metrics: ReturnType<typeof calculateWeeklyMetrics>): WeeklyInsight[] => {
    const insights: WeeklyInsight[] = [];

    // Insight sobre productividad
    if (metrics.projectsCompleted >= 3) {
      insights.push({
        type: 'achievement',
        title: 'Semana Muy Productiva',
        description: `Completaste ${metrics.projectsCompleted} proyectos esta semana. ¡Excelente ritmo de crecimiento!`,
        icon: '🚀',
        color: 'text-green-600'
      });
    } else if (metrics.projectsCompleted >= 1) {
      insights.push({
        type: 'improvement',
        title: 'Progreso Constante',
        description: `Con ${metrics.projectsCompleted} proyecto(s) completado(s), mantienes un buen ritmo de desarrollo.`,
        icon: '📈',
        color: 'text-blue-600'
      });
    }

    // Insight sobre habilidades
    if (metrics.skillsDeveloped >= 5) {
      insights.push({
        type: 'strength',
        title: 'Desarrollo Multifacético',
        description: `Desarrollaste ${metrics.skillsDeveloped} habilidades diferentes. Tu crecimiento es muy balanceado.`,
        icon: '🎯',
        color: 'text-purple-600'
      });
    }

    // Insight sobre consistencia
    if (metrics.activeDays >= 5) {
      insights.push({
        type: 'achievement',
        title: 'Excelente Consistencia',
        description: `Fuiste activo ${metrics.activeDays} días esta semana. La consistencia es clave para el crecimiento.`,
        icon: '⭐',
        color: 'text-yellow-600'
      });
    } else if (metrics.activeDays >= 3) {
      insights.push({
        type: 'recommendation',
        title: 'Mejora la Consistencia',
        description: `Con ${metrics.activeDays} días activos, podrías beneficiarte de una rutina más regular.`,
        icon: '🎪',
        color: 'text-orange-600'
      });
    }

    // Insight sobre calidad
    if (metrics.averageScore >= 85) {
      insights.push({
        type: 'strength',
        title: 'Alta Calidad de Trabajo',
        description: `Tu score promedio de ${metrics.averageScore}% demuestra excelente calidad en tus proyectos.`,
        icon: '💎',
        color: 'text-blue-600'
      });
    }

    // Recomendación para la próxima semana
    if (metrics.topSkills.length > 0) {
      const topSkill = metrics.topSkills[0];
      insights.push({
        type: 'recommendation',
        title: 'Oportunidad de Especialización',
        description: `Tu fortaleza en ${topSkill.skill} te posiciona para proyectos más avanzados en esta área.`,
        icon: '🎓',
        color: 'text-indigo-600'
      });
    }

    return insights;
  };

  // Agregar objetivo semanal
  const addWeeklyGoal = () => {
    if (!newGoal.title.trim()) return;

    const goals = getWeeklyGoals();
    const newGoalObj: WeeklyGoal = {
      id: `goal-${Date.now()}`,
      title: newGoal.title,
      description: newGoal.description,
      targetValue: newGoal.targetValue,
      currentValue: 0,
      type: newGoal.type,
      completed: false,
      createdAt: new Date().toISOString()
    };

    goals.push(newGoalObj);
    saveWeeklyGoals(goals);
    setNewGoal({ title: '', description: '', targetValue: 1, type: 'projects' });
    setShowGoalForm(false);
  };

  // Calcular progreso de objetivos
  const updateGoalProgress = (goals: WeeklyGoal[], metrics: ReturnType<typeof calculateWeeklyMetrics>) => {
    return goals.map(goal => {
      let currentValue = 0;
      
      switch (goal.type) {
        case 'projects':
          currentValue = metrics.projectsCompleted;
          break;
        case 'daily_logs':
          currentValue = metrics.dailyLogsCount;
          break;
        case 'streak':
          currentValue = progress.currentStreak;
          break;
        case 'points':
          currentValue = metrics.pointsEarned;
          break;
        default:
          currentValue = goal.currentValue;
      }

      return {
        ...goal,
        currentValue,
        completed: currentValue >= goal.targetValue
      };
    });
  };

  const weeklyMetrics = calculateWeeklyMetrics();
  const weeklyGoals = updateGoalProgress(getWeeklyGoals(), weeklyMetrics);
  const insights = generateInsights(weeklyMetrics);

  // Comparación con semana anterior
  const getPreviousWeekComparison = () => {
    const prevWeek = new Date(currentWeek.start);
    prevWeek.setDate(prevWeek.getDate() - 7);
    
    // Aquí podrías implementar lógica para comparar con semana anterior
    // Por ahora, retornamos datos simulados basados en métricas actuales
    return {
      projectsChange: weeklyMetrics.projectsCompleted > 0 ? '+' + weeklyMetrics.projectsCompleted : '0',
      pointsChange: weeklyMetrics.pointsEarned > 0 ? '+' + weeklyMetrics.pointsEarned : '0',
      skillsChange: weeklyMetrics.skillsDeveloped > 0 ? '+' + weeklyMetrics.skillsDeveloped : '0',
      consistencyChange: weeklyMetrics.activeDays > 0 ? weeklyMetrics.activeDays + '/7' : '0/7'
    };
  };

  const comparison = getPreviousWeekComparison();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Resumen Semanal
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Semana {currentWeek.weekNumber} del {currentWeek.year} • {currentWeek.start.toLocaleDateString()} - {currentWeek.end.toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {weeklyMetrics.activeDays}/7 días activos
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Métricas principales */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {weeklyMetrics.projectsCompleted}
                </div>
                <div className="text-sm text-gray-600">Proyectos</div>
                <div className="text-xs text-blue-500">{comparison.projectsChange} vs anterior</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {weeklyMetrics.pointsEarned}
                </div>
                <div className="text-sm text-gray-600">XP Ganada</div>
                <div className="text-xs text-green-500">{comparison.pointsChange} vs anterior</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {weeklyMetrics.skillsDeveloped}
                </div>
                <div className="text-sm text-gray-600">Habilidades</div>
                <div className="text-xs text-purple-500">{comparison.skillsChange} vs anterior</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {weeklyMetrics.averageScore}%
                </div>
                <div className="text-sm text-gray-600">Score Promedio</div>
                <div className="text-xs text-orange-500">{comparison.consistencyChange} días</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objetivos semanales */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objetivos Semanales
              </CardTitle>
              <CardDescription>
                Metas que estableciste para esta semana
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowGoalForm(true)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Objetivo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {weeklyGoals.length > 0 ? (
            <div className="space-y-4">
              {weeklyGoals.map((goal) => (
                <div key={goal.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {goal.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                      {goal.title}
                    </h4>
                    {goal.description && (
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Progress 
                        value={Math.min((goal.currentValue / goal.targetValue) * 100, 100)} 
                        className="flex-1 h-2"
                      />
                      <span className="text-sm text-gray-600">
                        {goal.currentValue}/{goal.targetValue}
                      </span>
                    </div>
                  </div>
                  {goal.completed && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Completado
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Target className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No hay objetivos establecidos para esta semana.</p>
              <p className="text-sm">¡Agrega tu primer objetivo!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formulario de nuevo objetivo */}
      {showGoalForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nuevo Objetivo Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal-title">Título del Objetivo</Label>
                <Input
                  id="goal-title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Completar 3 proyectos de comunicación"
                />
              </div>
              
              <div>
                <Label htmlFor="goal-description">Descripción (opcional)</Label>
                <Textarea
                  id="goal-description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe más detalles sobre tu objetivo..."
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal-type">Tipo de Objetivo</Label>
                  <select
                    id="goal-type"
                    value={newGoal.type}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value as WeeklyGoal['type'] }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="projects">Proyectos Completados</option>
                    <option value="daily_logs">Reflexiones Diarias</option>
                    <option value="streak">Días Consecutivos</option>
                    <option value="points">Puntos de Experiencia</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="goal-target">Meta Numérica</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    min="1"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={addWeeklyGoal} className="bg-blue-600 hover:bg-blue-700">
                  Agregar Objetivo
                </Button>
                <Button variant="outline" onClick={() => setShowGoalForm(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Habilidades desarrolladas */}
      {weeklyMetrics.topSkills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Habilidades Desarrolladas Esta Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyMetrics.topSkills.map(({ skill, count }) => (
                <div key={skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{skill}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{count} proyecto{count > 1 ? 's' : ''}</span>
                    <Badge variant="outline">{count}x</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights automáticos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Insights de tu Progreso
          </CardTitle>
          <CardDescription>
            Análisis automático de tu rendimiento semanal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="text-2xl">{insight.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-medium ${insight.color}`}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {insight.description}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {insight.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Proyectos de la semana */}
      {weeklyMetrics.weeklyProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Award className="h-5 w-5" />
              Proyectos Completados Esta Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {weeklyMetrics.weeklyProjects.map((project) => (
                <div key={project.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.skills?.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Badge variant="secondary">{project.score}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compartir progreso */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comparte tu Progreso Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SocialSharing
            type="progress"
            customText={`🚀 Mi progreso semanal en habilidades blandas:\n\n✅ ${weeklyMetrics.projectsCompleted} proyectos completados\n⚡ ${weeklyMetrics.pointsEarned} XP ganada\n🧠 ${weeklyMetrics.skillsDeveloped} habilidades desarrolladas\n🎯 Score promedio: ${weeklyMetrics.averageScore}%\n\n¡Cada semana es una oportunidad de crecimiento! 💪`}
          />
        </CardContent>
      </Card>
    </div>
  );
} 