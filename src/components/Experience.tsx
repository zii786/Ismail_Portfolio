import React from 'react';
import { motion } from 'motion/react';

const experiences = [
  {
    year: "2023",
    title: "Walk With World",
    role: "Core Team Member",
    description: "Leading core initiatives and building scalable infrastructure for community-driven digital platforms.",
    alignment: "left"
  },
  {
    year: "2023 - 2024",
    title: "CS Department Club",
    role: "Co-Lead",
    description: "Orchestrating technical workshops and fostering a culture of innovation among 500+ student developers.",
    alignment: "right"
  },
  {
    year: "VARIOUS",
    title: "Hackathon Leadership",
    role: "Multiple Wins",
    description: "Consistently securing podium finishes and taking lead architect roles in high-pressure competitive environments.",
    alignment: "left"
  },
  {
    year: "INTERNSHIP_PROGRAM",
    title: "EduSkills × Palo Alto Networks",
    role: "Cybersecurity Virtual Internship",
    description: "Completed a 10-week virtual internship focused on cybersecurity fundamentals, threat analysis, network security concepts and industry practices.",
    alignment: "right",
    duration: "July 2025 – September 2025",
    badges: ["CYBERSECURITY", "PALO ALTO", "EDUSKILLS"]
  }
];

export function Experience() {
  return (
    <section id="timeline" className="py-20 md:py-24 px-6 md:px-0 w-full md:w-[88vw] lg:w-[92vw] max-w-[1600px] mx-auto relative cursor-default">
      <div className="text-center mb-20">
        <span className="font-mono text-brand-blue text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">02. Professional Journey</span>
        <h2 className="font-display text-[2.75rem] md:text-5xl font-bold mt-4 tracking-tight">Experience Timeline</h2>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Central Vertical Line (responsive left/center alignment) */}
        <div className="absolute left-[17px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-blue/0 via-brand-blue/50 to-brand-blue/0 -translate-x-1/2" />

        <div className="space-y-16 md:space-y-24">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex items-center w-full ${exp.alignment === 'left' ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <div className={`w-full md:w-1/2 ${exp.alignment === 'left' ? 'pl-10 pr-0 md:pl-0 md:pr-12 md:pr-16 text-left origin-right' : 'pl-10 md:pl-12 md:pl-16 text-left origin-left'}`}>
                 <div className="bg-black/40 border border-slate-800 p-5 md:p-8 rounded-lg hover:border-brand-blue/50 hover:shadow-[0_0_15px_rgba(0,224,255,0.2)] transition-all duration-300 relative group">
                    {/* Node on the line (responsive left/right positioning) */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,224,255,0.8)] border border-[#020203] ${exp.alignment === 'left' ? 'left-[-28px] md:left-auto md:-right-[69px]' : 'left-[-28px] md:-left-[69px]'}`} />
                    
                    <span className="font-mono text-brand-blue text-[15px] mb-3 block">{exp.year}</span>
                    <h3 className="font-sans text-xl md:text-[26px] text-white font-medium mb-1 md:mb-2">{exp.title}</h3>
                    <div className="font-sans text-gray-400 text-sm md:text-[15px] mb-4 md:mb-5">{exp.role}</div>
                    <p className="font-sans text-gray-500 text-[15px] md:text-base leading-[1.6]">
                      {exp.description}
                    </p>
                    {exp.duration && (
                      <div className="font-mono text-gray-400 text-[11px] uppercase tracking-widest mt-4 md:mt-5 mb-2 md:mb-3">Duration: {exp.duration}</div>
                    )}
                    {exp.badges && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.badges.map((badge, idx) => (
                          <span key={idx} className="skill-tag">{badge}</span>
                        ))}
                      </div>
                    )}
                 </div>
              </div>
            </motion.div>
          ))}

          {/* Future Interests Section */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="w-full relative mt-16 md:mt-28 flex flex-col items-center text-center"
          >
             <div className="font-mono text-[13px] terminal-text uppercase tracking-widest mb-6 opacity-50">Future_Interests</div>
             <div className="flex flex-wrap justify-center items-center gap-4 text-[13px] md:text-[15px] text-slate-300 font-sans">
                <span>AI Systems</span>
                <span className="text-brand-blue/50">•</span>
                <span>Security Engineering</span>
                <span className="text-brand-blue/50">•</span>
                <span>High Performance Computing</span>
             </div>
             <div className="font-mono text-[10px] text-slate-600 mt-8 uppercase tracking-widest">
                Also exploring intersections in motorsport tech (Formula 1).
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
