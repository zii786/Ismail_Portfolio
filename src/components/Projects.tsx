import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { ShieldAlert, Eye, Video, CreditCard, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "SentinelShield 2.0",
    description: "Real-time WAF and security analytics platform.",
    features: [
      "Live NGINX logs",
      "ML anomaly detection",
      "OWASP protection",
      "IP blocking",
      "Dashboard analytics"
    ],
    tags: ["REAL-TIME WAF", "ML DETECTION", "OWASP", "IP BLOCKING"],
    icon: <ShieldAlert className="w-8 h-8" />,
    github: "https://github.com/zii786/SentinelShield",
    architecture: true
  },
  {
    title: "TCS Transaction System",
    description: "Backend transaction workflow system.",
    features: [
      "REST APIs",
      "Authentication",
      "Tracking",
      "Integration testing",
      "System design"
    ],
    tags: ["REST APIs", "AUTH", "INTEGRATION", "SYSTEM DESIGN"],
    icon: <CreditCard className="w-8 h-8" />,
    github: "https://github.com/zii786/tcs-distributed-transaction-system"
  },
  {
    title: "LocalLens",
    description: "Privacy-first local image search engine.",
    features: [
      "CLIP embeddings",
      "BLIP captions",
      "Natural language retrieval",
      "Local processing"
    ],
    tags: ["CLIP", "BLIP", "FASTAPI"],
    icon: <Eye className="w-8 h-8" />,
    github: "https://github.com/Aadityaa-Sharma/Local-Image-Search-AI"
  },
  {
    title: "PitchFrame",
    description: "AI startup pitch analysis platform.",
    features: [
      "Pitch parsing",
      "Business evaluation",
      "Market fit scoring",
      "Automated feedback"
    ],
    tags: ["LLM ANALYSIS", "BUSINESS", "SCORING"],
    icon: <Video className="w-8 h-8" />,
    github: "https://github.com/zii786/pitchframe-"
  }
];

const ProjectCard: React.FC<{ project: any; index: number; progress: any; total: number }> = ({ project, index, progress, total }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(0, 224, 255, 0.15), transparent 80%)`;

  const cardProgress = index / (total - 1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    return progress.onChange((v: number) => {
      setActive(Math.abs(v - cardProgress) < 0.15);
    });
  }, [progress, cardProgress]);

  const scale = useTransform(progress, [cardProgress - 0.2, cardProgress, cardProgress + 0.2], [0.85, 1, 0.85]);
  const opacity = useTransform(progress, [cardProgress - 0.2, cardProgress, cardProgress + 0.2], [0.4, 1, 0.4]);

  const activeBorder = active ? 'border-brand-blue/50 shadow-[0_0_30px_rgba(0,224,255,0.15)]' : 'border-slate-800 shadow-none';
  const hoverBorder = isHovered ? '!border-brand-blue/80 shadow-[0_0_40px_rgba(0,224,255,0.25)]' : '';

  const floatDelay = index * 0.4;

  return (
    <motion.div style={{ scale, opacity }} className="relative w-[85vw] md:w-[80vw] lg:w-[60vw] h-[55vh] min-h-[430px] md:h-[65vh] md:min-h-[500px] xl:h-[680px] shrink-0">
      <motion.div
         animate={{ y: [-3, 3, -3] }}
         transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
         className="w-full h-full"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02, y: -8 }}
          className={`bg-[#0a0a0c]/90 backdrop-blur-xl rounded-2xl w-full h-full flex flex-col relative overflow-hidden group cursor-crosshair transition-all duration-700 p-5 sm:p-8 md:p-10 lg:p-14 z-10 border ${hoverBorder || activeBorder}`}
        >
           {/* Mouse Spotlight */}
           {isHovered && (
             <motion.div
               className="absolute pointer-events-none inset-0 z-0 transition-opacity duration-300 opacity-100"
               style={{ background }}
             />
           )}
           
           {/* Active Particles */}
           {active && (
             <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
               {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                     key={`p-${i}`}
                     initial={{ y: 200, opacity: 0 }}
                     animate={{ y: -600, opacity: [0, 0.4, 0] }}
                     transition={{ duration: 4 + Math.random() * 4, ease: "linear", repeat: Infinity, delay: Math.random() * 2 }}
                     className="absolute w-1 h-1 bg-brand-blue rounded-full"
                     style={{ left: `${Math.random() * 100}%` }}
                  />
               ))}
             </div>
           )}

           <div className="relative z-10 flex flex-col h-full">
             <div className="flex flex-row items-center gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-10">
               <motion.div 
                 animate={{ scale: active ? [1, 1.05, 1] : 1 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className={`w-14 h-14 md:w-20 md:h-20 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 ${active ? 'bg-brand-blue/10 border-brand-blue/40 text-brand-blue shadow-[0_0_15px_rgba(0,224,255,0.4)]' : 'bg-black border-slate-700 text-slate-500'} ${isHovered ? 'text-white shadow-[0_0_20px_rgba(0,224,255,0.6)] border-brand-blue' : ''}`}
               >
                  {React.cloneElement(project.icon, { className: 'w-6 h-6 md:w-8 md:h-8' })}
               </motion.div>
               <h3 className={`font-display font-bold text-white text-xl sm:text-3xl md:text-5xl tracking-wide transition-opacity duration-700 leading-[1.1] ${active ? 'opacity-100' : 'opacity-40'}`}>
                 {project.title}
               </h3>
             </div>
             
             <motion.div 
               initial={false}
               animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className={`flex-grow flex flex-col ${!active && 'pointer-events-none'}`}
             >
               <p className="font-sans text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-[1.5] sm:leading-[1.6] mb-4 md:mb-8 max-w-[90%]">
                 {project.description}
               </p>

               <div className="flex-grow flex flex-col justify-center mb-4 md:mb-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 sm:gap-y-3 md:gap-y-6 gap-x-10">
                   {project.features.map((f: string) => (
                     <div key={f} className="flex items-start text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-sans">
                        <span className="text-brand-blue mr-3 sm:mr-4 mt-0.5 sm:mt-1 opacity-80 text-xs sm:text-sm">▹</span>
                        <span className="leading-snug">{f}</span>
                     </div>
                   ))}
                 </div>
               </div>
               
               <div className="flex flex-wrap gap-3 mb-4 md:mb-8 pointer-events-auto">
                 <a 
                   href={project.github} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/5 border border-white/10 hover:border-brand-blue/50 text-white rounded-lg transition-all duration-300 hover:-translate-y-1 group/btn hover:shadow-[0_0_20px_rgba(0,224,255,0.15)] cursor-pointer"
                 >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-105 group-hover/btn:drop-shadow-[0_0_10px_rgba(0,224,255,0.8)] transition-all duration-300" />
                    <span className="font-sans font-medium text-xs sm:text-[13px] md:text-sm">View Code</span>
                 </a>
                 {project.architecture && (
                   <a 
                     href={project.github} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 bg-transparent border border-transparent hover:border-brand-blue/30 text-gray-400 hover:text-brand-blue rounded-lg transition-all duration-300 hover:-translate-y-1 group/btn cursor-pointer"
                   >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-105 group-hover/btn:drop-shadow-[0_0_10px_rgba(0,224,255,0.8)] transition-all duration-300" />
                      <span className="font-sans font-medium text-xs sm:text-[13px] md:text-sm">View Architecture</span>
                   </a>
                 )}
               </div>
               
               <div className="mt-auto flex flex-wrap gap-2 pt-4 md:pt-8 border-t border-slate-800/60 -mb-2">
                  {project.tags.map((tag: string, idx: number) => (
                    <motion.span 
                      key={tag}
                      initial={false}
                      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
                      transition={{ duration: 0.4, delay: active ? 0.2 + idx * 0.05 : 0 }}
                      className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[12px] md:text-[13px] font-mono tracking-widest uppercase bg-brand-blue/5 border border-brand-blue/20 text-brand-blue/80 rounded hover:border-brand-blue/50 hover:text-brand-blue transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
               </div>
             </motion.div>
           </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const updateRange = () => {
      if (sliderRef.current) {
        setScrollRange(sliderRef.current.scrollWidth - window.innerWidth);
      }
    };
    updateRange();
    
    // Slight delay to ensure fonts/layout are ready
    setTimeout(updateRange, 100);
    
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id="projects" ref={targetRef} className="h-[400vh] bg-[#020203] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
         
         {/* Background Grid shifting */}
         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden block">
           <motion.div 
             animate={{ x: [0, -100, 0] }} 
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             className="absolute inset-[-50%] w-[200%] h-[200%]"
             style={{ 
                  backgroundImage: 'linear-gradient(to right, rgba(0, 224, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 224, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '4rem 4rem',
                  maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)'
             }} 
           />
         </div>

         <div className="max-w-7xl w-full mx-auto px-6 mb-4 sm:mb-6 md:mb-10 shrink-0 relative z-20">
           <span className="font-mono text-brand-blue text-[13px] md:text-sm tracking-[0.2em] uppercase font-semibold">01. Featured Architecture</span>
           <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-4 tracking-tight text-white">Project Showcase</h2>
         </div>

         <motion.div 
           ref={sliderRef}
           style={{ x }}
           className="flex gap-6 sm:gap-12 lg:gap-20 items-center w-max pl-[7.5vw] lg:pl-[20vw] pr-[7.5vw] lg:pr-[20vw] py-4 sm:py-10 relative z-20"
         >
            {projects.map((proj, i) => (
              <ProjectCard key={proj.title} project={proj} index={i} progress={smoothProgress} total={projects.length} />
            ))}
         </motion.div>
         
         {/* Bottom Progress */}
         <div className="absolute bottom-4 sm:bottom-12 left-0 right-0 flex items-center justify-center gap-4 z-20 px-8">
           <div className="text-xs font-mono text-brand-blue/50">01</div>
           <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div className="absolute top-0 left-0 bottom-0 bg-brand-blue shadow-[0_0_10px_rgba(0,224,255,0.5)]" style={{ width: "100%", scaleX: smoothProgress, transformOrigin: 'left' }} />
           </div>
           <div className="text-xs font-mono text-brand-blue/50">0{projects.length}</div>
         </div>

      </div>
    </section>
  );
}

