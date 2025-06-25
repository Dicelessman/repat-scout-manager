
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    confirmPassword: '',
    ruolo: 'esploratore' as 'staff' | 'esploratore'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Errore",
        description: "Le password non coincidono",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.email, formData.password, formData.nome, formData.cognome, formData.ruolo);
      toast({
        title: "Registrazione completata!",
        description: formData.ruolo === 'staff' 
          ? "Il tuo account è in attesa di approvazione" 
          : "Benvenuto in Scout Manager",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Errore di registrazione",
        description: error instanceof Error ? error.message : "Si è verificato un errore",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-scout-blue to-scout-orange flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-scout-green mb-2">Registrati</h1>
          <p className="text-gray-600">Crea il tuo account Scout Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-1">
                Cognome
              </label>
              <input
                type="text"
                id="cognome"
                name="cognome"
                value={formData.cognome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="ruolo" className="block text-sm font-medium text-gray-700 mb-1">
              Ruolo
            </label>
            <select
              id="ruolo"
              name="ruolo"
              value={formData.ruolo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
            >
              <option value="esploratore">Esploratore</option>
              <option value="staff">Staff</option>
            </select>
            {formData.ruolo === 'staff' && (
              <p className="text-sm text-orange-600 mt-1">
                Gli account staff richiedono approvazione dell'amministratore
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Conferma Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-scout-green text-white py-3 px-4 rounded-lg hover:bg-scout-green-light transition-colors font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Registrazione in corso...' : 'Registrati'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Hai già un account?{' '}
            <Link to="/login" className="text-scout-blue hover:text-scout-blue-light font-semibold">
              Accedi qui
            </Link>
          </p>
          <Link to="/" className="text-scout-orange hover:text-scout-orange-light font-semibold">
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
