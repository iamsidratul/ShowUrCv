
import { TemplateType } from './types';

export const TEMPLATES: { id: TemplateType; name: string; description: string; previewColor: string }[] = [
  { id: 'neo-brutalist', name: 'Neo Brutalist', description: 'Bold, edgy, and high contrast.', previewColor: 'bg-yellow-400 border-2 border-black' },
  { id: 'soft-pastel', name: 'Soft Pastel', description: 'Gentle colors and round shapes.', previewColor: 'bg-rose-200' },
  { id: 'dark-tech', name: 'Cyber Dark', description: 'Neon accents on dark indigo.', previewColor: 'bg-slate-900' },
  { id: 'magazine', name: 'Editorial', description: 'Like a high-end fashion magazine.', previewColor: 'bg-slate-100 border-l-4 border-slate-900' },
  { id: 'vibrant-sidebar', name: 'Neon Side', description: 'Electric green sidebar.', previewColor: 'bg-emerald-500' },
  { id: 'gradient-header', name: 'Sky Gradient', description: 'Smooth blue-to-purple header.', previewColor: 'bg-gradient-to-r from-blue-500 to-purple-500' },
  { id: 'minimal-pro', name: 'Pure Minimal', description: 'Ultra-clean white space.', previewColor: 'bg-white border' },
  { id: 'classic-clean', name: 'Modern Classic', description: 'Safe but stylish.', previewColor: 'bg-blue-800' },
];

export const INITIAL_CV_DATA = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experiences: [],
  educations: [],
  skills: [],
};
