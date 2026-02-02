
import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              {isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Бүтэн нэр</label>
                <input 
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Овог Нэр"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">И-мэйл хаяг</label>
              <input 
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="example@mail.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Нууц үг</label>
              <input 
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 mt-4">
              {isLogin ? 'Нэвтрэх' : 'Бүртгэл үүсгэх'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-semibold text-slate-500 hover:text-blue-600"
            >
              {isLogin ? 'Шинэ хэрэглэгч үү? Бүртгүүлэх' : 'Бүртгэлтэй юу? Нэвтрэх'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
