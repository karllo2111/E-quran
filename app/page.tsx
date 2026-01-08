"use client";

import { useEffect, useState } from "react";
import SuratCard from "@/components/card";
import LoadingBar from "@/components/loadingBar";
import { Surat } from "@/types/surat";

export default function Home() {
  const [surahs, setSurahs] = useState<Surat[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadSurahs = async () => {
    try {
      const response = await fetch("/api/surah");
      const data = await response.json();

      if (Array.isArray(data)) {
        setSurahs(data);
      } else if (data && Array.isArray(data.data)) {
        setSurahs(data.data);
      }
    } catch (error) {
      console.error("Gagal load surat", error);
      setSurahs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSurahs();
  }, []);

  // Fitur pencarian surat
  const filteredSurahs = surahs.filter((s) =>
    s.namaLatin.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingBar />;

  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-20">
      {/* MODERN HERO SECTION */}
      <div className="bg-emerald-900 text-white pt-16 pb-24 px-6 relative overflow-hidden">
        {/* Dekorasi Ornamen Transparan */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100"><circle cx="100" cy="0" r="80" fill="white" /></svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            E-Qur&apos;an aplikasi alquran digital
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Temukan Ketenangan dalam <span className="text-amber-400">Bacaan</span>
          </h1>
          <p className="text-emerald-100/70 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Akses seluruh surat Al-Qur&apos;an lengkap dengan terjemahan, tafsir Kemenag, dan murottal dari Qari terbaik.
          </p>

          {/* SEARCH BAR BOX */}
          <div className="max-w-lg mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-emerald-400 group-focus-within:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari surat (contoh: Al-Kahfi)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-slate-900 pl-14 pr-6 py-5 rounded-2xl shadow-2xl focus:ring-4 focus:ring-amber-400/20 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      </div>

      {/* LIST SURAT SECTION */}
      <section className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Daftar Surat</h2>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold">
              {filteredSurahs.length} SURAT
            </span>
          </div>
          
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              Reset Pencarian
            </button>
          )}
        </div>

        {filteredSurahs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSurahs.map((surat) => (
              <div key={surat.nomor} className="hover:-translate-y-1 transition-transform duration-300">
                <SuratCard surat={surat} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" /></svg>
            </div>
            <h3 className="text-slate-800 font-bold">Surat tidak ditemukan</h3>
            <p className="text-slate-500 text-sm">Coba cari dengan kata kunci lain.</p>
          </div>
        )}
      </section>
    </main>
  );
}