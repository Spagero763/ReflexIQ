import { useEffect, useState, useCallback } from 'react';

interface GameSession {
  gameId: string;
  score: number;
  level: number;
  startTime: number;
  lastUpdated: number;
}

const SESSION_STORAGE_KEY = 'reflexiq_game_session';
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const useGameSession = (gameId: string) => {
  const [session, setSession] = useState<GameSession | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load session from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameSession;
        const now = Date.now();
        
        // Check if session is still valid (not expired)
        if (parsed.gameId === gameId && (now - parsed.lastUpdated) < SESSION_TTL) {
          setSession(parsed);
        } else {
          // Clear expired session
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to load game session:', error);
    } finally {
      setIsLoaded(true);
    }
  }, [gameId]);

  // Save session to localStorage
  const saveSession = useCallback((score: number, level: number) => {
    try {
      const newSession: GameSession = {
        gameId,
        score,
        level,
        startTime: session?.startTime || Date.now(),
        lastUpdated: Date.now(),
      };
      setSession(newSession);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
    } catch (error) {
      console.error('Failed to save game session:', error);
    }
  }, [gameId, session?.startTime]);

  // Clear session
  const clearSession = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  return {
    session,
    isLoaded,
    saveSession,
    clearSession,
  };
};
