import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const SocialIcon = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative p-2 text-slate-400 border border-transparent rounded-md transition-colors hover:text-brand-blue group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      <Icon className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,224,255,0.8)]" />
      {isHovered && <div className="absolute inset-0 rounded-md border border-brand-blue/30 shadow-[0_0_12px_rgba(0,224,255,0.2)] pointer-events-none" />}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/90 border border-brand-blue/30 text-[9px] font-mono text-brand-blue rounded tracking-widest whitespace-nowrap shadow-[0_0_10px_rgba(0,224,255,0.2)]"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

const navItems = [
  { label: 'HOME', id: 'home' },
  { label: 'TIMELINE', id: 'timeline' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'CONTACT', id: 'contact' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
      
      let current = 'home';
      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY >= top - window.innerHeight / 3) {
          current = section.id;
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;
    const duration = 800; // 800ms easing

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const amount = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, amount);
      if (timeElapsed < duration) {
          requestAnimationFrame(animation);
      } else {
          window.scrollTo(0, targetPosition);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020203]/80 backdrop-blur-md border-b border-brand-blue/20">
      <div className="w-full md:w-[88vw] lg:w-[92vw] max-w-[1600px] mx-auto px-6 md:px-0 h-[76px] flex items-center justify-between">
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="font-display font-bold text-xl md:text-[22px] tracking-wide text-white hover:text-brand-blue transition-colors z-50">
          ISMAIL MUNSHI
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 ml-auto mr-12">
          {navItems.map(item => (
             <motion.a
               key={item.id}
               href={`#${item.id}`}
               onClick={(e) => scrollToSection(e, item.id)}
               whileHover={{ y: -2 }}
               transition={{ duration: 0.3 }}
               className="relative group py-2 flex flex-col"
             >
               <span className={`text-[13px] md:text-sm font-mono tracking-widest transition-all duration-300 uppercase ${activeSection === item.id ? 'text-brand-blue drop-shadow-[0_0_8px_rgba(0,224,255,0.8)]' : 'text-gray-400 group-hover:text-brand-blue group-hover:drop-shadow-[0_0_8px_rgba(0,224,255,0.4)]'}`}>
                 {item.label}
               </span>
               {/* Hover Underline effect */}
               <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-30" />
               {/* Active Underline */}
               <motion.div
                 className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blue drop-shadow-[0_0_8px_rgba(0,224,255,0.8)] origin-left"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                 transition={{ duration: 0.3 }}
               />
             </motion.a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <SocialIcon href="https://github.com/zii786" icon={Github} label="GITHUB" />
          <SocialIcon href="https://www.linkedin.com/in/ismail-munshi-5679152ab" icon={Linkedin} label="LINKEDIN" />
          <SocialIcon href="mailto:ismailmunshi2005@gmail.com" icon={Mail} label="EMAIL ME" />
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-brand-blue/20"
          >
             <div className="px-6 py-8 flex flex-col space-y-6">
               {navItems.map(item => (
                 <a
                   key={item.id}
                   href={`#${item.id}`}
                   onClick={(e) => scrollToSection(e, item.id)}
                   className={`text-[13px] md:text-sm font-mono tracking-widest uppercase transition-all duration-300 w-fit ${activeSection === item.id ? 'text-brand-blue drop-shadow-[0_0_8px_rgba(0,224,255,0.8)]' : 'text-gray-400 hover:text-brand-blue'}`}
                 >
                   {item.label}
                 </a>
               ))}
               <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/60">
                 <SocialIcon href="https://github.com/zii786" icon={Github} label="GITHUB" />
                 <SocialIcon href="https://www.linkedin.com/in/ismail-munshi-5679152ab" icon={Linkedin} label="LINKEDIN" />
                 <SocialIcon href="mailto:ismailmunshi2005@gmail.com" icon={Mail} label="EMAIL ME" />
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

