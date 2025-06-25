
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProgressioneSection } from '../components/ProgressioneSection';
import { Utente, Progressione } from '../types/scout';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState<Utente | null>(null);
  const [activeTab, setActiveTab] = useState<'progressione' | 'contatti' | 'sanitarie' | 'documenti'>('progressione');
  const [loading, setLoading] = useState(false);

  // Determina se l'utente può modificare questo profilo
  const canEdit = currentUser && (
    currentUser.id === (userId || currentUser.id) ||
    (currentUser.ruolo === 'staff' && currentUser.approvato)
  );

  // Determina se è in modalità sola lettura
  const isReadOnly = !canEdit || (currentUser?.ruolo === 'esploratore' && userId !== currentUser.id);

  useEffect(() => {
    // In una versione reale, qui faresti una chiamata API per ottenere i dati dell'utente
    // Per ora, usiamo l'utente corrente come mock
    const targetUserId = userId || currentUser?.id;
    
    if (targetUserId === currentUser?.id) {
      setProfileUser(currentUser);
    } else {
      // Mock per altri utenti (in produzione sarebbe una chiamata API)
      const mockUser: Utente = {
        id: targetUserId || '1',
        nome: 'Marco',
        cognome: 'Bianchi',
        email: 'marco.bianchi@email.com',
        ruolo: 'esploratore',
        approvato: true,
        dataRegistrazione: '2024-01-15',
        datiScheda: {
          contatti: {
            genitore1: { nome: 'Giuseppe Bianchi', email: 'giuseppe.bianchi@email.com', telefono: '333-1234567' },
            genitore2: { nome: 'Maria Rossi', email: 'maria.rossi@email.com', telefono: '333-7654321' },
            esploratore: { email: 'marco.bianchi@email.com', telefono: '333-9876543' }
          },
          sanitarie: {
            gruppoSanguigno: 'A+',
            intolleranze: 'Lattosio',
            certificazioni: 'Idoneità fisica',
            vaccinazioni: 'Tutte obbligatorie',
            allergie: 'Pollini',
            farmaci: 'Nessuno',
            note: 'Nessuna nota particolare'
          },
          progressione: {
            promessa: { completata: true, data: '2024-02-01' },
            vcpCp: { tipo: 'VCP', data: '2024-03-15' },
            tracce: {
              '1': {
                sfide: {
                  'Esplorazione-0': { completata: true, data: '2024-02-10' },
                  'Esplorazione-1': { completata: true, data: '2024-02-20' },
                  'Campismo-0': { completata: false, data: '' }
                },
                note: 'Ottimi progressi nell\'esplorazione'
              }
            },
            giglieTrifoglio: { completato: false, data: '', motivo: '' },
            noteGenerali: 'Esploratore molto motivato e attivo nel gruppo'
          },
          specialita: ['Cuoco', 'Orientamento'],
          eventi: {
            campiEstivi: ['Campo Estivo 2024'],
            tecnicamp: [],
            jamboree: [],
            altro: ['Uscita Naturalistica Marzo 2024']
          },
          presenze: {
            sondaggi: [],
            presenzeAssenze: [],
            quoteEvento: []
          },
          documenti: {
            quotaAnnuale: true,
            moduloIscrizione: true,
            moduloSanitario: true,
            moduloPrivacy: true,
            note: 'Tutti i documenti sono completi'
          }
        }
      };
      setProfileUser(mockUser);
    }
  }, [userId, currentUser]);

  const handleProgressioneUpdate = (field: keyof Progressione, value: any) => {
    if (!profileUser || isReadOnly) return;
    
    setLoading(true);
    
    const updatedUser = {
      ...profileUser,
      datiScheda: {
        ...profileUser.datiScheda,
        progressione: {
          ...profileUser.datiScheda.progressione,
          [field]: value
        }
      }
    };
    
    setProfileUser(updatedUser);
    
    // Simula salvataggio
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Modifiche salvate",
        description: "La progressione è stata aggiornata con successo",
      });
    }, 500);
  };

  if (!profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scout-green"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'progressione', label: 'Progressione', icon: '🚀' },
    { id: 'contatti', label: 'Contatti', icon: '👥' },
    { id: 'sanitarie', label: 'Info Sanitarie', icon: '🏥' },
    { id: 'documenti', label: 'Documenti', icon: '📄' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-scout-green">
                Profilo - {profileUser.nome} {profileUser.cognome}
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  profileUser.ruolo === 'staff' 
                    ? 'bg-scout-blue/10 text-scout-blue' 
                    : 'bg-scout-green/10 text-scout-green'
                }`}>
                  {profileUser.ruolo === 'staff' ? 'Staff' : 'Esploratore'}
                </span>
                {isReadOnly && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                    Sola Lettura
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {currentUser?.ruolo === 'staff' && currentUser.approvato && (
                <Link 
                  to="/dashboard" 
                  className="bg-scout-blue text-white px-4 py-2 rounded-lg hover:bg-scout-blue-light transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link 
                to="/" 
                className="bg-scout-orange text-white px-4 py-2 rounded-lg hover:bg-scout-orange-light transition-colors"
              >
                Home
              </Link>
              <button 
                onClick={logout}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Loading indicator */}
        {loading && (
          <div className="fixed top-4 right-4 bg-scout-green text-white px-4 py-2 rounded-lg shadow-lg z-50">
            Salvataggio in corso...
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-scout-green text-scout-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'progressione' && (
            <ProgressioneSection
              progressione={profileUser.datiScheda.progressione}
              onUpdate={handleProgressioneUpdate}
              readOnly={isReadOnly}
            />
          )}

          {activeTab === 'contatti' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-scout-green mb-4">Informazioni di Contatto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Genitore 1</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nome:</span> {profileUser.datiScheda.contatti.genitore1.nome}</p>
                    <p><span className="font-medium">Email:</span> {profileUser.datiScheda.contatti.genitore1.email}</p>
                    <p><span className="font-medium">Telefono:</span> {profileUser.datiScheda.contatti.genitore1.telefono}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Genitore 2</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nome:</span> {profileUser.datiScheda.contatti.genitore2.nome}</p>
                    <p><span className="font-medium">Email:</span> {profileUser.datiScheda.contatti.genitore2.email}</p>
                    <p><span className="font-medium">Telefono:</span> {profileUser.datiScheda.contatti.genitore2.telefono}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-3">Esploratore</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> {profileUser.datiScheda.contatti.esploratore.email}</p>
                  <p><span className="font-medium">Telefono:</span> {profileUser.datiScheda.contatti.esploratore.telefono}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sanitarie' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-scout-green mb-4">Informazioni Sanitarie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Gruppo Sanguigno:</span>
                    <p className="text-gray-600">{profileUser.datiScheda.sanitarie.gruppoSanguigno}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Allergie:</span>
                    <p className="text-gray-600">{profileUser.datiScheda.sanitarie.allergie}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Intolleranze:</span>
                    <p className="text-gray-600">{profileUser.datiScheda.sanitarie.intolleranze}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Farmaci:</span>
                    <p className="text-gray-600">{profileUser.datiScheda.sanitarie.farmaci}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Vaccinazioni:</span>
                    <p className="text-gray-600">{profileUser.datiScheda.sanitarie.vaccinazioni}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Certificazioni:</span>
                    <p className="text-gray-600">{profileUser.datiScheda.sanitarie.certificazioni}</p>
                  </div>
                </div>
              </div>
              {profileUser.datiScheda.sanitarie.note && (
                <div className="mt-6">
                  <span className="font-medium text-gray-700">Note:</span>
                  <p className="text-gray-600 mt-1">{profileUser.datiScheda.sanitarie.note}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documenti' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-scout-green mb-4">Stato Documenti</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries({
                  'Quota Annuale': profileUser.datiScheda.documenti.quotaAnnuale,
                  'Modulo Iscrizione': profileUser.datiScheda.documenti.moduloIscrizione,
                  'Modulo Sanitario': profileUser.datiScheda.documenti.moduloSanitario,
                  'Modulo Privacy': profileUser.datiScheda.documenti.moduloPrivacy,
                }).map(([documento, completato]) => (
                  <div key={documento} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="font-medium text-gray-700">{documento}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      completato
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {completato ? 'Completato' : 'Mancante'}
                    </span>
                  </div>
                ))}
              </div>
              {profileUser.datiScheda.documenti.note && (
                <div className="mt-6">
                  <span className="font-medium text-gray-700">Note:</span>
                  <p className="text-gray-600 mt-1">{profileUser.datiScheda.documenti.note}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
