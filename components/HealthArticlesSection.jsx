'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { healthArticles } from '@/data/clinicData';

export default function HealthArticlesSection({ onReadArticle }) {
  return (
    <section id="artikel" className="py-16 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Model Garis di Kiri, Tanpa Badge, & Tanpa Judul Berita & Tips Kesehatan Keluarga */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                EDUKASI & TIPS MEDIS
              </span>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Artikel edukatif yang disusun oleh dokter dan tim medis Klinik dr. Suhendra untuk membantu Anda menjaga pola hidup sehat.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 inline-flex items-center gap-2 pb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Arahkan kursor untuk menjeda putaran</span>
          </div>
        </div>

      </div>

      {/* Infinite Ticker Loop Track */}
      <div className="relative w-full overflow-hidden">
        
        {/* Soft edge gradients for seamless appearance */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

        {/* Continuous Moving Row */}
        <div className="animate-marquee-articles flex items-stretch gap-6 px-4">
          
          {/* Set 1 */}
          {healthArticles.map((article, idx) => (
            <div
              key={`set1-${article.id || idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 bg-white rounded-3xl border border-slate-200 hover:border-navy-900 overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => onReadArticle && onReadArticle(article)}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-navy-950 text-[11px] font-extrabold rounded-md shadow-sm border border-slate-200/60">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mb-2.5">
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

                  <h3 className="text-sm sm:text-base font-extrabold text-navy-950 group-hover:text-blue-600 line-clamp-2 transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <div className="w-full inline-flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                  <span>Baca Artikel Lengkap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </div>
              </div>

            </div>
          ))}

          {/* Set 2 (for smooth infinite continuous loop) */}
          {healthArticles.map((article, idx) => (
            <div
              key={`set2-${article.id || idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 bg-white rounded-3xl border border-slate-200 hover:border-navy-900 overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => onReadArticle && onReadArticle(article)}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-navy-950 text-[11px] font-extrabold rounded-md shadow-sm border border-slate-200/60">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mb-2.5">
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

                  <h3 className="text-sm sm:text-base font-extrabold text-navy-950 group-hover:text-blue-600 line-clamp-2 transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <div className="w-full inline-flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                  <span>Baca Artikel Lengkap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
