// Badge and achievement system models

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: BadgeRequirement[];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: string;
}

export interface BadgeRequirement {
  type: 'games_played' | 'score' | 'level' | 'time' | 'accuracy';
  value: number;
  gameType?: string;
}

export interface UserBadge {
  badge: Badge;
  unlockedAt: Date;
  progress: number;
}

export interface BadgeProgress {
  badgeId: string;
  badgeName: string;
  percentage: number;
  currentProgress: number;
  requiredProgress: number;
  unlocked: boolean;
}
