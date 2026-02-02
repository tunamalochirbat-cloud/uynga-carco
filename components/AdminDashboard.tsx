
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { Shipment, CargoStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filter, setFilter] = useState('');

  const loadData = () => setShipments(dbService.getAllShipments());

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('mycargo-data-updated', handleSync);
    return () => window.removeEventListener('mycargo-data-updated', handleSync);
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
    <section id="dashboard" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight uppercase">Захиалгын Удирдлага</h2>
            <p className="text-slate-500 font-medium italic">Төлбөр болон тээвэрлэлтийн хугацааг эндээс удирдана.</p>
          </div>
          <input 
            type="text" 
            placeholder="Хайх..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-8 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm w-full md:w-96 font-bold focus:ring-4 focus:ring-blue-500/10 outline-none"
          />
        </div>

        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">ID / Төрөл</th>
                  <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Захиалагч / Үнэ</th>
                  <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Хугацаа (Date)</th>
                  <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Төлөв</th>
                  <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Байршил</th>
                  <th className="px-6 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Үйлдэл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-mono font-black text-blue-600 text-lg">{s.id}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{s.cargoType}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="font-bold text-slate-900">{s.customerName}</div>
                      <div className="text-xs font-mono text-slate-400">{s.phoneNumber}</div>
                      <input 
                        className="text-[11px] font-black text-blue-600 mt-1 bg-transparent border-none p-0 focus:ring-0 w-24"
                        value={s.totalPrice || ''}
                        placeholder="Үнэ бичих"
                        onChange={e => updateField(s.id, 'totalPrice', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] font-black text-slate-400 w-12">ТӨЛБӨР:</span>
                          <input type="date" value={s.paymentDate || ''} onChange={e => updateField(s.id, 'paymentDate', e.target.value)} className="text-[10px] bg-transparent border-none p-0 focus:ring-0 font-bold text-slate-600" />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] font-black text-slate-400 w-12">БАТАЛГАА:</span>
                          <input type="date" value={s.confirmationDate || ''} onChange={e => updateField(s.id, 'confirmationDate', e.target.value)} className="text-[10px] bg-transparent border-none p-0 focus:ring-0 font-bold text-slate-600" />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] font-black text-slate-400 w-12">АЧААНД:</span>
                          <input type="date" value={s.cargoArrivalDate || ''} onChange={e => updateField(s.id, 'cargoArrivalDate', e.target.value)} className="text-[10px] bg-transparent border-none p-0 focus:ring-0 font-bold text-slate-600" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={s.status}
                        onChange={(e) => updateField(s.id, 'status', e.target.value)}
                        className="text-[10px] font-black px-3 py-1.5 rounded-full border-2 bg-white outline-none cursor-pointer hover:border-blue-500 transition-all"
                      >
                        {Object.values(CargoStatus).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-6">
                      <input 
                        className="bg-slate-50 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-slate-100 focus:border-blue-500 outline-none w-full max-w-[120px]"
                        value={s.currentLocation}
                        onChange={(e) => updateField(s.id, 'currentLocation', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-6">
                      <button onClick={() => deleteItem(s.id)} className="text-slate-300 hover:text-red-500 transition-colors">
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
