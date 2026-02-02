
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

  useEffect(() => {
    setUser(dbService.getCurrentUser());
  }, []);

  const handleAuthSuccess = () => {
    setUser(dbService.getCurrentUser());
  };

  const handleLogout = () => {
    dbService.logout();
    setUser(null);
    window.location.reload();
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
        
        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Агаарын тээвэр', icon: '✈️', desc: 'Хамгийн хурдан хүргэлт, дэлхийн хаана ч.' },
              { title: 'Далайн тээвэр', icon: '🚢', desc: 'Их хэмжээний ачаанд хамгийн хэмнэлттэй.' },
              { title: 'Газрын тээвэр', icon: '🚛', desc: 'Бүс нутгийн доторх уян хатан шийдэл.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Reach Section */}
        <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Дэлхийг хамарсан сүлжээ</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Бид Монгол улсаас дэлхийн бүх тив рүү хамгийн оновчтой замаар тээвэрлэлт хийж байна.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-xl"><span className="text-blue-600">●</span> GLOBAL PORT</div>
              <div className="flex items-center gap-2 font-bold text-xl"><span className="text-blue-600">●</span> SKY LOGISTICS</div>
              <div className="flex items-center gap-2 font-bold text-xl"><span className="text-blue-600">●</span> OCEAN CARGO</div>
              <div className="flex items-center gap-2 font-bold text-xl"><span className="text-blue-600">●</span> TRANS MONGO</div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">MyCargo <span className="text-blue-500">Pro</span></span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
              Логистикийн салбарт хувьсгал хийж, технологийн тусламжтайгаар дэлхийг холбоно. Бид таны ачааг аюулгүй, найдвартай хүргэхийг эрхэмлэнэ.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61575260079474" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/uyanga_creator/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.376.896.419.419.679.818.896 1.376.163.422.358 1.057.412 2.227.059 1.266.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.376-.419.419-.818.679-1.376.896-.422.163-1.057.358-2.227.412-1.266.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.376-.896-.419-.419-.679-.818-.896-1.376-.163-.422-.358-1.057-.412-2.227-.059-1.266-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.376.419-.419.818-.679 1.376-.896.422-.163 1.057-.358 2.227-.412 1.266-.059 1.646-.071 4.85-.071m0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.258-2.911.554-.789.307-1.458.717-2.124 1.383s-1.076 1.335-1.383 2.124c-.296.763-.497 1.634-.554 2.911-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.258 2.148.554 2.911.307.789.717 1.458 1.383 2.124s1.335 1.076 2.124 1.383c.763.296 1.634.497 2.911.554 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.258 2.911-.554.789-.307 1.458-.717 2.124-1.383s1.076-1.335 1.383-2.124c.296-.763.497-1.634-.554-2.911.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.258-2.148-.554-2.911-.307-.789-.717-1.458-1.383-2.124s-1.335-1.076-2.124-1.383c-.763-.296-1.634-.497-2.911-.554-1.28-.058-1.688-.072-4.947-.072z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-lg">Холбоосууд</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Бидний тухай</a></li>
              <li><a href="#booking" className="hover:text-blue-500 transition-colors">Ачаа илгээх</a></li>
              <li><a href="#dashboard" className="hover:text-blue-500 transition-colors">Хяналтын самбар</a></li>
              <li><a href="#ai" className="hover:text-blue-500 transition-colors">AI Туслах</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-lg">Холбоо барих</h4>
            <ul className="space-y-6 text-slate-400 text-sm">
              <li className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-slate-600 tracking-widest">И-мэйл</span>
                <a href="mailto:dolgoonoo473@gmail.com" className="hover:text-blue-500 transition-colors">dolgoonoo473@gmail.com</a>
                <a href="mailto:injy0906@gmail.com" className="hover:text-blue-500 transition-colors">injy0906@gmail.com</a>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-slate-600 tracking-widest">Утас</span>
                <a href="tel:72025197" className="hover:text-blue-500 transition-colors">72025197</a>
                <a href="tel:72015523" className="hover:text-blue-500 transition-colors">72015523</a>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase text-slate-600 tracking-widest">Хаяг</span>
                <span>Улаанбаатар, Сүхбаатар дүүрэг</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 text-center text-slate-500 text-xs">
          &copy; 2024 MyCargo Pro. Бүх эрх хуулиар хамгаалагдсан. Технологийн шийдлээр дэлхийг холбоно.
        </div>
      </footer>
    </div>
  );
};

export default App;
