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
