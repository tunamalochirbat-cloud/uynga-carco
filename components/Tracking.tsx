
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Shipment } from '../types';

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
      if (found.length === 0) {
        setError(true);
      }
    }, 800);
  };

  const handleInputChange = (val: string) => {
    setSearchValue(val);
    if (error) setError(false);
  };

  const switchType = (type: 'id' | 'phone') => {
    setSearchType(type);
    setSearchValue('');
    setResults([]);
    setError(false);
    setHasSearched(false);
  };

  return (
    <section id="tracking" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            Хэрэглэгчийн хэсэг
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Ачаагаа Хянах</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Ачааны байршил болон төлөвийг бодит хугацаанд шалгаарай.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 p-6 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1">
              <div className="flex bg-white p-1.5 rounded-[24px] mb-6 border border-slate-200 shadow-sm">
                <button 
                  onClick={() => switchType('phone')}
                  className={`flex-1 py-4 rounded-[20px] text-sm font-black transition-all ${searchType === 'phone' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Утасны дугаараар
                </button>
                <button 
                  onClick={() => switchType('id')}
                  className={`flex-1 py-4 rounded-[20px] text-sm font-black transition-all ${searchType === 'id' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Хяналтын дугаараар
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                  placeholder={searchType === 'phone' ? "88XXXXXX" : "MC-XXXXXXX"}
                  className={`w-full px-8 py-6 rounded-[32px] text-xl font-black border-4 transition-all duration-300 ${
                    error && hasSearched && results.length === 0 
                    ? 'border-red-100 ring-4 ring-red-50' 
                    : 'border-white focus:border-blue-500'
                  } bg-white shadow-lg outline-none`}
                />
                {isLoading && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
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
            {results.length > 0 ? (
              <div className="grid gap-8">
                {results.map((shipment) => (
                  <div key={shipment.id} className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-500 hover:shadow-2xl transition-all">
                    <div className="flex flex-wrap justify-between items-start gap-6 mb-12">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-black bg-blue-600 text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-100">Илгээмж</span>
                          <p className="font-mono font-black text-slate-900 text-3xl tracking-tighter">{shipment.id}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                          {shipment.customerName} • {shipment.cargoType}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm mb-2 ${
                          shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                          shipment.status === 'In Transit' ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {shipment.status === 'Booked' ? 'Бүртгэгдсэн' : 
                           shipment.status === 'Processing' ? 'Боловсруулж буй' :
                           shipment.status === 'In Transit' ? 'Тээвэрлэлтэд' :
                           shipment.status === 'Delivered' ? 'Хүргэгдсэн' : 'Саатсан'}
                        </div>
                        <p className="text-[10px] font-black text-blue-600 uppercase">
                          {new Date(shipment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Real-time Location Badge */}
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-[24px] mb-10 flex items-center gap-4 animate-pulse">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Одоо байгаа байршил</p>
                        <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{shipment.currentLocation || 'Тодорхойгүй'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-slate-50 p-5 rounded-[20px] border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Маршрут</p>
                        <p className="font-bold text-slate-900 text-sm leading-tight">{shipment.origin} <br/>➔ {shipment.destination}</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-[20px] border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Жин</p>
                        <p className="font-black text-slate-900 text-lg">{shipment.weight} кг</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-[20px] border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Ирэх хугацаа</p>
                        <p className="font-bold text-slate-900 text-sm">{shipment.eta}</p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-[20px] border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Хаяг</p>
                        <p className="font-bold text-slate-900 text-[11px] truncate" title={shipment.homeAddress}>{shipment.homeAddress || 'Тодорхойгүй'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : hasSearched && !isLoading && (
              <div className="text-center py-20">
                <p className="text-slate-400 font-bold">Илгээмж олдсонгүй.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracking;
