"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Shot = { id: number; x: number; y: number };

// most swishes on screen at once
const MAX_SHOTS = 5;

function Swish({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  return (
    <div
      className="swish"
      style={{ left: x - 30, top: y - 12 }}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) onDone();
      }}
    >
      <svg viewBox="0 0 60 90" width="60" height="90" aria-hidden="true">
        <path className="swish-rim" d="M14 34a16 4.5 0 0 1 32 0" />
        <g className="swish-ball">
          <circle cx="30" cy="12" r="6.5" fill="#d9773a" stroke="#3b170c" strokeWidth="1.2" />
          <path d="M23.5 12h13M30 5.5v13" stroke="#3b170c" strokeWidth="1.1" />
        </g>
        <g className="swish-net">
          <path d="M14 34 21 58M22 35.5l3.5 22.5M30 36v22.5M38 35.5 34.5 58M46 34l-7 24M17 44q13 3 26 0M19.5 52q10.5 2.5 21 0" />
        </g>
        <path className="swish-rim" d="M14 34a16 4.5 0 0 0 32 0" />
      </svg>
    </div>
  );
}

export function HoopsToggle() {
  const [on, setOn] = useState(false);
  const [shots, setShots] = useState<Shot[]>([]);
  const [message, setMessage] = useState("");
  const nextId = useRef(0);

  useEffect(() => {
    if (!on) return;
    const root = document.documentElement;
    root.classList.add("hoops");

    const onClick = (e: MouseEvent) => {
      // keyboard activation has no pointer position
      if (e.detail === 0) return;
      if (e.target instanceof Element && e.target.closest("[data-hoops]")) return;
      nextId.current += 1;
      const shot = { id: nextId.current, x: e.clientX, y: e.clientY };
      setShots((list) => [...list.slice(-(MAX_SHOTS - 1)), shot]);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOn(false);
      setMessage("Basketball cursor off.");
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("hoops");
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [on]);

  const toggle = () => {
    setOn(!on);
    setMessage(
      on ? "Basketball cursor off." : "Basketball cursor on. Click basketball again or press Escape to turn it off.",
    );
  };

  return (
    <>
      <button type="button" className="egg" aria-pressed={on} data-hoops onClick={toggle}>
        basketball
      </button>
      <span className="sr-only" aria-live="polite">
        {message}
      </span>
      {shots.length > 0 &&
        createPortal(
          shots.map((shot) => (
            <Swish
              key={shot.id}
              x={shot.x}
              y={shot.y}
              onDone={() => setShots((list) => list.filter((s) => s.id !== shot.id))}
            />
          )),
          document.body,
        )}
    </>
  );
}
