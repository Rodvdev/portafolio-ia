"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUserProgress } from "@/hooks/useLocalStorage";
import { X, Plus, Upload, Link, FileText, Video } from "lucide-react";
import { PortfolioItem } from "@/types/index";


interface ProjectFormData {
  title: string;
  description: string;
  situation: string;
  actions: string;
  results: string;
  reflection: string;
  skills: string[];
  evidenceType: "document" | "link" | "video" | "presentation";
  evidenceUrl?: string;
  evidenceDescription?: string;
  impact: string;
  collaboration?: string;
  challenges?: string;
  learnings?: string;
}

interface AddProjectProps {
  onClose: () => void;
  onProjectAdded: () => void;
}

export function AddProject({ onClose, onProjectAdded }: AddProjectProps) {
  const { setProgress, addPoints } = useUserProgress();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    situation: "",
    actions: "",
    results: "",
    reflection: "",
    skills: [],
    evidenceType: "document",
    evidenceUrl: "",
    evidenceDescription: "",
    impact: "",
    collaboration: "",
    challenges: "",
    learnings: ""
  });

  const availableSkills = [
    "Comunicación",
    "Liderazgo", 
    "Trabajo en Equipo",
    "Resolución de Problemas",
    "Adaptabilidad",
    "Pensamiento Crítico",
    "Gestión del Tiempo",
    "Empatía",
    "Creatividad",
    "Negociación",
    "Planificación",
    "Mentoring",
    "Facilitación",
    "Gestión de Conflictos",
    "Toma de Decisiones"
  ];

  const updateFormData = (field: keyof ProjectFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = () => {
    // Crear el proyecto
    const newProject = {
      id: `project-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      situation: formData.situation,
      actions: formData.actions,
      results: formData.results,
      reflection: formData.reflection,
      skills: formData.skills,
      evidenceType: formData.evidenceType,
      evidenceUrl: formData.evidenceUrl,
      evidenceDescription: formData.evidenceDescription,
      impact: formData.impact,
      collaboration: formData.collaboration,
      challenges: formData.challenges,
      learnings: formData.learnings,
      createdAt: new Date().toISOString(),
      score: calculateProjectScore()
    };

    // Actualizar progreso
    setProgress(prev => ({
      ...prev,
      portfolioItems: [...prev.portfolioItems, newProject as PortfolioItem]
    }));

    // Agregar puntos
    const points = Math.round(calculateProjectScore() * 10);
    addPoints(points);

    onProjectAdded();
    onClose();
  };

  const calculateProjectScore = () => {
    let score = 70; // Base score
    
    // Bonificaciones por completitud
    if (formData.situation.length > 100) score += 5;
    if (formData.actions.length > 150) score += 5;
    if (formData.results.length > 100) score += 5;
    if (formData.reflection.length > 100) score += 5;
    if (formData.skills.length >= 3) score += 5;
    if (formData.evidenceUrl) score += 5;
    if (formData.collaboration) score += 3;
    if (formData.challenges) score += 3;
    if (formData.learnings) score += 4;

    return Math.min(100, score);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title.length > 5 && formData.description.length > 20;
      case 2:
        return formData.situation.length > 50 && formData.actions.length > 50;
      case 3:
        return formData.results.length > 30 && formData.reflection.length > 30;
      case 4:
        return formData.skills.length >= 2 && formData.impact.length > 20;
      default:
        return true;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Información Básica";
      case 2: return "Situación y Acciones (STAR)";
      case 3: return "Resultados y Reflexión";
      case 4: return "Habilidades e Impacto";
      case 5: return "Evidencia y Extras";
      default: return "";
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">✨ Agregar Proyecto al Portafolio</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Paso {step} de 5: {getStepTitle()}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Paso 1: Información Básica */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título del Proyecto *</Label>
                <Input
                  id="title"
                  placeholder="Ej: Mediación de conflicto en equipo de marketing"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción General *</Label>
                <Textarea
                  id="description"
                  placeholder="Resume en 2-3 líneas qué hiciste y por qué es relevante para demostrar tus habilidades blandas..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/200 caracteres
                </p>
              </div>
            </div>
          )}

          {/* Paso 2: Situación y Acciones (STAR) */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">📋 Metodología STAR</h4>
                <p className="text-sm text-blue-700">
                  Utiliza la metodología STAR (Situación, Tarea, Acción, Resultado) para estructurar tu experiencia de manera profesional.
                </p>
              </div>
              
              <div>
                <Label htmlFor="situation">Situación y Tarea *</Label>
                <Textarea
                  id="situation"
                  placeholder="Describe el contexto: ¿Dónde trabajabas? ¿Cuál era la situación problemática? ¿Qué se esperaba de ti?"
                  value={formData.situation}
                  onChange={(e) => updateFormData('situation', e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="actions">Acciones Específicas *</Label>
                <Textarea
                  id="actions"
                  placeholder="¿Qué hiciste exactamente? Detalla tus acciones paso a paso, enfocándote en las habilidades blandas que aplicaste..."
                  value={formData.actions}
                  onChange={(e) => updateFormData('actions', e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Paso 3: Resultados y Reflexión */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="results">Resultados Obtenidos *</Label>
                <Textarea
                  id="results"
                  placeholder="¿Qué se logró? Menciona métricas, feedback recibido, impacto en el equipo o proyecto..."
                  value={formData.results}
                  onChange={(e) => updateFormData('results', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="reflection">Reflexión Personal *</Label>
                <Textarea
                  id="reflection"
                  placeholder="¿Qué aprendiste? ¿Cómo te ayudó a crecer profesionalmente? ¿Qué harías diferente?"
                  value={formData.reflection}
                  onChange={(e) => updateFormData('reflection', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Paso 4: Habilidades e Impacto */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label>Habilidades Blandas Demostradas * (mínimo 2)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        formData.skills.includes(skill) 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Seleccionadas: {formData.skills.length}
                </p>
              </div>

              <div>
                <Label htmlFor="impact">Impacto en el Equipo/Organización *</Label>
                <Textarea
                  id="impact"
                  placeholder="¿Cómo benefició tu trabajo al equipo, cliente o empresa? ¿Qué valor aportaste?"
                  value={formData.impact}
                  onChange={(e) => updateFormData('impact', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Paso 5: Evidencia y Extras */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <Label>Tipo de Evidencia</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { value: "document", label: "Documento", icon: <FileText className="h-4 w-4" /> },
                    { value: "link", label: "Enlace", icon: <Link className="h-4 w-4" /> },
                    { value: "video", label: "Video", icon: <Video className="h-4 w-4" /> },
                    { value: "presentation", label: "Presentación", icon: <Upload className="h-4 w-4" /> }
                  ].map((type) => (
                    <Button
                      key={type.value}
                      variant={formData.evidenceType === type.value ? "default" : "outline"}
                      onClick={() => updateFormData('evidenceType', type.value)}
                      className="flex items-center gap-2 h-12"
                    >
                      {type.icon}
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="evidenceUrl">URL de la Evidencia</Label>
                <Input
                  id="evidenceUrl"
                  placeholder="https://... (Google Drive, LinkedIn, GitHub, etc.)"
                  value={formData.evidenceUrl}
                  onChange={(e) => updateFormData('evidenceUrl', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="evidenceDescription">Descripción de la Evidencia</Label>
                <Textarea
                  id="evidenceDescription"
                  placeholder="Explica qué muestra tu evidencia y cómo valida las habilidades demostradas..."
                  value={formData.evidenceDescription}
                  onChange={(e) => updateFormData('evidenceDescription', e.target.value)}
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="collaboration">Colaboración (opcional)</Label>
                  <Textarea
                    id="collaboration"
                    placeholder="¿Con quién trabajaste? ¿Cómo gestionaste las relaciones interpersonales?"
                    value={formData.collaboration}
                    onChange={(e) => updateFormData('collaboration', e.target.value)}
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="challenges">Desafíos Superados (opcional)</Label>
                  <Textarea
                    id="challenges"
                    placeholder="¿Qué obstáculos enfrentaste y cómo los resolviste?"
                    value={formData.challenges}
                    onChange={(e) => updateFormData('challenges', e.target.value)}
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="learnings">Aprendizajes Clave (opcional)</Label>
                  <Textarea
                    id="learnings"
                    placeholder="¿Qué insights o habilidades nuevas desarrollaste?"
                    value={formData.learnings}
                    onChange={(e) => updateFormData('learnings', e.target.value)}
                    rows={2}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">🎯 Puntuación Estimada</h4>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-green-600">
                    {calculateProjectScore()}%
                  </div>
                  <div className="text-sm text-green-700">
                    +{Math.round(calculateProjectScore() * 10)} puntos de experiencia
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Anterior
            </Button>

            {step < 5 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar al Portafolio
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 