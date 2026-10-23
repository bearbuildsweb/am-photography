import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import faviconUrl from './assets/images/favicon-new.png';

// Ensure favicon is dynamically set to Vite's resolved asset URL for GitHub Pages / subpath support
if (typeof document !== 'undefined') {
  const setFavicon = (rel: string) => {
    let link = document.querySelector<HTMLLinkElement>(`link[rel='${rel}']`);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  };
  setFavicon('icon');
  setFavicon('shortcut icon');
  setFavicon('apple-touch-icon');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
