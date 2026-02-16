
import React, { useState, useEffect } from 'react';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';
import { TemplateSelector } from './components/TemplateSelector';
import { FileDropZone } from './components/FileDropZone';
import { CVData, TemplateType, AnalysisResult } from './types';
import { INITIAL_CV_DATA } from './constants';
import { analyzeCV } from './geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'checker' | 'builder'>('checker');
  const [builderStep, setBuilderStep] = useState<1 | 2 | 3>(1);
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('soft-pastel');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTextExtracted = async (text: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeCV(text);
      setAnalysis(result);
      // Auto-scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('Aduh, ada masalah teknis pas cek CV kamu. Coba lagi ya!');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('cv-render-area');
    if (!element) return;
    try {
      const canvas = await (window as any).html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'Keren'}.pdf`);
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Gagal buat PDF nih. Coba lagi ya!');
    }
  };

  const goToBuilder = () => {
    setActiveView('builder');
    setBuilderStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col selection:bg-emerald-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b sticky top-0 z-50 h-20 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <button onClick={() => {setActiveView('checker'); setAnalysis(null);}} className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200 group-hover:rotate-12 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tighter text-slate-900">Elevate<span className="text-emerald-500 italic">CV</span></span>
          </button>

          <nav className="hidden md:flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveView('checker')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeView === 'checker' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              CV Checker
            </button>
            <button 
              onClick={goToBuilder}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeView === 'builder' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              CV Builder
            </button>
          </nav>

          <div className="flex gap-4">
            {activeView === 'builder' ? (
              <button onClick={handleExportPDF} className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:shadow-xl transition-all flex items-center gap-2">
                Unduh PDF
              </button>
            ) : (
              <button onClick={goToBuilder} className="bg-emerald-500 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:shadow-xl transition-all">
                Mulai Buat CV 🚀
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12">
        {activeView === 'checker' ? (
          <div className="space-y-24">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                CV Kamu Udah <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-500 underline decoration-emerald-200">Gokil Belum?</span>
              </h1>
              <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                Nggak perlu paste teks lagi, cukup drop file CV kamu di bawah. AI kita bakal nge-vibe check secara instan!
              </p>
              
              <div className="max-w-2xl mx-auto pt-8">
                <FileDropZone onTextExtracted={handleTextExtracted} isAnalyzing={isAnalyzing} />
              </div>
            </div>

            {error && <div className="p-6 bg-red-50 text-red-600 rounded-[2rem] border-2 border-red-100 text-center font-bold">{error}</div>}

            {/* Analysis Results */}
            {analysis && (
              <div id="results-section" className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100">
                  <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="relative w-64 h-64 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="128" cy="128" r="112" stroke="currentColor" strokeWidth="24" fill="transparent" className="text-slate-50" />
                        <circle 
                          cx="128" cy="128" r="112" 
                          stroke="currentColor" 
                          strokeWidth="24" 
                          fill="transparent" 
                          strokeDasharray={703} 
                          strokeDashoffset={703 - (703 * analysis.score) / 100}
                          className="text-emerald-500 transition-all duration-[1500ms] ease-out" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-7xl font-black text-slate-900 leading-none">{analysis.score}</span>
                        <span className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] mt-2">Vibe Score</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                      <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm tracking-wider uppercase mb-2">Analisis AI Selesai!</div>
                      <h2 className="text-4xl font-black text-slate-900">"{analysis.coachAdvice}"</h2>
                      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <button onClick={goToBuilder} className="bg-emerald-500 text-white px-10 py-4 rounded-[2rem] font-black text-lg hover:bg-emerald-600 hover:scale-105 transition-all shadow-xl shadow-emerald-200">
                          Upgrade Jadi CV Pro 🚀
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-[#f0fdf4] p-8 rounded-[3rem] border border-emerald-100 space-y-4">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold">✓</div>
                      <h3 className="text-xl font-black text-emerald-900">Kelebihan</h3>
                      <ul className="space-y-2 text-emerald-800/80 font-medium text-sm">
                        {analysis.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                    </div>
                    <div className="bg-[#fff1f2] p-8 rounded-[3rem] border border-rose-100 space-y-4">
                      <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white font-bold">!</div>
                      <h3 className="text-xl font-black text-rose-900">Perlu Di-Fix</h3>
                      <ul className="space-y-2 text-rose-800/80 font-medium text-sm">
                        {analysis.weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
                      </ul>
                    </div>
                    <div className="bg-[#eff6ff] p-8 rounded-[3rem] border border-blue-100 space-y-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold">💡</div>
                      <h3 className="text-xl font-black text-blue-900">Saran Jitu</h3>
                      <ul className="space-y-2 text-blue-800/80 font-medium text-sm">
                        {analysis.suggestions.map((s, i) => <li key={i}>• {s}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Multi-Step Builder */
          <div className="flex flex-col lg:flex-row gap-12 items-start animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Sidebar Controls */}
            <div className="w-full lg:w-[480px] space-y-8 bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 sticky top-28">
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[2rem]">
                {[1, 2, 3].map((s) => (
                  <button 
                    key={s} 
                    onClick={() => setBuilderStep(s as any)}
                    className={`flex-1 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.1em] transition-all 
                      ${builderStep === s ? 'bg-white text-emerald-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    Step 0{s}
                  </button>
                ))}
              </div>

              <div className="min-h-[400px]">
                {builderStep === 3 ? (
                  <div className="animate-in fade-in slide-in-from-right-4">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-slate-800">Ganti Vibe-mu! 🎨</h3>
                      <p className="text-slate-500 font-medium">Pilih desain yang paling mencerminkan dirimu.</p>
                    </div>
                    <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
                  </div>
                ) : (
                  <CVForm data={cvData} onChange={setCvData} currentStep={builderStep} />
                )}
              </div>

              <div className="flex justify-between items-center pt-8 border-t">
                {builderStep > 1 ? (
                  <button onClick={() => setBuilderStep((s) => (s - 1) as any)} className="px-8 py-3 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all">
                    Kembali
                  </button>
                ) : (
                  <div />
                )}
                {builderStep < 3 ? (
                  <button onClick={() => setBuilderStep((s) => (s + 1) as any)} className="px-10 py-3 rounded-2xl font-black text-white bg-emerald-500 shadow-lg shadow-emerald-100 hover:scale-105 transition-all">
                    Lanjut
                  </button>
                ) : (
                  <button onClick={handleExportPDF} className="px-10 py-4 rounded-2xl font-black text-white bg-slate-900 shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                    Bungkus PDF! 📦
                  </button>
                )}
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 w-full bg-slate-200/40 backdrop-blur-sm rounded-[4rem] p-6 md:p-12 min-h-[900px] flex justify-center border-2 border-white shadow-inner overflow-hidden">
               <div className="scale-75 md:scale-90 lg:scale-100 origin-top">
                 <CVPreview id="cv-render-area" data={cvData} template={selectedTemplate} />
               </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 text-center space-y-4">
        <div className="flex justify-center gap-4 text-emerald-500 font-black text-sm uppercase tracking-widest">
          <span>Unique</span>
          <span>•</span>
          <span>Modern</span>
          <span>•</span>
          <span>AI-Powered</span>
        </div>
        <p className="text-slate-400 font-medium text-sm">Bikin CV Jadi Asik • © 2025 ElevateCV</p>
      </footer>
    </div>
  );
};

export default App;
