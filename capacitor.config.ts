// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'pro-aula-gestion',
  webDir: 'www', // Confirma que este valor sea "www"
  bundledWebRuntime: false,
};

export default config;

