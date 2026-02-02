
import { Shipment, ChatMessage, User } from '../types';

const SHIPMENTS_KEY = 'mycargo_pro_shipments';
const CHAT_KEY = 'mycargo_pro_chat';
const USERS_KEY = 'mycargo_pro_users';
const CURRENT_USER_KEY = 'mycargo_pro_session';

const storage = {
  get: (key: string) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Notify all components that data has changed
      window.dispatchEvent(new Event('mycargo-data-updated'));
    } catch (e) {}
  }
};

export const dbService = {
  init: () => {
    const users = storage.get(USERS_KEY);
    if (!users || users.length === 0) {
      const defaultAdmin: User = {
        id: 'admin-001',
        email: 'admin@mycargo.mn',
        password: 'admin123',
        name: 'Системийн Админ',
        role: 'admin'
      };
      storage.set(USERS_KEY, [defaultAdmin]);
    }
  },

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
    const updatedUsers = [...users, newUser];
    storage.set(USERS_KEY, updatedUsers);
    return newUser;
  },

  login: (email: string, password?: string): User | undefined => {
    const users = dbService.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      storage.set(CURRENT_USER_KEY, user);
    }
    return user;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.dispatchEvent(new Event('mycargo-data-updated'));
  },

  getCurrentUser: (): User | null => {
    return storage.get(CURRENT_USER_KEY);
  },

  getAllUsers: (): User[] => {
    return storage.get(USERS_KEY) || [];
  },

  saveShipment: (shipment: Shipment): void => {
    const shipments = dbService.getAllShipments();
    const updatedShipments = [shipment, ...shipments];
    storage.set(SHIPMENTS_KEY, updatedShipments);
    dbService.triggerSMSNotification(shipment.phoneNumber, `Амжилттай бүртгэгдлээ. ID: ${shipment.id}`);
  },

  getShipment: (id: string): Shipment | undefined => {
    const shipments = dbService.getAllShipments();
    const cleanId = id.trim().toLowerCase();
    return shipments.find(s => s.id.toLowerCase() === cleanId);
  },

  getShipmentsByPhone: (phone: string): Shipment[] => {
    const shipments = dbService.getAllShipments();
    const cleanSearchPhone = phone.replace(/\D/g, '');
    if (cleanSearchPhone.length < 8) return [];
    const last8Digits = cleanSearchPhone.slice(-8);
    
    return shipments.filter(s => {
      const cleanShipmentPhone = s.phoneNumber.replace(/\D/g, '');
      return cleanShipmentPhone.endsWith(last8Digits);
    });
  },

  getAllShipments: (): Shipment[] => {
    return storage.get(SHIPMENTS_KEY) || [];
  },

  updateShipmentStatus: (id: string, status: Shipment['status']): void => {
    const shipments = dbService.getAllShipments();
    const index = shipments.findIndex(s => s.id === id);
    if (index !== -1) {
      shipments[index].status = status;
      storage.set(SHIPMENTS_KEY, shipments);
      dbService.triggerSMSNotification(shipments[index].phoneNumber, `Төлөв: ${status} (ID: ${id})`);
    }
  },

  deleteShipment: (id: string): void => {
    const shipments = dbService.getAllShipments().filter(s => s.id !== id);
    storage.set(SHIPMENTS_KEY, shipments);
  },

  triggerSMSNotification: (phone: string, message: string) => {
    window.dispatchEvent(new CustomEvent('mycargo-sms', { detail: { phone, message } }));
  },

  saveChat: (messages: ChatMessage[]): void => {
    storage.set(CHAT_KEY, messages);
  },

  getChat: (): ChatMessage[] => {
    return storage.get(CHAT_KEY) || [];
  },

  generateId: (): string => {
    return 'MC-' + Math.random().toString(36).substr(2, 7).toUpperCase();
  }
};

dbService.init();
