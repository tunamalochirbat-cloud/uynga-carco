
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
  currentLocation: string;
  homeAddress: string;
  status: CargoStatus;
  eta: string;
  cargoType: string;
  weight: number;
  customerName: string;
  phoneNumber: string;
  createdAt: string;
  notes?: string;
  // Online Shop specific date fields
  paymentDate?: string;
  confirmationDate?: string;
  cargoArrivalDate?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export enum CargoStatus {
  GUANGZHOU = 'Гуанжоу агуулах',
  EREEN = 'Эрээн агуулах',
  UB_TERMINAL = 'Улаанбаатар ачаан дээр буусан',
  KANBAN_DELIVERY = 'Гэрээт хүргэлтээр гарсан',
  DELIVERED = 'Хүргэгдсэн',
  ON_HOLD = 'Саатсан'
}
