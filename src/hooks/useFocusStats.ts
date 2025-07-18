import { useState, useEffect } from 'react';

export interface FocusSession {
  id: string;
  purpose: string;
  theme: string;
  duration: number;
  completedAt: string;
  mantrasShown: number;
  energyLevel?: number;
  mood?: string;
}

export interface FocusStats {
  totalSessions: number;
  totalMinutes: number;
  totalMantras: number;
  averageSessionLength: number;
  favoriteTheme: string;
  weeklyProgress: number;
  streak: number;
}

const STORAGE_KEY = 'focus-sessions';

export const useFocusStats = () => {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [stats, setStats] = useState<FocusStats>({
    totalSessions: 0,
    totalMinutes: 0,
    totalMantras: 0,
    averageSessionLength: 0,
    favoriteTheme: 'espiritual',
    weeklyProgress: 0,
    streak: 0
  });

  // Cargar sesiones del localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem(STORAGE_KEY);
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        setSessions(parsedSessions);
        calculateStats(parsedSessions);
      } catch (error) {
        console.error('Error loading focus sessions:', error);
      }
    }
  }, []);

  // Calcular estadísticas
  const calculateStats = (sessionList: FocusSession[]) => {
    const totalSessions = sessionList.length;
    const totalMinutes = Math.round(sessionList.reduce((acc, s) => acc + s.duration, 0) / 60);
    const totalMantras = sessionList.reduce((acc, s) => acc + s.mantrasShown, 0);
    const averageSessionLength = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

    // Tema favorito
    const themeCounts = sessionList.reduce((acc, session) => {
      acc[session.theme] = (acc[session.theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const favoriteTheme = Object.entries(themeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'espiritual';

    // Progreso semanal
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklySessions = sessionList.filter(s => 
      new Date(s.completedAt) > oneWeekAgo
    );
    const weeklyProgress = weeklySessions.length;

    // Racha actual
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      
      const hasSessionOnDate = sessionList.some(s => {
        const sessionDate = new Date(s.completedAt);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === checkDate.getTime();
      });
      
      if (hasSessionOnDate) {
        streak++;
      } else {
        break;
      }
    }

    setStats({
      totalSessions,
      totalMinutes,
      totalMantras,
      averageSessionLength,
      favoriteTheme,
      weeklyProgress,
      streak
    });
  };

  // Guardar nueva sesión
  const saveSession = (session: Omit<FocusSession, 'id' | 'completedAt'>) => {
    const newSession: FocusSession = {
      ...session,
      id: Date.now().toString(),
      completedAt: new Date().toISOString()
    };

    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
    calculateStats(updatedSessions);
  };

  // Obtener sesiones por tema
  const getSessionsByTheme = (theme: string) => {
    return sessions.filter(s => s.theme === theme);
  };

  // Obtener sesiones recientes
  const getRecentSessions = (limit: number = 5) => {
    return sessions.slice(0, limit);
  };

  // Obtener sesiones por período
  const getSessionsByPeriod = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return sessions.filter(s => new Date(s.completedAt) > cutoffDate);
  };

  // Limpiar todas las sesiones
  const clearAllSessions = () => {
    setSessions([]);
    localStorage.removeItem(STORAGE_KEY);
    calculateStats([]);
  };

  return {
    sessions,
    stats,
    saveSession,
    getSessionsByTheme,
    getRecentSessions,
    getSessionsByPeriod,
    clearAllSessions
  };
}; 