# Contributing to ReflexIQ

Thank you for your interest in contributing to ReflexIQ! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature
4. Make your changes
5. Push to your fork
6. Submit a pull request

## Development Setup

```bash
npm install
npm run dev
```

## Code Standards

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Keep components reusable and modular

## Game Development

When adding new games:

1. Create a flow in `src/ai/flows/`
2. Create a schema in `src/ai/schemas/`
3. Create types in `src/types/`
4. Create components in `src/components/`
5. Add the game to the game hub

## Commit Messages

Use clear, descriptive commit messages:
- `feat: add new chess puzzle game`
- `fix: resolve timer display issue`
- `docs: update game development guide`

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add screenshots for UI changes
4. Request review from maintainers

## Questions?

Open an issue or contact the maintainers.
