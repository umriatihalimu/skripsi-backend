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
export type tb_kuisionerBaru = {
  id_indikator: number;
  level: number;
  id_kuisioner: number;
  kuisioner: string;
  time_stamp: Date;
  jawaban: string;

};

export type jawab_pertanyaan = {
  id_indikator: number;
  level: number;
  jawaban: string;
  soal: string;
  id_domain: number;
  id_aspek: number;
  id_penguji: number;
  id_kuisioner: number;
  nama_file?: string;
};
export type sc = {

  data: tb_kuisionerBaru[];
  id_penguji: string;
  id_domain: string;
  id_aspek: string;

}