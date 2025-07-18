"use client";

import { useState, useEffect } from 'react';
import { PortfolioItem, DailyLog, WeeklySummary } from '@/types';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Cargar desde localStorage en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
      }
    }
  }, [key]);

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función para actualizar basado en el valor anterior
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook especializado para el progreso del usuario
export function useUserProgress() {
  const [progress, setProgress] = useLocalStorage('userProgress', {
    onboardingCompleted: false,
    diagnosticCompleted: false,
    portfolioItems: [] as PortfolioItem[],
    dailyLogs: [] as DailyLog[],
    weeklyInsights: [] as WeeklySummary[],
    currentStreak: 0,
    totalSessions: 0,
    lastActivityDate: null as string | null,
    achievements: [] as string[],
    skillLevels: {
      "Análisis de Datos": 0,
      "Excel": 0,
      "Marketing Digital": 0,
      "Gestión de Proyectos": 0,
      "Comunicación": 0,
      "Liderazgo": 0,
      "Trabajo en Equipo": 0,
      "Resolución de Problemas": 0
    } as Record<string, number>,
    totalPoints: 0,
    currentLevel: 1,
    profile: {
      name: "",
      email: "",
      interests: [] as string[],
      goals: "",
      emotionalTone: ""
    }
  });

  // Función para actualizar el streak
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = progress.lastActivityDate;
    
    if (lastActivity) {
      const lastDate = new Date(lastActivity);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Día consecutivo
        setProgress(prev => ({
          ...prev,
          currentStreak: prev.currentStreak + 1,
          lastActivityDate: today
        }));
      } else if (diffDays > 1) {
        // Se rompió el streak
        setProgress(prev => ({
          ...prev,
          currentStreak: 1,
          lastActivityDate: today
        }));
      }
    } else {
      // Primera actividad
      setProgress(prev => ({
        ...prev,
        currentStreak: 1,
        lastActivityDate: today
      }));
    }
  };

  // Función para agregar puntos y verificar logros
  const addPoints = (points: number) => {
    setProgress(prev => {
      const newTotalPoints = prev.totalPoints + points;
      const newLevel = Math.floor(newTotalPoints / 1000) + 1;
      const newAchievements = [...prev.achievements];
      
      // Verificar nuevos logros
      if (newTotalPoints >= 1000 && !newAchievements.includes('first-thousand')) {
        newAchievements.push('first-thousand');
      }
      
      if (prev.currentStreak >= 7 && !newAchievements.includes('week-streak')) {
        newAchievements.push('week-streak');
      }
      
      return {
        ...prev,
        totalPoints: newTotalPoints,
        currentLevel: newLevel,
        achievements: newAchievements,
        totalSessions: prev.totalSessions + 1
      };
    });
    
    updateStreak();
  };

  return {
    progress,
    setProgress,
    updateStreak,
    addPoints
  };
} 