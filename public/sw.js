// Service Worker para Widget Flotante Persistente
// Mantiene el timer funcionando incluso cuando el navegador está cerrado

const CACHE_NAME = 'enfoque-sagrado-v1';
const WIDGET_DATA_KEY = 'widget-session-data';

// Instalar el Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker instalado');
  self.skipWaiting();
});

// Activar el Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activado');
  event.waitUntil(clients.claim());
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'START_TIMER':
      handleStartTimer(data);
      break;
    case 'STOP_TIMER':
      handleStopTimer();
      break;
    case 'UPDATE_TIMER':
      handleUpdateTimer(data);
      break;
    case 'GET_TIMER_STATUS':
      handleGetTimerStatus(event);
      break;
  }
});

// Variables globales del timer
let timerData = null;
let timerInterval = null;

// Iniciar timer en background
function handleStartTimer(data) {
  console.log('🍅 Iniciando timer en background:', data);
  
  timerData = {
    ...data,
    startTime: Date.now(),
    isRunning: true,
    isPaused: false
  };

  // Guardar en IndexedDB para persistencia
  saveTimerData(timerData);

  // Iniciar contador
  startBackgroundTimer();

  // Mostrar notificación de inicio
  if (Notification.permission === 'granted') {
    self.registration.showNotification('🕉️ Enfoque Sagrado Iniciado', {
      body: `${data.purpose} - ${data.theme}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'timer-start',
      silent: true
    });
  }
}

// Detener timer
function handleStopTimer() {
  console.log('⏹️ Deteniendo timer en background');
  
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (timerData) {
    timerData.isRunning = false;
    saveTimerData(timerData);
  }

  // Limpiar datos
  clearTimerData();
}

// Actualizar timer
function handleUpdateTimer(data) {
  if (timerData) {
    timerData = { ...timerData, ...data };
    saveTimerData(timerData);
  }
}

// Obtener estado del timer
function handleGetTimerStatus(event) {
  if (timerData && timerData.isRunning) {
    const elapsed = Math.floor((Date.now() - timerData.startTime) / 1000);
    const timeLeft = Math.max(0, timerData.totalTime - elapsed);
    
    event.ports[0].postMessage({
      type: 'TIMER_STATUS',
      data: {
        ...timerData,
        timeLeft,
        elapsed
      }
    });
  } else {
    event.ports[0].postMessage({
      type: 'TIMER_STATUS',
      data: null
    });
  }
}

// Timer en background
function startBackgroundTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (!timerData || !timerData.isRunning) {
      clearInterval(timerInterval);
      return;
    }

    const elapsed = Math.floor((Date.now() - timerData.startTime) / 1000);
    const timeLeft = Math.max(0, timerData.totalTime - elapsed);

    // Si el tiempo se acabó
    if (timeLeft <= 0) {
      handleTimerComplete();
    }

    // Notificar a todos los clientes
    broadcastToClients({
      type: 'TIMER_UPDATE',
      data: {
        timeLeft,
        elapsed,
        flowPhase: calculateFlowPhase(elapsed),
        flowIntensity: calculateFlowIntensity(elapsed)
      }
    });

  }, 1000);
}

// Cuando el timer se completa
function handleTimerComplete() {
  console.log('⏰ Timer completado en background');

  if (Notification.permission === 'granted') {
    self.registration.showNotification('✨ Enfoque Sagrado Completado', {
      body: '¡Tu sesión ha terminado! Tiempo de reflexión.',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'timer-complete',
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'Ver Reflexión'
        },
        {
          action: 'new',
          title: 'Nueva Sesión'
        }
      ]
    });
  }

  // Notificar completación
  broadcastToClients({
    type: 'TIMER_COMPLETE',
    data: timerData
  });

  // Limpiar timer
  handleStopTimer();
}

// Calcular fase de flow basada en tiempo transcurrido
function calculateFlowPhase(elapsed) {
  const minutes = elapsed / 60;
  if (minutes < 3) return 'warming';
  if (minutes < 8) return 'entering';
  if (minutes < 18) return 'deep';
  return 'transcendent';
}

// Calcular intensidad de flow
function calculateFlowIntensity(elapsed) {
  const minutes = elapsed / 60;
  if (minutes < 3) return Math.min(25, (minutes / 3) * 25);
  if (minutes < 8) return Math.min(50, 25 + ((minutes - 3) / 5) * 25);
  if (minutes < 18) return Math.min(85, 50 + ((minutes - 8) / 10) * 35);
  return Math.min(100, 85 + ((minutes - 18) / 7) * 15);
}

// Enviar mensaje a todos los clientes
function broadcastToClients(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(message);
    });
  });
}

// Guardar datos del timer
async function saveTimerData(data) {
  try {
    // Usar Cache API como almacenamiento
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(JSON.stringify(data));
    await cache.put(WIDGET_DATA_KEY, response);
  } catch (error) {
    console.error('Error guardando datos del timer:', error);
  }
}

// Cargar datos del timer
async function loadTimerData() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(WIDGET_DATA_KEY);
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error cargando datos del timer:', error);
  }
  return null;
}

// Limpiar datos del timer
async function clearTimerData() {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(WIDGET_DATA_KEY);
  } catch (error) {
    console.error('Error limpiando datos del timer:', error);
  }
}

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    // Abrir la app en la página de reflexión
    event.waitUntil(
      clients.openWindow('/focus?completed=true')
    );
  } else if (event.action === 'new') {
    // Abrir la app para nueva sesión
    event.waitUntil(
      clients.openWindow('/focus')
    );
  } else {
    // Click en la notificación (no en acción específica)
    event.waitUntil(
      clients.openWindow('/focus')
    );
  }
});

// Cargar datos del timer al iniciar el SW
self.addEventListener('activate', (event) => {
  event.waitUntil(
    loadTimerData().then(data => {
      if (data && data.isRunning) {
        console.log('🔄 Recuperando timer desde cache:', data);
        timerData = data;
        
        // Verificar si aún está en tiempo
        const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
        const timeLeft = Math.max(0, data.totalTime - elapsed);
        
        if (timeLeft > 0) {
          startBackgroundTimer();
        } else {
          // Timer ya expiró mientras estaba offline
          handleTimerComplete();
        }
      }
    })
  );
});

console.log('🚀 Service Worker del Enfoque Sagrado cargado'); 