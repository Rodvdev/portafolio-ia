import { useEffect, useRef, useState } from 'react';

interface ServiceWorkerHook {
  isRegistered: boolean;
  isSupported: boolean;
  sendMessage: (type: string, data?: any) => void;
  requestNotificationPermission: () => Promise<boolean>;
}

export const useServiceWorker = (): ServiceWorkerHook => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const swRegistration = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Verificar soporte para Service Workers
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      registerServiceWorker();
    } else {
      console.log('Service Workers no soportados en este navegador');
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      swRegistration.current = registration;
      setIsRegistered(true);

      console.log('🔧 Service Worker registrado:', registration);

      // Escuchar mensajes del Service Worker
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

      // Manejar actualizaciones del Service Worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 Nueva versión del Service Worker disponible');
              // Opcionalmente mostrar notificación de actualización
            }
          });
        }
      });

    } catch (error) {
      console.error('❌ Error registrando Service Worker:', error);
    }
  };

  const handleServiceWorkerMessage = (event: MessageEvent) => {
    const { type, data } = event.data;

    switch (type) {
      case 'TIMER_UPDATE':
        // Emitir evento personalizado para que los componentes puedan escuchar
        window.dispatchEvent(new CustomEvent('sw-timer-update', { detail: data }));
        break;
      case 'TIMER_COMPLETE':
        window.dispatchEvent(new CustomEvent('sw-timer-complete', { detail: data }));
        break;
      default:
        console.log('📨 Mensaje del Service Worker:', type, data);
    }
  };

  const sendMessage = (type: string, data?: any) => {
    if (!isRegistered || !swRegistration.current?.active) {
      console.warn('Service Worker no disponible para enviar mensaje');
      return;
    }

    swRegistration.current.active.postMessage({
      type,
      data
    });
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('Notificaciones no soportadas');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.log('Permisos de notificación denegados');
      return false;
    }

    // Solicitar permiso
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  };

  return {
    isRegistered,
    isSupported,
    sendMessage,
    requestNotificationPermission
  };
}; 