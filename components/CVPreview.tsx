
import React from 'react';
import { CVData, TemplateType } from '../types';

interface CVPreviewProps {
  data: CVData;
  template: TemplateType;
  id: string;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, template, id }) => {
  const { personalInfo, experiences, educations, skills } = data;

  const renderNeoBrutalist = () => (
    <div className="p-10 bg-white min-h-[1100px] border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-black">
      <div className="bg-yellow-400 border-4 border-black p-8 mb-10 -rotate-1">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{personalInfo.fullName || 'NAMA KAMU'}</h1>
        <p className="text-lg font-bold bg-white inline-block px-2 border-2 border-black">{personalInfo.email} | {personalInfo.phone}</p>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-10">
          <section>
            <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-4 bg-emerald-400 inline-block px-4">Summary</h2>
            <p className="text-lg font-bold leading-tight">{personalInfo.summary}</p>
          </section>
          <section>
            <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-4 bg-violet-400 inline-block px-4">Experience</h2>
            {experiences.map(exp => (
              <div key={exp.id} className="mb-6 border-l-4 border-black pl-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{exp.position} @ {exp.company}</h3>
                  <span className="font-bold text-sm">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-md mt-2 font-medium">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="col-span-4 space-y-10">
          <section>
            <h2 className="text-xl font-black uppercase border-b-4 border-black pb-2 mb-4 bg-orange-400 inline-block px-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => <span key={s.id} className="bg-white border-2 border-black px-2 py-1 font-bold text-sm">{s.name}</span>)}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-black uppercase border-b-4 border-black pb-2 mb-4 bg-rose-400 inline-block px-2">Edu</h2>
            {educations.map(edu => (
              <div key={edu.id} className="mb-4">
                <p className="font-bold">{edu.school}</p>
                <p className="text-sm font-medium">{edu.degree}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );

  const renderDarkTech = () => (
    <div className="p-10 bg-slate-950 min-h-[1100px] text-slate-100 font-mono">
      <div className="border-b border-emerald-500/30 pb-10 mb-10">
        <h1 className="text-4xl font-bold text-emerald-400 mb-4 tracking-tighter">
          &gt; {personalInfo.fullName || 'ROOT_USER'}
        </h1>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <span className="bg-slate-900 border border-slate-800 px-3 py-1">{personalInfo.email}</span>
          <span className="bg-slate-900 border border-slate-800 px-3 py-1">{personalInfo.location}</span>
          <span className="bg-slate-900 border border-slate-800 px-3 py-1">{personalInfo.website}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <section>
            <h2 className="text-emerald-500 text-sm font-bold uppercase mb-4 opacity-50">// Profile</h2>
            <p className="text-slate-300 leading-relaxed">{personalInfo.summary}</p>
          </section>
          <section>
            <h2 className="text-emerald-500 text-sm font-bold uppercase mb-6 opacity-50">// Experience</h2>
            {experiences.map(exp => (
              <div key={exp.id} className="mb-8 relative pl-6 border-l border-slate-800">
                <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-lg font-bold text-slate-100">{exp.position}</h3>
                <div className="flex justify-between text-sm text-emerald-400/80 mb-2">
                  <span>{exp.company}</span>
                  <span>[{exp.startDate}..{exp.endDate}]</span>
                </div>
                <p className="text-sm text-slate-400">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="space-y-10">
          <section className="bg-slate-900/50 p-6 border border-slate-800 rounded-lg">
            <h2 className="text-emerald-500 text-xs font-bold uppercase mb-4 opacity-50">// Skills_Module</h2>
            <div className="grid grid-cols-1 gap-2">
              {skills.map(s => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-sm">{s.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderSoftPastel = () => (
    <div className="p-10 bg-[#fff5f5] min-h-[1100px] text-[#4a4e69] font-sans">
      <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-rose-100 mb-10 border border-rose-50 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-rose-200 rounded-full mb-4 flex items-center justify-center text-3xl">✨</div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-[#22223b]">{personalInfo.fullName || 'Nama Kamu'}</h1>
        <p className="text-rose-400 font-medium mb-4">{personalInfo.email} • {personalInfo.location}</p>
        <p className="max-w-xl text-slate-500">{personalInfo.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-[2rem] p-8 shadow-lg shadow-rose-100 border border-rose-50">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-sm">💼</span>
            Pengalaman
          </h2>
          {experiences.map(exp => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <h3 className="font-bold text-[#22223b]">{exp.position}</h3>
              <p className="text-sm text-rose-300 mb-2 font-medium">{exp.company} | {exp.startDate}-{exp.endDate}</p>
              <p className="text-sm text-slate-500 leading-snug">{exp.description}</p>
            </div>
          ))}
        </section>

        <div className="space-y-8">
          <section className="bg-white rounded-[2rem] p-8 shadow-lg shadow-rose-100 border border-rose-50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-sm">🎯</span>
              Keahlian
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => <span key={s.id} className="bg-slate-50 px-4 py-2 rounded-full text-xs font-bold text-slate-600 border border-slate-100">{s.name}</span>)}
            </div>
          </section>
          <section className="bg-white rounded-[2rem] p-8 shadow-lg shadow-rose-100 border border-rose-50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center text-sm">🎓</span>
              Edukasi
            </h2>
            {educations.map(edu => (
              <div key={edu.id} className="mb-2">
                <p className="font-bold text-sm text-[#22223b]">{edu.school}</p>
                <p className="text-xs text-slate-400">{edu.degree}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );

  const getTemplate = () => {
    switch(template) {
      case 'neo-brutalist': return renderNeoBrutalist();
      case 'dark-tech': return renderDarkTech();
      case 'soft-pastel': return renderSoftPastel();
      default: return renderSoftPastel();
    }
  };

  return (
    <div id={id} className="shadow-2xl mx-auto overflow-hidden bg-white w-full max-w-[800px] origin-top">
      {getTemplate()}
    </div>
  );
};
