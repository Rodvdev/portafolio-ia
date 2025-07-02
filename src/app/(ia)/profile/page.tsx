"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPublicProfile } from "@/data/mockData";

export default function ProfilePage() {
  const exportToPDF = () => {
    alert("Funcionalidad de exportación a PDF - En desarrollo 📄");
  };

  const applyToJob = () => {
    alert("Redirigiendo a oportunidades laborales... 💼");
  };

  const copyProfileURL = () => {
    navigator.clipboard.writeText(mockPublicProfile.url);
    alert("URL del perfil copiada al portapapeles! 🔗");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header del perfil */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {mockPublicProfile.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <CardTitle className="text-2xl">{mockPublicProfile.fullName}</CardTitle>
                <CardDescription className="text-base">
                  Estudiante de Administración | Finanzas & Análisis de Datos
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyProfileURL}>
                Copiar URL 🔗
              </Button>
              <Button variant="outline" onClick={exportToPDF}>
                Exportar PDF 📄
              </Button>
              <Button onClick={applyToJob}>
                Aplicar a Empleos 💼
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Resumen profesional */}
      <Card>
        <CardHeader>
          <CardTitle>👨‍💼 Resumen Profesional</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {mockPublicProfile.summary}
          </p>
        </CardContent>
      </Card>

      {/* Badges y certificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Certificaciones y Badges</CardTitle>
          <CardDescription>
            Validaciones obtenidas a través de proyectos prácticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            {mockPublicProfile.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm bg-blue-100 text-blue-800"
              >
                🏆 {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio de proyectos */}
      <Card>
        <CardHeader>
          <CardTitle>📁 Portafolio de Proyectos</CardTitle>
          <CardDescription>
            Proyectos que demuestran mis habilidades técnicas y analíticas
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {mockPublicProfile.portfolioItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <Badge 
                      variant={item.level === 'Avanzado' ? 'destructive' : item.level === 'Intermedio' ? 'default' : 'secondary'}
                    >
                      {item.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                {item.badgeUrl && (
                  <div className="text-2xl">🏆</div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  {item.description}
                </p>
                
                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-medium text-green-900 mb-1">✨ Resultados y Aprendizajes</h4>
                  <p className="text-sm text-green-800">
                    {item.feedback}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Ver Detalle
                  </Button>
                  <Button size="sm" variant="outline">
                    Descargar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Habilidades técnicas */}
      <Card>
        <CardHeader>
          <CardTitle>💻 Competencias Técnicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Herramientas y Software</h4>
              <div className="flex flex-wrap gap-2">
                {['Excel Avanzado', 'PowerBI', 'SQL', 'Python', 'Google Analytics'].map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Áreas de Especialización</h4>
              <div className="flex flex-wrap gap-2">
                {['Análisis Financiero', 'Investigación de Mercado', 'Modelado de Datos', 'Business Intelligence'].map((area) => (
                  <Badge key={area} variant="outline">{area}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enlaces externos */}
      <Card>
        <CardHeader>
          <CardTitle>🔗 Enlaces Profesionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {mockPublicProfile.links.linkedin && (
              <Button 
                variant="outline" 
                onClick={() => window.open(mockPublicProfile.links.linkedin, '_blank')}
              >
                LinkedIn 💼
              </Button>
            )}
            {mockPublicProfile.links.github && (
              <Button 
                variant="outline"
                onClick={() => window.open(mockPublicProfile.links.github, '_blank')}
              >
                GitHub 💻
              </Button>
            )}
            <Button variant="outline">
              Descargar CV 📄
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA para reclutadores */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-green-800">
              ¿Interesado en mis habilidades?
            </h3>
            <p className="text-green-700">
              Mi perfil ha sido validado a través de proyectos prácticos reales. 
              Estoy buscando oportunidades para aplicar mis conocimientos en un entorno profesional.
            </p>
            <div className="flex justify-center gap-3">
              <Button size="lg">
                Contactar 📧
              </Button>
              <Button size="lg" variant="outline">
                Descargar Portfolio Completo 📁
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer con stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {mockPublicProfile.portfolioItems.length}
              </div>
              <div className="text-sm text-gray-600">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {mockPublicProfile.badges.length}
              </div>
              <div className="text-sm text-gray-600">Certificaciones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <div className="text-sm text-gray-600">Score Promedio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">A+</div>
              <div className="text-sm text-gray-600">Calificación IA</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Powered by */}
      <div className="text-center py-6 text-gray-500">
        <p className="text-sm">
          💡 Perfil generado automáticamente por Portafolio IA
        </p>
        <p className="text-xs mt-1">
          Validado a través de proyectos prácticos y feedback de inteligencia artificial
        </p>
      </div>
    </div>
  );
} 