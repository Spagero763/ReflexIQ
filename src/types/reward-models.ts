export interface Reward {
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
