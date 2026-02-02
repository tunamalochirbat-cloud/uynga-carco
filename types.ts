
export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Shipment {
  id: string;
  userId: string; 
  origin: string;
  destination: string;
  status: 'In Transit' | 'Processing' | 'Delivered' | 'On Hold' | 'Booked';
  eta: string;
  cargoType: string;
  weight: number;
  customerName: string;
  phoneNumber: string; // New field for phone-based tracking
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export enum CargoStatus {
  BOOKED = 'Booked',
  IN_TRANSIT = 'In Transit',
  PROCESSING = 'Processing',
  DELIVERED = 'Delivered',
  ON_HOLD = 'On Hold'
}
