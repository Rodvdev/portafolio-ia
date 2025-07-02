import type { Metadata } from "next";
import { redirect } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portafolio IA - Plataforma para Estudiantes",
  description: "Sistema modular para validar habilidades y generar portafolio profesional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-gradient-to-br from-blue-50 to-indigo-100 text-foreground">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
