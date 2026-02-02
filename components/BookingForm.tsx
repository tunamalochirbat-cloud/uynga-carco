
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
    cargoArrivalDate: '',
    imageUrl: ''
  });
  const [successId, setSuccessId] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(dbService.getCurrentUser());
    syncUser();
    window.addEventListener('mycargo-data-updated', syncUser);
    return () => window.removeEventListener('mycargo-data-updated', syncUser);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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
      eta: '',
      createdAt: new Date().toISOString(),
      notes: formData.notes,
      paymentDate: formData.paymentDate,
      confirmationDate: formData.confirmationDate,
      cargoArrivalDate: formData.cargoArrivalDate,
      imageUrl: formData.imageUrl
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
      cargoArrivalDate: '',
      imageUrl: ''
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Хаяг хуулагдлаа!');
  };

  return (
    <section id="booking" className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            АДМИН ХЭСЭГ
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Онлайн Дэлгүүрийн Захиалга Бүртгэл</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar: Addresses & Payment */}
          <div className="lg:col-span-4 space-y-6">
            {/* Payment Info */}
            <div className="bg-slate-900 p-8 rounded-[32px] shadow-xl text-white">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Төлбөр Хүлээн Авах
              </h3>
              <div className="space-y-4">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Худалдаа Хөгжлийн Банк</p>
                  <p className="font-black text-white text-xl tracking-tight">140004000439020931</p>
                  <p className="text-xs font-bold text-blue-400 mt-1">Хүлээн авагч: Uyanga</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                <h4 className="text-[10px] font-black text-blue-400 uppercase mb-3 tracking-widest">Гүйлгээний утга:</h4>
                <p className="text-sm font-bold text-slate-200 leading-relaxed">
                  Захиалагчийн <span className="text-white underline underline-offset-4 decoration-blue-500">НЭР</span> болон <span className="text-white underline underline-offset-4 decoration-blue-500">УТАСНЫ ДУГААР</span>-ыг заавал бичнэ үү.
                </p>
                <p className="text-[10px] text-slate-500 mt-4 italic">
                  * Код бичих шаардлагагүй, зөвхөн нэр утас хангалттай.
                </p>
              </div>
            </div>

            {/* Warehouse Addresses */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-200">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                Ачаа хүлээн авах хаяг
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-2">БНХАУ - Гуанжоу</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed mb-3">
                    广东省广州市荔湾区站前路96号蒙古物流<br/>
                    收货人: 白金成 (buhee)<br/>
                    手机号: 134 2224 4242
                  </p>
                  <button onClick={() => copyToClipboard('广东省广州市荔湾区站前路96号蒙古物流')} className="text-[10px] bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition-all">Хуулж авах</button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-2">УБ Салбар (Хүлээлгэн өгөх)</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    Баян зүрхийн товчоо МТ колонкийн замын хойд талд<br/>
                    Холбоо барих: 88104240
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-8">
            {successId ? (
              <div className="bg-white p-12 rounded-[48px] shadow-2xl border-4 border-blue-600/10 text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Бүртгэл амжилттай</h3>
                <div className="text-3xl font-black text-blue-600 mb-6 font-mono">{successId}</div>
                
                <div className="mb-8 p-4 bg-slate-50 rounded-3xl inline-block">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(successId)}`} 
                    alt="Tracking QR" 
                    className="mx-auto rounded-xl shadow-sm"
                  />
                  <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-widest">Хяналтын QR код</p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button onClick={() => setSuccessId(null)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg">Дараагийн захиалга</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[48px] shadow-xl border border-slate-100 relative overflow-hidden">
                {user?.role !== 'admin' && (
                  <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-md flex items-center justify-center text-center p-12">
                    <h4 className="text-xl font-black uppercase tracking-tight">Системийн Админ Нэвтэрнэ Үү</h4>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Захиалагчийн нэр</label>
                    <input required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 outline-none transition-all font-bold" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} placeholder="Бүтэн нэр" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Утасны дугаар</label>
                    <input required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 outline-none transition-all font-mono font-bold" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} placeholder="8800XXXX" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Захиалгын үнэ (₮)</label>
                    <input required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 outline-none transition-all font-black text-blue-600" value={formData.totalPrice} onChange={e => setFormData({...formData, totalPrice: e.target.value})} placeholder="75'000" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-blue-600 uppercase tracking-widest mb-2 px-1">Гэрийн хаяг (Заавал биш боловч байвал сайн)</label>
                    <input className="w-full px-6 py-4 rounded-2xl bg-blue-50/30 border-2 border-blue-50 focus:border-blue-500 outline-none transition-all font-bold" value={formData.homeAddress} onChange={e => setFormData({...formData, homeAddress: e.target.value})} placeholder="Дүүрэг, хороо, байр, тоот..." />
                  </div>

                  <div className="md:col-span-2 bg-blue-50/50 p-6 rounded-3xl border border-blue-100 grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-blue-600 mb-2">Төлбөр хийсэн</label>
                      <input type="date" className="w-full px-4 py-2 rounded-xl text-sm font-bold border-none" value={formData.paymentDate} onChange={e => setFormData({...formData, paymentDate: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-600 mb-2">Баталгаажсан</label>
                      <input type="date" className="w-full px-4 py-2 rounded-xl text-sm font-bold border-none" value={formData.confirmationDate} onChange={e => setFormData({...formData, confirmationDate: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-600 mb-2">Ачаанд өгсөн</label>
                      <input type="date" className="w-full px-4 py-2 rounded-xl text-sm font-bold border-none" value={formData.cargoArrivalDate} onChange={e => setFormData({...formData, cargoArrivalDate: e.target.value})} />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Барааны зураг</label>
                    <div className="flex gap-4 items-center">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="product-image" />
                      <label htmlFor="product-image" className="cursor-pointer bg-slate-100 px-6 py-4 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Зураг сонгох
                      </label>
                      {formData.imageUrl && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-500 shadow-lg group relative">
                          <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Барааны дэлгэрэнгүй мэдээлэл</label>
                    <textarea className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 outline-none transition-all font-bold min-h-[100px]" value={formData.cargoType} onChange={e => setFormData({...formData, cargoType: e.target.value})} placeholder="Барааны нэр, төрөл, тоо ширхэг..." />
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 mt-8 transform active:scale-[0.98]">
                  ЗАХИАЛГА ХАДГАЛАХ
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
