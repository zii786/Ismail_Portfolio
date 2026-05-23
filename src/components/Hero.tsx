import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal } from './Terminal';
import { Download } from 'lucide-react';

const stats = [
  { value: "6+", label: "Hackathons", highlight: true },
  { value: "8.7", label: "CGPA" },
  { value: "5", label: "Security Systems", highlight: true },
  { value: "15+", label: "Backend APIs" }
];

export function Hero() {
  const fullName = "ISMAIL MUNSHI";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = "";
    let charIndex = 0;
    let timeoutId: any;

    const typeChar = () => {
      if (charIndex < fullName.length) {
        currentText += fullName[charIndex];
        setTypedText(currentText);
        charIndex++;
        timeoutId = setTimeout(typeChar, Math.random() * 50 + 50); // Human realistic typing speed
      } else {
        timeoutId = setTimeout(() => setIsTyping(false), 500); // Wait a bit before hiding cursor
      }
    };

    timeoutId = setTimeout(typeChar, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="home" className="pt-24 pb-12 px-6 md:px-0 w-full md:w-[88vw] lg:w-[92vw] max-w-[1600px] mx-auto min-h-screen flex flex-col justify-center relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.div
             animate={!isTyping ? { y: [-3, 3, -3] } : { y: 0 }}
             transition={!isTyping ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : {}}
          >
             <h1 className="font-display text-4xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-bold leading-[0.9] tracking-tighter text-white mb-2">
               {typedText}
               {isTyping && <span className="animate-pulse text-brand-blue">_</span>}
             </h1>
          </motion.div>
          
          <h2 className="font-display text-[1.5rem] sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] text-gray-300 font-medium leading-[1.2] mb-3">
            AI Engineer <span className="opacity-50">&</span> Full-Stack Developer
          </h2>
          
          <p className="font-mono text-xs md:text-sm tracking-widest text-brand-blue font-semibold uppercase">
            Cloud & Cybersecurity Enthusiast
          </p>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl leading-[1.6] font-sans mt-8">
            Building AI systems, security analytics platforms and intelligent backend solutions. Engineering for high-performance and absolute precision.
          </p>

          <div className="pt-8 flex flex-wrap gap-4">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById('projects');
                if (!targetElement) return;
            
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                let startTime: number | null = null;
                const duration = 800; // 800ms easing
            
                const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
                  t /= d / 2;
                  if (t < 1) return (c / 2) * t * t + b;
                  t--;
                  return (-c / 2) * (t * (t - 2) - 1) + b;
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
                      
                      // Briefly highlight
                      const stickyContent = targetElement.querySelector('.sticky');
                      if (stickyContent) {
                        stickyContent.classList.add('bg-brand-blue/10');
                        setTimeout(() => {
                          stickyContent.classList.add('transition-colors', 'duration-700');
                          stickyContent.classList.remove('bg-brand-blue/10');
                          setTimeout(() => {
                            stickyContent.classList.remove('transition-colors', 'duration-700');
                          }, 700);
                        }, 500);
                      }
                  }
                };
            
                requestAnimationFrame(animation);
              }}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3.5 md:px-9 md:py-4 text-base md:text-lg rounded-md font-medium transition-all duration-200 inline-block text-center flex items-center justify-center cursor-pointer"
            >
              View Projects
            </a>
            <a 
              href="/resume.pdf"
              download="Ismail_Munshi_Resume.pdf"
              className="bg-transparent hover:bg-white/5 border border-white/10 text-white px-8 py-3.5 md:px-9 md:py-4 text-base md:text-lg rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="h-[320px] sm:h-[400px]"
        >
          <Terminal />
        </motion.div>
      </div>

      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.6 }}
         className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-y-[0.5px] border-white/5 py-10 mt-20 w-full justify-between"
      >
        {stats.map((stat, i) => (
           <div key={i} className="text-center">
             <div className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${stat.highlight ? 'text-brand-blue' : 'text-white'}`}>
               {stat.value}
             </div>
             <div className="font-sans text-gray-500 text-xs sm:text-sm md:text-base">
               {stat.label}
             </div>
           </div>
        ))}
      </motion.div>
    </section>
  );
}
