
import { Shipment, ChatMessage, User } from '../types';

const SHIPMENTS_KEY = 'mycargo_shipments';
const CHAT_KEY = 'mycargo_chat_history';
const USERS_KEY = 'mycargo_users';
const CURRENT_USER_KEY = 'mycargo_current_user';

export const dbService = {
  // --- User Auth ---
  register: (user: Omit<User, 'id' | 'role'>): User | string => {
    const users = dbService.getAllUsers();
    if (users.find(u => u.email === user.email)) {
      return "Энэ и-мэйл хаяг бүртгэлтэй байна.";
    }
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      role: user.email.includes('admin') ? 'admin' : 'user'
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  login: (email: string, password?: string): User | undefined => {
    const users = dbService.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
    return user;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  getAllUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // --- Shipments ---
  saveShipment: (shipment: Shipment): void => {
    const shipments = dbService.getAllShipments();
    shipments.unshift(shipment);
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
  },

  getShipment: (id: string): Shipment | undefined => {
    const shipments = dbService.getAllShipments();
    return shipments.find(s => s.id.toLowerCase() === id.toLowerCase());
  },

  getUserShipments: (userId: string): Shipment[] => {
    return dbService.getAllShipments().filter(s => s.userId === userId);
  },

  getAllShipments: (): Shipment[] => {
    const data = localStorage.getItem(SHIPMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  updateShipmentStatus: (id: string, status: Shipment['status']): void => {
    const shipments = dbService.getAllShipments();
    const index = shipments.findIndex(s => s.id === id);
    if (index !== -1) {
      shipments[index].status = status;
      localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
    }
  },

  deleteShipment: (id: string): void => {
    const shipments = dbService.getAllShipments().filter(s => s.id !== id);
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
  },

  // --- Utility ---
  saveChat: (messages: ChatMessage[]): void => {
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  },

  getChat: (): ChatMessage[] => {
    const data = localStorage.getItem(CHAT_KEY);
    return data ? JSON.parse(data) : [];
  },

  generateId: (): string => {
    return 'MC-' + Math.random().toString(36).substr(2, 7).toUpperCase();
  }
};
