import { Surat } from "@/types/surat";

const QARI = {
    "01": "Abdullah Al-Juhany",
    "02": "Abdul Muhsin Al-Qasim",
    "03": "Abdurrahman As-Sudais",
    "04": "Ibrahim Al-Dossari",
    "05": "Misyari Rasyid",
    "06": "Yasser Al-Dosari",
};

export default function SuratCard({ surat }: { surat: Surat }) {
    return (
        <div className="rounded-xl border p-4 shadow">
            <h2 className="font-semibold">{surat.namaLatin}</h2>
            <p className="text-sm text-gray-600">{surat.arti}</p>

            <p className="text-xs text-gray-500 mt-1">
                {surat.tempatTurun} • {surat.jumlahAyat} Ayat
            </p>

            <div className="mt-4 space-y-3">
                {Object.entries(surat.audioFull).map(([key, url]) => (
                    <div key={key}>
                        <p className="text-xs font-medium mb-1">{QARI[key as keyof typeof QARI]}</p>
                        <audio controls className="w-full" src={url} />
                    </div>
                ))}
            </div>
        </div>
    );
}
