# ToDo OCP - Feature Specification

## App Overview

**App Name:** ToDo OCP  
**Language:** TypeScript  
**Storage:** Session-based local storage (data clears on page refresh)

## Technical Stack

- TypeScript
- React 18
- Vite (build tool)
- HTML/CSS for UI
- Session Storage API
- OCP (OpenShift Container Platform) deployment with S2I

## Features

### 1. Add ToDo

**Input:**
- Text box for entering ToDo item
- Submit button

**Behavior:**
- User enters text (word, line, or digit)
- On submit, text is added to the ToDo list
- Text box clears after submission

### 2. Complete/Delete ToDo

**Actions:**
- Mark todo as complete (strikethrough)
- Delete todo from list

## Project Structure

```
ToDo-OCP/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── components/
│       ├── TodoInput.tsx
│       └── TodoList.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Technical Dependencies

### Production Dependencies
- react: ^18.2.0
- react-dom: ^18.2.0
- vite: ^4.3.0
- @vitejs/plugin-react: ^4.0.0
- typescript: ^5.0.0

### Dev Dependencies
- @types/react: ^18.2.0
- @types/react-dom: ^18.2.0

**Note:** Vite, TypeScript, and @vitejs/plugin-react must be in `dependencies` (not `devDependencies`) for OCP production builds, as they are required by `vite preview` command and `vite.config.ts`.

## Build Configuration

### package.json

```json
{
  "name": "todo-ocp",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "vite preview --port 8080 --host"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^4.3.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true
  },
  preview: {
    port: 8080,
    host: true,
    strictPort: true,
    allowedHosts: true
  }
})
```

**Key Configuration:**
- `host: true` - Allows external access
- `strictPort: true` - Fails if port 8080 is unavailable
- `allowedHosts: true` - Disables host checking for OCP route access

## Local Development

### Prerequisites
- Node.js 16 or higher
- npm

### Setup and Run

```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build (port 8080)
npm run preview
```

## OCP Deployment

### Prerequisites
- OpenShift CLI (`oc`) installed
- Access to OpenShift cluster
- Git repository with code

### Deployment Methods

**Option 1: OpenShift Console (Recommended)**
1. Navigate to Developer perspective → "+Add" → "Import from Git"
2. Enter Git repository URL
3. Select Node.js builder image (version 18+)
4. Set Application/Name as `todo-ocp`
5. Ensure port 8080 is configured
6. Check "Create Route"
7. Click "Create"

**Option 2: CLI**
```bash
oc new-project todo-ocp
oc new-app nodejs~https://github.com/ChinmayGitHub/ToDo-OCP.git --name=todo-ocp
oc expose svc/todo-ocp
oc get route todo-ocp
```

### S2I Build Process

1. S2I detects `package.json`
2. Runs `npm install` (installs all dependencies)
3. Runs `npm run build` (creates production build)
4. Runs `npm start` (serves via `vite preview` on port 8080)

### Deployment Troubleshooting

**Issue 1: CrashLoopBackOff - "vite: command not found"**
- **Cause:** Vite was in `devDependencies`
- **Solution:** Move `vite` to `dependencies`

**Issue 2: "Cannot find module '@vitejs/plugin-react'"**
- **Cause:** Plugin was in `devDependencies` but required by `vite.config.ts`
- **Solution:** Move `@vitejs/plugin-react` to `dependencies`

**Issue 3: "Blocked request. This host is not allowed"**
- **Cause:** Vite preview blocks unknown hostnames by default
- **Solution:** Add `allowedHosts: true` to preview config in `vite.config.ts`

### Verification

```bash
# Check pod status
oc get pods

# Check service
oc get svc

# Check route
oc get route

# View logs
oc logs -f deployment/todo-ocp
```

## Key Learnings

1. **Production Dependencies:** Build tools required at runtime must be in `dependencies`, not `devDependencies`
2. **Host Configuration:** OCP routes require `allowedHosts: true` in Vite preview config
3. **Port Configuration:** Must use port 8080 for OCP compatibility
4. **S2I Process:** OpenShift automatically runs install, build, and start scripts from `package.json`