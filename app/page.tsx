"use client";

import { useEffect, useState } from "react";
import SuratCard from "@/components/card";
import { Surat } from "@/types/surat";

export default function Home() {
  const [surahs, setSurahs] = useState<Surat[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSurahs = async () => {
    try {
      const response = await fetch("/api/surah");
      const data = await response.json();
      setSurahs(data);
    } catch (error) {
      console.error("Gagal load surat", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSurahs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading surat...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Daftar Surat Al-Quran</h1>
        <p className="text-sm text-gray-600">
          Lengkap dengan 6 pilihan audio qari
        </p>
      </header>

      {/* GRID CARD */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {surahs.map((surat) => (
          <SuratCard key={surat.nomor} surat={surat} />
        ))}
      </section>
    </main>
  );
}
