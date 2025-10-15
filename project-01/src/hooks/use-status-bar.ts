import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export const useStatusBar = (isDark: boolean = false) => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const setupStatusBar = async () => {
        try {
          // Ensure status bar is visible
          await StatusBar.show();
          
          // Set status bar style based on theme
          await StatusBar.setStyle({ 
            style: isDark ? Style.Light : Style.Dark 
          });
          
          // Set background color based on theme
          await StatusBar.setBackgroundColor({ 
            color: isDark ? '#000000' : '#ffffff' 
          });
          
          // Ensure status bar doesn't overlay content
          await StatusBar.setOverlaysWebView({ overlay: false });
        } catch (error) {
          console.log('StatusBar setup error:', error);
        }
      };
      
      setupStatusBar();
    }
  }, [isDark]);
};