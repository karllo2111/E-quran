"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingBar from "@/components/loadingBar";

const LIST_QARI = [
  { id: "01", name: "Abdullah Al-Juhany" },
  { id: "02", name: "Abdul Muhsin Al-Qasim" },
  { id: "03", name: "Abdurrahman As-Sudais" },
  { id: "04", name: "Ibrahim Al-Dossari" },
  { id: "05", name: "Misyari Rasyid" },
  { id: "06", name: "Yasser Al-Dosari" },
];

export default function DetailSurat() {
  const { id } = useParams();
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const partialAudioRef = useRef<HTMLAudioElement>(null);

  const [surat, setSurat] = useState<any>(null);
  const [tafsir, setTafsir] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQari, setSelectedQari] = useState(LIST_QARI[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [openTafsir, setOpenTafsir] = useState<number | null>(null);

  // Player States
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // PASTIKAN URL INI SESUAI DENGAN NAMA FOLDER DI app/api/
        const resSurat = await fetch(`/api/surat/${id}`);
        const resTafsir = await fetch(`/api/tafsir/${id}`);

        // Cek apakah response berupa JSON (bukan HTML error)
        const contentTypeSurat = resSurat.headers.get("content-type");
        const contentTypeTafsir = resTafsir.headers.get("content-type");

        if (contentTypeSurat?.includes("application/json") && contentTypeTafsir?.includes("application/json")) {
          const dataSurat = await resSurat.json();
          const dataTafsir = await resTafsir.json();
          setSurat(dataSurat);
          setTafsir(dataTafsir);
        } else {
          console.error("Server tidak mengembalikan JSON. Cek folder api/surah dan api/tafsir");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleStartFullAudio = () => {
    setShowPlayer(true);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 150);
  };

  const handleClosePlayer = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setShowPlayer(false);
  };

  if (loading) return <LoadingBar />;
  if (!surat) return <div className="p-10 text-center">Data surat tidak ditemukan. Cek folder api/surah/[id]</div>;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <audio ref={partialAudioRef} />

      {/* HEADER */}
      <div className="bg-emerald-900 text-white relative z-50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <button onClick={() => router.back()} className="mb-4 flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Kembali
          </button>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-serif font-bold flex items-center gap-4">
                {surat.namaLatin} <span className="text-amber-400 font-arabic text-2xl">{surat.nama}</span>
              </h1>
              <p className="text-emerald-100/60 text-sm">{surat.arti} • {surat.jumlahAyat} Ayat</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-white/10 border border-white/20 p-3 rounded-xl flex items-center justify-between text-xs">
                  {selectedQari.name}
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 py-1 z-[100]">
                    {LIST_QARI.map((q) => (
                      <button key={q.id} onClick={() => { setSelectedQari(q); setIsDropdownOpen(false); handleClosePlayer(); }} className="w-full px-4 py-2 text-left text-xs text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">{q.name}</button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={handleStartFullAudio} className="bg-amber-500 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase">Putar Full</button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className={`max-w-5xl mx-auto px-6 py-10 ${showPlayer ? 'pb-32' : 'pb-10'}`}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="text-slate-600 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: surat.deskripsi }} />
        </div>

        <div className="space-y-4">
          {surat.ayat?.map((ayat: any) => (
            <div key={ayat.nomorAyat} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div className="flex justify-between items-start gap-6">
                  <div className="flex flex-row md:flex-col gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-xs border border-slate-100">{ayat.nomorAyat}</div>
                    <button onClick={() => { if(partialAudioRef.current) { partialAudioRef.current.src = ayat.audio[selectedQari.id]; partialAudioRef.current.play(); }}} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M8 5v14l11-7z"/></svg></button>
                    <button onClick={() => setOpenTafsir(openTafsir === ayat.nomorAyat ? null : ayat.nomorAyat)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${openTafsir === ayat.nomorAyat ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white'}`}><svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></button>
                  </div>
                  <p className="text-3xl md:text-4xl font-arabic text-right leading-[4rem] text-slate-800 grow dir-rtl">{ayat.teksArab}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-emerald-700 font-bold italic text-xs">{ayat.teksLatin}</p>
                  <p className="text-slate-600 text-base leading-relaxed">{ayat.teksIndonesia}</p>
                </div>
              </div>

              {openTafsir === ayat.nomorAyat && (
                <div className="bg-amber-50/40 border-t border-amber-100 p-6">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {tafsir?.tafsir?.find((t: any) => t.ayat === ayat.nomorAyat)?.teks || "Tafsir tidak tersedia."}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* STICKY PLAYER */}
      {showPlayer && (
        <div className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-white/5 z-[200] px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-[30%]">
              <div className="w-10 h-10 bg-emerald-500 rounded flex items-center justify-center shrink-0 shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-900"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              </div>
              <div className="hidden sm:block truncate text-white text-[13px] font-bold">
                {surat.namaLatin} <br/> <span className="text-[#b3b3b3] text-[10px] font-normal">{selectedQari.name}</span>
              </div>
            </div>

            <div className="flex flex-col items-center max-w-[40%] w-full gap-1.5">
              <div className="flex items-center gap-5">
                <button onClick={() => { isPlaying ? audioRef.current?.pause() : audioRef.current?.play(); setIsPlaying(!isPlaying); }} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all">
                  {isPlaying ? <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-4 h-4 fill-black ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                </button>
              </div>
              <div className="flex items-center gap-2 w-full text-[10px] text-[#b3b3b3]">
                <span>{formatTime(currentTime)}</span>
                <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = Number(e.target.value); }} className="w-full accent-emerald-500 h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer"/>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 w-[30%]">
              <button onClick={() => { if(audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); }}} className="text-[#b3b3b3] hover:text-white">
                {isMuted ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.03a7.95 7.95 0 003.72-1.94L19.73 21 21 19.73 4.27 3z"/></svg> : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>}
              </button>
              <button onClick={handleClosePlayer} className="text-[#b3b3b3] hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2"/></svg></button>
            </div>
          </div>
          <audio ref={audioRef} src={surat.audioFull[selectedQari.id]} onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)} onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)} onEnded={handleClosePlayer} />
        </div>
      )}
    </main>
  );
}