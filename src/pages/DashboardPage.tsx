
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock data per la demo
const mockUsers = [
  {
    id: '1',
    nome: 'Marco',
    cognome: 'Bianchi',
    email: 'marco.bianchi@email.com',
    ruolo: 'esploratore' as const,
    approvato: true,
    dataRegistrazione: '2024-01-15'
  },
  {
    id: '2',
    nome: 'Sofia',
    cognome: 'Rossi',
    email: 'sofia.rossi@email.com',
    ruolo: 'esploratore' as const,
    approvato: true,
    dataRegistrazione: '2024-02-10'
  },
  {
    id: '3',
    nome: 'Luca',
    cognome: 'Verde',
    email: 'luca.verde@email.com',
    ruolo: 'staff' as const,
    approvato: false,
    dataRegistrazione: '2024-03-05'
  },
  {
    id: '4',
    nome: 'Anna',
    cognome: 'Neri',
    email: 'anna.neri@email.com',
    ruolo: 'esploratore' as const,
    approvato: true,
    dataRegistrazione: '2024-02-28'
  }
];

const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const [filter, setFilter] = useState<'tutti' | 'esploratori' | 'staff'>('tutti');

  const filteredUsers = mockUsers.filter(user => {
    if (filter === 'tutti') return true;
    return user.ruolo === filter.slice(0, -1);
  });

  const stats = {
    totalExplorers: mockUsers.filter(u => u.ruolo === 'esploratore').length,
    totalStaff: mockUsers.filter(u => u.ruolo === 'staff').length,
    pendingApprovals: mockUsers.filter(u => u.ruolo === 'staff' && !u.approvato).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-scout-green">Dashboard Staff</h1>
              <p className="text-gray-600">Benvenuto, {currentUser?.nome} {currentUser?.cognome}</p>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/profile" 
                className="bg-scout-blue text-white px-4 py-2 rounded-lg hover:bg-scout-blue-light transition-colors"
              >
                Il Mio Profilo
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-scout-green/10 rounded-lg flex items-center justify-center">
                <span className="text-scout-green text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Esploratori</p>
                <p className="text-2xl font-bold text-scout-green">{stats.totalExplorers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-scout-blue/10 rounded-lg flex items-center justify-center">
                <span className="text-scout-blue text-xl">🏕️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Staff</p>
                <p className="text-2xl font-bold text-scout-blue">{stats.totalStaff}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-scout-orange/10 rounded-lg flex items-center justify-center">
                <span className="text-scout-orange text-xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Attesa</p>
                <p className="text-2xl font-bold text-scout-orange">{stats.pendingApprovals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestione Utenti</h2>
            <div className="flex gap-2">
              {['tutti', 'esploratori', 'staff'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-scout-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Users List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruolo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registrazione
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.nome} {user.cognome}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.ruolo === 'staff' 
                          ? 'bg-scout-blue/10 text-scout-blue' 
                          : 'bg-scout-green/10 text-scout-green'
                      }`}>
                        {user.ruolo === 'staff' ? 'Staff' : 'Esploratore'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.approvato
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {user.approvato ? 'Approvato' : 'In Attesa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.dataRegistrazione).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/profile/${user.id}`}
                        className="text-scout-blue hover:text-scout-blue-light transition-colors"
                      >
                        Visualizza
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
