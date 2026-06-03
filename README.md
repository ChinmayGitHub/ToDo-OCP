# Todo App

A simple, modern Todo application built with React, TypeScript, and Vite.

## Features

- Add, complete, and delete todos
- Clean, responsive UI
- Built with React 18 and TypeScript
- Fast development with Vite

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## OCP Deployment

### Prerequisites
- OpenShift CLI (`oc`) installed
- Access to an OpenShift cluster
- Logged into your OpenShift cluster

### Deployment Steps

**Option 1: Using OpenShift Console (Recommended)**

1. Navigate to OpenShift Console → Developer perspective
2. Click "+Add" → "Import from Git"
3. Enter your Git repository URL
4. Select "Node.js" builder image (version 18+)
5. Set Application/Name as `todo-app`
6. Ensure port 8080 is configured
7. Check "Create Route" to expose the app
8. Click "Create"

**Option 2: Using CLI**

```bash
# Create a new project
oc new-project todo-app

# Create the application from Git
oc new-app nodejs~https://github.com/your-repo/todo-app.git --name=todo-app

# Expose the service
oc expose svc/todo-app

# Get the route URL
oc get route todo-app
```

### Verify Deployment
```bash
# Check pod status
oc get pods

# Check service
oc get svc

# Check route
oc get route
```

**Note:** The `ToDo_OCP_Spec.md` file contains detailed deployment specifications and is for reference only. OpenShift uses S2I (Source-to-Image) to automatically build and deploy the app from the Git repository.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS** - Styling

## License

MIT