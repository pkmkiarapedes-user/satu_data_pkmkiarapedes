"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';

export default function EarsipPage() {
  const [database, setDatabase] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    no: '', nama: '', klaster: '', sub: '', jenis: '', tgl: '', mode: 'arsip'
  });

  // Efek Sinkronisasi Awal (Pengganti window.onload)
  useEffect(() => {
    const session = localStorage.getItem('pkm_session');
    if (session === 'AUTHORIZED') setIsLogin(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('arsip_dokumen').select('*').order('created_at', { ascending: false });
    if (!error) setDatabase(data);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({ title: 'Menyimpan...', didOpen: () => Swal.showLoading() });
    
    // Logika simpan ke Supabase (Pengganti doPost GAS)
    const { error } = await supabase.from('arsip_dokumen').insert([form]);
    
    if (!error) {
      Swal.fire('Berhasil!', 'Data telah diarsipkan', 'success');
      fetchData(); // Refresh tabel
    }
  };

  if (!isLogin) {
    return <LoginScreen onLogin={() => setIsLogin(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      {/* Header (Adopsi Gaya Tailwind dari HTML) */}
      <header className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">E-ARSIP PKM KIARAPEDES</h1>
          <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">Digital Archive System V2.0</p>
        </div>
        <button onClick={fetchData} className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all">
          <i className={`fas fa-sync ${loading ? 'animate-spin' : ''}`}></i>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Form Input */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <i className="fas fa-file-signature text-emerald-500"></i> FORMULIR ARSIP
            </h2>
            <div className="space-y-4">
              <input name="nama" placeholder="Perihal Dokumen" onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl" required />
              <select name="jenis" onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl">
                <option value="">Pilih Jenis Surat</option>
                <option value="SK">Surat Keputusan (SK)</option>
                <option value="SOP">SOP</option>
              </select>
              <input type="date" name="tgl" onChange={handleInputChange} className="w-full p-3 bg-slate-50 border rounded-xl" />
              <button type="submit" className="w-full bg-emerald-600 text-white font-bold p-4 rounded-xl shadow-md hover:bg-emerald-700">
                SIMPAN & ARSIPKAN
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Tabel Data */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
            <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
               <span className="font-bold text-slate-700 text-sm">DATABASE ARSIP</span>
               <input type="text" placeholder="Cari Dokumen..." className="text-xs p-2 border rounded-lg w-48" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
                  <tr>
                    <th className="p-4">No. Surat</th>
                    <th className="p-4">Perihal</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {database.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-all">
                      <td className="p-4 font-mono font-bold text-emerald-600">{item.no}</td>
                      <td className="p-4 font-semibold text-slate-700">{item.nama}</td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase">
                          Aktif
                        </span>
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                         <button className="p-2 text-blue-500 bg-blue-50 rounded-lg"><i className="fas fa-edit"></i></button>
                         <button className="p-2 text-red-500 bg-red-50 rounded-lg"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Login Sederhana
function LoginScreen({ onLogin }) {
  const [pin, setPin] = useState("");
  const handleLogin = () => {
    if (pin === "2026") {
       localStorage.setItem('pkm_session', 'AUTHORIZED');
       onLogin();
    } else {
       Swal.fire('Error', 'PIN Salah!', 'error');
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-emerald-600 p-6">
       <div className="bg-white p-8 rounded-[40px] shadow-2xl w-full max-w-md text-center">
          <h1 className="text-xl font-black text-emerald-600 mb-6 uppercase">E-ARSIP LOGIN</h1>
          <input type="password" onChange={(e) => setPin(e.target.value)} placeholder="Masukkan PIN" className="w-full p-4 bg-slate-100 rounded-2xl mb-4 text-center text-2xl tracking-[10px]" />
          <button onClick={handleLogin} className="w-full bg-emerald-600 text-white font-bold p-4 rounded-2xl">MASUK SISTEM</button>
       </div>
    </div>
  );
}
