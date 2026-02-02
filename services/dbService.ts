
import { Shipment, ChatMessage, User, CargoStatus } from '../types';

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
      window.dispatchEvent(new Event('mycargo-data-updated'));
    } catch (e) {}
  }
};

const SEED_SHIPMENTS: Shipment[] = [
  { id: 'MC-RK8C3V5', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 10Ш', totalPrice: '70000', customerName: 'булган', phoneNumber: '99340434', createdAt: '2026-01-19', paymentDate: '2026-01-19', confirmationDate: '2026-01-19', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-GWLDH55', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'сойз 1ш', totalPrice: '13000', customerName: 'дэлгэрцэцэг', phoneNumber: '88000617', createdAt: '2026-01-19', paymentDate: '2026-01-19', confirmationDate: '2026-01-19', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-5MX0WCI', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'IPHONE ЧИХЭВЧ 1Ш', totalPrice: '12000', customerName: 'бадамлянхуа', phoneNumber: '86325668', createdAt: '2026-01-19', paymentDate: '2026-01-19', confirmationDate: '2026-01-19', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-41L8M09', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.EREEN, eta: '', cargoType: '4Ш ТУРСИК 2XL', totalPrice: '60000', customerName: 'deegii deegii', phoneNumber: '88000617', createdAt: '2026-01-17', paymentDate: '2026-01-17', confirmationDate: '2026-01-17', cargoArrivalDate: '2026-01-23' },
  { id: 'MC-EWJU3ZB', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.UB_TERMINAL, eta: '', cargoType: '5Ш ТУРСИК', totalPrice: '75000', customerName: 'туяацэцэг', phoneNumber: '80551501', createdAt: '2026-01-17', paymentDate: '2026-01-17', confirmationDate: '2026-01-17', cargoArrivalDate: '2026-01-23' },
  { id: 'MC-QFA3V2W', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.KANBAN_DELIVERY, eta: '', cargoType: '10 Ш ТУРСИК ЦАГААН ХАР', totalPrice: '130000', customerName: 'naraa', phoneNumber: '99331026', createdAt: '2026-01-17', paymentDate: '2026-01-17', confirmationDate: '2026-01-17', cargoArrivalDate: '2026-01-23' },
  { id: 'MC-IZ0UNVB', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 10Ш', totalPrice: '70000', customerName: 'С.Өлзий', phoneNumber: '90484292', createdAt: '2026-02-20', paymentDate: '2026-02-20', confirmationDate: '2026-02-20', cargoArrivalDate: '2026-02-28' },
  { id: 'MC-QIH0ASR', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 15Ш', totalPrice: '105000', customerName: 'Х.Чулуун', phoneNumber: '99378964', createdAt: '2026-01-20', paymentDate: '2026-01-20', confirmationDate: '2026-01-20', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-JS4VNVS', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЯГА ЯГААН 15Ш', totalPrice: '90000', customerName: 'Т.Сувд эрдэнэ', phoneNumber: '89081161', createdAt: '2026-01-20', paymentDate: '2026-01-20', confirmationDate: '2026-01-20', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-AGIBYIA', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 5Ш', totalPrice: '35000', customerName: 'шүрэнцэцэг', phoneNumber: '86929902', createdAt: '2026-01-20', paymentDate: '2026-01-20', confirmationDate: '2026-01-20', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-4395YJ6', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 20Ш', totalPrice: '120000', customerName: 'М.Алтанжолоо', phoneNumber: '95959069', createdAt: '2026-01-20', paymentDate: '2026-01-20', confirmationDate: '2026-01-20', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-K9WPYVR', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: '1Ш ГАР ДУЛААЦУУЛАГЧ 2ШТАНСАГ СЭТ', totalPrice: '53000', customerName: 'М.энхтүвшин', phoneNumber: '88676714', createdAt: '2026-01-19', paymentDate: '2026-01-19', confirmationDate: '2026-01-19', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-MT6JTQ3', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 6 ЯГААН ЦАГААН', totalPrice: '42000', customerName: 'оюунцэцэг сосорбара', phoneNumber: '99376000', createdAt: '2026-01-26', paymentDate: '2026-01-26', confirmationDate: '2026-01-26', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-DZQM954', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'ТАНСАГ СЭТ6 МАШИН 6 УСНИЙ БООЛТ10 ХАР УСНЫ CAB 4 LUCKY СЭТ10', totalPrice: '432000', customerName: 'tugaa sukhbaatar ариунтунгалаг', phoneNumber: '85556565', createdAt: '2026-01-25', paymentDate: '2026-01-25', confirmationDate: '2026-01-25', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-4X7A8WC', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР ҮСНИЙ БООЛТ', totalPrice: '306000', customerName: 'Т.Өлзийсүрэн', phoneNumber: '91115630', createdAt: '2026-02-20', paymentDate: '2026-02-20', confirmationDate: '2026-02-20', cargoArrivalDate: '2026-02-28' },
  { id: 'MC-CITYW30', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'IPHONE', totalPrice: '15000', customerName: 'Г.Мөрөн', phoneNumber: '88221121', createdAt: '2026-02-20', paymentDate: '2026-02-20', confirmationDate: '2026-02-20', cargoArrivalDate: '2026-02-28' },
  { id: 'MC-C1DBZEV', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'IPHONE ЧИХЭВЧ 1Ш', totalPrice: '15000', customerName: 'Захиалагч', phoneNumber: '95585337', createdAt: '2026-02-20', paymentDate: '2026-02-20', confirmationDate: '2026-02-20', cargoArrivalDate: '2026-02-28' },
  { id: 'MC-JZTL14P', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 27Ш', totalPrice: '189000', customerName: 'Ө.буянчимэг', phoneNumber: '99995809', createdAt: '2026-02-20', paymentDate: '2026-02-20', confirmationDate: '2026-02-20', cargoArrivalDate: '2026-02-28' },
  { id: 'MC-774LGID', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЯГА 1Ш', totalPrice: '6000', customerName: 'Л.Ариунзул', phoneNumber: '88051269', createdAt: '2026-01-29', paymentDate: '2026-01-29', confirmationDate: '2026-01-29', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-LKP08T0', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 10Ш', totalPrice: '70000', customerName: 'Ш.Сэлэнгэ', phoneNumber: '94118299', createdAt: '2026-01-29', paymentDate: '2026-01-29', confirmationDate: '2026-01-29', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-Y1TGVVR', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 8Ш', totalPrice: '56000', customerName: 'Ц.Нарантуяа', phoneNumber: '99872129', createdAt: '2026-01-29', paymentDate: '2026-01-29', confirmationDate: '2026-01-29', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-UQINCWR', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 5Ш', totalPrice: '35000', customerName: 'О.Чулуунцэцэг', phoneNumber: '86229840', createdAt: '2026-01-29', paymentDate: '2026-01-29', confirmationDate: '2026-01-29', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-9LV58FE', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'ҮСНИЙ БООЛТ 2Ш VALENTIN', totalPrice: '23000', customerName: 'б.шинэжил', phoneNumber: '86115853', createdAt: '2026-01-29', paymentDate: '2026-01-29', confirmationDate: '2026-01-29', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-1QJ1AAK', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 10 Ш', totalPrice: '70000', customerName: 'туяа намсан', phoneNumber: '99000579', createdAt: '2026-01-26', paymentDate: '2026-01-26', confirmationDate: '2026-01-26', cargoArrivalDate: '2026-01-28' },
  { id: 'MC-3HEGPEZ', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'ҮСНИЙ БООЛТ 5Ш', totalPrice: '40000', customerName: 'Ц.Эрвээхэй', phoneNumber: '99255512', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' },
  { id: 'MC-ZUUHBIA', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'МАШИН ЦЭНХЭР', totalPrice: '19000', customerName: 'О.Батцэцэг', phoneNumber: '90717671', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' },
  { id: 'MC-VLQUPYJ', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'САЛФЕТКА 3Ш', totalPrice: '30000', customerName: 'М.Цолмон', phoneNumber: '99162585', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' },
  { id: 'MC-D1A4394', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 20Ш', totalPrice: '140000', customerName: 'Б.Далгорсүрэн', phoneNumber: '96061101', createdAt: '2026-01-30', paymentDate: '2026-01-30', confirmationDate: '2026-01-30', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-PRWKUU8', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 3Ш', totalPrice: '21000', customerName: 'Гүнсэн', phoneNumber: '99127760', createdAt: '2026-01-30', paymentDate: '2026-01-30', confirmationDate: '2026-01-30', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-0IXNKM8', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 10Ш', totalPrice: '70000', customerName: 'Ж.Нямгэрэл', phoneNumber: '95958744', createdAt: '2026-01-30', paymentDate: '2026-01-30', confirmationDate: '2026-01-30', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-QL8ST4K', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'АЛЧУУР 5Ш', totalPrice: '35000', customerName: 'Ж.Нарантунгалаг', phoneNumber: '95085170', createdAt: '2026-01-30', paymentDate: '2026-01-30', confirmationDate: '2026-01-30', cargoArrivalDate: '2026-01-30' },
  { id: 'MC-0FDL5YK', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'чихэр авах хүн өмнөговь', totalPrice: '1280000', customerName: 'чихэр авах хүн өмнөговь', phoneNumber: '89109690', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' },
  { id: 'MC-GYH005I', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'ТҮРҮҮВЧ ЯГААН АЛЧУУР', totalPrice: '70000', customerName: 'Туяа', phoneNumber: '86001104', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' },
  { id: 'MC-TYGQ3V0', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'НАБОР', totalPrice: '25000', customerName: 'Тэмүүжин', phoneNumber: '80712480', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' },
  { id: 'MC-ZE9K31M', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'НАБОР1Ш', totalPrice: '25000', customerName: 'Х.Отгончимэг', phoneNumber: '88775447', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' },
  { id: 'MC-TL6QUX3', userId: 'admin-001', origin: 'Guangzhou', destination: 'UB', currentLocation: 'Guangzhou Warehouse', homeAddress: '', status: CargoStatus.GUANGZHOU, eta: '', cargoType: 'САЛФЕТКА 2Ш', totalPrice: '20000', customerName: 'үлэмж тансаг', phoneNumber: '95414341', createdAt: '2026-02-01', paymentDate: '2026-02-01', confirmationDate: '2026-02-01', cargoArrivalDate: '2026-02-04' }
];

export const dbService = {
  init: () => {
    // 1. Init Users
    const users = storage.get(USERS_KEY);
    if (!users || users.length === 0) {
      const defaultAdmin: User = {
        id: 'admin-001',
        email: 'dolgoonoo473@gmail.com',
        password: 'admin123',
        name: 'Uyanga Admin',
        role: 'admin'
      };
      storage.set(USERS_KEY, [defaultAdmin]);
    }

    // 2. Init Shipments
    const currentShipments = storage.get(SHIPMENTS_KEY);
    if (!currentShipments || currentShipments.length === 0) {
      storage.set(SHIPMENTS_KEY, SEED_SHIPMENTS);
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
      role: user.email.includes('admin') || user.email === 'dolgoonoo473@gmail.com' ? 'admin' : 'user'
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
  },

  getShipment: (id: string): Shipment | undefined => {
    const shipments = dbService.getAllShipments();
    const cleanId = id.trim().toLowerCase();
    return shipments.find(s => s.id.toLowerCase() === cleanId);
  },

  getShipmentsByPhone: (phone: string): Shipment[] => {
    const shipments = dbService.getAllShipments();
    const cleanSearchPhone = phone.replace(/\D/g, '');
    if (cleanSearchPhone.length < 4) return [];
    
    return shipments.filter(s => {
      const cleanShipmentPhone = s.phoneNumber.replace(/\D/g, '');
      return cleanShipmentPhone.includes(cleanSearchPhone);
    });
  },

  getAllShipments: (): Shipment[] => {
    return storage.get(SHIPMENTS_KEY) || [];
  },

  updateShipment: (id: string, updates: Partial<Shipment>): void => {
    const shipments = dbService.getAllShipments();
    const index = shipments.findIndex(s => s.id === id);
    if (index !== -1) {
      shipments[index] = { ...shipments[index], ...updates };
      storage.set(SHIPMENTS_KEY, shipments);
    }
  },

  deleteShipment: (id: string): void => {
    const shipments = dbService.getAllShipments().filter(s => s.id !== id);
    storage.set(SHIPMENTS_KEY, shipments);
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
