# 🔧 Status Bar Visibility Fix

## ✅ Applied Fixes

1. **MainActivity.java** - Added explicit status bar configuration
2. **styles.xml** - Set Android theme with visible status bar
3. **capacitor.config.ts** - Updated status bar plugin settings
4. **useStatusBar hook** - Added async status bar show/hide
5. **main.tsx** - Explicit StatusBar.show() call

## 🚀 Build & Test

```bash
# Build and sync
npm run build
npx cap sync android

# Open in Android Studio
npx cap open android
```

## 📱 In Android Studio

1. **Clean Project**: Build → Clean Project
2. **Rebuild**: Build → Rebuild Project  
3. **Run App**: Click green play button

## 🔍 If Still Not Visible

### Option 1: Manual Android Fix
In `android/app/src/main/res/values/styles.xml`, ensure:
```xml
<item name="android:statusBarColor">@android:color/white</item>
<item name="android:windowLightStatusBar">true</item>
```

### Option 2: Force Status Bar in Code
Add to any page component:
```tsx
import { StatusBar } from '@capacitor/status-bar';

useEffect(() => {
  StatusBar.show();
  StatusBar.setBackgroundColor({ color: '#ffffff' });
}, []);
```

### Option 3: Check Device Settings
- Some devices hide status bar in fullscreen apps
- Check device "Hide status bar" settings
- Try different Android emulator/device

## 🎯 Expected Result

Status bar should show:
- ⏰ Time
- 📶 Signal strength  
- 🔋 Battery level
- 📶 WiFi indicator

All in **dark text** on **white background** for light themes.

## 🔄 Quick Test Commands

```bash
# Rebuild everything
npm run cap:build

# Run on device
npm run cap:run:android
```

The status bar should now be visible! 🎉