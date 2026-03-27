import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const waypoints = [
  { id: 'sun', title: 'THE SUN', subtitle: 'The Heart of Our System', progress: 0.0 },
  { id: 'mars', title: 'MARS', subtitle: 'The Red Planet', progress: 0.333 },
  { id: 'venus', title: 'VENUS', subtitle: 'The Morning Star', progress: 0.666 },
  { id: 'earth', title: 'EARTH', subtitle: 'Our Home', progress: 1.0 },
];

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    // Fade out top title on scroll
    const topTitle = container.querySelector('#top-title');
    if (topTitle) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: () => `+=${totalScroll() * 0.1}`,
        onEnter: () => gsap.to(topTitle, { opacity: 1, duration: 0.5 }),
        onLeave: () => gsap.to(topTitle, { opacity: 0, duration: 0.5 }),
        onEnterBack: () => gsap.to(topTitle, { opacity: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to(topTitle, { opacity: 1, duration: 0.5 }),
      });
    }

    waypoints.forEach((wp, index) => {
      const el = container.querySelector(`#text-${wp.id}`);
      if (!el) return;

      const isLast = index === waypoints.length - 1;
      const radius = 0.05;
      const startProgress = wp.id === 'earth' ? 0.90 : Math.max(0, wp.progress - radius);
      const endProgress = wp.id === 'earth' ? 1.0 : Math.min(0.80, wp.progress + 0.01);

      ScrollTrigger.create({
        trigger: document.body,
        start: () => `+=${startProgress * totalScroll()}`,
        end: () => `+=${endProgress * totalScroll()}`,
        onEnter: () => {
          if (wp.id === 'earth') {
            gsap.set('#text-venus', { opacity: 0 });
          }
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", overwrite: true }
          );
        },
        onLeave: () => {
          if (!isLast) {
            gsap.to(el, { opacity: 0, y: -20, duration: 0.1, ease: "power2.in", overwrite: true });
          }
        },
        onEnterBack: () => {
          gsap.fromTo(el,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", overwrite: true }
          );
        },
        onLeaveBack: () => {
          if (index !== 0) {
            gsap.to(el, { opacity: 0, y: 20, duration: 0.1, ease: "power2.in", overwrite: true });
          }
        },
        invalidateOnRefresh: true,
      });

      gsap.set(el, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 20 });
    });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[50] flex flex-col items-center pt-10 text-center">

      {/* Top Title */}
      <div id="top-title" className="flex flex-col items-center justify-center text-slate-50">
        <h1 className="text-4xl font-light tracking-widest uppercase mb-2">Solar<br />System</h1>
        <p className="text-xs tracking-widest opacity-70">A HYPER-REALISTIC JOURNEY</p>
        <p className="text-sm tracking-widest uppercase mt-4 animate-pulse opacity-60">Scroll to explore ↓</p>
      </div>

      {/* Dynamic Planet Waypoints */}
      <div className="relative w-full flex-1 flex items-center justify-center -mt-20">
        {waypoints.map((wp) => {
          const isSun = wp.id === 'sun';
          const textColor = isSun ? 'text-black' : 'text-cyan-400';
          const shadowClassTitle = isSun ? '' : 'drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]';
          const shadowClassSub = isSun ? '' : 'drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]';

          return (
            <div
              key={wp.id}
              id={`text-${wp.id}`}
              className={`absolute flex flex-col items-center justify-center px-4 opacity-0 ${textColor}`}
            >
              <div className="backdrop-blur-[1px] bg-black/10 p-10 rounded-3xl flex flex-col items-center text-center">
                <h2 className={`text-5xl md:text-8xl font-extralight tracking-[0.2em] uppercase ${shadowClassTitle}`}>
                  {wp.title}
                </h2>
                <p className={`mt-4 text-xl md:text-2xl font-light tracking-[0.3em] uppercase opacity-80 ${shadowClassSub}`}>
                  {wp.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
