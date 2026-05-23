import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Shield, Cloud, Terminal, Code2 } from 'lucide-react';

const certifications = [
  {
    title: "Cybersecurity Virtual Internship",
    issuer: "EduSkills × Palo Alto Networks",
    meta: "10 Weeks | Jul 2025 – Sep 2025",
    icon: <Shield className="w-5 h-5" />
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    meta: "",
    icon: <Cloud className="w-5 h-5" />
  },
  {
    title: "Cybersecurity",
    issuer: "Palo Alto Networks",
    meta: "",
    icon: <Shield className="w-5 h-5" />
  },
  {
    title: "C & C++ Programming",
    issuer: "Disha Classes", // Add Disha Classes or no? Wait, the prompt says "C & C++ Programming" underneath Education & Credentials without Disha Classes in the list, but earlier in the screen it was there. Let's just put nothing or Disha Classes.
    meta: "",
    icon: <Code2 className="w-5 h-5" />
  }
];

export function Education() {
  const backgroundNodes = React.useMemo(() => {
    return Array.from({ length: 6 }).map(() => {
      const left = 20 + Math.random() * 60;
      const top = 20 + Math.random() * 60;
      const xAnim = [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10];
      const yAnim = [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10];
      const duration = 5 + Math.random() * 5;
      return { left, top, xAnim, yAnim, duration };
    });
  }, []);

  return (
    <section id="education" className="py-20 md:py-24 px-6 md:px-0 w-full md:w-[88vw] lg:w-[92vw] max-w-[1600px] mx-auto relative cursor-default">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent pointer-events-none opacity-20 z-0" />
      
      <div className="text-center mb-14 md:mb-20 relative z-10">
        <span className="font-mono text-brand-blue text-[13px] tracking-[0.2em] uppercase font-semibold">04. Academic Background</span>
        <h2 className="font-display text-[2.75rem] md:text-5xl font-bold mt-4 tracking-tight">EDUCATION & CREDENTIALS</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10 w-full mx-auto">
        {/* Left Card: Education */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="bg-[#0a0a0c]/80 backdrop-blur-md rounded-2xl p-7 md:p-10 border border-brand-blue/20 flex flex-col relative overflow-hidden group hover:border-brand-blue/40 transition-colors shadow-[0_0_30px_rgba(0,224,255,0.05)]"
        >
          {/* Subtle Blockchain Node Animation Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700">
             {backgroundNodes.map((node, i) => (
                <motion.div
                  key={`node-${i}`}
                  animate={{ 
                    x: node.xAnim, 
                    y: node.yAnim 
                  }}
                  transition={{ duration: node.duration, repeat: Infinity, ease: "easeInOut", alternate: true }}
                  className="absolute w-2 h-2 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,224,255,0.8)]"
                  style={{
                    left: `${node.left}%`,
                    top: `${node.top}%`
                  }}
                />
             ))}
             <svg className="absolute inset-0 w-full h-full stroke-brand-blue/20 stroke-[1]" fill="none">
               <motion.path 
                 d="M 120 150 L 250 180 L 180 250 Z" 
                 animate={{ opacity: [0.3, 0.6, 0.3] }} 
                 transition={{ duration: 4, repeat: Infinity }}
               />
               <motion.path 
                 d="M 250 180 L 350 120 L 300 280 Z" 
                 animate={{ opacity: [0.2, 0.5, 0.2] }} 
                 transition={{ duration: 5, repeat: Infinity, delay: 1 }}
               />
               <motion.path 
                 d="M 180 250 L 300 280 L 220 350 Z" 
                 animate={{ opacity: [0.1, 0.7, 0.1] }} 
                 transition={{ duration: 6, repeat: Infinity, delay: 2 }}
               />
             </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-lg bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue shadow-[0_0_15px_rgba(0,224,255,0.2)]">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white font-bold tracking-wide">
                EDUCATION
              </h3>
            </div>

            <h4 className="text-xl md:text-[26px] font-display font-medium text-white mb-2 leading-tight">
              B.Tech Computer Science with Business Systems
            </h4>
            <p className="text-lg text-brand-blue mb-6">Kolhapur Institute of Technology</p>

            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded font-mono text-brand-blue font-semibold text-base md:text-lg relative overflow-hidden group/badge">
                <div className="absolute inset-0 bg-brand-blue/20 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700 ease-in-out" />
                CGPA: 8.7 / 10
              </span>
            </div>

            <div className="mb-8">
              <h5 className="font-mono text-sm text-gray-500 tracking-widest uppercase mb-3">Honours</h5>
              <div className="inline-flex px-5 py-2.5 bg-[#1a1a24] border border-brand-blue/20 rounded font-sans text-white text-base md:text-lg">
                Blockchain Technology
              </div>
            </div>

            <div>
              <h5 className="font-mono text-sm text-gray-500 tracking-widest uppercase mb-3">Focus Areas</h5>
              <div className="flex flex-wrap gap-3">
                {["AI", "Backend Engineering", "Cybersecurity", "Blockchain"].map((area, i) => (
                  <motion.span 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded text-gray-300 font-sans text-sm md:text-[15px] transition-colors hover:border-white/30"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Card: Certifications */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="bg-[#0a0a0c]/80 backdrop-blur-md rounded-2xl p-7 md:p-10 border border-brand-blue/20 flex flex-col relative"
        >
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-lg bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue shadow-[0_0_15px_rgba(0,224,255,0.2)]">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-white font-bold tracking-wide">
              CERTIFICATIONS
            </h3>
          </div>

          <div className="space-y-6 relative z-10 flex-grow flex flex-col justify-between">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 5 }}
                className="group flex gap-4 items-start p-4 -mx-4 rounded-xl hover:bg-white/[0.02] transition-colors cursor-default"
              >
                <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mt-1 shrink-0 group-hover:border-brand-blue/50 group-hover:text-brand-blue group-hover:bg-brand-blue/10 group-hover:shadow-[0_0_15px_rgba(0,224,255,0.3)] transition-all duration-300">
                  {cert.icon}
                </div>
                <div>
                  <h4 className="font-sans text-lg md:text-xl text-gray-200 font-medium group-hover:text-white transition-colors">
                    {cert.title}
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                    <span className="font-mono text-sm text-brand-blue/80">
                      {cert.issuer}
                    </span>
                    {cert.meta && (
                      <>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <span className="font-mono text-[13px] text-gray-500">
                          {cert.meta}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
