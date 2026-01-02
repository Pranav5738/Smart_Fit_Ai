export interface ScanHistory {
  id: number;
  date: string;
  predictions: {
    bust: string;
    waist: string;
    hips: string;
    topSize: 'S' | 'M' | 'L' | 'XL';
    bottomSize: 'S' | 'M' | 'L' | 'XL';
  };
  thumbnail?: string;
}

export interface UserData {
  name: string;
  avatar: string;
  lastTopSize: 'S' | 'M' | 'L' | 'XL';
  lastBottomSize: 'S' | 'M' | 'L' | 'XL';
  history: ScanHistory[];
}

export interface Users {
  user1: UserData;
  user2: UserData;
}

export interface FeedbackReview {
  name: string;
  avatar: string;
  rating: number;
  message: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  pricePeriod: string;
  features: string[];
  isPopular: boolean;
}
