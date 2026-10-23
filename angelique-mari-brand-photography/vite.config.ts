import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const getEnv = (key: string) => (typeof process !== 'undefined' && process.env ? (process.env[key] || '').replace(/^["']|["']$/g, '').trim() : '');
  const anonKey = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANO') || getEnv('VITE_SUPABASE_PUBLISHABLE_KEY');
  const supabaseUrl = getEnv('VITE_SUPABASE_URL');
  const functionUrl = getEnv('VITE_SUPABASE_FUNCTION_URL') || getEnv('VITE_SUPABASE_FUN') || getEnv('VITE_EDGE_FUNCTION_URL');

  return {
    base: process.env.BASE_PATH || './',
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(anonKey),
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_FUNCTION_URL': JSON.stringify(functionUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});