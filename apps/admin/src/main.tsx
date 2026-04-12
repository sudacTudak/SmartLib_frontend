import '@shared-packages/styles/smartlib-root.css';
import { SmartLibConfigProvider } from '@shared-packages/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmartLibConfigProvider>
      <App />
    </SmartLibConfigProvider>
  </StrictMode>,
);
