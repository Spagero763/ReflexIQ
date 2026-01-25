# API Guide

## Genkit Flows

### Chess Puzzle
```
POST /api/chess-puzzle
{
  "difficulty": "beginner|intermediate|advanced",
  "timeLimit": 300
}
```

Response:
```json
{
  "boardState": "fen string",
  "solution": "move",
  "hints": ["hint1", "hint2"]
}
```

### Sudoku
```
POST /api/sudoku
{
  "difficulty": "easy|medium|hard|expert",
  "boardSize": 9
}
```

Response:
```json
{
  "puzzle": "puzzle string",
  "solution": "solution string"
}
```

### Pattern Recognition
```
POST /api/pattern-recognition
{
  "patternType": "visual|numeric|temporal",
  "difficulty": "easy|medium|hard"
}
```

Response:
```json
{
  "pattern": [...],
  "answer": "answer",
  "explanation": "explanation"
}
```

### Math Challenge
```
POST /api/math-challenge
{
  "topic": "arithmetic|algebra|geometry|calculus",
  "difficulty": "easy|medium|hard"
}
```

Response:
```json
{
  "problem": "problem string",
  "answer": 42,
  "steps": ["step1", "step2"]
}
```

## Authentication

All endpoints require Firebase authentication token in headers:
```
Authorization: Bearer <firebase_token>
```

## Error Handling

Standard error response:
```json
{
  "error": "error code",
  "message": "error message"
}
```

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per minute per API key
