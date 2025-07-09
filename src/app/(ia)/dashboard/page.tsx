"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamification } from "@/components/ui/gamification";
import { useUserProgress } from "@/hooks/useLocalStorage";

export default function DashboardPage() {
  const { progress } = useUserProgress();
  // const { addPoints } = useUserProgress(); // Will be used later
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="float-animation">
            <div className="text-6xl mb-4">🌟</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Desarrolla tu Esencia Profesional
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre y valida tus <span className="font-semibold text-purple-600">habilidades blandas</span> a través de casos interactivos y construye un portafolio que muestre tu potencial humano
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="communication-badge">Comunicación</Badge>
            <Badge className="leadership-badge">Liderazgo</Badge>
            <Badge className="empathy-badge">Empatía</Badge>
            <Badge className="creativity-badge">Creatividad</Badge>
            <Badge className="resilience-badge">Resiliencia</Badge>
            <Badge className="collaboration-badge">Colaboración</Badge>
          </div>
        </div>

        {/* Progress Overview - Gamification */}
        <Gamification size="full" showAchievements={true} />

        {/* Journey Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="skill-card hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-3xl">🌱</div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Paso 1
                </Badge>
              </div>
              <CardTitle className="text-xl">Autoconocimiento</CardTitle>
              <CardDescription>
                Descubre tus fortalezas naturales y áreas de crecimiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Intereses y valores</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Confianza en habilidades</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Metas profesionales</span>
                </div>
                <Link href="/onboarding">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Comenzar Journey 🚀
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="skill-card hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-3xl">🎭</div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Paso 2
                </Badge>
              </div>
              <CardTitle className="text-xl">Casos Interactivos</CardTitle>
              <CardDescription>
                Enfrenta situaciones reales y demuestra tu potencial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Resolución de conflictos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Negociación efectiva</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Trabajo bajo presión</span>
                </div>
                <Link href="/diagnostic">
                  <Button variant="outline" className="w-full border-blue-300 hover:bg-blue-50">
                    Explorar Casos 🎯
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="skill-card hover:shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-3xl">🏆</div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Paso 3
                </Badge>
              </div>
              <CardTitle className="text-xl">Portafolio Humano</CardTitle>
              <CardDescription>
                Construye evidencia concreta de tus habilidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Logros validados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Feedback de IA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Badges profesionales</span>
                </div>
                <Link href="/portfolio">
                  <Button variant="outline" className="w-full border-purple-300 hover:bg-purple-50">
                    Ver Portafolio 📁
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="skill-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-2xl">💭</div>
                <div>
                  <CardTitle>Reflexión Diaria</CardTitle>
                  <CardDescription>
                    Conecta con tus emociones y crece cada día
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="coach-message">
                  <p className="text-sm font-medium text-blue-800">
                    💡 &ldquo;Cada reflexión es un paso hacia el autoconocimiento&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Racha: {progress.currentStreak} días
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    Pendiente
                  </Badge>
                </div>
                <Link href="/daily">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Reflexionar Hoy 📔
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-2xl">📈</div>
                <div>
                  <CardTitle>Progreso Semanal</CardTitle>
                  <CardDescription>
                    Celebra tus logros y planifica tu crecimiento
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-xs text-gray-600">Casos completados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-xs text-gray-600">Nuevas habilidades</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-xs text-gray-600">Días activos</div>
                  </div>
                </div>
                <Link href="/weekly">
                  <Button variant="outline" className="w-full border-green-300 hover:bg-green-50">
                    Ver Resumen 📊
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coach Virtual */}
        <Card className="skill-card emotional-glow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl float-animation">🤖</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  Tu Coach Virtual te dice:
                </h3>
                <p className="text-gray-600 mt-1">
                  &ldquo;¡Excelente progreso esta semana! Has demostrado gran <span className="font-semibold text-purple-600">empatía</span> en el último caso. 
                  Te sugiero explorar situaciones de <span className="font-semibold text-blue-600">liderazgo</span> para seguir creciendo.&rdquo;
                </p>
              </div>
              <div className="text-right">
                <Badge className="badge-animated bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Nuevo insight
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            ¿Listo para mostrar tu potencial humano al mundo?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Crea tu perfil profesional y comparte tu esencia con reclutadores que valoran las habilidades blandas
          </p>
          <Link href="/profile">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8">
              Crear Mi Perfil ✨
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <span>🎯</span>
            <span>Especializado en estudiantes de Administración y Negocios Digitales</span>
          </p>
          <p className="text-sm">
            Desarrollado con ❤️ para potenciar tu crecimiento profesional
          </p>
        </div>
      </div>
    </div>
  );
} 