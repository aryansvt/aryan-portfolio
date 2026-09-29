"use client";

import { useEffect, useRef } from "react";

// a real mouse only, and never with reduced motion
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// soft light that sits right under the mouse, behind the page
export function CursorGlow() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;
    const media = window.matchMedia(QUERY);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      light.style.setProperty("--glow-x", `${e.clientX}px`);
      light.style.setProperty("--glow-y", `${e.clientY}px`);
      if (!light.dataset.on) light.dataset.on = "true";
    };

    // fade out when the mouse leaves the window
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) delete light.dataset.on;
    };

    const stop = () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      delete light.dataset.on;
    };

    const sync = () => {
      stop();
      if (!media.matches) return;
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onOut);
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div className="glow" aria-hidden="true">
      <div className="glow-light" ref={lightRef} />
    </div>
  );
}
