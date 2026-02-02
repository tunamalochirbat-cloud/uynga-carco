
import React from 'react';

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative pt-16 pb-28 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-[10px] font-black mb-8 uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Official Brand Control
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 leading-[0.95] mb-8 tracking-tighter">
            UYANGA <br />
            <span className="text-blue-600">SHOP</span>
          </h1>
          <div className="mb-10">
            <p className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
              Crafted with Tradition, Woman & Style
            </p>
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
              Монгол уламжлалыг орчин үеийн хэв маягтай хослуулсан "Uyanga Shop"-ын захиалга, тээвэрлэлтийг удирдах албан ёсны систем.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStartClick}
              className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95"
            >
              Захиалга бүртгэх
            </button>
            <a href="#tracking" className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all text-center">
              Ачаа хянах
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
            <div>
              <p className="text-2xl font-black text-slate-900">100%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hand Crafted</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">Fast</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Shipping</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">Safe</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Payment</p>
            </div>
          </div>
        </div>
        
        <div className="relative lg:scale-110 translate-x-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-[120px] opacity-60 -z-10"></div>
          {/* Using a placeholder that represents the user's uploaded image setup */}
          <div className="relative">
            <img 
              src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/uyanga-mockup-placeholder.png" 
              alt="Uyanga Shop Workspace" 
              className="rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white object-cover aspect-square md:aspect-video"
              onError={(e) => {
                // If the specific URL isn't available, we use a high-quality tech/workspace alternative that matches the vibe
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80";
              }}
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[32px] shadow-2xl border border-slate-50 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Систем бэлэн</p>
                  <p className="text-sm font-black text-slate-900">Бүх төхөөрөмж дээр</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
