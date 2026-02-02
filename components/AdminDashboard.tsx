
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
    const handleSync = () => loadData();
    const handleSMS = (e: any) => {
      setToast({ message: `Мэссэж: ${e.detail.phone}`, visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 4000);
    };

    window.addEventListener('mycargo-data-updated', handleSync);
    window.addEventListener('mycargo-sms', handleSMS as EventListener);
    
    return () => {
      window.removeEventListener('mycargo-data-updated', handleSync);
      window.removeEventListener('mycargo-sms', handleSMS as EventListener);
    };
  }, []);

  const updateField = (id: string, field: keyof Shipment, value: any) => {
    dbService.updateShipment(id, { [field]: value });
    loadData();
  };

  const deleteItem = (id: string) => {
    if (window.confirm('Устгах уу?')) {
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
        {toast.visible && (
          <div className="fixed top-24 right-8 z-[200] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right-8 duration-300">
            <span className="font-bold text-sm">{toast.message}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight uppercase">Удирдлагын хэсэг</h2>
            <p className="text-slate-500 font-medium">Ачааны байршил болон төлөвийг эндээс шинэчилнэ үү.</p>
          </div>
          <input 
            type="text" 
            placeholder="Хайх..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-8 py-4 rounded-2xl bg-white border-none shadow-sm w-full md:w-96 font-bold"
          />
        </div>

        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Ачаа</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Захиалагч</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Одоо байгаа байршил</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Төлөв</th>
                  <th className="px-8 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-mono font-black text-blue-600">{s.id}</div>
                      <div className="text-[10px] font-bold text-slate-400">{s.cargoType}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{s.customerName}</div>
                      <div className="text-xs font-mono text-slate-400">{s.phoneNumber}</div>
                    </td>
                    <td className="px-8 py-6">
                      <input 
                        className="bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold border border-slate-100 focus:border-blue-500 outline-none w-full"
                        value={s.currentLocation}
                        placeholder="Байршил бичих..."
                        onChange={(e) => updateField(s.id, 'currentLocation', e.target.value)}
                      />
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={s.status}
                        onChange={(e) => updateField(s.id, 'status', e.target.value)}
                        className="text-[11px] font-black px-4 py-2 rounded-full border-2 bg-white outline-none"
                      >
                        <option value={CargoStatus.BOOKED}>Бүртгэгдсэн</option>
                        <option value={CargoStatus.PROCESSING}>Боловсруулалт</option>
                        <option value={CargoStatus.IN_TRANSIT}>Тээвэрлэлт</option>
                        <option value={CargoStatus.DELIVERED}>Хүргэгдсэн</option>
                        <option value={CargoStatus.ON_HOLD}>Саатсан</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
                      <button onClick={() => deleteItem(s.id)} className="text-slate-300 hover:text-red-500 p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
