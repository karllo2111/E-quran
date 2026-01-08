import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://equran.id/api/v2/surat");
    const result = await res.json();

    // Lakukan mapping untuk membuang field deskripsi dan audioFull
    const filteredData = result.data.map((surat: any) => ({
      nomor: surat.nomor,
      nama: surat.nama,
      namaLatin: surat.namaLatin,
      jumlahAyat: surat.jumlahAyat,
      tempatTurun: surat.tempatTurun,
      arti: surat.arti,
      // Field 'deskripsi' dan 'audioFull' tidak dimasukkan di sini
    }));

    return NextResponse.json(filteredData);
  } catch (error) {
    return NextResponse.json({ error: "Gagal fetch data" }, { status: 500 });
  }
}