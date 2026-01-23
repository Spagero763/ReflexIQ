export function createSession(userId: string): string {
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
