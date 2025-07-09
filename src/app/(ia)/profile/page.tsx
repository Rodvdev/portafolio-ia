"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUserProgress } from "@/hooks/useLocalStorage";
import { SocialSharing } from "@/components/ui/social-sharing";
import { exportProfileToPDF } from "@/utilities/pdfExport";
import { 
  User, 
  Award, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Download, 
  Edit3, 
  CheckCircle2,
  Zap,
  Brain,
  Star,
  ExternalLink,
  Copy,
  Briefcase
} from "lucide-react";

export default function ProfilePage() {
  const { progress, setProgress } = useUserProgress();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: progress.profile.name || '',
    email: progress.profile.email || '',
    goals: progress.profile.goals || '',
    bio: '',
    location: '',
    occupation: '',
    linkedin: '',
    github: ''
  });

  // Cargar datos adicionales del perfil
  useEffect(() => {
    const additionalData = localStorage.getItem('profileExtended');
    if (additionalData) {
      const parsed = JSON.parse(additionalData);
      setProfileData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  // Guardar cambios del perfil
  const saveProfile = () => {
    // Actualizar perfil en progress
    setProgress(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: profileData.name,
        email: profileData.email,
        goals: profileData.goals
      }
    }));

    // Guardar datos adicionales
    const additionalData = {
      bio: profileData.bio,
      location: profileData.location,
      occupation: profileData.occupation,
      linkedin: profileData.linkedin,
      github: profileData.github
    };
    localStorage.setItem('profileExtended', JSON.stringify(additionalData));
    setEditMode(false);
  };

  // Generar resumen profesional dinámico
  const generateProfessionalSummary = () => {
    const topSkills = getTopSkills().slice(0, 3);
    const skillsText = topSkills.map(({ skill }) => skill).join(', ');
    
    const templates = [
      `Profesional enfocado en el desarrollo de habilidades blandas con fortaleza en ${skillsText}. He completado ${progress.portfolioItems.length} proyecto${progress.portfolioItems.length > 1 ? 's' : ''} práctico${progress.portfolioItems.length > 1 ? 's' : ''} que demuestran mi capacidad de crecimiento continuo y aplicación de competencias interpersonales en entornos reales.`,
      
      `Especialista en desarrollo de competencias humanas con experiencia práctica en ${skillsText}. Mi trayectoria incluye ${progress.portfolioItems.length} caso${progress.portfolioItems.length > 1 ? 's' : ''} de estudio donde he aplicado metodologías estructuradas para resolver desafíos profesionales, alcanzando un nivel ${progress.currentLevel} en mi desarrollo personal.`,
      
      `Profesional comprometido con la excelencia en habilidades interpersonales, destacando en ${skillsText}. He mantenido un streak de ${progress.currentStreak} día${progress.currentStreak > 1 ? 's' : ''} consecutivo${progress.currentStreak > 1 ? 's' : ''} de desarrollo activo, completando proyectos que validan mi capacidad de liderazgo, comunicación y trabajo en equipo.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  };

  // Calcular estadísticas de habilidades
  const getTopSkills = () => {
    const allSkills = progress.portfolioItems.flatMap(item => item.skills || []);
    const skillCounts = allSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(skillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([skill, count]) => ({ skill, count }));
  };

  // Obtener achievements desbloqueados
  const getAchievements = () => {
    const achievements = [
      { id: 'first-project', name: 'Primer Proyecto', description: 'Completaste tu primer proyecto', condition: progress.portfolioItems.length >= 1 },
      { id: 'consistent-learner', name: 'Aprendiz Consistente', description: 'Mantuviste un streak de 7 días', condition: progress.currentStreak >= 7 },
      { id: 'skill-master', name: 'Maestro de Habilidades', description: 'Desarrollaste 5 habilidades diferentes', condition: getTopSkills().length >= 5 },
      { id: 'high-performer', name: 'Alto Rendimiento', description: 'Obtuviste un score promedio superior a 85%', condition: getAverageScore() >= 85 },
      { id: 'portfolio-builder', name: 'Constructor de Portafolio', description: 'Completaste 5 proyectos', condition: progress.portfolioItems.length >= 5 },
      { id: 'point-collector', name: 'Coleccionista de Puntos', description: 'Acumulaste 1000 puntos de experiencia', condition: progress.totalPoints >= 1000 },
      { id: 'level-achiever', name: 'Escalador de Niveles', description: 'Alcanzaste el nivel 3', condition: progress.currentLevel >= 3 },
      { id: 'diverse-learner', name: 'Aprendiz Diverso', description: 'Trabajaste en 10 habilidades diferentes', condition: getTopSkills().length >= 10 }
    ];

    return achievements.filter(achievement => achievement.condition);
  };

  // Calcular score promedio
  const getAverageScore = () => {
    if (progress.portfolioItems.length === 0) return 0;
    return Math.round(progress.portfolioItems.reduce((sum, item) => sum + (item.score || 0), 0) / progress.portfolioItems.length);
  };

  // Exportar perfil a PDF
  const exportToPDF = async () => {
    try {
      await exportProfileToPDF("profile-content", profileData.name || "Mi Perfil");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.");
    }
  };

  // Copiar enlace del perfil
  const copyProfileURL = () => {
    const profileUrl = `${window.location.origin}/profile/${progress.profile.name?.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(profileUrl);
    alert("URL del perfil copiada al portapapeles! 🔗");
  };

  const topSkills = getTopSkills();
  const achievements = getAchievements();
  const averageScore = getAverageScore();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Contenedor con ID para exportación PDF */}
      <div id="profile-content" className="space-y-6 bg-white p-6 rounded-lg">
        
        {/* Header del perfil */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {(profileData.name || 'Usuario').split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">{profileData.name || 'Tu Nombre'}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditMode(!editMode)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base mt-1">
                    {profileData.occupation || 'Especialista en Desarrollo de Habilidades Blandas'}
                  </CardDescription>
                  {profileData.location && (
                    <p className="text-sm text-gray-600 mt-1">📍 {profileData.location}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={copyProfileURL} size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar URL
                </Button>
                <Button variant="outline" onClick={exportToPDF} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
                <SocialSharing
                  type="custom"
                  customText={`🌟 Mi perfil profesional de habilidades blandas:\n\n📈 Nivel ${progress.currentLevel}\n🏆 ${progress.portfolioItems.length} proyectos completados\n⚡ ${progress.totalPoints} puntos de experiencia\n🔥 ${progress.currentStreak} días consecutivos\n\n¡Desarrollando mi potencial humano! 💪`}
                  className="max-w-sm"
                />
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
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    Nivel {progress.currentLevel}
                  </div>
                  <div className="text-sm text-gray-600">Desarrollo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {progress.portfolioItems.length}
                  </div>
                  <div className="text-sm text-gray-600">Proyectos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {progress.totalPoints}
                  </div>
                  <div className="text-sm text-gray-600">XP Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {progress.currentStreak}
                  </div>
                  <div className="text-sm text-gray-600">Días Activos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formulario de edición */}
        {editMode && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Editar Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="occupation">Ocupación/Título</Label>
                  <Input
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => setProfileData(prev => ({ ...prev, occupation: e.target.value }))}
                    placeholder="Ej: Estudiante de Administración"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ciudad, País"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Biografía/Descripción</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Describe tu experiencia y objetivos profesionales..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="goals">Objetivos Profesionales</Label>
                <Textarea
                  id="goals"
                  value={profileData.goals}
                  onChange={(e) => setProfileData(prev => ({ ...prev, goals: e.target.value }))}
                  placeholder="¿Cuáles son tus metas profesionales?"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn (URL)</Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                    placeholder="https://linkedin.com/in/tuusuario"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub (URL)</Label>
                  <Input
                    id="github"
                    value={profileData.github}
                    onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                    placeholder="https://github.com/tuusuario"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveProfile} className="bg-blue-600 hover:bg-blue-700">
                  Guardar Cambios
                </Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resumen profesional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Resumen Profesional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {profileData.bio || generateProfessionalSummary()}
            </p>
            {profileData.goals && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-medium text-blue-900 mb-2">🎯 Objetivos Profesionales</h4>
                <p className="text-blue-800 text-sm">{profileData.goals}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logros y certificaciones */}
        {achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Logros Desbloqueados ({achievements.length})
              </CardTitle>
              <CardDescription>
                Reconocimientos basados en tu progreso real
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium text-yellow-800">{achievement.name}</h4>
                    </div>
                    <p className="text-sm text-yellow-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Habilidades desarrolladas */}
        {topSkills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Habilidades Blandas Desarrolladas
              </CardTitle>
              <CardDescription>
                Competencias validadas a través de proyectos prácticos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {topSkills.map(({ skill, count }) => (
                  <div key={skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{skill}</div>
                      <div className="text-xs text-gray-600">{count} proyecto{count > 1 ? 's' : ''}</div>
                    </div>
                    <Badge variant="outline">{count}x</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portafolio de proyectos */}
        {progress.portfolioItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Portafolio de Proyectos ({progress.portfolioItems.length})
              </CardTitle>
              <CardDescription>
                Experiencias reales que demuestran mis habilidades blandas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progress.portfolioItems.slice(0, 3).map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-lg">{project.title}</h4>
                      <Badge variant="secondary">{project.score}% Score</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills?.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {project.skills && project.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.skills.length - 4} más
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                {progress.portfolioItems.length > 3 && (
                  <div className="text-center py-4">
                    <Button variant="outline" onClick={() => window.location.href = '/portfolio'}>
                      Ver Todos los Proyectos ({progress.portfolioItems.length})
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estadísticas de rendimiento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Estadísticas de Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{averageScore}%</div>
                <div className="text-sm text-blue-700">Score Promedio</div>
                <div className="text-xs text-blue-600">Calidad de proyectos</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{progress.totalSessions}</div>
                <div className="text-sm text-green-700">Sesiones Totales</div>
                <div className="text-xs text-green-600">Actividad acumulada</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{topSkills.length}</div>
                <div className="text-sm text-purple-700">Habilidades Únicas</div>
                <div className="text-xs text-purple-600">Competencias desarrolladas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enlaces profesionales */}
        {(profileData.linkedin || profileData.github) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Enlaces Profesionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {profileData.linkedin && (
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(profileData.linkedin, '_blank')}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                {profileData.github && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(profileData.github, '_blank')}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Estado inicial si no hay datos */}
      {progress.portfolioItems.length === 0 && !profileData.name && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">👋</div>
            <CardTitle className="text-xl mb-2">¡Bienvenido a tu perfil!</CardTitle>
            <CardDescription className="text-base mb-6">
              Completa tu información y comienza a agregar proyectos para construir tu perfil profesional
            </CardDescription>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setEditMode(true)} className="bg-blue-600 hover:bg-blue-700">
                <Edit3 className="h-4 w-4 mr-2" />
                Completar Perfil
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/portfolio'}>
                <Target className="h-4 w-4 mr-2" />
                Agregar Proyecto
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 