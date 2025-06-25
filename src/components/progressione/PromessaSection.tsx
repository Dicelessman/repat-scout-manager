
import React from 'react';
import { Progressione } from '../../types/scout';

interface Props {
  progressione: Progressione;
  onUpdate: (field: keyof Progressione, value: any) => void;
  readOnly: boolean;
}

export const PromessaSection: React.FC<Props> = ({ progressione, onUpdate, readOnly }) => {
  const handlePromessaChange = (field: 'completata' | 'data', value: boolean | string) => {
    const newPromessa = { ...progressione.promessa, [field]: value };
    onUpdate('promessa', newPromessa);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-scout-green mb-4 flex items-center">
        <span className="mr-2">🤝</span>
        Promessa Scout
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="promessa-completata"
            checked={progressione.promessa.completata}
            onChange={(e) => handlePromessaChange('completata', e.target.checked)}
            disabled={readOnly}
            className="w-5 h-5 text-scout-green border-gray-300 rounded focus:ring-scout-green disabled:opacity-50"
          />
          <label htmlFor="promessa-completata" className="text-sm font-medium text-gray-700">
            Promessa Scout completata
          </label>
        </div>

        {progressione.promessa.completata && (
          <div className="animate-fade-in">
            <label htmlFor="promessa-data" className="block text-sm font-medium text-gray-700 mb-2">
              Data completamento
            </label>
            <input
              type="date"
              id="promessa-data"
              value={progressione.promessa.data}
              onChange={(e) => handlePromessaChange('data', e.target.value)}
              disabled={readOnly}
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
            />
          </div>
        )}
      </div>
    </div>
  );
};
