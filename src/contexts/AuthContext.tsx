
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Utente } from '../types/scout';

interface AuthContextType {
  currentUser: Utente | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nome: string, cognome: string, ruolo: 'staff' | 'esploratore') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const createEmptyUserData = (id: string, nome: string, cognome: string, email: string, ruolo: 'staff' | 'esploratore') => ({
  id,
  nome,
  cognome,
  email,
  ruolo,
  approvato: ruolo === 'esploratore' ? true : false,
  dataRegistrazione: new Date().toISOString(),
  datiScheda: {
    contatti: {
      genitore1: { nome: '', email: '', telefono: '' },
      genitore2: { nome: '', email: '', telefono: '' },
      esploratore: { email: email, telefono: '' }
    },
    sanitarie: {
      gruppoSanguigno: '',
      intolleranze: '',
      certificazioni: '',
      vaccinazioni: '',
      allergie: '',
      farmaci: '',
      note: ''
    },
    progressione: {
      promessa: { completata: false, data: '' },
      vcpCp: { tipo: '' as const, data: '' },
      tracce: {},
      giglieTrifoglio: { completato: false, data: '', motivo: '' },
      noteGenerali: ''
    },
    specialita: [],
    eventi: {
      campiEstivi: [],
      tecnicamp: [],
      jamboree: [],
      altro: []
    },
    presenze: {
      sondaggi: [],
      presenzeAssenze: [],
      quoteEvento: []
    },
    documenti: {
      quotaAnnuale: false,
      moduloIscrizione: false,
      moduloSanitario: false,
      moduloPrivacy: false,
      note: ''
    }
  }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Utente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula il controllo dell'autenticazione
    const userData = localStorage.getItem('scoutUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulazione login - in produzione sarà sostituito con Firebase/Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Utenti demo
    if (email === 'staff@scout.it' && password === 'password') {
      const user = createEmptyUserData('staff1', 'Marco', 'Rossi', email, 'staff');
      user.approvato = true;
      setCurrentUser(user);
      localStorage.setItem('scoutUser', JSON.stringify(user));
    } else if (email === 'esploratore@scout.it' && password === 'password') {
      const user = createEmptyUserData('esp1', 'Luca', 'Verdi', email, 'esploratore');
      setCurrentUser(user);
      localStorage.setItem('scoutUser', JSON.stringify(user));
    } else {
      throw new Error('Credenziali non valide');
    }
    setLoading(false);
  };

  const register = async (email: string, password: string, nome: string, cognome: string, ruolo: 'staff' | 'esploratore') => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userId = Date.now().toString();
    const user = createEmptyUserData(userId, nome, cognome, email, ruolo);
    
    setCurrentUser(user);
    localStorage.setItem('scoutUser', JSON.stringify(user));
    setLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('scoutUser');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
