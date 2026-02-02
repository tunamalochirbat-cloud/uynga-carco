
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
  totalPrice: string; 
  customerName: string;
  phoneNumber: string;
  createdAt: string;
  notes?: string;
  paymentDate?: string;
  confirmationDate?: string;
  cargoArrivalDate?: string;
  imageUrl?: string; // Product photo
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export enum CargoStatus {
  GUANGZHOU = 'Гуанжоу агуулахад ирсэн',
  EREEN = 'Эрээн агуулахад ирсэн',
  UB_TERMINAL = 'Улаанбаатар ачаан дээр буусан',
  KANBAN_DELIVERY = 'Гэрээт хүргэлтээр гаргаж байна',
  DELIVERED = 'Хүргэгдсэн',
  ON_HOLD = 'Саатсан'
}
