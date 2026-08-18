'use client';
import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [padding, setPadding] = useState<string>('p-8');
  const [bgGradient, setBgGradient] = useState<string>('from-purple-500 to-pink-500');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Simple anonymous session generation
  const [sessionId, setSessionId] = useState('');
  useEffect(() => {
    let id = localStorage.getItem('session_id') || Math.random().toString(36).substring(2);
    localStorage.setItem('session_id', id);
    setSessionId(id);
  }, []);

  const handleExport = async () => {
    // 1. Verify credits against Vercel KV API
    const res = await fetch('/api/download', {
      method: 'POST',
      body: JSON.stringify({ sessionId })
    });
    
    if (!res.ok) return alert("Out of free credits! Please upgrade.");

    // 2. Generate crisp high-res image
    if (canvasRef.current) {
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = 'social-post.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      {/* Controls */}
      <div className="flex gap-4 mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <select onChange={(e) => setPadding(e.target.value)} className="bg-slate-700 p-2 rounded">
          <option value="p-4">Small Padding</option>
          <option value="p-8">Medium Padding</option>
          <option value="p-16">Large Padding</option>
        </select>
        <button onClick={handleExport} className="bg-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-500">
          Export PNG
        </button>
      </div>

      {/* Visual Canvas Zone */}
      <div ref={canvasRef} className={`bg-gradient-to-br ${bgGradient} ${padding} rounded-xl shadow-2xl transition-all duration-200`}>
        {image ? (
          <img src={image} className="rounded-lg shadow-md max-w-xl" alt="Preview" />
        ) : (
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(URL.createObjectURL(file));
          }} className="bg-white/10 p-12 rounded-lg border-2 border-dashed border-white/20 text-center cursor-pointer" />
        )}
      </div>
    </div>
  );
}
