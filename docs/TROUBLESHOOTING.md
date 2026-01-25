# Troubleshooting Guide

## Common Issues

### Game Not Loading

1. Check browser console for errors
2. Verify Firebase connection
3. Check network tab for failed requests
4. Clear browser cache

### Slow Performance

1. Check bundle size: `npm run build`
2. Profile with Chrome DevTools
3. Optimize images
4. Implement code splitting

### Firebase Errors

**Error: Permission denied**
- Check Firestore rules
- Verify user authentication
- Check user permissions

**Error: CORS error**
- Add domain to Firebase CORS
- Check API endpoint
- Verify headers

### Multiplayer Issues

1. Check WebSocket connection
2. Verify Firebase Realtime Database rules
3. Check network latency
4. Review player session status

## Debug Mode

Enable verbose logging:
```
NEXT_PUBLIC_DEBUG=true npm run dev
```

## Performance Profiling

Use React DevTools Profiler:
1. Open DevTools > Profiler
2. Record performance metrics
3. Analyze component renders

## Getting Help

1. Check GitHub Issues
2. Review documentation
3. Enable debug mode
4. Collect error logs
5. Contact maintainers

## Reporting Bugs

Include:
- OS and browser version
- Steps to reproduce
- Error messages
- Screenshots/videos
- Performance metrics
