
import React from 'react';
import { Progressione } from '../types/scout';
import { PromessaSection } from './progressione/PromessaSection';
import { VcpCpSection } from './progressione/VcpCpSection';
import { TrackSection } from './progressione/TrackSection';
import { GiglioTrifiglioSection } from './progressione/GiglioTrifiglioSection';

interface Props {
  progressione: Progressione;
  onUpdate: (field: keyof Progressione, value: any) => void;
  readOnly: boolean;
}

export const ProgressioneSection: React.FC<Props> = ({ progressione, onUpdate, readOnly }) => {
  const handleNoteGeneraliChange = (value: string) => {
    onUpdate('noteGenerali', value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-scout-green mb-2">Progressione Personale</h2>
        <p className="text-gray-600">
          {readOnly ? 'Visualizza il tuo percorso scout' : 'Gestisci il percorso di crescita scout'}
        </p>
      </div>

      <PromessaSection 
        progressione={progressione} 
        onUpdate={onUpdate} 
        readOnly={readOnly} 
      />

      <VcpCpSection 
        progressione={progressione} 
        onUpdate={onUpdate} 
        readOnly={readOnly} 
      />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-scout-orange mb-4 flex items-center">
          <span className="mr-2">🛤️</span>
          Tracce di Progressione
        </h3>
        <TrackSection 
          progressione={progressione} 
          onUpdate={onUpdate} 
          readOnly={readOnly} 
        />
      </div>

      <GiglioTrifiglioSection 
        progressione={progressione} 
        onUpdate={onUpdate} 
        readOnly={readOnly} 
      />

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">📝</span>
          Note Generali
        </h3>
        <textarea
          value={progressione.noteGenerali}
          onChange={(e) => handleNoteGeneraliChange(e.target.value)}
          disabled={readOnly}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
          placeholder="Aggiungi note generali sulla progressione scout..."
        />
      </div>
    </div>
  );
};
