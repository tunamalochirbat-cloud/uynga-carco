
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { CargoStatus, User, Shipment } from '../types';

const BookingForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    origin: 'Guangzhou, China',
    destination: 'Улаанбаатар, Монгол',
    homeAddress: '',
    cargoType: '',
    weight: ''
  });
  const [successId, setSuccessId] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = () => {
      const currentUser = dbService.getCurrentUser();
      setUser(currentUser);
    };
    
    syncUser();
    window.addEventListener('mycargo-data-updated', syncUser);
    return () => window.removeEventListener('mycargo-data-updated', syncUser);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      alert("Зөвхөн админ захиалга бүртгэх эрхтэй.");
      return;
    }

    const newId = dbService.generateId();
    const newShipment: Shipment = {
      id: newId,
      userId: user.id,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      origin: formData.origin,
      destination: formData.destination,
      currentLocation: 'Guangzhou Warehouse',
      homeAddress: formData.homeAddress,
      cargoType: formData.cargoType || 'Ерөнхий ачаа',
      weight: Number(formData.weight),
      status: CargoStatus.BOOKED,
      eta: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    dbService.saveShipment(newShipment);
    setSuccessId(newId);
    setFormData({ 
      customerName: '', 
      phoneNumber: '', 
      origin: 'Guangzhou, China', 
      destination: 'Улаанбаатар, Монгол', 
      homeAddress: '',
      cargoType: '', 
      weight: '' 
    });
    
    setTimeout(() => {
      setSuccessId(null);
    }, 12000);
  };

  return (
    <section id="booking" className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Оператор хэсэг
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tighter">Шинэ Ачаа Бүртгэх</h2>
          <p className="text-slate-500 text-lg">Ачааны мэдээллийг үнэн зөв бөглөж системд оруулна уу.</p>
        </div>

        {successId ? (
          <div className="bg-white border-4 border-blue-600/10 p-12 rounded-[48px] text-center animate-in fade-in zoom-in duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Бүртгэл амжилттай!</h3>
            <p className="text-slate-500 mb-2">Ачааны хяналтын дугаар:</p>
            <div className="text-5xl font-black text-blue-600 mb-8 font-mono tracking-tighter">{successId}</div>
            
            <button onClick={() => setSuccessId(null)} className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-2xl text-base font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-100">
              Дараагийн ачааг бүртгэх
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-14 rounded-[56px] shadow-2xl border border-slate-100 grid md:grid-cols-2 gap-x-10 gap-y-8 relative overflow-hidden">
            {user?.role !== 'admin' && (
              <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-[8px] rounded-[56px] flex items-center justify-center p-10 text-center">
                <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-slate-100 max-w-sm">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Нэвтрэх шаардлагатай</h4>
                  <p className="text-slate-500 leading-relaxed mb-8 font-medium">
                    Зөвхөн админ эрхтэй хэрэглэгч ачаа бүртгэх боломжтой.
                  </p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all">
                    Нэвтрэх цонх руу очих
                  </button>
                </div>
              </div>
            )}
            
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Захиалагчийн нэр</label>
              <input 
                required
                className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 text-lg"
                value={formData.customerName}
                onChange={e => setFormData({...formData, customerName: e.target.value})}
                placeholder="Жишээ: Д.Дорж"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Холбоо барих утас</label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 font-black border-r border-slate-200 pr-4">+976</span>
                <input 
                  required
                  type="tel"
                  className="w-full pl-24 pr-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-mono font-black text-xl text-slate-900"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  placeholder="88XXXXXX"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Гэрийн хаяг (Хүргэлт хийхэд хэрэгтэй)</label>
              <textarea 
                required
                className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold min-h-[100px]"
                value={formData.homeAddress}
                onChange={e => setFormData({...formData, homeAddress: e.target.value})}
                placeholder="Хот, Дүүрэг, Хороо, Байр, Орц, Тоот"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Илгээх цэг</label>
              <input required className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} placeholder="Guangzhou, China" />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Хүлээн авах цэг</label>
              <input required className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} placeholder="Улаанбаатар, Монгол" />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Барааны төрөл (Өөрөө бичих)</label>
              <input 
                required 
                className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold" 
                value={formData.cargoType} 
                onChange={e => setFormData({...formData, cargoType: e.target.value})} 
                placeholder="Жишээ: Хувцас, Цахилгаан хэрэгсэл..." 
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Жин (кг)</label>
              <input required type="number" step="0.01" className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="0.00" />
            </div>
            
            <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-6 rounded-[32px] font-black text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-blue-100 mt-6 active:scale-95 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
              Системд бүртгэх
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
