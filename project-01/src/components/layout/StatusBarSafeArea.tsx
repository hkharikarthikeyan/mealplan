import React from 'react';
import { Capacitor } from '@capacitor/core';

interface StatusBarSafeAreaProps {
  children: React.ReactNode;
  className?: string;
}

export const StatusBarSafeArea: React.FC<StatusBarSafeAreaProps> = ({ 
  children, 
  className = '' 
}) => {
  const isNative = Capacitor.isNativePlatform();
  
  return (
    <div 
      className={`
        ${isNative ? 'status-bar-safe' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};