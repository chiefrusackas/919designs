import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function GlobalWipe() {
  const location = useLocation();
  const panelRef = useRef(null);
  const lastPathRef = useRef(location.pathname);
  const isTransitioningRef = useRef(false);

  // On mount: force GPU layer promotion immediately so first animation is smooth
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    // Set the initial off-screen position using translate3d to trigger GPU compositing
    panel.style.transform = 'translate3d(-100%, 0, 0)';
    // Force a reflow/repaint to ensure the GPU layer is fully allocated before any animation
    void panel.offsetWidth;
  }, []);

  useEffect(() => {
    if (lastPathRef.current === location.pathname || isTransitioningRef.current) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) return;

    const triggerWipe = async () => {
      isTransitioningRef.current = true;
      lastPathRef.current = location.pathname;

      // Enable transition for the cover move
      panel.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';

      // Step 1: Cover — sweep in from left
      panel.style.transform = 'translate3d(0%, 0, 0)';

      await new Promise(resolve => setTimeout(resolve, 600)); // 0.5s + buffer

      // Step 2: Hold so new page can paint behind the panel
      await new Promise(resolve => setTimeout(resolve, 80));

      // Step 3: Reveal — sweep out to right
      panel.style.transform = 'translate3d(100%, 0, 0)';

      await new Promise(resolve => setTimeout(resolve, 550)); // 0.5s + buffer

      // Step 4: Reset instantly (no transition) back to left
      panel.style.transition = 'none';
      panel.style.transform = 'translate3d(-100%, 0, 0)';

      isTransitioningRef.current = false;
    };

    triggerWipe();
  }, [location.pathname]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#D32F2F',
          // translate3d instead of translateX for GPU compositing
          transform: 'translate3d(-100%, 0, 0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
}
