import os
import subprocess
from pathlib import Path

project_root = r"C:\Users\NEW USER\ReflexIQ"
os.chdir(project_root)

commit_count = 0
max_commits = 200

# Define all commits with file content
commits = []

# Phase 1: Type Definitions (25 files)
type_files = {
    "src/types/game-models.ts": """export interface GameDifficulty {
  level: 'easy' | 'medium' | 'hard' | 'expert';
  multiplier: number;
  timeLimit: number;
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  difficulty: GameDifficulty;
}

export interface GamePlayer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
}

export interface GameScore {
  points: number;
  combo: number;
  accuracy: number;
}
""",
    "src/types/user-models.ts": """export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: Date;
  lastActive: Date;
}

export interface UserStats {
  totalGames: number;
  totalWins: number;
  winRate: number;
  totalScore: number;
  averageScore: number;
  level: number;
  experience: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  pushNotifications: boolean;
}
""",
    "src/types/puzzle-models.ts": """export interface PuzzleQuestion {
  id: string;
  type: 'logic' | 'word' | 'number' | 'pattern';
  question: string;
  answer: string | string[];
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  timeLimit: number;
}

export interface PuzzleSet {
  id: string;
  title: string;
  description: string;
  puzzles: PuzzleQuestion[];
  category: string;
}
""",
    "src/types/trivia-models.ts": """export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface TriviaSet {
  id: string;
  title: string;
  questions: TriviaQuestion[];
  timePerQuestion: number;
}
""",
    "src/types/achievement-models.ts": """export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: string;
    value: number;
  };
  unlockedAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
""",
    "src/types/leaderboard-models.ts": """export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  score: number;
  wins: number;
  winRate: number;
}

export interface Leaderboard {
  id: string;
  title: string;
  entries: LeaderboardEntry[];
  period: 'daily' | 'weekly' | 'monthly' | 'all-time';
  lastUpdated: Date;
}
""",
    "src/types/api-models.ts": """export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
""",
    "src/types/game-session-models.ts": """export interface GameSession {
  id: string;
  playerId: string;
  gameType: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  score: number;
  duration: number;
}

export interface GameResult {
  sessionId: string;
  playerId: string;
  gameType: string;
  score: number;
  finalScore: number;
  duration: number;
  completedAt: Date;
  perfect: boolean;
}
""",
    "src/types/event-models.ts": """export interface GameEvent {
  type: 'start' | 'pause' | 'resume' | 'complete' | 'abandon';
  timestamp: Date;
  playerId: string;
  gameId: string;
  data: Record<string, any>;
}

export interface AnalyticsEvent {
  eventName: string;
  timestamp: Date;
  userId: string;
  properties: Record<string, any>;
}
""",
    "src/types/ai-models.ts": """export interface AIGeneratedContent {
  type: 'question' | 'hint' | 'explanation';
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  confidence: number;
}

export interface AdaptiveDifficultyData {
  playerLevel: number;
  successRate: number;
  averageTime: number;
  recommendedDifficulty: 'easy' | 'medium' | 'hard';
}
""",
    "src/types/notification-models.ts": """export interface Notification {
  id: string;
  userId: string;
  type: 'achievement' | 'friend' | 'event' | 'reminder' | 'system';
  title: string;
  message: string;
  icon?: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationPreference {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
}
""",
    "src/types/social-models.ts": """export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

export interface GameInvite {
  id: string;
  from: string;
  to: string;
  gameType: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}
""",
    "src/types/storage-models.ts": """export interface StorageData {
  key: string;
  value: any;
  expiresAt?: Date;
  encrypted: boolean;
}

export interface CacheEntry<T> {
  value: T;
  expiresAt: Date;
  hits: number;
  lastAccessed: Date;
}
""",
    "src/types/form-models.ts": """export interface FormField {
  name: string;
  type: string;
  value: any;
  required: boolean;
  validation?: (value: any) => string | null;
}

export interface FormState {
  fields: Record<string, FormField>;
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}
""",
    "src/types/animation-models.ts": """export interface AnimationConfig {
  duration: number;
  easing: string;
  delay: number;
  repeat: boolean;
  direction: 'normal' | 'reverse' | 'alternate';
}

export interface TransitionConfig {
  enter: AnimationConfig;
  exit: AnimationConfig;
}
""",
    "src/types/theme-models.ts": """export interface ThemeColor {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export interface Theme {
  name: string;
  colors: ThemeColor;
  typography: {
    fontFamily: string;
    fontSize: Record<string, number>;
  };
}
""",
    "src/types/error-models.ts": """export class GameError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'GameError';
  }
}

export class ValidationError extends GameError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends GameError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends GameError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}
""",
    "src/types/request-models.ts": """export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  body?: any;
  timeout: number;
  retry: boolean;
  retryCount: number;
}

export interface RequestConfig extends RequestOptions {
  baseUrl: string;
  endpoint: string;
}
""",
    "src/types/game-action-models.ts": """export type GameAction = 
  | { type: 'START_GAME'; payload: { gameId: string } }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME'; payload: { score: number } }
  | { type: 'SUBMIT_ANSWER'; payload: { answer: any } }
  | { type: 'USE_HINT'; payload: { hintId: string } }
  | { type: 'SKIP_QUESTION' }
  | { type: 'UPDATE_SCORE'; payload: { points: number } };

export interface GameDispatch {
  (action: GameAction): void;
}
""",
    "src/types/player-profile-models.ts": """export interface PlayerLevel {
  level: number;
  experience: number;
  nextLevelXp: number;
  progressPercentage: number;
}

export interface PlayerRank {
  rank: number;
  rating: number;
  totalMatches: number;
}
""",
    "src/types/game-statistics-models.ts": """export interface GameStatistic {
  gameType: string;
  totalPlayed: number;
  wins: number;
  losses: number;
  bestScore: number;
  averageScore: number;
  playTime: number;
}

export interface PlayerStatistics {
  playerId: string;
  totalGamesPlayed: number;
  totalWins: number;
  winRate: number;
  totalPlayTime: number;
  gameStats: GameStatistic[];
}
""",
    "src/types/reward-models.ts": """export interface Reward {
  id: string;
  type: 'coin' | 'gem' | 'token' | 'badge';
  amount: number;
  description: string;
}

export interface RewardClaim {
  id: string;
  userId: string;
  reward: Reward;
  claimedAt: Date;
  expiresAt?: Date;
}
""",
    "src/types/match-models.ts": """export interface MatchParticipant {
  playerId: string;
  playerName: string;
  score: number;
  status: 'active' | 'completed' | 'abandoned';
}

export interface Match {
  id: string;
  gameType: string;
  participants: MatchParticipant[];
  status: 'waiting' | 'ongoing' | 'completed';
  startTime: Date;
  endTime?: Date;
  winner?: string;
}
""",
}

# Phase 2: Utility Functions (25 files)
util_files = {
    "src/lib/utils/math-helpers.ts": """export function calculateScore(
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  difficulty: number
): number {
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const baseScore = accuracy * 10;
  const timeBonus = Math.max(0, (100 - timeSpent) * 0.5);
  const difficultyMultiplier = 1 + difficulty * 0.2;
  return Math.round((baseScore + timeBonus) * difficultyMultiplier);
}

export function calculateLevel(experience: number): number {
  const levelThreshold = 100;
  return Math.floor(experience / levelThreshold) + 1;
}

export function calculateWinRate(wins: number, totalGames: number): number {
  if (totalGames === 0) return 0;
  return Math.round((wins / totalGames) * 100);
}
""",
    "src/lib/utils/string-helpers.ts": """export function formatPlayerName(name: string): string {
  return name.trim().slice(0, 20);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\\w\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-');
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
""",
    "src/lib/utils/date-helpers.ts": """export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
""",
    "src/lib/utils/array-helpers.ts": """export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}
""",
    "src/lib/utils/object-helpers.ts": """export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function mergeObjects<T>(obj1: T, obj2: Partial<T>): T {
  return { ...obj1, ...obj2 };
}
""",
    "src/lib/utils/validation-helpers.ts": """export function isValidEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}
""",
    "src/lib/utils/number-helpers.ts": """export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function round(num: number, decimals: number = 0): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
""",
    "src/lib/utils/random-helpers.ts": """export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateId(prefix: string = ''): string {
  return prefix + Math.random().toString(36).substr(2, 9);
}
""",
    "src/lib/utils/debounce-throttle.ts": """export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastRun = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    }
  };
}
""",
    "src/lib/utils/async-helpers.ts": """export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Retry failed');
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);
}
""",
    "src/lib/utils/local-storage-helpers.ts": """export function setLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to set localStorage:', error);
  }
}

export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error('Failed to get localStorage:', error);
    return defaultValue ?? null;
  }
}

export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
""",
    "src/lib/utils/session-helpers.ts": """export function createSession(userId: string): string {
  const sessionId = Math.random().toString(36).substr(2, 9);
  sessionStorage.setItem(`session_${userId}`, sessionId);
  return sessionId;
}

export function getSession(userId: string): string | null {
  return sessionStorage.getItem(`session_${userId}`);
}

export function clearSession(userId: string): void {
  sessionStorage.removeItem(`session_${userId}`);
}
""",
    "src/lib/utils/color-helpers.ts": """export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
""",
    "src/lib/utils/timer-helpers.ts": """export class GameTimer {
  private startTime: number = 0;
  private pausedTime: number = 0;
  private isPaused: boolean = false;

  start(): void {
    this.startTime = Date.now();
  }

  pause(): void {
    this.pausedTime = Date.now();
    this.isPaused = true;
  }

  resume(): void {
    const pauseDuration = Date.now() - this.pausedTime;
    this.startTime += pauseDuration;
    this.isPaused = false;
  }

  getElapsed(): number {
    if (this.isPaused) return this.pausedTime - this.startTime;
    return Date.now() - this.startTime;
  }
}
""",
    "src/lib/utils/score-multiplier.ts": """export class ScoreMultiplier {
  private baseMultiplier: number = 1;
  private bonusMultiplier: number = 1;

  setBaseMultiplier(multiplier: number): void {
    this.baseMultiplier = Math.max(0, multiplier);
  }

  addBonusMultiplier(bonus: number): void {
    this.bonusMultiplier += bonus;
  }

  getTotal(): number {
    return this.baseMultiplier * this.bonusMultiplier;
  }

  applyToScore(score: number): number {
    return Math.round(score * this.getTotal());
  }
}
""",
    "src/lib/utils/streak-counter.ts": """export class StreakCounter {
  private currentStreak: number = 0;
  private maxStreak: number = 0;

  increment(): void {
    this.currentStreak++;
    this.maxStreak = Math.max(this.maxStreak, this.currentStreak);
  }

  reset(): void {
    this.currentStreak = 0;
  }

  getCurrent(): number {
    return this.currentStreak;
  }

  getMax(): number {
    return this.maxStreak;
  }
}
""",
    "src/lib/utils/difficulty-calculator.ts": """export function calculateAdaptiveDifficulty(
  successRate: number,
  currentDifficulty: number
): number {
  if (successRate > 80) return Math.min(currentDifficulty + 1, 10);
  if (successRate < 30) return Math.max(currentDifficulty - 1, 1);
  return currentDifficulty;
}
""",
    "src/lib/utils/performance-monitor.ts": """export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  startMetric(name: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      this.metrics.get(name)!.push(duration);
    };
  }

  getAverageDuration(name: string): number {
    const durations = this.metrics.get(name) || [];
    if (durations.length === 0) return 0;
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  clear(): void {
    this.metrics.clear();
  }
}
""",
    "src/lib/utils/event-emitter.ts": """export class EventEmitter<T> {
  private listeners: Map<string, ((data: T) => void)[]> = new Map();

  on(event: string, callback: (data: T) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  emit(event: string, data: T): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(cb => cb(data));
  }

  off(event: string, callback: (data: T) => void): void {
    const callbacks = this.listeners.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
}
""",
}

# Create directories
for dir_path in set(Path(file_path).parent for file_path in list(type_files.keys()) + list(util_files.keys())):
    dir_path.mkdir(parents=True, exist_ok=True)

# Commit all files
all_files = list(type_files.items()) + list(util_files.items())
total_files = len(all_files)

print(f"Creating {total_files} meaningful commits...\n")
print("=" * 70)

for idx, (file_path, content) in enumerate(all_files, 1):
    if commit_count >= max_commits:
        break
    
    # Create parent directories
    Path(file_path).parent.mkdir(parents=True, exist_ok=True)
    
    # Write file content
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Stage and commit
    subprocess.run(['git', 'add', file_path], capture_output=True)
    
    # Determine commit message
    if 'types' in file_path:
        msg = f"types: add {Path(file_path).stem} type definitions"
    else:
        msg = f"util: add {Path(file_path).stem} utility"
    
    result = subprocess.run(['git', 'commit', '-m', msg], capture_output=True, text=True)
    commit_count += 1
    
    percentage = (commit_count / max_commits) * 100
    print(f"[{commit_count:3d}/200] [{percentage:5.1f}%] ✓ {msg}")

print("=" * 70)
print(f"\nSuccessfully created {commit_count} commits across multiple folders!")
