
import React, { useState, useRef } from 'react';

interface FileDropZoneProps {
  onTextExtracted: (text: string) => void;
  isAnalyzing: boolean;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({ onTextExtracted, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
      const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      
      try {
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n";
        }
        onTextExtracted(fullText);
      } catch (err) {
        console.error("PDF Parsing Error:", err);
        alert("Gagal baca file PDF-nya nih. Coba copy-paste teksnya aja atau ganti file ya!");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => onTextExtracted(e.target?.result as string);
      reader.readAsText(file);
    } else {
      alert("Format file belum support nih. Pakai PDF atau .txt dulu ya!");
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div 
      className={`relative group bouncy cursor-pointer border-4 border-dashed rounded-[3rem] p-12 transition-all flex flex-col items-center justify-center min-h-[300px] text-center
        ${isDragging ? 'border-emerald-500 bg-emerald-50 scale-105' : 'border-slate-200 bg-white hover:border-emerald-300'}
        ${isAnalyzing ? 'pointer-events-none opacity-60' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".pdf,.txt" 
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      
      <div className="mb-6 w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-500 animate-float">
        {isAnalyzing ? (
          <svg className="animate-spin h-10 w-10" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        )}
      </div>

      <h3 className="text-2xl font-extrabold text-slate-800 mb-2">
        {isAnalyzing ? 'Lagi Scanning CV Kamu...' : 'Drop File CV-mu di Sini!'}
      </h3>
      <p className="text-slate-500 font-medium max-w-sm">
        Drag & drop file PDF kamu, biar AI kita yang kerja keras buat ngecek kualitasnya.
      </p>
      
      {!isAnalyzing && (
        <button className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg">
          Pilih File Manual
        </button>
      )}
    </div>
  );
};
