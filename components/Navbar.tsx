
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onAuthClick, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">ShopControl <span className="text-blue-600">Pro</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Нүүр</a>
          <a href="#booking" className="hover:text-blue-600 transition-colors">Захиалга Бүртгэл</a>
          {user?.role === 'admin' && <a href="#dashboard" className="hover:text-blue-600 transition-colors">Удирдлага</a>}
          <a href="#tracking" className="hover:text-blue-600 transition-colors">Бараа Хянах</a>
          <a href="#ai" className="hover:text-blue-600 transition-colors">AI Туслах</a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-400 uppercase">Сайн уу?</p>
                <p className="text-sm font-black text-slate-900">{user.name}</p>
              </div>
              <button 
                onClick={onLogout}
                className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all"
              >
                Гарах
              </button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
            >
              Нэвтрэх
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
