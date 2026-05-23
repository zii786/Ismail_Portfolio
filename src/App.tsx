/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { MouseSpotlight } from './components/MouseSpotlight';
import { NetworkBackground } from './components/NetworkBackground';

export default function App() {
  return (
    <div className="text-slate-200 min-h-screen selection:bg-brand-blue/30 selection:text-white">
      <NetworkBackground />
      <MouseSpotlight />
      <Navigation />
      
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      
      <Footer />
    </div>
  );
}
