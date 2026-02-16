
import React from 'react';
import { CVData, Experience, Education, Skill } from '../types';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
  currentStep: number;
}

export const CVForm: React.FC<CVFormProps> = ({ data, onChange, currentStep }) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const addExperience = () => {
    const newExp: Experience = { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', description: '' };
    onChange({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    const updated = data.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
    onChange({ ...data, experiences: updated });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experiences: data.experiences.filter(exp => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = { id: crypto.randomUUID(), school: '', degree: '', date: '' };
    onChange({ ...data, educations: [...data.educations, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = data.educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
    onChange({ ...data, educations: updated });
  };

  const addSkill = () => {
    const newSkill: Skill = { id: crypto.randomUUID(), name: '' };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, name: string) => {
    const updated = data.skills.map(s => s.id === id ? { ...s, name } : s);
    onChange({ ...data, skills: updated });
  };

  const inputClasses = "w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all text-slate-700 font-medium";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
      {currentStep === 1 && (
        <section className="space-y-4">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Kenalan dulu, yuk! 👋</h3>
            <p className="text-slate-500">Isi data pribadimu untuk header CV yang keren.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className={inputClasses} placeholder="Nama Lengkap" value={data.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} />
            <input className={inputClasses} placeholder="Email" value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
            <input className={inputClasses} placeholder="No. HP" value={data.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
            <input className={inputClasses} placeholder="Lokasi (misal: Jakarta)" value={data.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} />
            <input className={inputClasses} placeholder="Link Portfolio / LinkedIn" value={data.personalInfo.website} onChange={e => updatePersonalInfo('website', e.target.value)} />
            <textarea className={`${inputClasses} col-span-full min-h-[120px]`} placeholder="Summary singkat tentang kamu..." value={data.personalInfo.summary} onChange={e => updatePersonalInfo('summary', e.target.value)} />
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="space-y-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Pengalaman & Skill 🚀</h3>
            <p className="text-slate-500">Ceritakan apa saja yang sudah kamu capai.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-700">Work Experience</h4>
              <button onClick={addExperience} className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">+ Tambah</button>
            </div>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="p-6 bg-white border-2 border-slate-100 rounded-3xl relative group">
                <button onClick={() => removeExperience(exp.id)} className="absolute -top-2 -right-2 bg-red-100 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input className={inputClasses} placeholder="Perusahaan" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                  <input className={inputClasses} placeholder="Posisi" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} />
                  <input className={inputClasses} placeholder="Mulai" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} />
                  <input className={inputClasses} placeholder="Selesai" value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} />
                  <textarea className={`${inputClasses} col-span-full`} placeholder="Jobdesk atau pencapaian..." value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-700">Education</h4>
              <button onClick={addEducation} className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">+ Tambah</button>
            </div>
            {data.educations.map((edu) => (
              <div key={edu.id} className="p-6 bg-white border-2 border-slate-100 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <input className={inputClasses} placeholder="Sekolah/Univ" value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} />
                  <input className={inputClasses} placeholder="Gelar/Jurusan" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-700">Skills</h4>
              <button onClick={addSkill} className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">+ Tambah</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <input key={skill.id} className="p-2 px-4 border-2 border-slate-100 rounded-full text-sm w-32 focus:border-emerald-500 outline-none" placeholder="Skill..." value={skill.name} onChange={e => updateSkill(skill.id, e.target.value)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
