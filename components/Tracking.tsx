
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
    setHasSearched(false); // Reset results view until search completes

    // Simulate network delay for better UX
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
    }, 600);
  };

  const handleInputChange = (val: string) => {
    setSearchValue(val);
    if (error) setError(false); // Clear error while typing
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
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Ачаа Хянах</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Бүртгүүлсэн утасны дугаараа ашиглан бүх ачааны явцаа нэг дороос хараарай.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 p-6 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1">
              <div className="flex bg-white p-1.5 rounded-2xl mb-6 border border-slate-200 shadow-sm">
                <button 
                  onClick={() => switchType('phone')}
                  className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all ${searchType === 'phone' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Утасны дугаараар
                </button>
                <button 
                  onClick={() => switchType('id')}
                  className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all ${searchType === 'id' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
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
                  placeholder={searchType === 'phone' ? "Жишээ: 88XXXXXX" : "Жишээ: MC-XXXXXXX"}
                  className={`w-full px-8 py-6 rounded-[32px] text-xl font-bold border-4 transition-all duration-300 ${
                    error && hasSearched && results.length === 0 
                    ? 'border-red-100 ring-4 ring-red-50' 
                    : 'border-white focus:border-blue-500'
                  } bg-white shadow-lg outline-none`}
                />
                {searchType === 'phone' && (
                  <span className="absolute left-8 -top-3 px-2 bg-white text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100 rounded z-10">
                    Утасны дугаар
                  </span>
                )}
                {isLoading && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {error && !searchValue.trim() && (
                <p className="text-red-500 text-xs font-bold mt-3 ml-4 animate-in fade-in slide-in-from-top-1">Утга оруулна уу.</p>
              )}
            </div>
            <button 
              onClick={handleTrack}
              disabled={isLoading}
              className="bg-slate-900 text-white px-16 py-6 rounded-[32px] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl hover:-translate-y-1 h-fit md:mt-[94px] active:scale-95 disabled:opacity-50 disabled:translate-y-0"
            >
              Хайх
            </button>
          </div>

          <div className="space-y-8 min-h-[100px]">
            {isLoading ? (
              <div className="flex flex-col items-center py-20 animate-pulse">
                <div className="w-16 h-16 bg-blue-50 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-slate-200 rounded-full mb-2"></div>
                <div className="h-3 w-32 bg-slate-100 rounded-full"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="grid gap-6">
                {results.map((shipment) => (
                  <div key={shipment.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-500 group hover:shadow-xl transition-all">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-10">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-100">Ачааны ID</span>
                          <p className="font-mono font-black text-slate-900 text-2xl tracking-tighter">{shipment.id}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-wider">{shipment.customerName} • {shipment.phoneNumber}</p>
                      </div>
                      <div className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        shipment.status === 'In Transit' ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {shipment.status === 'Booked' ? 'Бүртгэгдсэн' : 
                         shipment.status === 'Processing' ? 'Боловсруулж буй' :
                         shipment.status === 'In Transit' ? 'Тээвэрлэлтэд' :
                         shipment.status === 'Delivered' ? 'Хүргэгдсэн' : 'Саатсан'}
                      </div>
                    </div>

                    <div className="relative h-3 bg-slate-50 rounded-full mb-12 shadow-inner border border-slate-100">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-[1.5s] ease-out shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                        style={{ width: shipment.status === 'Booked' ? '15%' : shipment.status === 'Processing' ? '40%' : shipment.status === 'In Transit' ? '75%' : '100%' }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Маршрут</p>
                        <p className="font-bold text-slate-900 text-sm">{shipment.origin} ➔ {shipment.destination}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Жин / Төрөл</p>
                        <p className="font-bold text-slate-900 text-sm">{shipment.weight}кг / {shipment.cargoType}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Ирэх хугацаа</p>
                        <p className="font-bold text-slate-900 text-sm">{shipment.eta}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Огноо</p>
                        <p className="font-bold text-slate-900 text-sm">{new Date(shipment.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="text-center py-24 bg-white rounded-[48px] border-4 border-dashed border-slate-100 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Мэдээлэл олдсонгүй</h3>
                <p className="text-slate-500 font-medium px-6">
                  "{searchValue}" утгаар ачаа олдсонгүй. <br className="hidden sm:block" />
                  Та оруулсан дугаараа дахин шалгана уу.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracking;
