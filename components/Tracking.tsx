
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { Shipment } from '../types';

const Tracking: React.FC = () => {
  const [trackId, setTrackId] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState(false);

  const handleTrack = () => {
    setError(false);
    const result = dbService.getShipment(trackId);
    if (result) {
      setShipment(result);
    } else {
      setShipment(null);
      setError(true);
    }
  };

  return (
    <section id="tracking" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-2 p-12 bg-slate-50 border-r border-slate-100">
              <h2 className="text-3xl font-extrabold mb-6">Ачаа хянах</h2>
              <p className="text-slate-600 mb-8">Хяналтын дугаараа оруулан ачааныхаа байршлыг бодит цаг хугацаанд харна уу.</p>
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  placeholder="Жишээ: MC-XXXXXXX"
                  className={`w-full px-6 py-4 rounded-2xl border ${error ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {error && <p className="text-red-500 text-xs font-bold px-2">Уучлаарай, ийм дугаартай ачаа олдсонгүй.</p>}
                <button 
                  onClick={handleTrack}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg"
                >
                  Хянах
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-3 p-12 flex items-center justify-center min-h-[400px]">
              {shipment ? (
                <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Ачааны мэдээлэл</h3>
                      <p className="text-2xl font-extrabold text-slate-900">{shipment.id}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                      {shipment.status}
                    </span>
                  </div>
                  
                  <div className="relative pt-4">
                    <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                    <div 
                      className="absolute top-1/2 left-0 h-1.5 bg-blue-600 -translate-y-1/2 rounded-full transition-all duration-1000"
                      style={{ width: shipment.status === 'Booked' ? '5%' : shipment.status === 'Processing' ? '30%' : shipment.status === 'In Transit' ? '65%' : '100%' }}
                    ></div>
                    <div className="flex justify-between relative z-10">
                      <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${shipment.status === 'Booked' ? 'bg-blue-600 scale-125' : 'bg-blue-600'}`}></div>
                      <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${shipment.status === 'Processing' ? 'bg-blue-600 scale-125' : shipment.status === 'Booked' ? 'bg-slate-200' : 'bg-blue-600'}`}></div>
                      <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${shipment.status === 'In Transit' ? 'bg-blue-600 scale-125' : (shipment.status === 'Booked' || shipment.status === 'Processing') ? 'bg-slate-200' : 'bg-blue-600'}`}></div>
                      <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${shipment.status === 'Delivered' ? 'bg-blue-600 scale-125' : 'bg-slate-200'}`}></div>
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      <span>Захиалсан</span>
                      <span>Боловсруулж буй</span>
                      <span>Тээвэрт</span>
                      <span>Хүрсэн</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Илгээгч</p>
                      <p className="font-bold text-slate-900">{shipment.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Маршрут</p>
                      <p className="font-bold text-slate-900">{shipment.origin} ➔ {shipment.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Ирэх хугацаа (ETA)</p>
                      <p className="font-bold text-slate-900">{shipment.eta}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Жин / Төрөл</p>
                      <p className="font-bold text-slate-900">{shipment.weight}кг / {shipment.cargoType}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="font-medium text-lg">Хяналтын дугаараа оруулан мэдээлэл харна уу</p>
                  <p className="text-sm mt-2">Хэрэв танд дугаар байхгүй бол "Ачаа илгээх" хэсгээс шинээр үүсгэнэ үү.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracking;
