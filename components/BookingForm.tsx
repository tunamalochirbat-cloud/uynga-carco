
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { CargoStatus, User } from '../types';

const BookingForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    origin: '',
    destination: '',
    cargoType: 'Ерөнхий ачаа',
    weight: ''
  });
  const [successId, setSuccessId] = useState<string | null>(null);
  const [isSmsNotified, setIsSmsNotified] = useState(false);

  useEffect(() => {
    setUser(dbService.getCurrentUser());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      alert("Зөвхөн админ захиалга бүртгэх эрхтэй.");
      return;
    }

    const newId = dbService.generateId();
    const newShipment = {
      ...formData,
      id: newId,
      userId: user.id,
      weight: Number(formData.weight),
      status: CargoStatus.BOOKED,
      eta: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    dbService.saveShipment(newShipment as any);
    setSuccessId(newId);
    setIsSmsNotified(true);
    setFormData({ customerName: '', phoneNumber: '', origin: '', destination: '', cargoType: 'Ерөнхий ачаа', weight: '' });
    
    setTimeout(() => {
      setSuccessId(null);
      setIsSmsNotified(false);
    }, 10000);
  };

  return (
    <section id="booking" className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Админ самбар
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Захиалга Хөтлөх</h2>
          <p className="text-slate-500 text-lg">Шинэ ачааг бүртгэж, хэрэглэгчийн утсанд мэссэж илгээх.</p>
        </div>

        {successId ? (
          <div className="bg-white border-4 border-blue-600/10 p-12 rounded-[48px] text-center animate-in fade-in zoom-in duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Амжилттай бүртгэгдлээ!</h3>
            <p className="text-slate-500 mb-2">Хяналтын дугаар:</p>
            <div className="text-5xl font-black text-blue-600 mb-8 font-mono tracking-tighter">{successId}</div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-3 bg-green-50 text-green-700 px-8 py-4 rounded-2xl text-sm font-bold border border-green-100 animate-bounce">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Хэрэглэгчийн утсанд мэссэж илгээгдлээ
              </div>
              <button onClick={() => setSuccessId(null)} className="text-sm font-bold text-slate-400 hover:text-blue-600">Дахин нэмэх</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl border border-slate-100 grid md:grid-cols-2 gap-8 relative overflow-hidden">
            {user?.role !== 'admin' && (
              <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-[6px] rounded-[48px] flex items-center justify-center p-10 text-center">
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 max-w-sm">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4">Зөвхөн Оператор</h4>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    Захиалга хөтлөх хэсэг нь зөвхөн эрх бүхий ажилчдад харагдана. Та ачаагаа хянахын тулд доорх товчийг ашиглана уу.
                  </p>
                  <a href="#tracking" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all">
                    Ачаа хянах хэсэг
                  </a>
                </div>
              </div>
            )}
            
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Захиалагчийн бүтэн нэр</label>
              <input 
                required
                className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-semibold"
                value={formData.customerName}
                onChange={e => setFormData({...formData, customerName: e.target.value})}
                placeholder="Овог Нэр"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Хэрэглэгчийн утасны дугаар</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-200 pr-4">+976</span>
                <input 
                  required
                  type="tel"
                  className="w-full pl-24 pr-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-mono font-bold"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  placeholder="88XXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Илгээх хот/улс</label>
              <input required className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Хүлээн авах хот/улс</label>
              <input required className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Ачааны төрөл</label>
              <select className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all" value={formData.cargoType} onChange={e => setFormData({...formData, cargoType: e.target.value})}>
                <option>Ерөнхий ачаа</option>
                <option>Хэврэг ачаа</option>
                <option>Аюултай ачаа</option>
                <option>Хөргүүртэй ачаа</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Жин (кг)</label>
              <input required type="number" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
            </div>
            <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-6 rounded-[32px] font-black text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-blue-100 mt-6 active:scale-95">
              Бүртгэл үүсгэх & Мэссэж илгээх
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
