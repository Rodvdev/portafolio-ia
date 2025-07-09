"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";
import { useUserProgress } from "@/hooks/useLocalStorage";

interface SocialSharingProps {
  type: "achievement" | "progress" | "portfolio" | "custom";
  title?: string;
  description?: string;
  customText?: string;
  className?: string;
}

export function SocialSharing({ 
  type, 
  title, 
  description, 
  customText, 
  className = "" 
}: SocialSharingProps) {
  const { progress } = useUserProgress();
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const baseUrl = "https://portafolio-ia.vercel.app";
    
    switch (type) {
      case "achievement":
        return {
          text: `🏆 ¡Acabo de desbloquear "${title}" en mi journey de desarrollo de habilidades blandas! 🚀\n\n💪 Desarrollando mi potencial humano paso a paso.\n\n#DesarrolloPersonal #HabilidadesBlandas #CrecimientoProfesional`,
          url: `${baseUrl}/profile`
        };
      
      case "progress":
        return {
          text: `📈 Mi progreso en habilidades blandas:\n\n🔥 ${progress.currentStreak} días consecutivos\n⭐ ${progress.totalPoints} puntos acumulados\n🏆 Nivel ${progress.currentLevel}\n\n¡Cada día es una oportunidad de crecimiento! 💪\n\n#CrecimientoProfesional #HabilidadesBlandas #DesarrolloPersonal`,
          url: `${baseUrl}/profile`
        };
      
      case "portfolio":
        return {
          text: `💼 ¡Completé un nuevo proyecto en mi portafolio de habilidades blandas!\n\n"${title}"\n\n${description}\n\n🚀 Construyendo mi futuro profesional con evidencia real de mis capacidades.\n\n#Portafolio #HabilidadesBlandas #DesarrolloPersonal`,
          url: `${baseUrl}/portfolio`
        };
      
      case "custom":
        return {
          text: customText || "¡Desarrollando mis habilidades blandas con Portafolio Pomodoro!",
          url: baseUrl
        };
      
      default:
        return {
          text: "🌟 Desarrollando mi potencial humano con Portafolio Pomodoro - Una plataforma para validar habilidades blandas a través de casos interactivos.",
          url: baseUrl
        };
    }
  };

  const shareContent = generateShareText();

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareContent.url)}&title=${encodeURIComponent(shareContent.text)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent.text)}&url=${encodeURIComponent(shareContent.url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareContent.url)}&quote=${encodeURIComponent(shareContent.text)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(shareContent.text + '\n\n' + shareContent.url)}`;
    window.open(whatsAppUrl, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareContent.text + '\n\n' + shareContent.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const shareWithWebAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Mi progreso en Portafolio Pomodoro',
          text: shareContent.text,
          url: shareContent.url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Compartir Logro
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview del texto a compartir */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {shareContent.text}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <ExternalLink className="h-3 w-3" />
            {shareContent.url}
          </div>
        </div>

        {/* Botones de redes sociales */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={shareToLinkedIn}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <div className="flex items-center gap-2">
              <span>💼</span>
              LinkedIn
            </div>
          </Button>

          <Button
            onClick={shareToTwitter}
            className="bg-black hover:bg-gray-800 text-white"
            size="sm"
          >
            <div className="flex items-center gap-2">
              <span>🐦</span>
              Twitter
            </div>
          </Button>

          <Button
            onClick={shareToFacebook}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            <div className="flex items-center gap-2">
              <span>📘</span>
              Facebook
            </div>
          </Button>

          <Button
            onClick={shareToWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            <div className="flex items-center gap-2">
              <span>📱</span>
              WhatsApp
            </div>
          </Button>
        </div>

        {/* Botones adicionales */}
        <div className="flex gap-2">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? 'Copiado!' : 'Copiar texto'}
          </Button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button
              onClick={shareWithWebAPI}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          )}
        </div>

        {/* Hashtags sugeridos */}
        <div className="border-t pt-3">
          <p className="text-xs text-gray-600 mb-2">Hashtags sugeridos:</p>
          <div className="flex flex-wrap gap-1">
            {[
              '#HabilidadesBlandas',
              '#DesarrolloPersonal',
              '#CrecimientoProfesional',
              '#Liderazgo',
              '#Comunicación',
              '#TrabajoEnEquipo'
            ].map((hashtag) => (
              <Badge key={hashtag} variant="outline" className="text-xs">
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente compacto para usar en cards
export function QuickShare({ 
  type, 
  title 
}: { 
  type: SocialSharingProps['type'];
  title?: string;
}) {
  const { progress } = useUserProgress();
  
  const generateQuickText = () => {
    switch (type) {
      case "achievement":
        return `🏆 ¡Logro desbloqueado: "${title}"! Desarrollando mis habilidades blandas paso a paso. #CrecimientoProfesional`;
      case "progress":
        return `📈 Mi progreso: ${progress.currentStreak} días consecutivos, ${progress.totalPoints} puntos, Nivel ${progress.currentLevel}! #HabilidadesBlandas`;
      default:
        return "🌟 Desarrollando mi potencial humano con Portafolio Pomodoro!";
    }
  };

  const shareToLinkedIn = () => {
    const text = generateQuickText();
    const url = "https://portafolio-ia.vercel.app";
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Button
      onClick={shareToLinkedIn}
      size="sm"
      variant="outline"
      className="text-blue-600 border-blue-200 hover:bg-blue-50"
    >
      <Share2 className="h-4 w-4 mr-2" />
      Compartir
    </Button>
  );
} 