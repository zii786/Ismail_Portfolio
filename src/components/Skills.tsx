import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { Code2, Database, Sparkles, Shield } from 'lucide-react';

const categories = [
  {
    title: "LANGUAGES",
    icon: <Code2 className="w-8 h-8" />,
    skills: ["🐍 Python", "⚙ C", "🧩 C++", "🦀 Rust", "🛢 SQL"]
  },
  {
    title: "BACKEND & SYSTEMS",
    icon: <Database className="w-8 h-8" />,
    skills: ["⚡ FastAPI", "🌶 Flask", "🔌 REST APIs", "🏗 System Design", "🔥 Firebase", "🌐 NGINX", "🧵 Threading", "⚡ Real-Time Processing"]
  },
  {
    title: "AI / ML",
    icon: <Sparkles className="w-8 h-8" />,
    skills: ["🧠 Machine Learning", "🔍 Anomaly Detection", "📊 Log Analysis", "👁 CLIP", "💬 BLIP", "🧬 Embeddings", "🛡 Threat Detection", "🧩 Pattern Recognition"]
  },
  {
    title: "TOOLS & SECURITY",
    icon: <Shield className="w-8 h-8" />,
    skills: ["🐳 Docker", "🐙 Git", "🐧 Linux", "🛡 OWASP", "🔐 RBAC", "🧱 WAF", "🛑 IP Blocking", "🔒 Cybersecurity"]
  }
];

const marqueeItems = [ "Docker", "FastAPI", "NGINX", "Python", "ML", "CLIP", "BLIP", "OWASP", "REST APIs", "Git", "Linux", "Threat Detection", "Embeddings", "Log Analysis", "Firebase" ];

const SkillCard: React.FC<{ category: any; index: number }> = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 224, 255, 0.15), transparent 80%)`;

  const floatDelay = index * 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 7 + index * 1.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        className="h-full"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          className="bg-[#0a0a0c]/80 backdrop-blur-md border border-brand-blue/30 p-8 lg:p-10 rounded-xl hover:border-brand-blue/50 hover:shadow-[0_0_20px_rgba(0,224,255,0.2)] transition-all duration-300 relative group h-full flex flex-col justify-center overflow-hidden cursor-crosshair"
        >
          {/* Mouse Spotlight */}
          {isHovered && (
            <motion.div
              className="absolute pointer-events-none inset-0 z-0 transition-opacity duration-300 opacity-100"
              style={{ background }}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
          
          <div className="relative z-10 flex flex-col h-full justify-center">
            <div className="w-20 h-20 rounded-lg bg-black border border-brand-blue/30 flex items-center justify-center mb-8 text-brand-blue group-hover:shadow-[0_0_20px_rgba(0,224,255,0.6)] group-hover:text-white group-hover:border-brand-blue/60 transition-all duration-300 glow-cyan">
               {category.icon}
            </div>
            
            <h3 className="font-display text-[2rem] md:text-3xl text-white font-bold mb-6 tracking-wide">
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-5 mt-2">
               {category.skills.map((skill: string, idx: number) => (
                 <motion.div
                   key={skill}
                   whileHover={{ scale: 1.05 }}
                   animate={{ opacity: [0.8, 1, 0.8] }}
                   transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
                   className="px-4 py-2 border border-brand-blue/20 bg-brand-blue/5 rounded-md font-mono text-[14px] md:text-[15px] text-slate-300 hover:border-brand-blue hover:text-white transition-all cursor-crosshair relative overflow-hidden group/chip hover:shadow-[0_0_15px_rgba(0,224,255,0.5)]"
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent -translate-x-[150%] animate-[sweep_5s_ease-in-out_infinite]" style={{ animationDelay: `${idx * 0.5}s` }} />
                   <div className="absolute inset-0 bg-brand-blue/0 group-hover/chip:bg-brand-blue/10 transition-colors duration-300" />
                   <span className="relative z-10 whitespace-nowrap">{skill}</span>
                 </motion.div>
               ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const connectionLines = React.useMemo(() => {
    return Array.from({ length: 15 }).map(() => {
      const x1 = Math.random() * 100;
      const y1 = Math.random() * 100;
      const x2 = x1 + (Math.random() * 30 - 15);
      const y2 = y1 + (Math.random() * 30 - 15);
      const duration = 4 + Math.random() * 4;
      const delay = Math.random() * 5;
      return { x1, y1, x2, y2, duration, delay };
    });
  }, []);

  const backgroundParticles = React.useMemo(() => {
    return Array.from({ length: 25 }).map(() => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.1;
      const duration = Math.random() * 8 + 5;
      return { top, left, opacity, duration };
    });
  }, []);

  return (
    <section id="skills" className="pt-16 pb-20 md:pb-28 px-6 md:px-0 w-full md:w-[88vw] lg:w-[92vw] max-w-[1600px] mx-auto cursor-default overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent pointer-events-none opacity-40 z-0" />
      
      {/* Background Particles */}
      {backgroundParticles.map((p, i) => (
        <motion.div
           key={`particle-${i}`}
           className="absolute w-1 h-1 bg-brand-blue/40 rounded-full z-0"
           initial={{
             top: `${p.top}%`,
             left: `${p.left}%`,
             opacity: p.opacity
           }}
           animate={{
             y: [0, -40, 0],
             opacity: [0.1, 0.6, 0.1],
           }}
           transition={{
             duration: p.duration,
             repeat: Infinity,
             ease: "easeInOut"
           }}
        />
      ))}

      {/* Subtle Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-30">
          <defs>
             <radialGradient id="line-gradient" cx="50%" cy="50%" r="50%">
               <stop offset="0%" stopColor="#00e0ff" stopOpacity="1" />
               <stop offset="100%" stopColor="transparent" stopOpacity="0" />
             </radialGradient>
          </defs>
          {connectionLines.map((line, i) => (
             <motion.line
               key={`line-${i}`}
               x1={`${line.x1}%`} y1={`${line.y1}%`} x2={`${line.x2}%`} y2={`${line.y2}%`}
               stroke="url(#line-gradient)" strokeWidth="0.5"
               animate={{ opacity: [0, 0.6, 0] }}
               transition={{ duration: line.duration, repeat: Infinity, delay: line.delay }}
             />
          ))}
      </svg>
      
      <div className="text-center mb-16 relative z-10">
         <span className="font-mono text-brand-blue text-[13px] tracking-[0.2em] uppercase font-semibold">03. Technical Arsenal</span>
         <h2 className="font-display text-[2.75rem] md:text-5xl font-bold mt-4 tracking-tight">TECHNICAL ARSENAL</h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 w-[95%] lg:w-[92%] mx-auto">
        {categories.map((category, i) => (
           <SkillCard key={category.title} category={category} index={i} />
        ))}
      </div>

      <div className="group flex w-full overflow-hidden whitespace-nowrap bg-[#0a0a0c]/80 backdrop-blur-md border-y border-brand-blue/20 py-8 mt-28 relative z-10 hover:border-brand-blue/40 transition-colors shadow-[0_0_30px_rgba(0,224,255,0.05)]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
             <div key={i} className="flex items-center space-x-12 px-6">
                <span className="font-mono text-[13px] text-brand-blue/80 uppercase tracking-widest">{item}</span>
                <span className="text-brand-blue/30">•</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
