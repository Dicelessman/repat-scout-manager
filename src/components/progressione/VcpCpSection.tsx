
import React from 'react';
import { Progressione } from '../../types/scout';

interface Props {
  progressione: Progressione;
  onUpdate: (field: keyof Progressione, value: any) => void;
  readOnly: boolean;
}

export const VcpCpSection: React.FC<Props> = ({ progressione, onUpdate, readOnly }) => {
  const handleVcpCpChange = (field: 'tipo' | 'data', value: string) => {
    const newVcpCp = { ...progressione.vcpCp, [field]: value };
    onUpdate('vcpCp', newVcpCp);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-scout-blue mb-4 flex items-center">
        <span className="mr-2">🏆</span>
        Vigilia delle Competenze Personali / Competenza Personale
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="vcp-cp-tipo" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <select
            id="vcp-cp-tipo"
            value={progressione.vcpCp.tipo}
            onChange={(e) => handleVcpCpChange('tipo', e.target.value)}
            disabled={readOnly}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-blue focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
          >
            <option value="">Seleziona tipo</option>
            <option value="VCP">VCP - Vigilia delle Competenze Personali</option>
            <option value="CP">CP - Competenza Personale</option>
          </select>
        </div>

        {progressione.vcpCp.tipo && (
          <div className="animate-fade-in">
            <label htmlFor="vcp-cp-data" className="block text-sm font-medium text-gray-700 mb-2">
              Data completamento
            </label>
            <input
              type="date"
              id="vcp-cp-data"
              value={progressione.vcpCp.data}
              onChange={(e) => handleVcpCpChange('data', e.target.value)}
              disabled={readOnly}
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-blue focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
            />
          </div>
        )}
      </div>

      {progressione.vcpCp.tipo === 'VCP' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>VCP:</strong> La Vigilia delle Competenze Personali è il momento in cui l'esploratore dimostra di aver acquisito le competenze di base.
          </p>
        </div>
      )}

      {progressione.vcpCp.tipo === 'CP' && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>CP:</strong> La Competenza Personale rappresenta il completamento del percorso di crescita dell'esploratore.
          </p>
        </div>
      )}
    </div>
  );
};
