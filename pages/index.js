// pages/index.js

export default function Home() {
  return (
    <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#1a1a1a', 
        color: 'white', 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
    }}>
      <h1 style={{ color: '#4CAF50', fontSize: '3rem', marginBottom: '20px' }}>Başardık!</h1>
      <p style={{ fontSize: '1.5rem' }}>Next.js Uygulaması Canlıda!</p>
      <p style={{ color: 'gray', marginTop: '10px' }}>Eğer bu yazıyı görüyorsanız, tüm yönlendirme sorunları çözülmüştür.</p>
    </div>
  );
}

// Supabase bağlantısını test etmek için getServerSideProps'u siliyoruz.
// export async function getServerSideProps() { ... }
