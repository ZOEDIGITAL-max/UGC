import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f6f3ed] text-[#1c1c18] border-t border-[#c4c7c7]/40">
      <div className="w-full px-6 md:px-16 py-16 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Row: Studio Identification & Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b border-[#c4c7c7]/30">
          <div>
            <span className="text-xl md:text-2xl font-headline uppercase tracking-widest text-[#000000] block">
              FOWOTADE OYINDAMOLA
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#745a36] mt-1.5 block">
              Luxury AI Creative Studio · Synthetic UGC &amp; Film
            </span>
          </div>

          {/* Social & Contextual Links */}
          <div className="flex flex-wrap gap-6 text-[11px] font-semibold uppercase tracking-wider text-[#444748]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#745a36] hover:underline underline-offset-4 transition-all duration-200"
            >
              Instagram
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#745a36] hover:underline underline-offset-4 transition-all duration-200"
            >
              Vimeo
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#745a36] hover:underline underline-offset-4 transition-all duration-200"
            >
              Behance
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#745a36] hover:underline underline-offset-4 transition-all duration-200"
            >
              LinkedIn
            </a>
            <a
              href="#about"
              className="hover:text-[#745a36] hover:underline underline-offset-4 transition-all duration-200"
            >
              Philosophy
            </a>
            <a
              href="#contact"
              className="hover:text-[#745a36] hover:underline underline-offset-4 transition-all duration-200"
            >
              Commission
            </a>
          </div>
        </div>

        {/* Bottom Metadata & Copyright Notice */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#444748] gap-4">
          <div>
            © 2026 Fowotade Oyindamola Luxury AI Creative Studio. All Rights Reserved. London — Lagos [GMT+1]
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#745a36]"></span>
            <span className="tracking-widest uppercase">HAUTE SYNTHESIS SYSTEMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
