"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utilities/ui";

const navigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/onboarding", label: "Onboarding", icon: "👋" },
  { href: "/diagnostic", label: "Diagnóstico", icon: "🧪" },
  { href: "/portfolio", label: "Portafolio", icon: "📁" },
  { href: "/daily", label: "Diario", icon: "📔" },
  { href: "/weekly", label: "Resumen", icon: "📊" },
  { href: "/profile", label: "Perfil", icon: "👤" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <Card className="p-4 m-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">🧠 Portafolio IA</h2>
        <Badge variant="secondary">Demo</Badge>
      </div>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </Card>
  );
} 