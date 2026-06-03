# ToDo OCP - Feature Specification

## App Overview

**App Name:** ToDo OCP  
**Language:** TypeScript  
**Storage:** Session-based local storage (data clears on page refresh)

## Technical Stack

- TypeScript
- React
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

### 2. List ToDo

**Display:**
- Shows all available ToDo items
- Simple list format

**Limitations:**
- No edit functionality
- No update functionality
- No delete functionality

## User Interface

**Layout:** Single page application

**Components:**
1. Text input box (top)
2. Submit button (next to text box)
3. ToDo list display (below input section)

**Flow:**
```
[Text Input Box] [Submit Button]
─────────────────────────────────
ToDo List:
- Item 1
- Item 2
- Item 3
```

## Data Management

**Storage Type:** Session Storage
- Data persists only during the current browser session
- Data is cleared when page is refreshed
- No persistent storage

## Project Structure

```
ToDo-OCP/
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── TodoInput.tsx
│   │   └── TodoList.tsx
│   └── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Technical Dependencies

**Required packages:**
- react
- react-dom
- typescript
- vite

**Dev dependencies:**
- @types/react
- @types/react-dom
- @vitejs/plugin-react

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
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.3.0"
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
    host: true
  }
})
```

## Local Development

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup and Run Locally

1. **Clone Repository**
   ```bash
   git clone https://github.com/ChinmayGitHub/ToDo-OCP.git
   cd ToDo-OCP
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Application will start on http://localhost:5173
   - Hot reload enabled for development

4. **Build for Production**
   ```bash
   npm run build
   ```
   - Creates optimized production build in `dist/` directory

5. **Preview Production Build**
   ```bash
   npm start
   ```
   - Serves production build on http://localhost:8080
   - This simulates the OCP deployment environment

## Deployment

**Platform:** OpenShift Container Platform (OCP)

**Method:** Import from Git

**Repository:**
- URL: https://github.com/ChinmayGitHub/ToDo-OCP
- New repository to be created

### S2I (Source-to-Image) Configuration

**Builder Image:** Node.js (ubi8/nodejs-18 or similar)

**Build Process:**
1. S2I detects package.json
2. Runs `npm install`
3. Runs `npm run build`
4. Serves built files using `npm start`

**Port:** 8080 (required for OCP)

### OCP Deployment Steps

1. **Create GitHub Repository**
   - Repository name: ToDo-OCP
   - Push all application code including:
     - src/ directory
     - package.json
     - tsconfig.json
     - vite.config.ts

2. **OCP Console - Import from Git**
   - Navigate to Developer perspective
   - Click "+Add" → "Import from Git"
   - Enter Git repository URL: https://github.com/ChinmayGitHub/ToDo-OCP

3. **Configure Import**
   - Builder Image: Select "Node.js" (version 18 or higher)
   - Builder Image Version: 18-ubi8 (or latest available)
   - Application Name: todo-ocp
   - Name: todo-ocp

4. **Build Configuration**
   - S2I will automatically:
     - Detect package.json
     - Install dependencies with `npm install`
     - Build the app with `npm run build`
     - Start the app with `npm start` on port 8080

5. **Deployment Configuration**
   - Target Port: 8080
   - Create Route: Yes (checked)
   - Route: Auto-generated public URL

6. **Deploy**
   - Click "Create"
   - OCP will build and deploy the application
   - Monitor build logs in the Topology view

7. **Access Application**
   - Once deployment is complete, click on the route URL
   - Application will be accessible via the generated route


## Out of Scope

- No tests
- No examples
- No comments
- No README
- No validations
- No exceptions handling
- No edit/update/delete functionality
- No persistent storage