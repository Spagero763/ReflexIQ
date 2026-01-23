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
