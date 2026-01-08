"use client";

import Link from "next/link";
import { Surat } from "@/types/surat";

export default function SuratCard({ surat }: { surat: Surat }) {
  return (
    <Link href={`/surat/${surat.nomor}`} className="group block h-full">
      <div className="relative h-full bg-white border border-slate-100 rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 overflow-hidden flex flex-col justify-between">
        
        {/* Pattern Islami Tipis saat Hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" 
          style={{ 
            backgroundImage: `url("https://www.transparenttextures.com/patterns/islamic-art.png")`,
            backgroundSize: '180px'
          }} 
        />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            {/* Nomor Surat lebih compact */}
            <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-50 rounded-lg rotate-[15deg] group-hover:rotate-[105deg] group-hover:bg-emerald-600 transition-all duration-500" />
              <span className="relative z-10 font-bold text-emerald-700 group-hover:text-white transition-colors text-xs">
                {surat.nomor}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors tracking-tight">
                {surat.namaLatin}
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                {surat.arti}
              </p>
            </div>
          </div>

          {/* Nama Arab ukuran sedang */}
          <div className="text-right">
            <div className="text-xl font-arabic text-slate-400 group-hover:text-emerald-600 transition-colors duration-300">
              {surat.nama}
            </div>
          </div>
        </div>

        {/* Info & Action di bagian bawah */}
        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-bold border border-slate-100 uppercase group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
              {surat.tempatTurun}
            </span>
            <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-bold border border-slate-100 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
              {surat.jumlahAyat} Ayat
            </span>
          </div>

          {/* Icon simple */}
          <div className="text-slate-300 group-hover:text-emerald-600 transition-all duration-300 group-hover:translate-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}