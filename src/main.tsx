import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign sandboxed environment WebSocket errors from displaying red banners
if (typeof window !== 'undefined') {
  const isWebsocketError = (err: any) => {
    if (!err) return false;
    const msg = typeof err === 'string' ? err : err.message || '';
    return (
      msg.includes('WebSocket') ||
      msg.includes('websocket') ||
      msg.includes('failed to connect')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    if (isWebsocketError(event.reason)) {
      event.preventDefault();
      console.debug('Suppressed benign workspace HMR websocket rejection:', event.reason);
    }
  });

  window.addEventListener('error', (event) => {
    if (isWebsocketError(event.message) || isWebsocketError(event.error)) {
      event.preventDefault();
      console.debug('Suppressed benign workspace HMR websocket error:', event.message);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

