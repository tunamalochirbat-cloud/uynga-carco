
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { Shipment, CargoStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filter, setFilter] = useState('');

  const loadData = () => {
    setShipments(dbService.getAllShipments());
  };

  useEffect(() => {
    loadData();
    // Listen for local storage changes (if booking happens in another "tab" or component update)
    const handleStorage = () => loadData();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
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
    s.customerName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section id="dashboard" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Захиалгын удирдлага</h2>
            <p className="text-slate-500">Бүх идэвхтэй болон өнгөрсөн тээвэрлэлтүүдийг хянах хэсэг.</p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Хайх (Дугаар эсвэл нэр)..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
            />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Дугаар</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Захиалагч</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Маршрут</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Төлөв</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? filtered.map((s) => (
                <tr key={s.id} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-blue-600">{s.id}</td>
                  <td className="px-6 py-4 font-semibold">{s.customerName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{s.origin} ➔ {s.destination}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={s.status}
                      onChange={(e) => updateStatus(s.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-full border-none focus:ring-2 focus:ring-offset-2 ${
                        s.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        s.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      <option value={CargoStatus.BOOKED}>Бүртгэгдсэн</option>
                      <option value={CargoStatus.PROCESSING}>Боловсруулж буй</option>
                      <option value={CargoStatus.IN_TRANSIT}>Тээвэрлэгдэж буй</option>
                      <option value={CargoStatus.DELIVERED}>Хүргэгдсэн</option>
                      <option value={CargoStatus.ON_HOLD}>Саатсан</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => deleteItem(s.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                    Одоогоор захиалга байхгүй байна.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={loadData}
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Шинэчлэх
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
