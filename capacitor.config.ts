
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f4b79f747e9a4a4494f2a2d43c32d73f',
  appName: 'quick-report-tablet-app',
  webDir: 'dist',
  server: {
    url: 'https://f4b79f74-7e9a-4a44-94f2-a2d43c32d73f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
