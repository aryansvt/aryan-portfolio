"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// matches the 4.2s css animation, plus a little slack
const RUNTIME = 4300;

function Cinema() {
  return (
    <div className="cinema" aria-hidden="true">
      <div className="cinema-wash">
        <div className="cinema-grain" />
      </div>
      <div className="cinema-bar cinema-top" />
      <div className="cinema-bar cinema-bottom" />
    </div>
  );
}

// letterbox bars and grain for a few seconds
export function FilmsLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [take, setTake] = useState(0);
  const hideTimer = useRef<number | undefined>(undefined);
  const disarm = useRef<(() => void) | null>(null);

  const roll = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    setTake((t) => t + 1);
    hideTimer.current = window.setTimeout(() => setTake(0), RUNTIME);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(hideTimer.current);
      disarm.current?.();
    },
    [],
  );

  // the link opens letterboxd in a new tab, so wait for the visitor to come back
  const arm = () => {
    disarm.current?.();
    let left = false;
    let fallback = 0;

    const stop = () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(fallback);
      disarm.current = null;
    };

    function onVisibility() {
      if (document.visibilityState === "hidden") {
        left = true;
      } else if (left) {
        stop();
        window.setTimeout(roll, 300);
      }
    }

    // the tab never hid (background tab or blocked popup), so roll now
    fallback = window.setTimeout(() => {
      if (left) return;
      stop();
      roll();
    }, 800);

    document.addEventListener("visibilitychange", onVisibility);
    disarm.current = stop;
  };

  const overlay = take > 0 && createPortal(<Cinema key={take} />, document.body);

  if (!href) {
    return (
      <>
        <button type="button" className="egg" onClick={roll}>
          {children}
        </button>
        {overlay}
      </>
    );
  }

  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" className="hl" onClick={arm}>
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
      {overlay}
    </>
  );
}
