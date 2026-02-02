
import React from 'react';

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            Онлайн Дэлгүүрийн Ухаалаг Бүртгэл
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Захиалга & <br />
            <span className="text-blue-600">Төлбөрийн</span> <br />
            Хяналтын Систем
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            Бараа захиалга, төлбөр тооцоо болон Хятадаас ирэх явцыг нэг дороос хянаж, хэрэглэгчиддээ хамгийн чанартай үйлчилгээг үзүүлээрэй.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStartClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
            >
              Захиалга бүртгэх
            </button>
            <a href="#tracking" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all text-center">
              Бараа хянах
            </a>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1556742049-13da7464b919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Online Store Management" 
            className="rounded-[40px] shadow-2xl animate-float border-8 border-white object-cover aspect-[4/3]"
          />
          <div className="absolute -bottom-10 -left-10 glass-panel p-6 rounded-3xl shadow-xl max-w-xs border border-white/50">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Санхүү</p>
                <p className="text-sm font-black text-slate-900">Төлбөр амжилттай баталгаажлаа</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
