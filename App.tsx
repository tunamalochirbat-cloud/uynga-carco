
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tracking from './components/Tracking';
import AIChat from './components/AIChat';
import PricingCalculator from './components/PricingCalculator';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import LiveAssistant from './components/LiveAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        
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

        <BookingForm />
        <AdminDashboard />
        <Tracking />
        <PricingCalculator />
        <AIChat />
      </main>

      <LiveAssistant />

      <footer className="bg-slate-950 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">MyCargo <span className="text-blue-500">Pro</span></span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Логистикийн салбарт хувьсгал хийж, технологийн тусламжтайгаар дэлхийг холбоно.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Холбоосууд</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Бидний тухай</a></li>
              <li><a href="#booking" className="hover:text-blue-500 transition-colors">Ачаа илгээх</a></li>
              <li><a href="#dashboard" className="hover:text-blue-500 transition-colors">Хяналтын самбар</a></li>
              <li><a href="#ai" className="hover:text-blue-500 transition-colors">AI Туслах</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Холбоо барих</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>support@mycargo.mn</li>
              <li>+976 7000-0000</li>
              <li>Улаанбаатар, Сүхбаатар дүүрэг</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/10 text-center text-slate-500 text-xs">
          &copy; 2024 MyCargo Pro. Бүх эрх хуулиар хамгаалагдсан.
        </div>
      </footer>
    </div>
  );
};

export default App;
