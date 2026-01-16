export interface Student {
  id?: number;
  nom: string;
  prenom: string;
  cne: string;
  note1: number;
  note2: number;
  module: string;
}

export interface StudentAbsence {
  id?: number;
  nom: string;
  prenom: string;
  cne: string;
  niveau: string;
  heuresAbsence: number;
  heuresTotal: number;
}

export interface FinalGrade {
  noteFinale: number;
  moyenne: number;
  tauxAbsence: number;
  penalite: number;
}

export interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}
