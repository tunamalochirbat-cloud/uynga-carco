
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            AI-д суурилсан Логистик
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
            Тээвэрлэлтийг <br />
            <span className="text-blue-600">Ухаалгаар</span> <br />
            Шийдвэрлэе
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            Дэлхийн өнцөг булан бүрт ачаагаа хамгийн хурдан, найдвартай бөгөөд хямд зардлаар хүргэхэд MyCargo Pro тусална.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
              Одоо эхлэх
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Үнийн санал авах
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
          <img 
            src="https://picsum.photos/seed/logistics/800/600" 
            alt="Cargo Ship" 
            className="rounded-[40px] shadow-2xl animate-float border-8 border-white"
          />
          <div className="absolute -bottom-10 -left-10 glass-panel p-6 rounded-3xl shadow-xl max-w-xs animate-bounce-slow">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Сүүлийн мэдээ</p>
                <p className="text-sm font-bold text-slate-900">Ачаа амжилттай хүргэгдлээ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
