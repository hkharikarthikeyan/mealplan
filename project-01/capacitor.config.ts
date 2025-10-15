import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.freshplate.app',
  appName: 'FreshPlate',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#ffffff',
      overlaysWebView: false,
      androidStatusBarColor: '#ffffff'
    }
  }
};

export default config;
