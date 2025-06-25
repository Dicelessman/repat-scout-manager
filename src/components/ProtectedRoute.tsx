
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireStaff?: boolean;
  requireApproved?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireStaff = false, 
  requireApproved = false 
}) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scout-green"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireStaff && currentUser.ruolo !== 'staff') {
    return <Navigate to="/profile" replace />;
  }

  if (requireApproved && currentUser.ruolo === 'staff' && !currentUser.approvato) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-scout-green to-scout-blue">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-4">
          <h2 className="text-2xl font-bold text-scout-green mb-4">Account in Attesa</h2>
          <p className="text-gray-600 mb-4">
            Il tuo account staff è in attesa di approvazione da parte dell'amministratore.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-scout-green text-white py-2 px-4 rounded hover:bg-scout-green-light transition-colors"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
