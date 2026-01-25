# Deployment Guide

## Prerequisites

- Node.js 18+
- Firebase account
- Vercel or Firebase Hosting account

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
FIREBASE_ADMIN_SDK_KEY=xxx
GENKIT_API_KEY=xxx
```

## Build

```bash
npm run build
npm run typecheck
npm run lint
```

## Deployment to Vercel

```bash
vercel --prod
```

## Deployment to Firebase

```bash
firebase deploy
```

## Firebase Setup

1. Create Firebase project
2. Enable Authentication (Google, Email)
3. Create Firestore database
4. Set up Storage bucket
5. Deploy Cloud Functions
6. Configure security rules

## Testing in Production

- Monitor error logs
- Check performance metrics
- Test all game flows
- Verify analytics
- Check multiplayer features

## Rollback

```bash
vercel rollback
# or
firebase deploy --only functions
```
