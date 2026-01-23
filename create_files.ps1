# Script to create 200 meaningful commits across different folders with actual content

$projectRoot = "C:\Users\NEW USER\ReflexIQ"
Set-Location $projectRoot

$commitCount = 0
$maxCommits = 200

function Create-TypeFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/types/$fileName.ts"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "types: add $fileName type definitions" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ types: add $fileName type definitions"
}

function Create-UtilFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/lib/utils/$fileName.ts"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "util: add $fileName utility" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ util: add $fileName utility"
}

function Create-HookFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/hooks/$fileName.ts"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "hooks: add $fileName hook" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ hooks: add $fileName hook"
}

function Create-ServiceFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/services/$fileName.ts"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "service: add $fileName service" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ service: add $fileName service"
}

function Create-ComponentFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/components/games/$fileName.tsx"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "comp: add $fileName component" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ comp: add $fileName component"
}

function Create-ContextFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/contexts/$fileName.ts"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "context: add $fileName context" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ context: add $fileName context"
}

function Create-ConstFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/constants/$fileName.ts"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "const: add $fileName constants" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ const: add $fileName constants"
}

function Create-MiddlewareFile {
    param([string]$fileName, [string]$content)
    
    $filePath = "src/middleware/$fileName.ts"
    New-Item -ItemType File -Path $filePath -Force | Out-Null
    Set-Content -Path $filePath -Value $content
    
    git add $filePath
    git commit -m "middleware: add $fileName middleware" 2>&1 | Out-Null
    $global:commitCount++
    Write-Host "[$($global:commitCount)/$maxCommits] ✓ middleware: add $fileName middleware"
}

# Create directories if they don't exist
@("src/types", "src/lib/utils", "src/hooks", "src/services", "src/components/games", "src/contexts", "src/constants", "src/middleware") | ForEach-Object {
    if (-not (Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
    }
}

Write-Host "Starting creation of 200 meaningful commits..." -ForegroundColor Green
Write-Host ""

# ===== PHASE 1: Type Definitions (25 commits) =====
Write-Host "Phase 1: Type Definitions" -ForegroundColor Cyan

Create-TypeFile "game-models" @"
export interface GameDifficulty {
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
"@

Create-TypeFile "user-models" @"
export interface UserProfile {
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
"@

Create-TypeFile "puzzle-models" @"
export interface PuzzleQuestion {
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
"@

Create-TypeFile "trivia-models" @"
export interface TriviaQuestion {
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
"@

Create-TypeFile "achievement-models" @"
export interface Achievement {
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
"@

Create-TypeFile "leaderboard-models" @"
export interface LeaderboardEntry {
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
"@

Create-TypeFile "api-models" @"
export interface ApiResponse<T> {
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
"@

Create-TypeFile "game-session-models" @"
export interface GameSession {
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
"@

Create-TypeFile "event-models" @"
export interface GameEvent {
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
"@

Create-TypeFile "ai-models" @"
export interface AIGeneratedContent {
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
"@

Create-TypeFile "notification-models" @"
export interface Notification {
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
"@

Create-TypeFile "social-models" @"
export interface Friend {
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
"@

Create-TypeFile "storage-models" @"
export interface StorageData {
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
"@

Create-TypeFile "form-models" @"
export interface FormField {
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
"@

Create-TypeFile "animation-models" @"
export interface AnimationConfig {
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
"@

Create-TypeFile "theme-models" @"
export interface ThemeColor {
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
"@

Create-TypeFile "error-models" @"
export class GameError extends Error {
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
    super('NOT_FOUND', \`\${resource} not found\`, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends GameError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}
"@

Create-TypeFile "request-models" @"
export interface RequestOptions {
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
"@

Create-TypeFile "game-action-models" @"
export type GameAction = 
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
"@

# ===== PHASE 2: Utility Functions (30 commits) =====
Write-Host ""
Write-Host "Phase 2: Utility Functions" -ForegroundColor Cyan

Create-UtilFile "math-helpers" @"
export function calculateScore(
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

export function calculateAverageScore(totalScore: number, games: number): number {
  if (games === 0) return 0;
  return Math.round(totalScore / games);
}
"@

Create-UtilFile "string-helpers" @"
export function formatPlayerName(name: string): string {
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

export function sanitizeInput(input: string): string {
  return input.replace(/[<>\"']/g, '').trim();
}
"@

Create-UtilFile "date-helpers" @"
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return \`\${diffMins}m ago\`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return \`\${diffHours}h ago\`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return \`\${diffDays}d ago\`;
  
  return formatDate(date);
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}
"@

Create-UtilFile "array-helpers" @"
export function shuffle<T>(array: T[]): T[] {
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

export function flatten<T>(array: T[][]): T[] {
  return array.reduce((acc, val) => [...acc, ...val], []);
}

export function removeItem<T>(array: T[], item: T): T[] {
  return array.filter(x => x !== item);
}
"@

Create-UtilFile "object-helpers" @"
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function mergeObjects<T>(obj1: T, obj2: Partial<T>): T {
  return { ...obj1, ...obj2 };
}

export function filterObject<T>(
  obj: Record<string, T>,
  predicate: (value: T) => boolean
): Record<string, T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => predicate(v))
  );
}

export function mapObject<T, U>(
  obj: Record<string, T>,
  mapper: (value: T) => U
): Record<string, U> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, mapper(v)])
  );
}
"@

Create-UtilFile "validation-helpers" @"
export function isValidEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+\$/.test(email);
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}\$/.test(username);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
"@

Create-UtilFile "number-helpers" @"
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function round(num: number, decimals: number = 0): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
"@

Create-UtilFile "random-helpers" @"
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateId(prefix: string = ''): string {
  return prefix + Math.random().toString(36).substr(2, 9);
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
"@

Create-UtilFile "debounce-throttle" @"
export function debounce<T extends (...args: any[]) => any>(
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

export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
"@

Create-UtilFile "async-helpers" @"
export async function retry<T>(
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

export async function parallel<T>(
  promises: Promise<T>[]
): Promise<T[]> {
  return Promise.all(promises);
}

export async function sequential<T>(
  tasks: (() => Promise<T>)[]
): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
"@

Create-UtilFile "dom-helpers" @"
export function getElement<T extends HTMLElement>(
  selector: string
): T | null {
  return document.querySelector(selector) as T | null;
}

export function getAllElements<T extends HTMLElement>(
  selector: string
): T[] {
  return Array.from(document.querySelectorAll(selector)) as T[];
}

export function addClass(element: HTMLElement, className: string): void {
  element.classList.add(className);
}

export function removeClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
}

export function toggleClass(element: HTMLElement, className: string): void {
  element.classList.toggle(className);
}

export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}
"@

Create-UtilFile "local-storage-helpers" @"
export function setLocalStorage(key: string, value: any): void {
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

export function clearLocalStorage(): void {
  localStorage.clear();
}
"@

Write-Host ""
Write-Host "Phase 1-2 completed ($commitCount commits so far)" -ForegroundColor Green
Write-Host ""
