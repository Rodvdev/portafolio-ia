import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🧠 Plataforma IA para Estudiantes
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Valida tus habilidades, construye tu portafolio profesional
        </p>
        <Badge variant="secondary" className="mb-8">
          Demo Interactiva - Next.js 15 + TypeScript
        </Badge>
      </div>

      {/* Journey Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👋 Onboarding
            </CardTitle>
            <CardDescription>
              Diagnóstico inicial de intereses y habilidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={100} className="h-2" />
              <p className="text-sm text-gray-600">
                Cuestionario gamificado de 5-7 minutos
              </p>
              <Link href="/onboarding">
                <Button className="w-full">
                  Comenzar Journey 🚀
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧪 Diagnóstico
            </CardTitle>
            <CardDescription>
              Pruebas personalizadas por área de especialización
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={75} className="h-2" />
              <p className="text-sm text-gray-600">
                Evaluaciones cognitivas, situacionales y técnicas
              </p>
              <Link href="/diagnostic">
                <Button variant="outline" className="w-full">
                  Ver Diagnóstico 📋
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📁 Portafolio
            </CardTitle>
            <CardDescription>
              Retos prácticos que validan tus habilidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={60} className="h-2" />
              <p className="text-sm text-gray-600">
                Proyectos reales con feedback de IA
              </p>
              <Link href="/portfolio">
                <Button variant="outline" className="w-full">
                  Construir Portafolio 💼
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Progreso Actual</CardTitle>
          <CardDescription>
            Resumen de tu journey en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Proyectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">Badges Obtenidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">78%</div>
              <div className="text-sm text-gray-600">Score Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Días Activo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📔 Seguimiento Diario</CardTitle>
            <CardDescription>
              Reflexiona y recibe sugerencias personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/daily">
              <Button variant="outline" className="w-full">
                Abrir Diario
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 Resumen Semanal</CardTitle>
            <CardDescription>
              Analiza tu progreso y logros semanales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/weekly">
              <Button variant="outline" className="w-full">
                Ver Resumen
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500">
        <p>🎯 Construido para estudiantes de Administración y Negocios Digitales</p>
        <p className="text-sm mt-2">
          Framework: Next.js 15 + TypeScript + TailwindCSS + ShadCN
        </p>
      </div>
    </div>
  );
} 