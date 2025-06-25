
export interface Contatti {
  genitore1: {
    nome: string;
    email: string;
    telefono: string;
  };
  genitore2: {
    nome: string;
    email: string;
    telefono: string;
  };
  esploratore: {
    email: string;
    telefono: string;
  };
}

export interface Sanitarie {
  gruppoSanguigno: string;
  intolleranze: string;
  certificazioni: string;
  vaccinazioni: string;
  allergie: string;
  farmaci: string;
  note: string;
}

export interface Sfida {
  completata: boolean;
  data: string;
}

export interface Traccia {
  sfide: Record<string, Sfida>;
  note: string;
}

export interface Progressione {
  promessa: {
    completata: boolean;
    data: string;
  };
  vcpCp: {
    tipo: 'VCP' | 'CP' | '';
    data: string;
  };
  tracce: Record<string, Traccia>;
  giglieTrifoglio: {
    completato: boolean;
    data: string;
    motivo: string;
  };
  noteGenerali: string;
}

export interface Documenti {
  quotaAnnuale: boolean;
  moduloIscrizione: boolean;
  moduloSanitario: boolean;
  moduloPrivacy: boolean;
  note: string;
}

export interface DatiScheda {
  contatti: Contatti;
  sanitarie: Sanitarie;
  progressione: Progressione;
  specialita: string[];
  eventi: {
    campiEstivi: string[];
    tecnicamp: string[];
    jamboree: string[];
    altro: string[];
  };
  presenze: {
    sondaggi: string[];
    presenzeAssenze: string[];
    quoteEvento: string[];
  };
  documenti: Documenti;
}

export interface Utente {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'staff' | 'esploratore';
  approvato: boolean;
  dataRegistrazione: string;
  datiScheda: DatiScheda;
}

export interface TracciaDefinizione {
  numero: number;
  nome: string;
  direzioni: Record<string, string[]>;
}
