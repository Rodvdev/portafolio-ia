"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/hooks/useLocalStorage";
import { Trophy, Flame, Star, Target, Calendar } from "lucide-react";

interface GamificationProps {
  size?: "compact" | "full";
  showAchievements?: boolean;
}

export function Gamification({ size = "full", showAchievements = true }: GamificationProps) {
  const { progress } = useUserProgress();
  
  const progressToNextLevel = (progress.totalPoints % 1000) / 1000 * 100;
  const pointsToNextLevel = 1000 - (progress.totalPoints % 1000);

  const achievements = [
    { 
      id: 'first-thousand', 
      title: 'Primeros 1000 puntos', 
      description: 'Alcanzaste tus primeros 1000 puntos',
      icon: '🏆',
      earned: progress.achievements.includes('first-thousand')
    },
    { 
      id: 'week-streak', 
      title: 'Racha semanal', 
      description: '7 días consecutivos de actividad',
      icon: '🔥',
      earned: progress.achievements.includes('week-streak')
    },
    { 
      id: 'first-portfolio', 
      title: 'Primer proyecto', 
      description: 'Completaste tu primer proyecto',
      icon: '💼',
      earned: progress.portfolioItems.length > 0
    },
    { 
      id: 'daily-warrior', 
      title: 'Guerrero diario', 
      description: 'Completaste 10 reflexiones diarias',
      icon: '⚔️',
      earned: progress.dailyLogs.length >= 10
    },
    { 
      id: 'level-up', 
      title: 'Subida de nivel', 
      description: 'Alcanzaste el nivel 2',
      icon: '⭐',
      earned: progress.currentLevel >= 2
    }
  ];

  if (size === "compact") {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-600">
                  {progress.currentStreak}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-600">
                  {progress.totalPoints}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-semibold text-purple-600">
                  Nivel {progress.currentLevel}
                </span>
              </div>
            </div>
            <Badge variant="outline" className="bg-white/50">
              {achievements.filter(a => a.earned).length}/{achievements.length}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Streak Card */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Racha Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {progress.currentStreak}
          </div>
          <p className="text-xs text-orange-600/70">
            {progress.currentStreak === 1 ? 'día' : 'días'} consecutivos
          </p>
        </CardContent>
      </Card>

      {/* Points Card */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-yellow-700 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Puntos Totales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {progress.totalPoints.toLocaleString()}
          </div>
          <p className="text-xs text-yellow-600/70">
            {pointsToNextLevel} para siguiente nivel
          </p>
        </CardContent>
      </Card>

      {/* Level Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Nivel Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {progress.currentLevel}
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
          <p className="text-xs text-purple-600/70 mt-1">
            {Math.round(progressToNextLevel)}% al nivel {progress.currentLevel + 1}
          </p>
        </CardContent>
      </Card>

      {/* Sessions Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Sesiones Totales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {progress.totalSessions}
          </div>
          <p className="text-xs text-blue-600/70">
            actividades completadas
          </p>
        </CardContent>
      </Card>

      {/* Achievements */}
      {showAchievements && (
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Logros Desbloqueados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-green-50 border-green-200 shadow-sm'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${
                        achievement.earned ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs mt-1 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
                          Desbloqueado
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Componente para mostrar cuando se desbloquea un logro
export function AchievementUnlocked({ achievement }: { achievement: string }) {
  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce">
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 border-yellow-500 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-white">
            <div className="text-2xl">🏆</div>
            <div>
              <h3 className="font-bold text-sm">¡Logro Desbloqueado!</h3>
              <p className="text-xs opacity-90">{achievement}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 