import React from 'react';

export function Footer() {
  return (
    <footer id="contact" className="border-t border-brand-blue/20 bg-[#0a0a0c]/80 py-12">
      <div className="w-full md:w-[88vw] lg:w-[92vw] max-w-[1600px] mx-auto px-6 md:px-0 flex flex-col md:flex-row justify-between items-center gap-6">
        <a href="#" className="font-display font-bold text-xl tracking-tight text-white mb-4 md:mb-0 hover:text-brand-blue transition-colors">
          ISMAIL MUNSHI
        </a>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 font-sans text-sm text-gray-400">
          <a href="https://github.com/zii786" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">GitHub</a>
          <a href="https://www.linkedin.com/in/ismail-munshi-5679152ab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">LinkedIn</a>
          <a href="mailto:ismailmunshi2005@gmail.com" className="hover:text-white transition-colors duration-200">Email</a>
        </div>
        
        <div className="font-mono text-xs text-brand-blue/70">
          © {new Date().getFullYear()} Ismail Munshi. Built for Performance.
        </div>
      </div>
    </footer>
  );
}
