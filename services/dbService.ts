
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
    // SMS Simulation
    dbService.triggerSMSNotification(shipment.phoneNumber, `Таны ачаа амжилттай бүртгэгдлээ. Дугаар: ${shipment.id}`);
  },

  getShipment: (id: string): Shipment | undefined => {
    const shipments = dbService.getAllShipments();
    const cleanId = id.trim().toLowerCase();
    return shipments.find(s => s.id.toLowerCase() === cleanId);
  },

  getShipmentsByPhone: (phone: string): Shipment[] => {
    const shipments = dbService.getAllShipments();
    // Keep only numeric digits for comparison
    const cleanSearchPhone = phone.replace(/\D/g, '');
    if (cleanSearchPhone.length < 8) return [];
    
    // Match based on the last 8 digits to handle +976 or other variations
    const last8Digits = cleanSearchPhone.slice(-8);
    
    return shipments.filter(s => {
      const cleanShipmentPhone = s.phoneNumber.replace(/\D/g, '');
      return cleanShipmentPhone.endsWith(last8Digits);
    });
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
      // Trigger SMS Notification on status update
      dbService.triggerSMSNotification(shipments[index].phoneNumber, `Мэдэгдэл: Таны ${id} дугаартай ачааны төлөв "${status}" болж шинэчлэгдлээ.`);
    }
  },

  deleteShipment: (id: string): void => {
    const shipments = dbService.getAllShipments().filter(s => s.id !== id);
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
  },

  // --- Visual SMS Trigger (for UI feedback) ---
  triggerSMSNotification: (phone: string, message: string) => {
    console.log(`%c[SMS SENT TO ${phone}]: ${message}`, "background: #2563eb; color: #fff; padding: 4px; border-radius: 4px; font-weight: bold;");
    // Global notification event
    window.dispatchEvent(new CustomEvent('mycargo-sms', { detail: { phone, message } }));
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
