import React, { useRef, useEffect } from 'react';

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Mouse position
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Neural nodes
    const numNodes = 25; // 15-25 nodes
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; baseVx: number; baseVy: number }[] = [];
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2, // Drift slowly
            vy: (Math.random() - 0.5) * 0.2,
            baseVx: (Math.random() - 0.5) * 0.2,
            baseVy: (Math.random() - 0.5) * 0.2,
            radius: Math.random() * 1 + 1, // 2-4px diameter
        });
    }

    // Dust particles
    const numDust = 15;
    const dusts: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < numDust; i++) {
        dusts.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.05,
            vy: (Math.random() - 0.5) * 0.05,
            radius: Math.random() * 0.5 + 0.2,
        });
    }

    let pulsePath: { from: number, to: number, opacity: number } | null = null;
    let lastPulseTime = 0;

    const render = (time: number) => {
        ctx.clearRect(0, 0, width, height);

        // Update & draw nodes
        nodes.forEach((node) => {
            // Mouse attraction
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 200) {
               node.vx += (dx / dist) * 0.002;
               node.vy += (dy / dist) * 0.002;
            } else {
               node.vx += (node.baseVx - node.vx) * 0.01;
               node.vy += (node.baseVy - node.vy) * 0.01;
            }
            
            // Limit speed
            const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (speed > 0.8) {
              node.vx = (node.vx / speed) * 0.8;
              node.vy = (node.vy / speed) * 0.8;
            }

            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges smoothly
            if (node.x < 0) { node.x = 0; node.vx *= -1; node.baseVx *= -1; }
            if (node.x > width) { node.x = width; node.vx *= -1; node.baseVx *= -1; }
            if (node.y < 0) { node.y = 0; node.vy *= -1; node.baseVy *= -1; }
            if (node.y > height) { node.y = height; node.vy *= -1; node.baseVy *= -1; }

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 224, 255, 0.4)`;
            ctx.fill();
        });

        // Trigger random pulse (Occasional event)
        if (time - lastPulseTime > Math.random() * 5000 + 4000) {
            pulsePath = {
                from: Math.floor(Math.random() * numNodes),
                to: Math.floor(Math.random() * numNodes),
                opacity: 1 // Start bright
            };
            lastPulseTime = time;
        }

        // Draw connections
        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 1; j < numNodes; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];
                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 250) { // Connect nearby nodes
                    let opacity = (1 - dist / 250) * 0.15; // Low opacity
                    let lineWidth = 0.5;

                    // Mouse proximity brighten
                    const pDx = mouse.x - (nodeA.x + nodeB.x) / 2;
                    const pDy = mouse.y - (nodeA.y + nodeB.y) / 2;
                    const mouseDist = Math.sqrt(pDx * pDx + pDy * pDy);
                    if (mouseDist < 150) {
                        opacity += (1 - mouseDist / 150) * 0.3;
                        lineWidth = 1;
                    }

                    // Occasional pulse
                    if (pulsePath && ((pulsePath.from === i && pulsePath.to === j) || (pulsePath.from === j && pulsePath.to === i))) {
                        opacity = pulsePath.opacity;
                        lineWidth = 1.5;
                        pulsePath.opacity -= 0.015; // Fade out smoothly
                        if (pulsePath.opacity <= 0) pulsePath = null;
                        
                        // Also pulse glow color
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = 'rgba(0, 224, 255, 0.8)';
                    } else {
                        ctx.shadowBlur = 0;
                    }
                    
                    ctx.beginPath();
                    ctx.moveTo(nodeA.x, nodeA.y);
                    ctx.lineTo(nodeB.x, nodeB.y);
                    ctx.strokeStyle = `rgba(0, 224, 255, ${opacity})`;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
            }
        }
        
        ctx.shadowBlur = 0; // Reset shadow

        // Update & draw dust
        dusts.forEach(dust => {
            dust.x += dust.vx;
            dust.y += dust.vy;

            if (dust.x < 0) { dust.x = width; }
            if (dust.x > width) { dust.x = 0; }
            if (dust.y < 0) { dust.y = height; }
            if (dust.y > height) { dust.y = 0; }

            ctx.beginPath();
            ctx.arc(dust.x, dust.y, dust.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, 0.15)`; // Very subtle glow
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseout', handleMouseLeave);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
