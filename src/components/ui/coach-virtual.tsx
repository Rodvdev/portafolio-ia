"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface CoachMessage {
  id: string;
  message: string;
  type: "motivational" | "feedback" | "tip" | "achievement";
  icon: string;
  context?: string;
}

const coachMessages: CoachMessage[] = [
  {
    id: "welcome",
    message: "¡Bienvenido a tu journey de crecimiento! Cada paso que das desarrolla tu potencial humano.",
    type: "motivational",
    icon: "🌟",
    context: "onboarding"
  },
  {
    id: "communication_tip",
    message: "La comunicación efectiva no es solo hablar claro, sino también escuchar con empatía.",
    type: "tip",
    icon: "💬",
    context: "communication"
  },
  {
    id: "leadership_insight",
    message: "Los mejores líderes no dan órdenes, inspiran a otros a dar lo mejor de sí mismos.",
    type: "tip",
    icon: "👑",
    context: "leadership"
  },
  {
    id: "empathy_growth",
    message: "Has demostrado gran empatía. Esta habilidad te ayudará a construir relaciones sólidas.",
    type: "feedback",
    icon: "💝",
    context: "empathy"
  },
  {
    id: "daily_reflection",
    message: "Cada reflexión es una semilla de autoconocimiento que florecerá en sabiduría.",
    type: "motivational",
    icon: "🌱",
    context: "daily"
  },
  {
    id: "progress_celebration",
    message: "¡Increíble progreso! Estás desarrollando habilidades que marcarán la diferencia.",
    type: "achievement",
    icon: "🎉",
    context: "progress"
  },
  {
    id: "resilience_tip",
    message: "La resiliencia se construye paso a paso. Cada desafío es una oportunidad de crecimiento.",
    type: "tip",
    icon: "🌈",
    context: "resilience"
  },
  {
    id: "creativity_boost",
    message: "Tu creatividad es única. No tengas miedo de pensar diferente y proponer ideas innovadoras.",
    type: "motivational",
    icon: "🎨",
    context: "creativity"
  }
];

interface CoachVirtualProps {
  context?: string;
  className?: string;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg";
}

export function CoachVirtual({ 
  context, 
  className = "", 
  showBadge = true,
  size = "md" 
}: CoachVirtualProps) {
  const [currentMessage, setCurrentMessage] = useState<CoachMessage | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Filter messages by context if provided
    const relevantMessages = context 
      ? coachMessages.filter(msg => msg.context === context || !msg.context)
      : coachMessages;
    
    // Select a random message
    const randomMessage = relevantMessages[Math.floor(Math.random() * relevantMessages.length)];
    setCurrentMessage(randomMessage);
    
    // Animate appearance
    setTimeout(() => setIsVisible(true), 100);
  }, [context]);

  if (!currentMessage) return null;

  const sizeClasses = {
    sm: "p-3 text-sm",
    md: "p-4 text-base",
    lg: "p-6 text-lg"
  };

  const iconSizes = {
    sm: "text-2xl",
    md: "text-3xl", 
    lg: "text-4xl"
  };

  const getTypeStyles = (type: CoachMessage["type"]) => {
    switch (type) {
      case "motivational":
        return "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200";
      case "feedback":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200";
      case "tip":
        return "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200";
      case "achievement":
        return "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
    }
  };

  const getTypeLabel = (type: CoachMessage["type"]) => {
    switch (type) {
      case "motivational":
        return "Motivación";
      case "feedback":
        return "Feedback";
      case "tip":
        return "Consejo";
      case "achievement":
        return "Logro";
      default:
        return "Coach";
    }
  };

  return (
    <Card className={`
      skill-card transition-all duration-500 transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      ${getTypeStyles(currentMessage.type)}
      ${className}
    `}>
      <CardContent className={sizeClasses[size]}>
        <div className="flex items-start gap-4">
          <div className={`${iconSizes[size]} float-animation`}>
            {currentMessage.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">
                Tu Coach Virtual te dice:
              </h3>
              {showBadge && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-white/50"
                >
                  {getTypeLabel(currentMessage.type)}
                </Badge>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">
              &ldquo;{currentMessage.message}&rdquo;
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Static coach messages for specific contexts
export const CoachMessages = {
  welcome: (
    <CoachVirtual 
      context="onboarding" 
      size="lg"
      className="emotional-glow"
    />
  ),
  
  dailyMotivation: (
    <CoachVirtual 
      context="daily" 
      size="md"
    />
  ),
  
  progressCelebration: (
    <CoachVirtual 
      context="progress" 
      size="md"
      className="animate-fade-in"
    />
  ),
  
  skillTip: (skillContext: string) => (
    <CoachVirtual 
      context={skillContext} 
      size="sm"
      showBadge={false}
    />
  )
}; 