# Security Best Practices

## Authentication

- Use Firebase Authentication
- Implement email verification
- Enforce strong passwords
- Enable multi-factor authentication

## Data Protection

Firestore Security Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## API Security

- Validate all inputs
- Sanitize output
- Use HTTPS only
- Implement rate limiting
- Use API keys securely

## Environment Variables

Never commit sensitive data:
```
.env.local (gitignored)
```

## Dependency Security

Check for vulnerabilities:
```bash
npm audit
npm audit fix
```

## CORS Configuration

Restrict origins in production:
```typescript
corsOptions = {
  origin: 'https://yourdomain.com',
  credentials: true,
};
```

## Content Security Policy

Add CSP headers:
```
Content-Security-Policy: default-src 'self'
```

## Logging

Use structured logging:
```typescript
console.log({
  timestamp: new Date(),
  level: 'info',
  userId: user.id,
  action: 'game_started',
});
```
