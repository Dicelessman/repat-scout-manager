
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login effettuato con successo!",
        description: "Benvenuto in Scout Manager",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Errore di login",
        description: error instanceof Error ? error.message : "Credenziali non valide",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-scout-green to-scout-blue flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-scout-green mb-2">Accedi</h1>
          <p className="text-gray-600">Entra nel tuo account Scout Manager</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-semibold mb-2">Account Demo:</p>
          <p className="text-sm text-blue-700">Staff: staff@scout.it / password</p>
          <p className="text-sm text-blue-700">Esploratore: esploratore@scout.it / password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-scout-green text-white py-3 px-4 rounded-lg hover:bg-scout-green-light transition-colors font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Non hai un account?{' '}
            <Link to="/register" className="text-scout-blue hover:text-scout-blue-light font-semibold">
              Registrati qui
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

export default LoginPage;
