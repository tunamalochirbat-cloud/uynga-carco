
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import { CargoStatus, User, Shipment } from '../types';

const BookingForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    origin: 'Guangzhou, China',
    destination: 'Улаанбаатар (Баянзүрх салбар)',
    homeAddress: '',
    cargoType: '',
    totalPrice: '',
    notes: '',
    paymentDate: new Date().toISOString().split('T')[0],
    confirmationDate: new Date().toISOString().split('T')[0],
    cargoArrivalDate: ''
  });
  const [successId, setSuccessId] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(dbService.getCurrentUser());
    syncUser();
    window.addEventListener('mycargo-data-updated', syncUser);
    return () => window.removeEventListener('mycargo-data-updated', syncUser);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Хаяг хуулагдлаа!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') return;

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
      cargoType: formData.cargoType || 'Ерөнхий бараа',
      totalPrice: formData.totalPrice,
      status: CargoStatus.GUANGZHOU,
      eta: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      notes: formData.notes,
      paymentDate: formData.paymentDate,
      confirmationDate: formData.confirmationDate,
      cargoArrivalDate: formData.cargoArrivalDate
    };
    
    dbService.saveShipment(newShipment);
    setSuccessId(newId);
    setFormData({ 
      customerName: '', 
      phoneNumber: '', 
      origin: 'Guangzhou, China', 
      destination: 'Улаанбаатар (Баянзүрх салбар)', 
      homeAddress: '',
      cargoType: '', 
      totalPrice: '',
      notes: '',
      paymentDate: new Date().toISOString().split('T')[0],
      confirmationDate: new Date().toISOString().split('T')[0],
      cargoArrivalDate: ''
    });
    
    setTimeout(() => setSuccessId(null), 15000);
  };

  return (
    <section id="booking" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Оператор хэсэг
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter text-balance">Онлайн Дэлгүүрийн Захиалга Бүртгэх</h2>
          <p className="text-slate-500 text-lg">Захиалгын үнийн дүн болон хугацааг нарийн бүртгэнэ үү.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Хятад дахь хаяг</h3>
            
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full">№1 Хаяг</span>
                <button onClick={() => copyToClipboard('广东省广州市荔湾区站前路96号蒙古物流 收货人:白金成（buhee） 手机号:13422244242')} className="text-blue-600 font-bold text-xs hover:underline">Хуулах</button>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                收货地址: 广东省广州市荔湾区站前路96号蒙古物流<br/>
                收货人: 白金成（buhee）<br/>
                手机号: 134 2224 4242
              </p>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full">№2 Хаяг</span>
                <button onClick={() => copyToClipboard('流花新街16号，73蒙古国物流，联系人13948713456')} className="text-blue-600 font-bold text-xs hover:underline">Хуулах</button>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                地址: 流花新街16号，73蒙古国物流<br/>
                联系人: 13948713456
              </p>
            </div>

            <div className="bg-blue-900 text-white p-6 rounded-[32px] shadow-xl">
              <h4 className="font-black mb-2 uppercase text-xs tracking-widest text-blue-300">Улаанбаатар салбар</h4>
              <p className="text-sm leading-relaxed">
                Баянзүрх товчоо, МТ колонкийн замын хойд талд (Вэньчуань логистик)<br/>
                Утас: 88104240
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            {successId ? (
              <div className="bg-white border-4 border-blue-600/10 p-12 rounded-[56px] text-center animate-in fade-in zoom-in duration-500 shadow-2xl">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Захиалга бүртгэгдлээ</h3>
                <div className="text-5xl font-black text-blue-600 mb-10 font-mono tracking-tighter">{successId}</div>
                <button onClick={() => setSuccessId(null)} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all">Шинэ бүртгэл хийх</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[56px] shadow-2xl border border-slate-100 grid md:grid-cols-2 gap-8 relative overflow-hidden">
                {user?.role !== 'admin' && (
                  <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-[8px] rounded-[56px] flex items-center justify-center p-12 text-center">
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 mb-4 uppercase">Админ эрхээр нэвтэрнэ үү</h4>
                      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl">Нэвтрэх</button>
                    </div>
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Захиалагчийн овог нэр</label>
                  <input required className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} placeholder="Овог Нэр" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Холбоо барих утас</label>
                  <input required type="tel" className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-mono font-black text-lg" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} placeholder="88XXXXXX" />
                </div>

                {/* Date Fields Section */}
                <div className="bg-slate-50 p-6 rounded-[32px] md:col-span-2 grid md:grid-cols-3 gap-6 border border-slate-100">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Мөнгө хийсэн</label>
                    <input type="date" className="w-full px-4 py-4 rounded-xl bg-white border border-slate-100 focus:border-blue-500 outline-none font-bold text-sm" value={formData.paymentDate} onChange={e => setFormData({...formData, paymentDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Баталгаажсан</label>
                    <input type="date" className="w-full px-4 py-4 rounded-xl bg-white border border-slate-100 focus:border-blue-500 outline-none font-bold text-sm" value={formData.confirmationDate} onChange={e => setFormData({...formData, confirmationDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ачаанд өгсөн</label>
                    <input type="date" className="w-full px-4 py-4 rounded-xl bg-white border border-slate-100 focus:border-blue-500 outline-none font-bold text-sm" value={formData.cargoArrivalDate} onChange={e => setFormData({...formData, cargoArrivalDate: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Хүргэлтийн хаяг</label>
                  <textarea className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold min-h-[100px]" value={formData.homeAddress} onChange={e => setFormData({...formData, homeAddress: e.target.value})} placeholder="Дүүрэг, Хороо, Байр, Тоот..." />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Барааны төрөл</label>
                  <input required className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold" value={formData.cargoType} onChange={e => setFormData({...formData, cargoType: e.target.value})} placeholder="Жишээ: Хувцас, Гутал" />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Нийт үнийн дүн (₮ / ¥)</label>
                  <input required type="text" className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-black text-blue-600" value={formData.totalPrice} onChange={e => setFormData({...formData, totalPrice: e.target.value})} placeholder="0.00" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Нэмэлт тэмдэглэл</label>
                  <input className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Жишээ: Яаралтай хүргэлт" />
                </div>

                <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-6 rounded-[32px] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl mt-6 active:scale-95">
                  Бүртгэл хадгалах
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
