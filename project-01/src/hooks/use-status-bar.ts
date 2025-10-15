import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export const useStatusBar = (isDark: boolean = false) => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Set status bar style based on theme
      StatusBar.setStyle({ 
        style: isDark ? Style.Light : Style.Dark 
      });
      
      // Set background color based on theme
      StatusBar.setBackgroundColor({ 
        color: isDark ? '#000000' : '#ffffff' 
      });
      
      // Ensure status bar doesn't overlay content
      StatusBar.setOverlaysWebView({ overlay: false });
    }
  }, [isDark]);
};