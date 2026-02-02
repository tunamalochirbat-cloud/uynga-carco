
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Reset error when toggling between login and register
  useEffect(() => {
    setError('');
  }, [isLogin, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = dbService.login(email, password);
      if (user) {
        onSuccess();
        onClose();
      } else {
        setError('И-мэйл эсвэл нууц үг буруу байна.');
      }
    } else {
      if (password.length < 6) {
        setError('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.');
        return;
      }
      const result = dbService.register({ email, password, name });
      if (typeof result === 'string') {
        setError(result);
      } else {
        dbService.login(email, password);
        onSuccess();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-y-auto px-4 py-12 md:p-6">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-8 duration-300 z-10 my-auto">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-1">
                {isLogin ? 'Тавтай морил' : 'Бүртгүүлэх'}
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                {isLogin ? 'Нэвтрэхийн тулд мэдээллээ оруулна уу.' : 'Системд бүртгэл үүсгэж ачаагаа хянаарай.'}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Бүтэн нэр</label>
                <input 
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="Овог Нэр"
                />
              </div>
            )}
            
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">И-мэйл хаяг</label>
              <input 
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Нууц үг</label>
              <input 
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 mt-6 transform active:scale-95">
              {isLogin ? 'Нэвтрэх' : 'Бүртгэл үүсгэх'}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-slate-50 pt-8">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors"
            >
              {isLogin ? (
                <>Шинэ хэрэглэгч үү? <span className="text-blue-600 ml-1">Бүртгүүлэх</span></>
              ) : (
                <>Бүртгэлтэй юу? <span className="text-blue-600 ml-1">Нэвтрэх</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
