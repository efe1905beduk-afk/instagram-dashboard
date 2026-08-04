import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    const data = await res.json();
    if (data.success) {
      sessionStorage.setItem('authenticated', 'true');
      router.push('/');
    } else {
      setError(data.message);
    }
  };

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#111', color:'#fff', fontFamily:'sans-serif' }}>
      <form onSubmit={handleLogin} style={{ background:'#222', padding:'30px', borderRadius:'10px', width:'300px', display:'flex', flexDirection:'column', gap:'15px' }}>
        <h2>Giriş Yap</h2>
        {error && <p style={{ color:'red', fontSize:'14px' }}>{error}</p>}
        <input type="text" placeholder="Kullanıcı Adı" value={user} onChange={(e) => setUser(e.target.value)} style={{ padding:'10px', borderRadius:'5px', border:'1px solid #444', background:'#333', color:'#fff' }} />
        <input type="password" placeholder="Şifre" value={pass} onChange={(e) => setPass(e.target.value)} style={{ padding:'10px', borderRadius:'5px', border:'1px solid #444', background:'#333', color:'#fff' }} />
        <button type="submit" style={{ padding:'10px', background:'#0070f3', color:'#fff', border:'none', borderRadius:'5px', cursor:'pointer' }}>Giriş</button>
      </form>
    </div>
  );
}
