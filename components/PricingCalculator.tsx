
import React, { useState } from 'react';

const PricingCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [total, setTotal] = useState<number | null>(null);

  const calculate = () => {
    // Basic dummy formula: $2 per kg + $0.5 per km
    const result = (weight * 2) + (distance * 0.5);
    setTotal(result);
  };

  return (
    <section id="calculator" className="py-24 px-6 bg-blue-600">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Тээврийн зардлаа <br />урьдчилан тооцоол
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Бидний ил тод үнийн бодлого танд бизнесээ илүү оновчтой төлөвлөхөд тусална.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
              <p className="text-3xl font-bold text-white mb-2">150+</p>
              <p className="text-blue-100 text-sm">Түнш улс орнууд</p>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
              <p className="text-3xl font-bold text-white mb-2">99.9%</p>
              <p className="text-blue-100 text-sm">Аюулгүй байдал</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-[40px] shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ачааны жин (кг)</label>
              <input 
                type="number" 
                value={weight || ''}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Зай (км)</label>
              <input 
                type="number" 
                value={distance || ''}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <button 
              onClick={calculate}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all shadow-lg"
            >
              Тооцоолох
            </button>
            
            {total !== null && (
              <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-500 font-bold uppercase text-xs mb-2">Баримжаа үнэ</p>
                <p className="text-5xl font-black text-slate-900">${total.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-4">* Энэхүү үнэ нь зөвхөн баримжаа бөгөөд татвараас хамаарч өөрчлөгдөж болно.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
