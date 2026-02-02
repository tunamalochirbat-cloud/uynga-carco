
import React from 'react';

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-black mb-6 uppercase tracking-wider">
            Online Shop Management Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Захиалга Хяналтын <br />
            <span className="text-blue-600">Цогц</span> <br />
            Систем
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
            БНХАУ-аас ирэх онлайн дэлгүүрийн захиалгуудаа нэг дороос бүртгэж, хэрэглэгчдэдээ ил тод, шуурхай хяналтын үйлчилгээ үзүүлээрэй.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStartClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
            >
              Захиалга бүртгэх
            </button>
            <a href="#tracking" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all text-center">
              Захиалга хянах
            </a>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1534452286304-a15f369796e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Order Management" 
            className="rounded-[40px] shadow-2xl animate-float border-8 border-white object-cover aspect-[4/3]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
