import { useState } from 'react';
import { supabase } from '../supabase';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let imageUrl = '';

    // Yeni API Rotasına Yükle
    if (image) {
      try {
        // Dosyayı Base64'e çeviriyoruz
        const reader = new FileReader();
        reader.readAsDataURL(image);
        await new Promise(resolve => reader.onload = resolve);
        const base64Data = reader.result;

        // API rotasını çağır
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: base64Data }),
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Yükleme Hatası:", error);
      }
    }

    // Supabase'e kaydet
    const { error } = await supabase.from('posts').insert([{ text, image_url: imageUrl }]);
    if (error) console.error("Supabase Kayıt Hatası:", error);
    
    setText(''); 
    setImage(null);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paylaş..." className="w-full p-2 bg-gray-700 text-white" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2" disabled={isLoading}>
        {isLoading ? 'Yükleniyor...' : 'Gönder'}
      </button>
    </form>
  );
    }
  
