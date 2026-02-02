
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tracking from './components/Tracking';
import AIChat from './components/AIChat';
import PricingCalculator from './components/PricingCalculator';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import LiveAssistant from './components/LiveAssistant';
import AuthModal from './components/AuthModal';
import { dbService } from './services/dbService';
import { User } from './types';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const syncUser = () => {
    setUser(dbService.getCurrentUser());
  };

  useEffect(() => {
    syncUser();
    window.addEventListener('storage', syncUser);
    window.addEventListener('mycargo-data-updated', syncUser);
    
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('mycargo-data-updated', syncUser);
    };
  }, []);

  const handleAuthSuccess = () => {
    syncUser();
  };

  const handleLogout = () => {
    dbService.logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white">
      <Navbar 
        user={user} 
        onAuthClick={() => setIsAuthModalOpen(true)} 
        onLogout={handleLogout} 
      />
      <main>
        <Hero onStartClick={() => !user && setIsAuthModalOpen(true)} />
        
        {/* Shop Features Section */}
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Захиалга Бүртгэл', icon: '📝', desc: 'Хэрэглэгчийн захиалсан барааг огноо, үнийн дүнтэй нь нэг дороос бүртгэнэ.' },
              { title: 'Төлбөрийн Хяналт', icon: '💳', desc: 'Мөнгө шилжүүлсэн болон баталгаажсан цаг хугацааг алдаагүй хянана.' },
              { title: 'Хүргэлтийн Явц', icon: '📦', desc: 'Бараа ачаанд тавигдахаас эхлээд эзнийхээ гарт очих хүртэлх бүх алхмыг харна.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Focus Section */}
        <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Найдвартай Үйлчилгээ</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Бид онлайн дэлгүүрийнхээ хэрэглэгч бүрт захиалгын мэдээллийг хамгийн ил тод, шуурхай хүргэхийг зорилгоо болгон ажилладаг.</p>
            </div>
          </div>
        </section>

        <BookingForm />
        {user?.role === 'admin' && <AdminDashboard />}
        <Tracking />
        <PricingCalculator />
        <AIChat />
      </main>

      <LiveAssistant />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <footer className="bg-slate-950 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">ShopControl <span className="text-blue-500">Pro</span></span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
              Онлайн дэлгүүрийн захиалгыг системтэй, алдаагүй хөтлөхөд тань туслах ухаалаг туслах. Бид таны бизнесийн өсөлтийг дэмжинэ.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com" target="_blank" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-lg">Холбоосууд</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Нүүр</a></li>
              <li><a href="#booking" className="hover:text-blue-500 transition-colors">Захиалга бүртгэх</a></li>
              <li><a href="#tracking" className="hover:text-blue-500 transition-colors">Бараа хянах</a></li>
              <li><a href="#ai" className="hover:text-blue-500 transition-colors">AI Туслах</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-lg">Холбоо барих</h4>
            <ul className="space-y-6 text-slate-400 text-sm">
              <li className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-slate-600 tracking-widest">И-мэйл</span>
                <a href="mailto:info@yourshop.mn" className="hover:text-blue-500 transition-colors font-bold">info@yourshop.mn</a>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-slate-600 tracking-widest">Утас</span>
                <a href="tel:88008800" className="hover:text-blue-600 transition-colors font-black text-lg">8800-8800</a>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-slate-600 tracking-widest">Хаяг</span>
                <span className="font-medium text-slate-300">Улаанбаатар, Сүхбаатар дүүрэг</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 text-center text-slate-500 text-xs">
          &copy; 2025 ShopControl. Бүх эрх хуулиар хамгаалагдсан.
        </div>
      </footer>
    </div>
  );
};

export default App;
