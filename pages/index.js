import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';
import CreatePost from '../lib/components/CreatePost'; // CreatePost bileşenini dahil ediyoruz

export default function Home({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);

  // Veri çekme ve dinleme fonksiyonları
  useEffect(() => {
    // Supabase real-time dinleyicisini kurar
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          // Yeni post eklendiğinde listeyi güncelle
          if (payload.eventType === 'INSERT') {
            setPosts((currentPosts) => [payload.new, ...currentPosts]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">Vera Social</h1>
      <CreatePost /> 
      <div className="space-y-6 mt-6">
        {posts.length === 0 && <p className="text-center text-gray-500">Henüz paylaşım yok. İlk postu siz yapın!</p>}
        {posts.map(post => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700">
            <p className="text-lg mb-2">{post.text}</p>
            <p className="text-xs text-gray-500 mt-2">ID: {post.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Server Side Rendering (SSR) ile ilk veriyi çekme
export async function getServerSideProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching initial posts:', error);
    return { props: { initialPosts: [] } };
  }

  return { props: { initialPosts: posts } };
          }
