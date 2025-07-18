"use client";

import dynamic from 'next/dynamic';

const WeeklyPageClient = dynamic(() => import('./weekly-client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📊</div>
        <div className="text-xl text-gray-600">Cargando tu progreso semanal...</div>
      </div>
    </div>
  )
});

export default function WeeklyPage() {
  return <WeeklyPageClient />;
} 