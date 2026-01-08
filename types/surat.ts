export interface AudioFull {
    "01": string;
    "02": string;
    "03": string;
    "04": string;
    "05": string;
    "06": string;
}

export interface Surat {
    nomor: number;
    nama: string;
    namaLatin: string;
    arti: string;
    jumlahAyat: number;
    tempatTurun: string;
    audioFull: AudioFull;
}
