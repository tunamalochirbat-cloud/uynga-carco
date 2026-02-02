
import React, { useState, useRef, useEffect } from 'react';
import { getLogisticsAdvice } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize from DB
  useEffect(() => {
    const history = dbService.getChat();
    if (history.length === 0) {
      setMessages([{ 
        role: 'assistant', 
        content: 'Сайн байна уу! Би MyCargo Pro-ийн AI туслах байна. Тээвэрлэлт, гааль, логистикийн талаар асуух зүйл байна уу?',
        timestamp: Date.now()
      }]);
    } else {
      setMessages(history);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (messages.length > 0) {
      dbService.saveChat(messages);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getLogisticsAdvice(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: Date.now() }]);
    setLoading(false);
  };

  const clearHistory = () => {
    const initial = [{ 
      role: 'assistant', 
      content: 'Сайн байна уу! Танд туслахдаа таатай байх болно.', 
      timestamp: Date.now() 
    } as ChatMessage];
    setMessages(initial);
    dbService.saveChat(initial);
  };

  return (
    <section id="ai" className="py-24 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Логистикийн AI Туслах</h2>
            <p className="text-slate-400 text-lg">Ухаалаг зөвлөгөөг хоромхон зуурт аваарай</p>
          </div>
          <button 
            onClick={clearHistory}
            className="text-xs font-bold text-slate-500 hover:text-white transition-colors border border-slate-700 px-4 py-2 rounded-xl"
          >
            Түүх устгах
          </button>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white px-6 py-4 rounded-2xl rounded-tl-none animate-pulse flex items-center gap-2">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-slate-950/50 border-t border-white/10 flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ачаа тээвэр, татвар, гаалийн талаар асуух..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <span>Илгээх</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
