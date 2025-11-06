import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  // Cloudinary Cloud Name'i Vercel'den çekecek
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    // Cloudinary'ye yükle
    if (image && CLOUDINARY_CLOUD_NAME) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'vera-upload'); // Daha önce oluşturduğunuz preset
      
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Cloudinary Yükleme Hatası:", error);
      }
    }

    // Supabase'e kaydet
    const { data, error } = await supabase.from('posts').insert([{ text, image_url: imageUrl }]);
    if (error) console.error("Supabase Kayıt Hatası:", error);
    
    setText(''); setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paylaş..." className="w-full p-2 bg-gray-700 text-white" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Gönder</button>
    </form>
  );
    }
