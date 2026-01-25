# ReflexIQ Architecture

## Project Structure

```
src/
├── ai/           # AI/Genkit flows and schemas
├── app/          # Next.js app and pages
├── components/   # React components
├── hooks/        # Custom React hooks
├── lib/          # Utilities and helpers
├── types/        # TypeScript type definitions
```

## Core Concepts

### Game Flows
Each game has an associated Genkit flow that handles:
- Input validation
- Logic generation
- Output formatting

### Type System
Strongly typed models for:
- Game state
- User profiles
- Analytics
- Payments
- Social features

### Component Architecture
Components follow:
- Functional component pattern
- TypeScript interfaces
- Atomic design principles
- Reusable, modular structure

## Data Flow

1. User initiates game
2. Flow generates game state
3. Component renders interface
4. User input triggers actions
5. Analytics logged
6. Results saved to database

## Firebase Integration

- Authentication
- Realtime database for multiplayer
- Cloud Firestore for persistent data
- Cloud Functions for serverless logic

## Performance Considerations

- Lazy load game components
- Optimize bundle size
- Cache generated puzzles
- Debounce user input
- Monitor Core Web Vitals
