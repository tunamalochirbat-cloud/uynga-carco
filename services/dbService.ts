
import { Shipment, ChatMessage } from '../types';

const SHIPMENTS_KEY = 'mycargo_shipments';
const CHAT_KEY = 'mycargo_chat_history';

export const dbService = {
  // Create
  saveShipment: (shipment: Shipment): void => {
    const shipments = dbService.getAllShipments();
    shipments.unshift(shipment); // Add to the beginning
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
  },

  // Read
  getShipment: (id: string): Shipment | undefined => {
    const shipments = dbService.getAllShipments();
    return shipments.find(s => s.id.toLowerCase() === id.toLowerCase());
  },

  getAllShipments: (): Shipment[] => {
    const data = localStorage.getItem(SHIPMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Update
  updateShipmentStatus: (id: string, status: Shipment['status']): void => {
    const shipments = dbService.getAllShipments();
    const index = shipments.findIndex(s => s.id === id);
    if (index !== -1) {
      shipments[index].status = status;
      localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
    }
  },

  // Delete
  deleteShipment: (id: string): void => {
    const shipments = dbService.getAllShipments().filter(s => s.id !== id);
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
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
    return 'MC-' + Math.random().toString(36).substr(2, 7).toUpperCase();
  }
};
