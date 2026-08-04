import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('authenticated') !== 'true') {
      router.push('/login');
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const res = await fetch('/api/stats');
    const data = await res.json();
    if (data.media) setMedia(data.media);
    setLoading(false);
  };

  const copyAsMarkdown = () => {
    let markdown = '# Instagram İçerik İstatistikleri\n\n';
    media.forEach((item, index) => {
      markdown += `### ${index + 1}. Video\n`;
      markdown += `- **Açıklama:** ${item.caption || 'Yok'}\n`;
      markdown += `- **Beğeni:** ${item.like_count || 0}\n`;
      markdown += `- **Yorum:** ${item.comments_count || 0}\n`;
      markdown += `- **Tarih:** ${new Date(item.timestamp).toLocaleDateString('tr-TR')}\n\n`;
    });
    navigator.clipboard.writeText(markdown);
    alert('Tüm veriler Markdown formatında panoya kopyalandı!');
  };

  return (
    <div style={{ padding:'30px', background:'#0d0d0d', color:'#fff', minHeight:'100vh', fontFamily:'sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px' }}>
        <h1>Instagram Performans Panosu</h1>
        <div>
          <button onClick={fetchStats} style={{ marginRight:'10px', padding:'10px 15px', background:'#222', color:'#fff', border:'1px solid #444', borderRadius:'5px', cursor:'pointer' }}>Verileri Güncelle</button>
          <button onClick={copyAsMarkdown} style={{ padding:'10px 15px', background:'#0070f3', color:'#fff', border:'none', borderRadius:'5px', cursor:'pointer' }}>Tüm İstatistikleri Kopyala (Markdown)</button>
        </div>
      </div>

      {loading ? <p>Veriler yükleniyor...</p> : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px' }}>
          {media.map((item) => (
            <div key={item.id} style={{ background:'#1a1a1a', padding:'15px', borderRadius:'8px', border:'1px solid #333' }}>
              <p style={{ fontSize:'14px', color:'#aaa', height:'40px', overflow:'hidden' }}>{item.caption || 'Açıklama yok'}</p>
              <div style={{ marginTop:'15px', display:'flex', justifyContent:'space-between' }}>
                <span>❤️ {item.like_count || 0} Beğeni</span>
                <span>💬 {item.comments_count || 0} Yorum</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
