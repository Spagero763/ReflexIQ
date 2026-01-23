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
