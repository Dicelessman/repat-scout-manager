
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-scout-green via-scout-blue to-scout-orange">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Scout Manager
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Gestione digitale per il tuo Reparto Scout
          </p>
          
          {currentUser ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <p className="text-white mb-4">
                Benvenuto, <span className="font-semibold">{currentUser.nome} {currentUser.cognome}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentUser.ruolo === 'staff' && currentUser.approvato && (
                  <Link 
                    to="/dashboard" 
                    className="bg-scout-orange text-white px-6 py-3 rounded-lg hover:bg-scout-orange-light transition-colors font-semibold"
                  >
                    Dashboard
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className="bg-scout-blue text-white px-6 py-3 rounded-lg hover:bg-scout-blue-light transition-colors font-semibold"
                >
                  Il Mio Profilo
                </Link>
                <button 
                  onClick={logout}
                  className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-white text-scout-green px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                Accedi
              </Link>
              <Link 
                to="/register" 
                className="bg-scout-orange text-white px-8 py-4 rounded-lg hover:bg-scout-orange-light transition-colors font-semibold text-lg"
              >
                Registrati
              </Link>
            </div>
          )}
        </header>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-scout-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏕️</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Gestione Completa</h3>
            <p className="text-white/80">
              Tieni traccia di progressione, presenze e documenti di ogni esploratore
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-scout-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Mobile Friendly</h3>
            <p className="text-white/80">
              Ottimizzata per smartphone, porta la gestione sempre con te
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-scout-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Multi Ruolo</h3>
            <p className="text-white/80">
              Staff e esploratori con permessi differenziati per sicurezza
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
