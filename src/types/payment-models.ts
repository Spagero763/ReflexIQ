// Payment and monetization models

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  isDefault: boolean;
  lastFourDigits?: string;
  expiryDate?: string;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
  transactionId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'consumable' | 'permanent' | 'subscription';
  category: 'powerup' | 'cosmetic' | 'currency' | 'membership';
  icon?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  billingCycle: 'monthly' | 'yearly';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  benefits: string[];
  billingCycle: 'monthly' | 'yearly';
}

export interface Wallet {
  userId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'refund' | 'earning' | 'transfer';
  amount: number;
  description: string;
  timestamp: Date;
  balanceAfter: number;
}
