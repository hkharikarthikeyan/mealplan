import { createRoot } from "react-dom/client";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import App from "./App.tsx";
import "./index.css";

// Configure status bar for mobile app
if (Capacitor.isNativePlatform()) {
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#ffffff' });
  StatusBar.setOverlaysWebView({ overlay: false });
}

createRoot(document.getElementById("root")!).render(<App />);
