# Testing Guide

## Unit Tests

Run unit tests:
```bash
npm test
```

## Component Testing

Test React components with React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { GameStatsPanel } from '@/components/game-stats-panel';

test('renders stats correctly', () => {
  render(<GameStatsPanel score={100} level={5} streak={10} accuracy={95} />);
  expect(screen.getByText('100')).toBeInTheDocument();
});
```

## Integration Tests

Test complete game flows:

```typescript
test('chess puzzle game flow', async () => {
  const result = await chessPuzzleFlow({
    difficulty: 'beginner',
    timeLimit: 300,
  });
  
  expect(result.boardState).toBeDefined();
  expect(result.solution).toBeDefined();
});
```

## E2E Tests

Run end-to-end tests:
```bash
npm run e2e
```

## Coverage

Generate coverage report:
```bash
npm test -- --coverage
```

Target: 80%+ coverage
