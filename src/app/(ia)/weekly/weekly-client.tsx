"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserProgress } from "@/hooks/useLocalStorage";
import { 
  Calendar, 
  Target, 
  Clock,
  Brain,
  Zap
} from "lucide-react";



export default function WeeklyClientPage() {
  const { progress } = useUserProgress();
  const [currentWeek] = useState(getCurrentWeek());

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



  // Calcular métricas semanales
  const calculateWeeklyMetrics = () => {
    const weekStart = currentWeek.start.toISOString().split('T')[0];
    const weekEnd = currentWeek.end.toISOString().split('T')[0];

    // Actividad de la semana
    const weeklyProjects = progress.portfolioItems.filter((item) => {
      if (!item.createdAt) return false;
      const createdDate = new Date(item.createdAt).toISOString().split('T')[0];
      return createdDate >= weekStart && createdDate <= weekEnd;
    });

    const weeklyLogs = progress.dailyLogs.filter((log) => {
      return log.date >= weekStart && log.date <= weekEnd;
    });

    // Habilidades desarrolladas esta semana
    const weeklySkills = weeklyProjects.flatMap((item) => item.skills || []);
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

  // Resto del código igual que antes...
  const weeklyMetrics = calculateWeeklyMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen simple */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tu Progreso Esta Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">¡Excelente trabajo!</h3>
              <p className="text-gray-600">
                Has completado {weeklyMetrics.projectsCompleted} proyectos y ganado {weeklyMetrics.pointsEarned} puntos de experiencia esta semana.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 