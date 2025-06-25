
import React from 'react';
import { Progressione, TracciaDefinizione } from '../../types/scout';
import { tracceScout } from '../../data/tracceScout';

interface Props {
  progressione: Progressione;
  onUpdate: (field: keyof Progressione, value: any) => void;
  readOnly: boolean;
}

export const TrackSection: React.FC<Props> = ({ progressione, onUpdate, readOnly }) => {
  const handleSfidaChange = (tracciaNum: number, direzione: string, sfidaIndex: number, completata: boolean, data?: string) => {
    const tracciaKey = tracciaNum.toString();
    const sfidaId = `${direzione}-${sfidaIndex}`;
    
    const currentTracce = { ...progressione.tracce };
    
    if (!currentTracce[tracciaKey]) {
      currentTracce[tracciaKey] = { sfide: {}, note: '' };
    }
    
    currentTracce[tracciaKey].sfide[sfidaId] = {
      completata,
      data: data || (completata ? new Date().toISOString().split('T')[0] : '')
    };
    
    onUpdate('tracce', currentTracce);
  };

  const handleNoteChange = (tracciaNum: number, note: string) => {
    const tracciaKey = tracciaNum.toString();
    const currentTracce = { ...progressione.tracce };
    
    if (!currentTracce[tracciaKey]) {
      currentTracce[tracciaKey] = { sfide: {}, note: '' };
    }
    
    currentTracce[tracciaKey].note = note;
    onUpdate('tracce', currentTracce);
  };

  const getSfidaStatus = (tracciaNum: number, direzione: string, sfidaIndex: number) => {
    const tracciaKey = tracciaNum.toString();
    const sfidaId = `${direzione}-${sfidaIndex}`;
    return progressione.tracce[tracciaKey]?.sfide[sfidaId] || { completata: false, data: '' };
  };

  const getTrackProgress = (traccia: TracciaDefinizione) => {
    const tracciaKey = traccia.numero.toString();
    const trackData = progressione.tracce[tracciaKey];
    if (!trackData) return 0;
    
    const totalSfide = Object.values(traccia.direzioni).reduce((acc, sfide) => acc + sfide.length, 0);
    const completedSfide = Object.values(trackData.sfide).filter(s => s.completata).length;
    
    return Math.round((completedSfide / totalSfide) * 100);
  };

  return (
    <div className="space-y-6">
      {tracceScout.map((traccia) => {
        const progress = getTrackProgress(traccia);
        const tracciaKey = traccia.numero.toString();
        
        return (
          <div key={traccia.numero} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-scout-orange flex items-center">
                <span className="mr-2">🚀</span>
                Traccia {traccia.numero}: {traccia.nome}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-scout-orange h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">{progress}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(traccia.direzioni).map(([direzione, sfide]) => (
                <div key={direzione} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-scout-green mb-3 flex items-center">
                    <span className="w-2 h-2 bg-scout-green rounded-full mr-2"></span>
                    {direzione}
                  </h4>
                  
                  <div className="space-y-3">
                    {sfide.map((sfida, index) => {
                      const status = getSfidaStatus(traccia.numero, direzione, index);
                      
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id={`sfida-${traccia.numero}-${direzione}-${index}`}
                            checked={status.completata}
                            onChange={(e) => handleSfidaChange(
                              traccia.numero, 
                              direzione, 
                              index, 
                              e.target.checked
                            )}
                            disabled={readOnly}
                            className="mt-1 w-4 h-4 text-scout-green border-gray-300 rounded focus:ring-scout-green disabled:opacity-50"
                          />
                          <div className="flex-1">
                            <label 
                              htmlFor={`sfida-${traccia.numero}-${direzione}-${index}`}
                              className={`text-sm ${status.completata ? 'line-through text-gray-500' : 'text-gray-700'} cursor-pointer`}
                            >
                              {sfida}
                            </label>
                            {status.completata && status.data && (
                              <p className="text-xs text-green-600 mt-1">
                                Completata il {new Date(status.data).toLocaleDateString('it-IT')}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label htmlFor={`note-traccia-${traccia.numero}`} className="block text-sm font-medium text-gray-700 mb-2">
                Note per la Traccia {traccia.numero}
              </label>
              <textarea
                id={`note-traccia-${traccia.numero}`}
                value={progressione.tracce[tracciaKey]?.note || ''}
                onChange={(e) => handleNoteChange(traccia.numero, e.target.value)}
                disabled={readOnly}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-orange focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
                placeholder="Aggiungi note o osservazioni per questa traccia..."
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
