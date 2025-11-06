import { useEffect, useState } => 'react';
import { supabase } from '../lib/supabase';
import CreatePost from '../lib/components/CreatePost'; // Yanlış yolu bilerek böyle bıraktık

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    
    if (error) console.error(error);
    setPosts(data || []);
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-4 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">Vera Social</h1>
      <CreatePost />
      <div className="space-y-6 mt-6">
        {posts.length === 0 && <p className="text-center text-gray-500">Henüz paylaşım yok. İlk postu siz yapın!</p>}
        {posts.map(post => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700">
            <p className="text-lg mb-2">{post.text}</p>
            {post.image_url && <img src={post.image_url} alt="Post" className="w-full mt-3 rounded-lg max-h-96 object-cover" />}
            <p className="text-xs text-gray-500 mt-2">ID: {post.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
    }
    
