
import { Shipment, ChatMessage } from '../types';

const SHIPMENTS_KEY = 'mycargo_shipments';
const CHAT_KEY = 'mycargo_chat_history';

export const dbService = {
  // Shipments
  saveShipment: (shipment: Shipment): void => {
    const shipments = dbService.getAllShipments();
    shipments.push(shipment);
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
  },

  getShipment: (id: string): Shipment | undefined => {
    const shipments = dbService.getAllShipments();
    return shipments.find(s => s.id.toLowerCase() === id.toLowerCase());
  },

  getAllShipments: (): Shipment[] => {
    const data = localStorage.getItem(SHIPMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Chat History
  saveChat: (messages: ChatMessage[]): void => {
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  },

  getChat: (): ChatMessage[] => {
    const data = localStorage.getItem(CHAT_KEY);
    return data ? JSON.parse(data) : [];
  },

  generateId: (): string => {
    return 'MC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
};
