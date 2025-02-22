export interface Kuesioner {
  judul: string;
  deskripsi: string;
  indikator: Indikator[];
  tingkat_kematangan: Record<string, string>;
}

interface Indikator {
  id: string;
  nama: string;
  pertanyaan: Pertanyaan[];
}

export interface Pertanyaan {
  id: string;
  teks: string;
  opsi_jawaban: string[];
  jawaban: any;
}

export interface TipeChart {
  id: string;
  name: string;
  value: any;
}
