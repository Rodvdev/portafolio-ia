"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utilities/ui";

const navigationItems = [
  { href: "/dashboard", label: "Mi Journey", icon: "🌟", description: "Inicio" },
  { href: "/onboarding", label: "Autoconocimiento", icon: "🌱", description: "Paso 1" },
  { href: "/diagnostic", label: "Casos Interactivos", icon: "🎭", description: "Paso 2" },
  { href: "/portfolio", label: "Portafolio Humano", icon: "🏆", description: "Paso 3" },
  { href: "/daily", label: "Reflexión Diaria", icon: "💭", description: "Crecimiento" },
  { href: "/weekly", label: "Progreso Semanal", icon: "📈", description: "Insights" },
  { href: "/profile", label: "Esencia Profesional", icon: "✨", description: "Compartir" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <Card className="p-4 m-4 sticky top-4 bg-gradient-to-b from-white to-blue-50 border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🧠 Soft Skills Journey
          </h2>
          <p className="text-xs text-gray-500">Desarrolla tu potencial humano</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Beta
        </Badge>
      </div>
      
      <nav className="space-y-3">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group",
              pathname === item.href
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md"
            )}
          >
            <span className={cn(
              "text-lg transition-transform duration-200",
              pathname === item.href ? "scale-110" : "group-hover:scale-105"
            )}>
              {item.icon}
            </span>
            <div className="flex-1">
              <div className={cn(
                "font-medium",
                pathname === item.href ? "text-white" : "text-gray-700"
              )}>
                {item.label}
              </div>
              <div className={cn(
                "text-xs",
                pathname === item.href ? "text-white/80" : "text-gray-500"
              )}>
                {item.description}
              </div>
            </div>
            {pathname === item.href && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </Link>
        ))}
      </nav>
      
      <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🎯</span>
          <span className="text-xs font-medium text-gray-700">Tu Progreso</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Habilidades Blandas</span>
            <span className="text-xs font-bold text-purple-600">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
          </div>
        </div>
      </div>
    </Card>
  );
} 