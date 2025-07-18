"use client";

import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Maximize2, Minimize2, X, Play, Pause, Square } from 'lucide-react';

interface FloatingWidgetProps {
  isVisible: boolean;
  timeLeft: number;
  isPaused: boolean;
  currentMantra: string;
  currentTheme: {
    name: string;
    emoji: string;
    color: string;
    bgGradient: string;
  };
  currentMusic: {
    name: string;
    emoji: string;
  };
  flowPhase: string;
  flowIntensity: number;
  purpose: string;
  size: 'small' | 'large';
  showMantras: boolean;
  isMuted: boolean;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: 'small' | 'large') => void;
  onMantrasToggle: () => void;
  onMuteToggle: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onClose: () => void;
}

const FloatingWidget: React.FC<FloatingWidgetProps> = ({
  isVisible,
  timeLeft,
  isPaused,
  currentMantra,
  currentTheme,
  currentMusic,
  flowPhase,
  flowIntensity,
  purpose,
  size,
  showMantras,
  isMuted,
  position,
  onPositionChange,
  onSizeChange,
  onMantrasToggle,
  onMuteToggle,
  onPause,
  onResume,
  onStop,
  onClose,
}) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getFlowColor = () => {
    switch (flowPhase) {
      case 'warming': return '#fbbf24';
      case 'entering': return '#34d399';
      case 'deep': return '#3b82f6';
      case 'transcendent': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getFlowText = () => {
    switch (flowPhase) {
      case 'warming': return '🔥 Calentando';
      case 'entering': return '🌊 Entrando';
      case 'deep': return '💎 Flow profundo';
      case 'transcendent': return '✨ Transcendente';
      default: return '⭕ Iniciando';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Constraints container para el dragging */}
      <div 
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />
      
      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          onPositionChange({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
          });
        }}
        initial={{ x: position.x, y: position.y }}
        animate={{ 
          x: position.x, 
          y: position.y,
          scale: isDragging ? 1.05 : 1
        }}
        className={`fixed pointer-events-auto cursor-move select-none ${
          size === 'large' ? 'w-96' : 'w-72'
        }`}
        style={{ 
          zIndex: 10000,
          filter: isDragging ? 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.25))' : 'drop-shadow(0 10px 15px rgb(0 0 0 / 0.1))'
        }}
      >
        <div className={`bg-gradient-to-br ${currentTheme.bgGradient} rounded-2xl border border-white/20 backdrop-blur-sm overflow-hidden`}>
          {/* Header con controles */}
          <div className="flex items-center justify-between p-3 bg-black/20">
            <div className="flex items-center gap-2">
              <div className="text-lg">{currentTheme.emoji}</div>
              <div className="text-sm font-medium text-white">
                {currentTheme.name}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={onMuteToggle}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onSizeChange(size === 'large' ? 'small' : 'large')}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                {size === 'large' ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X size={12} />
              </Button>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-4 space-y-3">
            {/* Temporizador */}
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {formatTime(timeLeft)}
              </div>
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: getFlowColor() }}
                />
                <span className="text-xs text-white/80">
                  {getFlowText()}
                </span>
              </div>
            </div>

            {/* Progreso */}
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="h-full bg-white/60 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${(flowIntensity / 100) * 100}%`
                }}
              />
            </div>

            {/* Propósito */}
            <div className="text-center">
              <div className="text-xs text-white/60 mb-1">Propósito</div>
              <div className="text-sm text-white font-medium line-clamp-2">
                {purpose}
              </div>
            </div>

            {/* Mantra (solo en modo large) */}
            {size === 'large' && showMantras && (
              <motion.div
                key={currentMantra}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-3 bg-black/20 rounded-lg"
              >
                <div className="text-sm text-white/90 leading-relaxed">
                  {currentMantra}
                </div>
              </motion.div>
            )}

            {/* Música actual */}
            <div className="flex items-center justify-center gap-2 text-xs text-white/60">
              <span>{currentMusic.emoji}</span>
              <span>{currentMusic.name.split(' - ')[0]}</span>
            </div>

            {/* Controles de reproducción */}
            <div className="flex justify-center gap-2">
              {isPaused ? (
                <Button
                  size="sm"
                  onClick={onResume}
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
                >
                  <Play size={14} />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={onPause}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-8 px-3"
                >
                  <Pause size={14} />
                </Button>
              )}
              
              <Button
                size="sm"
                onClick={onStop}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-8 px-3"
              >
                <Square size={14} />
              </Button>
            </div>

            {/* Toggle mantras (solo en large) */}
            {size === 'large' && (
              <div className="flex justify-center">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onMantrasToggle}
                  className="text-xs text-white/60 hover:text-white hover:bg-white/10"
                >
                  {showMantras ? 'Ocultar mantras' : 'Mostrar mantras'}
                </Button>
              </div>
            )}
          </div>

          {/* Indicador de arrastre */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingWidget; 