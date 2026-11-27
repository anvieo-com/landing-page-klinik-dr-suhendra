'use client';

import React from 'react';
import Image from 'next/image';
import { X, Calendar, Clock, User, Share2 } from 'lucide-react';

export default function ArticleReaderModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal */}
        <div className="relative h-52 w-full bg-navy-950 overflow-hidden flex-shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 px-2.5 py-0.5 rounded-md inline-block mb-1">
              {article.category}
            </span>
            <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
              {article.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span className="font-semibold text-navy-900">{article.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 pt-2">
            {article.content}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Diterbitkan oleh Tim Medis Klinik dr. Suhendra
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-navy-900 rounded-xl hover:bg-navy-950 transition-colors"
          >
            Selesai Membaca
          </button>
        </div>

      </div>
    </div>
  );
}
