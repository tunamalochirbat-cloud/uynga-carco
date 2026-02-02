
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Shipment, CargoStatus } from '../types';

const Tracking: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'phone'>('phone');
  const [results, setResults] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = () => {
    if (!searchValue.trim()) return;
    setIsLoading(true);
    setHasSearched(false);

    setTimeout(() => {
      let found: Shipment[] = [];
      if (searchType === 'id') {
        const res = dbService.getShipment(searchValue);
        if (res) found = [res];
      } else {
        found = dbService.getShipmentsByPhone(searchValue);
      }
      setResults(found);
      setIsLoading(false);
      setHasSearched(true);
    }, 600);
  };

  const getStatusColor = (status: CargoStatus) => {
    switch (status) {
      case CargoStatus.GUANGZHOU: return 'bg-amber-500';
      case CargoStatus.EREEN: return 'bg-blue-500';
      case CargoStatus.UB_TERMINAL: return 'bg-indigo-600';
      case CargoStatus.KANBAN_DELIVERY: return 'bg-purple-600 pulse-blue';
      case CargoStatus.DELIVERED: return 'bg-green-600';
      default: return 'bg-slate-500';
    }
  };

  return (
    <section id="tracking" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            ХЯНАЛТЫН ХЭСЭГ
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Захиалга Хянах</h2>
          <p className="text-slate-500 font-medium">Төлбөр баталгаажсан болон ачааны явцыг эндээс шалгана уу.</p>
        </div>

        <div className="bg-slate-50 p-6 md:p-10 rounded-[48px] border border-slate-100 shadow-xl mb-12">
          <div className="flex bg-white p-1.5 rounded-[24px] mb-8 border border-slate-200">
            <button 
              onClick={() => setSearchType('phone')}
              className={`flex-1 py-3 rounded-[20px] text-xs font-black transition-all ${searchType === 'phone' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-50'}`}
            >Утасны дугаараар</button>
            <button 
              onClick={() => setSearchType('id')}
              className={`flex-1 py-3 rounded-[20px] text-xs font-black transition-all ${searchType === 'id' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
            >Захиалгын дугаараар</button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              placeholder={searchType === 'phone' ? "Утасны дугаар..." : "MC-XXXXXXX"}
              className="flex-1 px-8 py-5 rounded-[28px] text-xl font-black bg-white border-2 border-transparent focus:border-blue-500 outline-none shadow-sm transition-all"
            />
            <button 
              onClick={handleTrack}
              className="bg-slate-900 text-white px-12 py-5 rounded-[28px] font-black text-lg hover:bg-blue-600 transition-all active:scale-95"
            >
              {isLoading ? 'Хайж байна...' : 'Хайх'}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {results.map((shipment) => (
            <div key={shipment.id} className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 opacity-50"></div>
              
              <div className="flex flex-col md:flex-row gap-10">
                {/* Product Image and Status */}
                <div className="md:w-1/3">
                  <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden border-4 border-white shadow-xl mb-6 relative">
                    {shipment.imageUrl ? (
                      <img src={shipment.imageUrl} alt="Product" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className={`text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase text-center tracking-widest shadow-lg ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-3xl font-black text-blue-600 font-mono tracking-tighter">{shipment.id}</h4>
                      <p className="text-sm font-bold text-slate-400 mt-1 uppercase">{shipment.customerName} • {shipment.cargoType}</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(shipment.id)}`} 
                        alt="QR" 
                        className="w-12 h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Төлбөр хийсэн</p>
                      <p className="font-bold text-slate-900">{shipment.paymentDate || '-'}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Баталгаажсан</p>
                      <p className="font-bold text-slate-900">{shipment.confirmationDate || '-'}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase mb-1">Үнийн дүн</p>
                        <p className="text-2xl font-black text-blue-600">{shipment.totalPrice} ₮</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase mb-1">Одоогийн байршил</p>
                        <p className="font-black text-slate-900 text-sm">{shipment.currentLocation}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-blue-100">
                      <p className="text-[9px] font-black text-blue-400 uppercase mb-1">Гэрийн хаяг</p>
                      <p className="font-bold text-slate-900 text-xs leading-relaxed">{shipment.homeAddress || 'Салбараас авна'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {hasSearched && results.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-slate-100 text-slate-400 font-bold">
              Уучлаарай, захиалгын мэдээлэл олдсонгүй. Утасны дугаараа шалгаад дахин оролдоно уу.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tracking;
