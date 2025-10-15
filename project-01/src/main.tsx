import { createRoot } from "react-dom/client";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import App from "./App.tsx";
import "./index.css";

// Configure status bar for mobile app
if (Capacitor.isNativePlatform()) {
  const setupStatusBar = async () => {
    await StatusBar.show();
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  };
  setupStatusBar();
}

createRoot(document.getElementById("root")!).render(<App />);
