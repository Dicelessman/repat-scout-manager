
import React from 'react';
import { Progressione } from '../../types/scout';

interface Props {
  progressione: Progressione;
  onUpdate: (field: keyof Progressione, value: any) => void;
  readOnly: boolean;
}

export const GiglioTrifiglioSection: React.FC<Props> = ({ progressione, onUpdate, readOnly }) => {
  const handleGiglioTrifiglioChange = (field: 'completato' | 'data' | 'motivo', value: boolean | string) => {
    const newGiglioTrifoglio = { ...progressione.giglieTrifoglio, [field]: value };
    onUpdate('giglieTrifoglio', newGiglioTrifoglio);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-scout-green mb-4 flex items-center">
        <span className="mr-2">🌟</span>
        Giglio/Trifoglio
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="giglio-trifoglio-completato"
            checked={progressione.giglieTrifoglio.completato}
            onChange={(e) => handleGiglioTrifiglioChange('completato', e.target.checked)}
            disabled={readOnly}
            className="w-5 h-5 text-scout-green border-gray-300 rounded focus:ring-scout-green disabled:opacity-50"
          />
          <label htmlFor="giglio-trifoglio-completato" className="text-sm font-medium text-gray-700">
            Giglio/Trifoglio conseguito
          </label>
        </div>

        {progressione.giglieTrifoglio.completato && (
          <div className="animate-fade-in space-y-4">
            <div>
              <label htmlFor="giglio-trifoglio-data" className="block text-sm font-medium text-gray-700 mb-2">
                Data conseguimento
              </label>
              <input
                type="date"
                id="giglio-trifoglio-data"
                value={progressione.giglieTrifoglio.data}
                onChange={(e) => handleGiglioTrifiglioChange('data', e.target.value)}
                disabled={readOnly}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="giglio-trifoglio-motivo" className="block text-sm font-medium text-gray-700 mb-2">
                Motivazione/Descrizione
              </label>
              <textarea
                id="giglio-trifoglio-motivo"
                value={progressione.giglieTrifoglio.motivo}
                onChange={(e) => handleGiglioTrifiglioChange('motivo', e.target.value)}
                disabled={readOnly}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
                placeholder="Descrivi il motivo del conseguimento del Giglio/Trifoglio..."
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Giglio/Trifoglio:</strong> Riconoscimento speciale che viene assegnato per meriti particolari 
          o per aver dimostrato eccellenza nel vivere i valori scout.
        </p>
      </div>
    </div>
  );
};
