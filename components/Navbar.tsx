
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">MyCargo <span className="text-blue-600">Pro</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Нүүр</a>
          <a href="#booking" className="hover:text-blue-600 transition-colors">Илгээх</a>
          <a href="#tracking" className="hover:text-blue-600 transition-colors">Хянах</a>
          <a href="#calculator" className="hover:text-blue-600 transition-colors">Үнэ</a>
          <a href="#ai" className="hover:text-blue-600 transition-colors">AI Туслах</a>
        </div>

        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200">
          Нэвтрэх
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
