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
