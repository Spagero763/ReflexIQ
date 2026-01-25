# Performance Optimization Guide

## Core Web Vitals

Monitor and optimize:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Bundle Size

Check bundle size:
```bash
npm run build
```

Keep games under 100KB each:
```
- Chess Puzzle: 45KB
- Sudoku: 38KB
- Pattern Recognition: 32KB
```

## Code Splitting

Implement lazy loading:
```typescript
const ChessGame = dynamic(() => import('@/components/games/chess'), {
  loading: () => <LoadingSpinner />,
});
```

## Image Optimization

Use Next.js Image component:
```typescript
import Image from 'next/image';

<Image src="/game-icon.png" width={64} height={64} alt="Game" />
```

## Caching Strategy

- Cache game assets for 1 year
- Cache API responses for 5 minutes
- Use SWR for data fetching

## Database Queries

Optimize Firestore:
- Index frequently queried fields
- Batch read operations
- Limit result sets

## Monitoring

Use Firebase Performance Monitoring:
```typescript
import { trace } from 'firebase/performance';

const myTrace = trace(perf, 'my_trace');
myTrace.start();
// ... code
myTrace.stop();
```
