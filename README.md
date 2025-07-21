# Skills Evaluation App

A React 19-based application that evaluates user skills through multiple data sources including personal information, Git repository analysis, and Google account integration.

## Features

- 🎨 **Theme Toggle**: Beautiful dark/light mode switching with smooth transitions
- 🔐 **Authentication**: Google OAuth integration
- 📊 **Skills Analysis**: Comprehensive evaluation of technical and professional skills
- 🤖 **AI Recommendations**: Personalized suggestions to improve and advance your career
- 📈 **Progress Tracking**: Monitor your skill development over time with detailed analytics

## Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: NextAuth.js with Google provider
- **State Management**: TanStack Query for server state
- **Design System**: Custom component library with theme support

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Theme System

The app includes a comprehensive theme system with:
- Light and dark mode support
- System theme detection
- Smooth transitions and animations
- Persistent theme preferences
- Accessible color schemes

## Project Structure

```
packages/
├── app/                 # Main Next.js application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── app/        # App Router pages
│   │   └── ...
└── design-system/      # Shared component library
    ├── src/
    │   ├── components/ # Design system components
    │   ├── theme/      # Theme implementation
    │   └── ...
```

## Development

This is a monorepo using npm workspaces. The design system must be built before the app.

```bash
# Build design system
npm run design-system:build

# Build everything
npm run build
```