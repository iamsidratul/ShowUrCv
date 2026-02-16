
import React from 'react';
import { TEMPLATES } from '../constants';
import { TemplateType } from '../types';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (id: TemplateType) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      {TEMPLATES.map((tpl) => (
        <button
          key={tpl.id}
          onClick={() => onSelect(tpl.id)}
          className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
            selected === tpl.id ? 'border-emerald-500 bg-emerald-50' : 'border-transparent bg-white shadow-sm'
          }`}
        >
          <div className={`w-full h-24 rounded-md mb-3 ${tpl.previewColor} opacity-80 flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest`}>
            {tpl.name.split(' ')[0]}
          </div>
          <span className="text-xs font-semibold text-slate-700">{tpl.name}</span>
          {selected === tpl.id && (
            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
