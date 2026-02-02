
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Shipment, CargoStatus } from '../types';

const Tracking: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'phone'>('phone');
  const [results, setResults] = useState<Shipment[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = () => {
    if (!searchValue.trim()) {
      setError(true);
      return;
    }
    setIsLoading(true);
    setError(false);
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
      if (found.length === 0) setError(true);
    }, 800);
  };

  return (
    <section id="tracking" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Хяналтын хэсэг
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Захиалга Хянах</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Төлбөр баталгаажсан болон ачааны явцыг эндээс шалгана уу.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 p-6 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1">
              <div className="flex bg-white p-1.5 rounded-[24px] mb-6 border border-slate-200 shadow-sm">
                <button 
                  onClick={() => setSearchType('phone')}
                  className={`flex-1 py-4 rounded-[20px] text-sm font-black transition-all ${searchType === 'phone' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`}
                >Утасны дугаараар</button>
                <button 
                  onClick={() => setSearchType('id')}
                  className={`flex-1 py-4 rounded-[20px] text-sm font-black transition-all ${searchType === 'id' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`}
                >Захиалгын дугаараар</button>
              </div>
              <input 
                type="text" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                placeholder={searchType === 'phone' ? "88XXXXXX" : "MC-XXXXXXX"}
                className="w-full px-8 py-6 rounded-[32px] text-xl font-black border-4 border-white focus:border-blue-500 bg-white shadow-lg outline-none transition-all"
              />
            </div>
            <button 
              onClick={handleTrack}
              disabled={isLoading}
              className="bg-slate-900 text-white px-16 py-6 rounded-[32px] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl h-fit md:mt-[94px] active:scale-95 disabled:opacity-50"
            >
              Хайх
            </button>
          </div>

          <div className="space-y-8">
            {results.map((shipment) => (
              <div key={shipment.id} className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="flex flex-wrap justify-between items-start gap-6 mb-10">
                  <div>
                    <p className="font-mono font-black text-blue-600 text-3xl mb-1 tracking-tighter">{shipment.id}</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{shipment.customerName} • {shipment.cargoType}</p>
                  </div>
                  <div className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm ${
                    shipment.status === CargoStatus.DELIVERED ? 'bg-green-100 text-green-700' : 
                    shipment.status === CargoStatus.KANBAN_DELIVERY ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-600 text-white shadow-xl shadow-blue-100'
                  }`}>
                    {shipment.status}
                  </div>
                </div>

                {/* Milestones / Dates Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  <div className={`p-4 rounded-2xl border transition-all ${shipment.paymentDate ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-100'}`}>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Мөнгө хийсэн</p>
                    <p className="font-bold text-slate-900 text-sm">{shipment.paymentDate || 'Хүлээгдэж буй'}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-all ${shipment.confirmationDate ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Баталгаажсан</p>
                    <p className="font-bold text-slate-900 text-sm">{shipment.confirmationDate || 'Хүлээгдэж буй'}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border transition-all ${shipment.cargoArrivalDate ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100'}`}>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Ачаанд өгсөн</p>
                    <p className="font-bold text-slate-900 text-sm">{shipment.cargoArrivalDate || 'Хүлээгдэж буй'}</p>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="relative mb-12 px-2">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                  <div className="relative flex justify-between items-center">
                    {[CargoStatus.GUANGZHOU, CargoStatus.EREEN, CargoStatus.UB_TERMINAL, CargoStatus.DELIVERED].map((st, i) => {
                      const stages = [CargoStatus.GUANGZHOU, CargoStatus.EREEN, CargoStatus.UB_TERMINAL, CargoStatus.KANBAN_DELIVERY, CargoStatus.DELIVERED];
                      const currentIdx = stages.indexOf(shipment.status);
                      const stageIdx = stages.indexOf(st);
                      const isCompleted = stageIdx <= currentIdx && shipment.status !== CargoStatus.ON_HOLD;
                      
                      return (
                        <div key={i} className="flex flex-col items-center z-10">
                          <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${
                            isCompleted ? 'bg-blue-600 border-white text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300'
                          }`}>
                            {isCompleted ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                            ) : <span className="text-xs font-bold">{i+1}</span>}
                          </div>
                          <p className={`mt-3 text-[9px] font-black uppercase tracking-tighter text-center max-w-[80px] ${isCompleted ? 'text-blue-600' : 'text-slate-400'}`}>
                            {st === CargoStatus.GUANGZHOU ? 'Гуанжоу' : st === CargoStatus.EREEN ? 'Эрээн' : st === CargoStatus.UB_TERMINAL ? 'Улаанбаатар' : 'Хүргэгдсэн'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 p-6 rounded-[32px]">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Одоогийн байршил</p>
                    <p className="font-bold text-slate-900 text-sm uppercase">{shipment.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Нийт Үнэ</p>
                    <p className="font-black text-blue-600 text-sm">{shipment.totalPrice || '0.00'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Бүртгэсэн</p>
                    <p className="font-bold text-slate-900 text-sm">{new Date(shipment.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Хүргэлт</p>
                    <p className="font-bold text-slate-900 text-[10px] leading-tight">{shipment.homeAddress || 'Салбараас авах'}</p>
                  </div>
                </div>
              </div>
            ))}
            {hasSearched && results.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100">
                <p className="text-slate-400 font-bold">Захиалгын мэдээлэл олдсонгүй.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracking;
