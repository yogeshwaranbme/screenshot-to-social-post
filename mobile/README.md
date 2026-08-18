# mobile

This directory will house the mobile app for this project.

Recommended starter: Expo (React Native)

Why Expo?
- Fast iteration and easy setup with JavaScript/TypeScript
- Works well alongside an existing Next.js repo

Quick start (using Expo):

1. Create the app (inside this `mobile/` folder):

```bash
# from the repository root
cd mobile
npx create-expo-app .
# or to create a TypeScript app:
# npx create-expo-app . --template expo-template-blank-typescript
```

2. Install dependencies and run the dev server:

```bash
cd mobile
npm install
npm start
# or
# yarn
# expo start
```

3. Run on device or simulator
- Scan the QR code with the Expo Go app (Android/iOS)
- Or run a simulator/emulator: `npm run ios` or `npm run android` (requires native toolchain)

Minimal recommended files to commit for a starter (created by create-expo-app):
- App.js or App.tsx
- app.json / app.config.js
- package.json
- assets/

Notes and options
- If you prefer native-only workflows, use React Native CLI instead of Expo.
- To use Flutter instead, create a separate `mobile_flutter/` directory and follow Flutter tooling.
- Consider adding CI for mobile (e.g., GitHub Actions) or a basic `.gitignore` in `mobile/`.

Next steps I can do for you (pick one):
- Initialize an Expo app scaffold (create basic App.js + package.json) and commit it here.
- Create a minimal TypeScript Expo scaffold.
- Add only a `.gitkeep` and this README if you just want to reserve the folder.

If you want me to proceed, tell me which of the above to commit and I will add it to the `feat/mobile-framework-init` branch with the commit message `feat: mobile framework init`.
