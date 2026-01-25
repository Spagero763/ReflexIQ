# Game Development Guide

## Adding a New Game

### Step 1: Create the Flow

File: `src/ai/flows/my-game.ts`

```typescript
import { defineFlow } from '@genkit-ai/flow';

export const myGameFlow = defineFlow(
  {
    name: 'myGame',
    inputSchema: { /* ... */ },
    outputSchema: { /* ... */ },
  },
  async (input) => {
    // Generate game state
    return {
      /* game data */
    };
  }
);
```

### Step 2: Create the Schema

File: `src/ai/schemas/my-game.ts`

```typescript
import { defineSchema } from '@genkit-ai/flow';

export const myGameInputSchema = defineSchema('MyGameInput', {
  /* schema definition */
});

export const myGameOutputSchema = defineSchema('MyGameOutput', {
  /* schema definition */
});
```

### Step 3: Create Types

File: `src/types/my-game-models.ts`

Define all TypeScript interfaces for your game.

### Step 4: Create Components

File: `src/components/my-game-player.tsx`

Create reusable game components.

### Step 5: Create Game Page

File: `src/app/(app)/games/my-game/page.tsx`

Integrate all components into the game page.

## Game Session Management

Track:
- Start time
- Player actions
- Score/results
- Duration
- Difficulty level

## Analytics Events

Emit events for:
- Game start
- User actions
- Game completion
- Errors

## Testing Your Game

1. Test with different difficulty levels
2. Test input validation
3. Test edge cases
4. Test performance
5. Test mobile responsiveness
