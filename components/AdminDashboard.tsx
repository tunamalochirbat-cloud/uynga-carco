
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { Shipment, CargoStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filter, setFilter] = useState('');

  const loadData = () => {
    const data = dbService.getAllShipments();
    setShipments(data);
  };

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
    if (window.confirm('Энэ захиалгыг устгах уу?')) {
      dbService.deleteShipment(id);
      loadData();
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Нэр', 'Утас', 'Бараа', 'Үнэ', 'Төлөв', 'Төлбөр огноо', 'Баталгаажсан', 'Ачаанд өгсөн'];
    const rows = shipments.map(s => [
      s.id,
      s.customerName,
      s.phoneNumber,
      s.cargoType,
      s.totalPrice,
      s.status,
      s.paymentDate || '',
      s.confirmationDate || '',
      s.cargoArrivalDate || ''
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM for Excel UTF-8
    csvContent += headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenue = shipments.reduce((acc, s) => {
    const price = parseFloat(s.totalPrice.replace(/[^0-9.]/g, '')) || 0;
    return acc + price;
  }, 0);

  const filtered = shipments.filter(s => 
    s.id.toLowerCase().includes(filter.toLowerCase()) || 
    s.customerName.toLowerCase().includes(filter.toLowerCase()) ||
    s.phoneNumber.includes(filter)
  );

  return (
    <section id="dashboard" className="py-12 px-6 bg-slate-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Нийт захиалга</p>
            <p className="text-3xl font-black text-slate-900">{shipments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Нийт борлуулалт</p>
            <p className="text-3xl font-black text-blue-600">{totalRevenue.toLocaleString()} ₮</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Замд яваа</p>
            <p className="text-3xl font-black text-orange-500">
              {shipments.filter(s => s.status !== CargoStatus.DELIVERED).length}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase">Бүх захиалга</h2>
            <button 
              onClick={exportCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-green-700 transition-all shadow-lg shadow-green-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Excel Татах
            </button>
          </div>
          <input 
            type="text" 
            placeholder="Хайх..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-80 px-5 py-3 rounded-2xl bg-white border border-slate-200 font-bold outline-none"
          />
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / ЗУРАГ</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ЗАХИАЛАГЧ / ҮНЭ</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ХУГАЦАА (DATE)</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ТӨЛӨВ</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">ҮЙЛДЭЛ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                          {s.imageUrl ? (
                            <img src={s.imageUrl} alt="Prod" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-mono font-black text-blue-600 text-sm">{s.id}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase mt-1 max-w-[120px] truncate">{s.cargoType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="font-bold text-slate-900">{s.customerName}</div>
                      <div className="text-xs font-mono text-slate-400">{s.phoneNumber}</div>
                      <input 
                        className="text-sm font-black text-blue-600 mt-2 bg-slate-50 px-2 py-1 rounded-lg border-none focus:ring-2 focus:ring-blue-500 w-28"
                        value={s.totalPrice || ''}
                        onChange={e => updateField(s.id, 'totalPrice', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1 text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-400 w-12 uppercase">Төлбөр:</span>
                          <input type="date" value={s.paymentDate || ''} onChange={e => updateField(s.id, 'paymentDate', e.target.value)} className="font-bold bg-transparent p-0 text-slate-600" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-400 w-12 uppercase">Баталгаа:</span>
                          <input type="date" value={s.confirmationDate || ''} onChange={e => updateField(s.id, 'confirmationDate', e.target.value)} className="font-bold bg-transparent p-0 text-slate-600" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={s.status}
                        onChange={(e) => updateField(s.id, 'status', e.target.value)}
                        className="text-[10px] font-black px-4 py-2 rounded-xl border border-slate-200 bg-white"
                      >
                        {Object.values(CargoStatus).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button onClick={() => deleteItem(s.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
