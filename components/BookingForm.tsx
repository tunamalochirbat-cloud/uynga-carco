
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { CargoStatus } from '../types';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    origin: '',
    destination: '',
    cargoType: 'Ерөнхий ачаа',
    weight: ''
  });
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = dbService.generateId();
    const newShipment = {
      ...formData,
      id: newId,
      weight: Number(formData.weight),
      status: CargoStatus.BOOKED,
      eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    dbService.saveShipment(newShipment as any);
    setSuccessId(newId);
    setFormData({ customerName: '', origin: '', destination: '', cargoType: 'Ерөнхий ачаа', weight: '' });
    
    // Auto-scroll to tracking or show success
    setTimeout(() => setSuccessId(null), 10000);
  };

  return (
    <section id="booking" className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Ачаа илгээх захиалга</h2>
          <p className="text-slate-500 text-lg">Захиалга өгснөөр таны ачаа системд бүртгэгдэж, хяналтын дугаар үүснэ.</p>
        </div>

        {successId ? (
          <div className="bg-green-50 border-2 border-green-200 p-8 rounded-[32px] text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Амжилттай бүртгэгдлээ!</h3>
            <p className="text-slate-600 mb-4">Таны хяналтын дугаар:</p>
            <div className="text-4xl font-black text-blue-600 mb-6 font-mono tracking-tighter">{successId}</div>
            <p className="text-sm text-slate-400">Энэ дугаарыг ашиглан "Ачаа хянах" хэсгээс мэдээллээ харна уу.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100 grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Захиалагчийн нэр</label>
              <input 
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
                value={formData.customerName}
                onChange={e => setFormData({...formData, customerName: e.target.value})}
                placeholder="Таны нэр эсвэл компанийн нэр"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Илгээх цэг</label>
              <input 
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
                value={formData.origin}
                onChange={e => setFormData({...formData, origin: e.target.value})}
                placeholder="Хот, Улс"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Хүлээн авах цэг</label>
              <input 
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
                placeholder="Хот, Улс"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ачааны төрөл</label>
              <select 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
                value={formData.cargoType}
                onChange={e => setFormData({...formData, cargoType: e.target.value})}
              >
                <option>Ерөнхий ачаа</option>
                <option>Хэврэг ачаа</option>
                <option>Аюултай ачаа</option>
                <option>Хөргүүртэй ачаа</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Жин (кг)</label>
              <input 
                required
                type="number"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
                value={formData.weight}
                onChange={e => setFormData({...formData, weight: e.target.value})}
                placeholder="0"
              />
            </div>
            <button className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all shadow-lg mt-4">
              Бүртгүүлэх
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
