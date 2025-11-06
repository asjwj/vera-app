import { useState } from 'react';
import { supabase } from '../supabase';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // SADECE METİN Supabase'e kaydediliyor
    const { error } = await supabase.from('posts').insert([{ text }]);
    if (error) console.error("Supabase Kayıt Hatası:", error);
    
    setText(''); 
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded">
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Paylaş..." 
        className="w-full p-2 bg-gray-700 text-white" 
      />
      {/* Resim yükleme alanı kaldırıldı */}
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded mt-2" 
        disabled={isLoading || text.trim() === ''} // Boş metin gönderilemesin
      >
        {isLoading ? 'Yükleniyor...' : 'Gönder'}
      </button>
    </form>
  );
}
