
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { Shipment, CargoStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filter, setFilter] = useState('');
  const [toast, setToast] = useState<{message: string, visible: boolean}>({ message: '', visible: false });

  const loadData = () => {
    setShipments(dbService.getAllShipments());
  };

  useEffect(() => {
    loadData();
    const handleStorage = () => loadData();
    const handleSMS = (e: any) => {
      setToast({ message: `Мэссэж илгээгдлээ: ${e.detail.phone}`, visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 4000);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('mycargo-sms', handleSMS as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mycargo-sms', handleSMS as EventListener);
    };
  }, []);

  const updateStatus = (id: string, status: any) => {
    dbService.updateShipmentStatus(id, status);
    loadData();
  };

  const deleteItem = (id: string) => {
    if (window.confirm('Энэ бүртгэлийг устгахдаа итгэлтэй байна уу?')) {
      dbService.deleteShipment(id);
      loadData();
    }
  };

  const filtered = shipments.filter(s => 
    s.id.toLowerCase().includes(filter.toLowerCase()) || 
    s.customerName.toLowerCase().includes(filter.toLowerCase()) ||
    s.phoneNumber.includes(filter)
  );

  return (
    <section id="dashboard" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* SMS Toast */}
        {toast.visible && (
          <div className="fixed top-24 right-8 z-[200] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-8 duration-300">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <span className="font-bold text-sm">{toast.message}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight uppercase">Захиалгын удирдлага</h2>
            <p className="text-slate-500 font-medium">Ачааны төлөвийг шинэчлэхэд хэрэглэгч рүү автоматаар мэссэж илгээгдэнэ.</p>
          </div>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Дугаар, нэр, утсаар хайх..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-14 pr-8 py-5 rounded-3xl bg-white border-none focus:ring-4 focus:ring-blue-500/10 shadow-sm w-full md:w-96 transition-all font-semibold"
            />
            <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Бүртгэл</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Захиалагч & Утас</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Маршрут</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Төлөв (SMS илгээх)</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length > 0 ? filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-mono font-bold text-blue-600 text-base">{s.id}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{new Date(s.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{s.customerName}</div>
                      <div className="text-sm font-mono font-black text-slate-400 mt-1">{s.phoneNumber}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-600 flex items-center gap-3">
                        <span className="bg-slate-100 px-2 py-1 rounded-md">{s.origin}</span>
                        <span className="text-blue-400">➔</span>
                        <span className="bg-slate-100 px-2 py-1 rounded-md">{s.destination}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={s.status}
                        onChange={(e) => updateStatus(s.id, e.target.value)}
                        className={`text-[11px] font-black px-5 py-2.5 rounded-full border-2 cursor-pointer transition-all shadow-sm outline-none ${
                          s.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : 
                          s.status === 'In Transit' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}
                      >
                        <option value={CargoStatus.BOOKED}>Бүртгэгдсэн</option>
                        <option value={CargoStatus.PROCESSING}>Боловсруулалт</option>
                        <option value={CargoStatus.IN_TRANSIT}>Тээвэрлэлт</option>
                        <option value={CargoStatus.DELIVERED}>Хүргэгдсэн</option>
                        <option value={CargoStatus.ON_HOLD}>Саатсан</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => deleteItem(s.id)}
                        className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-32 text-center text-slate-400 font-bold">Одоогоор бүртгэл байхгүй байна.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
