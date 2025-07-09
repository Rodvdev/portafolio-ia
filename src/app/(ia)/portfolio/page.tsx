"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUserProgress } from "@/hooks/useLocalStorage";
import { AddProject } from "@/components/ui/add-project";
import { SocialSharing, QuickShare } from "@/components/ui/social-sharing";
import { Plus, Eye, FileText, Link, Video, Upload, ExternalLink } from "lucide-react";

export default function PortfolioPage() {
  const { progress } = useUserProgress();
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Calcular estadísticas de habilidades blandas
  const getSkillStats = () => {
    const allSkills = progress.portfolioItems.flatMap(item => item.skills || []);
    const skillCounts = allSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(skillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case "document": return <FileText className="h-4 w-4" />;
      case "link": return <Link className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "presentation": return <Upload className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getSkillColor = (skill: string) => {
    const colors: Record<string, string> = {
      'Comunicación': 'bg-blue-100 text-blue-800',
      'Liderazgo': 'bg-purple-100 text-purple-800',
      'Trabajo en Equipo': 'bg-green-100 text-green-800',
      'Resolución de Problemas': 'bg-orange-100 text-orange-800',
      'Adaptabilidad': 'bg-yellow-100 text-yellow-800',
      'Pensamiento Crítico': 'bg-red-100 text-red-800',
      'Gestión del Tiempo': 'bg-indigo-100 text-indigo-800',
      'Empatía': 'bg-pink-100 text-pink-800',
      'Creatividad': 'bg-teal-100 text-teal-800',
      'Negociación': 'bg-gray-100 text-gray-800'
    };
    return colors[skill] || 'bg-gray-100 text-gray-800';
  };

  const averageScore = progress.portfolioItems.length > 0 
    ? Math.round(progress.portfolioItems.reduce((sum, item) => sum + (item.score || 0), 0) / progress.portfolioItems.length)
    : 0;

  const selectedProjectData = selectedProject 
    ? progress.portfolioItems.find(p => p.id === selectedProject)
    : null;

  if (selectedProjectData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedProjectData.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {selectedProjectData.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {selectedProjectData.score}% Score
                </Badge>
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  Volver al Portafolio
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Metodología STAR */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">📋 Metodología STAR</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 Situación y Tarea</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProjectData.situation}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">⚡ Acciones Realizadas</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProjectData.actions}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">✅ Resultados Obtenidos</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProjectData.results}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">💭 Reflexión Personal</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProjectData.reflection}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Información adicional */}
            {(selectedProjectData.collaboration || selectedProjectData.challenges || selectedProjectData.learnings) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">📚 Información Adicional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProjectData.collaboration && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🤝 Colaboración</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProjectData.collaboration}
                      </p>
                    </div>
                  )}
                  
                  {selectedProjectData.challenges && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🚧 Desafíos Superados</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProjectData.challenges}
                      </p>
                    </div>
                  )}
                  
                  {selectedProjectData.learnings && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🎓 Aprendizajes Clave</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProjectData.learnings}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Habilidades */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💪 Habilidades Demostradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.skills?.map((skill) => (
                    <Badge key={skill} className={getSkillColor(skill)}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impacto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProjectData.impact}
                </p>
              </CardContent>
            </Card>

            {/* Evidencia */}
            {selectedProjectData.evidenceUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📎 Evidencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    {getEvidenceIcon(selectedProjectData.evidenceType || 'document')}
                    <span className="text-sm text-gray-600 capitalize">
                      {selectedProjectData.evidenceType}
                    </span>
                  </div>
                  {selectedProjectData.evidenceDescription && (
                    <p className="text-sm text-gray-700 mb-3">
                      {selectedProjectData.evidenceDescription}
                    </p>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(selectedProjectData.evidenceUrl, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Evidencia
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Sharing Social */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📱 Compartir</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialSharing
                  type="portfolio"
                  title={selectedProjectData.title}
                  description={selectedProjectData.description}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                📁 Mi Portafolio de Habilidades Blandas
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Experiencias reales que demuestran tus competencias profesionales
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddProject(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Proyecto
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {progress.portfolioItems.length}
              </div>
              <div className="text-sm text-gray-600">Proyectos</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {getSkillStats().length}
              </div>
              <div className="text-sm text-gray-600">Habilidades</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {averageScore}%
              </div>
              <div className="text-sm text-gray-600">Score Promedio</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {progress.totalPoints}
              </div>
              <div className="text-sm text-gray-600">XP Total</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habilidades más desarrolladas */}
      {getSkillStats().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">🏆 Habilidades Más Desarrolladas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getSkillStats().map(([skill, count]) => (
                <div key={skill} className="flex items-center justify-between">
                  <Badge className={getSkillColor(skill)}>
                    {skill}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{count} proyecto{count > 1 ? 's' : ''}</span>
                    <Progress value={(count / progress.portfolioItems.length) * 100} className="w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de proyectos */}
      {progress.portfolioItems.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {progress.portfolioItems.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {project.score}%
                    </Badge>
                    {project.evidenceUrl && (
                      <div className="text-green-600">
                        {getEvidenceIcon(project.evidenceType || 'document')}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className={getSkillColor(skill)}>
                        {skill}
                      </Badge>
                    ))}
                    {project.skills && project.skills.length > 3 && (
                      <Badge variant="outline" className="bg-gray-100">
                        +{project.skills.length - 3} más
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Creado: {new Date(project.createdAt!).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalle
                    </Button>
                    <QuickShare
                      type="portfolio"
                      title={project.title}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <CardTitle className="text-xl mb-2">¡Comienza tu portafolio!</CardTitle>
            <CardDescription className="text-base mb-6">
              Documenta tus experiencias profesionales y demuestra tus habilidades blandas
            </CardDescription>
            <Button 
              onClick={() => setShowAddProject(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Mi Primer Proyecto
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal para agregar proyecto */}
      {showAddProject && (
        <AddProject
          onClose={() => setShowAddProject(false)}
          onProjectAdded={() => {
            setShowAddProject(false);
            // Forzar re-render para mostrar el nuevo proyecto
            window.location.reload();
          }}
        />
      )}
    </div>
  );
} 