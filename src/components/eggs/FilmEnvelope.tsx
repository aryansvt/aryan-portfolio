"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

// space kept between the envelope and the viewport edges, and between it and the words
const GUTTER = 16;
const GAP = 4;

// just past the longest closing animation in globals.css
const CLOSE_MS = 250;

type Phase = "closed" | "open" | "closing";

// the art is drawn at 1px per unit: a 216 x 135 body with a 96 tall flap hinged on its top edge
const FLAP_OUT = "M0,0H216L117.8,80.2Q108,88 98.2,80.2Z";
// the inside of the flap, drawn the way it reads once it has swung up
const FLAP_IN = "M0,96H216L117.8,15.8Q108,8 98.2,15.8Z";
const LINING_IN = "M9.5,92.6H206.5L116.8,19.3Q108,12.4 99.2,19.3Z";
const SIDE_LEFT = "M0,0L108,82.3Q112.6,85.8 110.6,90L110.6,135H0Z";
const SIDE_RIGHT = "M216,0L108,82.3Q103.4,85.8 105.4,90L105.4,135H216Z";
const BOTTOM = "M0,135L94.6,97.4Q108,90.6 121.4,97.4L216,135Z";

const SEAL =
  "M117.97,85C118.05,85.9 117.79,86.93 117.42,87.77C117.05,88.6 116.29,89.25 115.76,89.99C115.23,90.72 114.88,91.61 114.23,92.19C113.59,92.78 112.7,93.21 111.87,93.48C111.05,93.75 110.13,93.72 109.27,93.81C108.4,93.91 107.56,94.1 106.7,94.05C105.84,93.99 104.99,93.74 104.12,93.49C103.25,93.24 102.23,93.05 101.46,92.55C100.69,92.04 99.85,91.3 99.48,90.47C99.12,89.64 99.32,88.48 99.25,87.57C99.18,86.66 99.07,85.86 99.06,85C99.05,84.14 98.99,83.24 99.19,82.41C99.39,81.58 99.83,80.8 100.25,80.02C100.68,79.25 101.1,78.37 101.73,77.77C102.37,77.16 103.25,76.77 104.07,76.39C104.88,76.01 105.74,75.7 106.63,75.48C107.53,75.26 108.56,74.88 109.43,75.07C110.3,75.25 111.13,76.02 111.84,76.58C112.56,77.14 113.08,77.82 113.71,78.41C114.33,79 115.04,79.47 115.59,80.12C116.13,80.78 116.56,81.56 116.96,82.37C117.36,83.18 117.89,84.1 117.97,85Z";
// the seal breaks just above its middle: the cap rides up with the flap, the rest stays on the pocket
const CRACK = "96,82.4 99.8,83.1 102.2,82.1 105.3,83.8 107.4,83.2 110.6,84.3 113.9,82.9 116.4,83.6 120,82.8";
const SEAL_TOP = `M88,62V82.4H96L${CRACK}H128V62Z`;
const SEAL_LOW = `M88,82.4H96L${CRACK}H128V106H88Z`;
const KEY = "M106.6,85.8L110.2,89.4M109.1,88.3l0.8-0.8M110.2,89.4l0.8-0.8";

// gradients, grain, and shadows shared by every layer of the envelope
function Defs({ p }: { p: string }) {
  return (
    <svg className="envelope-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${p}-grain`} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0.15 0.15 0.15 0 0.275  0.15 0.15 0.15 0 0.275  0.15 0.15 0.15 0 0.275  0 0 0 0 1"
            result="tooth"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="9" />
          <feColorMatrix
            type="matrix"
            values="0.2 0.2 0.2 0 0.2  0.2 0.2 0.2 0 0.2  0.2 0.2 0.2 0 0.2  0 0 0 0 1"
          />
          <feComposite in="tooth" operator="arithmetic" k2="0.5" k3="0.5" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feBlend in2="SourceGraphic" mode="soft-light" />
        </filter>
        <filter id={`${p}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <filter id={`${p}-glow`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <filter id={`${p}-lift`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#02041a" floodOpacity="0.75" />
        </filter>
        <filter id={`${p}-wax`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="0.9" stdDeviation="0.7" floodColor="#01020e" floodOpacity="0.7" />
        </filter>

        <linearGradient id={`${p}-side-l`} x1="0" y1="0" x2="104" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f1e7a" />
          <stop offset="1" stopColor="#1a35a8" />
        </linearGradient>
        <linearGradient id={`${p}-side-r`} x1="216" y1="0" x2="112" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f1e7a" />
          <stop offset="1" stopColor="#1a35a8" />
        </linearGradient>
        <linearGradient id={`${p}-bottom`} x1="0" y1="92" x2="0" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f3cba" />
          <stop offset="1" stopColor="#122588" />
        </linearGradient>
        <radialGradient id={`${p}-light`} cx="108" cy="58" r="130" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7d97ff" stopOpacity="0.24" />
          <stop offset="0.5" stopColor="#5a7cff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </radialGradient>
        {/* fold light that fades out before the corners, so the paper stays matte */}
        <linearGradient id={`${p}-fade-glow`} x1="0" y1="0" x2="216" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0.12" stopColor="#5f82ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#5f82ff" stopOpacity="0.26" />
          <stop offset="0.88" stopColor="#5f82ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${p}-fade-edge`} x1="0" y1="0" x2="216" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0.08" stopColor="#a7bbff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a7bbff" stopOpacity="0.32" />
          <stop offset="0.92" stopColor="#a7bbff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${p}-flap-out`} x1="0" y1="0" x2="0" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2343cc" />
          <stop offset="1" stopColor="#142b95" />
        </linearGradient>
        <radialGradient id={`${p}-flap-light`} cx="108" cy="14" r="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8aa3ff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#8aa3ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-flap-in`} x1="0" y1="8" x2="0" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2141c2" />
          <stop offset="1" stopColor="#12267f" />
        </linearGradient>

        <linearGradient id={`${p}-lining`} x1="0" y1="0" x2="0" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5e112b" />
          <stop offset="0.45" stopColor="#3a0a1b" />
          <stop offset="1" stopColor="#14030a" />
        </linearGradient>
        <linearGradient id={`${p}-lining-flap`} x1="0" y1="12" x2="0" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#761838" />
          <stop offset="1" stopColor="#2c0713" />
        </linearGradient>
        {/* uneven vertical folds, like the curtains at Club Silencio */}
        <linearGradient id={`${p}-fold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.32" />
          <stop offset="0.55" stopColor="#ff8fae" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
        <pattern id={`${p}-folds`} width="26" height="140" patternUnits="userSpaceOnUse">
          <rect width="7" height="140" fill={`url(#${p}-fold)`} />
          <rect x="7" width="11" height="140" fill={`url(#${p}-fold)`} />
          <rect x="18" width="8" height="140" fill={`url(#${p}-fold)`} />
        </pattern>

        <radialGradient id={`${p}-seal`} cx="0.34" cy="0.28" r="0.85">
          <stop offset="0" stopColor="#9b2a48" />
          <stop offset="0.35" stopColor="#6a1731" />
          <stop offset="0.75" stopColor="#3a0a1a" />
          <stop offset="1" stopColor="#22050f" />
        </radialGradient>
        <linearGradient id={`${p}-seal-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc2d1" stopOpacity="0.6" />
          <stop offset="0.45" stopColor="#ffc2d1" stopOpacity="0.06" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={`${p}-seal-press`} cx="0.66" cy="0.7" r="0.8">
          <stop offset="0" stopColor="#5b1429" />
          <stop offset="1" stopColor="#2a0712" />
        </radialGradient>
        {/* the stamped disc is pressed in, so it's shaded top left and lit bottom right */}
        <linearGradient id={`${p}-seal-bevel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.65" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#ffc2d1" stopOpacity="0.45" />
        </linearGradient>

        <clipPath id={`${p}-seal-top`}>
          <path d={SEAL_TOP} transform="translate(0 1)" />
        </clipPath>
        <clipPath id={`${p}-seal-low`}>
          <path d={SEAL_LOW} />
        </clipPath>
        <clipPath id={`${p}-seal-shape`}>
          <path d={SEAL} />
        </clipPath>
        <clipPath id={`${p}-sides`}>
          <path d={SIDE_LEFT} />
          <path d={SIDE_RIGHT} />
        </clipPath>
        <clipPath id={`${p}-left`}>
          <path d={SIDE_LEFT} />
        </clipPath>
        <clipPath id={`${p}-pocket`}>
          <path d={SIDE_LEFT} />
          <path d={SIDE_RIGHT} />
          <path d={BOTTOM} />
        </clipPath>
      </defs>
    </svg>
  );
}

// dark wax pressed with a small key
function Seal({ p }: { p: string }) {
  return (
    <>
      <path d={SEAL} fill={`url(#${p}-seal)`} />
      <path d={SEAL} fill="none" stroke={`url(#${p}-seal-rim)`} strokeWidth="1" />
      <circle cx="108" cy="85" r="5.9" fill={`url(#${p}-seal-press)`} />
      <circle cx="108" cy="85" r="5.9" fill="none" stroke={`url(#${p}-seal-bevel)`} strokeWidth="0.9" />
      <g fill="none" strokeLinecap="round" strokeWidth="0.75">
        <g stroke="#ffb8c9" strokeOpacity="0.3" transform="translate(0.3 0.3)">
          <circle cx="105.6" cy="84.8" r="1.4" />
          <path d={KEY} />
        </g>
        <g stroke="#140309">
          <circle cx="105.6" cy="84.8" r="1.4" />
          <path d={KEY} />
        </g>
      </g>
      {/* wax is glossy where the paper is not */}
      <ellipse cx="104.3" cy="79.2" rx="2.7" ry="1.05" fill="#fff" opacity="0.3" transform="rotate(-38 104.3 79.2)" />
      <circle cx="102.6" cy="81.2" r="0.5" fill="#fff" opacity="0.45" />
      <ellipse cx="101.7" cy="86" rx="1.3" ry="0.5" fill="#fff" opacity="0.22" transform="rotate(-70 101.7 86)" />
      <ellipse cx="111.5" cy="91.2" rx="2.6" ry="0.8" fill="#ffc2d1" opacity="0.14" transform="rotate(-28 111.5 91.2)" />
    </>
  );
}

function Back({ p }: { p: string }) {
  return (
    <svg className="envelope-layer envelope-back" viewBox="0 0 216 135" aria-hidden="true" focusable="false">
      <rect width="216" height="135" rx="3" fill="#0b1763" />
      <rect x="3" y="3" width="210" height="129" rx="1.5" fill={`url(#${p}-lining)`} filter={`url(#${p}-grain)`} />
      <rect x="3" y="3" width="210" height="129" fill={`url(#${p}-folds)`} opacity="0.5" />
    </svg>
  );
}

function Flap({ p }: { p: string }) {
  return (
    <span className="envelope-flap" aria-hidden="true">
      <span className="envelope-face">
        <svg viewBox="0 0 216 96" focusable="false">
          <g filter={`url(#${p}-lift)`}>
            <path d={FLAP_OUT} fill={`url(#${p}-flap-out)`} filter={`url(#${p}-grain)`} />
          </g>
          <path d={FLAP_OUT} fill={`url(#${p}-flap-light)`} />
          <path d="M1.5,0.6H214.5" stroke="#b6c7ff" strokeOpacity="0.3" strokeWidth="0.8" />
          <path
            d="M0.8,0.8L98.2,80.2Q108,88 117.8,80.2L215.2,0.8"
            fill="none"
            stroke="#93abff"
            strokeOpacity="0.22"
            strokeWidth="0.7"
          />
          <g clipPath={`url(#${p}-seal-top)`}>
            <g filter={`url(#${p}-wax)`}>
              <Seal p={p} />
            </g>
          </g>
        </svg>
        <svg className="envelope-shade envelope-shade-out" viewBox="0 0 216 96" focusable="false">
          <path d={FLAP_OUT} />
        </svg>
      </span>
      <span className="envelope-face envelope-face-in">
        <svg viewBox="0 0 216 96" focusable="false">
          <path d={FLAP_IN} fill={`url(#${p}-flap-in)`} filter={`url(#${p}-grain)`} />
          <path d={LINING_IN} fill={`url(#${p}-lining-flap)`} filter={`url(#${p}-grain)`} />
          <path d={LINING_IN} fill={`url(#${p}-folds)`} opacity="0.45" />
          <path
            d={LINING_IN}
            fill="none"
            stroke="#ff9fb8"
            strokeOpacity="0.12"
            strokeWidth="0.6"
          />
        </svg>
        <svg className="envelope-shade envelope-shade-in" viewBox="0 0 216 96" focusable="false">
          <path d={FLAP_IN} />
        </svg>
      </span>
    </span>
  );
}

function Front({ p }: { p: string }) {
  return (
    <svg className="envelope-layer envelope-front" viewBox="0 0 216 135" aria-hidden="true" focusable="false">
      <g filter={`url(#${p}-grain)`}>
        <path d={SIDE_LEFT} fill={`url(#${p}-side-l)`} />
        {/* the right flap tucks over the left in the middle */}
        <g clipPath={`url(#${p}-left)`}>
          <path d={SIDE_RIGHT} fill="#030826" opacity="0.4" filter={`url(#${p}-soft)`} transform="translate(-1.2 0.4)" />
        </g>
        <path d={SIDE_RIGHT} fill={`url(#${p}-side-r)`} />
        {/* soft crease where the bottom flap lies over the sides */}
        <g clipPath={`url(#${p}-sides)`}>
          <path d={BOTTOM} fill="#030826" opacity="0.42" filter={`url(#${p}-soft)`} transform="translate(0 -1.2)" />
        </g>
        <path d={BOTTOM} fill={`url(#${p}-bottom)`} />
      </g>
      {/* stage light pooling on the folds */}
      <rect width="216" height="135" fill={`url(#${p}-light)`} clipPath={`url(#${p}-pocket)`} />
      <g clipPath={`url(#${p}-pocket)`}>
        <path
          d="M0,135L94.6,97.4Q108,90.6 121.4,97.4L216,135"
          fill="none"
          stroke={`url(#${p}-fade-glow)`}
          strokeWidth="3"
          filter={`url(#${p}-glow)`}
        />
      </g>
      <g fill="none" strokeLinecap="round">
        <path d="M0.6,0.5L107.6,82M215.4,0.5L108.4,82" stroke="#b6c7ff" strokeOpacity="0.4" strokeWidth="0.8" />
        <path d="M0,135L94.6,97.4Q108,90.6 121.4,97.4L216,135" stroke={`url(#${p}-fade-edge)`} strokeWidth="0.7" />
      </g>
      <g className="envelope-seal-low" filter={`url(#${p}-wax)`}>
        <g clipPath={`url(#${p}-seal-low)`}>
          <Seal p={p} />
          {/* the fresh edge where the wax broke catches the light */}
          <g clipPath={`url(#${p}-seal-shape)`}>
            <path
              d={`M${CRACK}`}
              fill="none"
              stroke="#ffc2d1"
              strokeOpacity="0.32"
              strokeWidth="0.6"
              strokeLinejoin="round"
              transform="translate(0 0.4)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

// a small blue envelope that opens next to the words, with a card inside
export function FilmEnvelope({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const open = phase === "open";
  const anchorRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const envelopeRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const id = useId();
  // svg references need a plain id
  const p = `env${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  const close = useCallback(() => {
    setPhase("closing");
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPhase("closed"), CLOSE_MS);
  }, []);

  const toggle = () => {
    if (open) {
      close();
      return;
    }
    window.clearTimeout(closeTimer.current);
    setPhase("open");
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // sit above the words when the viewport has room, otherwise below, and never past either edge
  useLayoutEffect(() => {
    if (!open) return;

    const place = () => {
      const anchor = anchorRef.current;
      const trigger = triggerRef.current;
      const envelope = envelopeRef.current;
      if (!anchor || !trigger || !envelope) return;

      const origin = anchor.getBoundingClientRect();
      const words = trigger.getBoundingClientRect();
      const width = envelope.offsetWidth;
      const height = envelope.offsetHeight;
      const viewport = document.documentElement.clientWidth;

      const left = Math.min(
        Math.max(words.left + words.width / 2 - width / 2, GUTTER),
        viewport - GUTTER - width,
      );
      const above = words.top - GAP - GUTTER;
      const below = window.innerHeight - words.bottom - GAP - GUTTER;
      const side = above >= height || above >= below ? "top" : "bottom";
      const top = side === "top" ? words.top - GAP - height : words.bottom + GAP;

      envelope.dataset.side = side;
      envelope.style.setProperty("--x", `${left - origin.left}px`);
      envelope.style.setProperty("--y", `${top - origin.top}px`);
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Node && anchorRef.current?.contains(e.target)) return;
      close();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <span className="film" ref={anchorRef}>
      <button
        type="button"
        className="film-trigger"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
      >
        <span className="hl">{children}</span>
      </button>
      {/* the card text is read out when the envelope appears */}
      <span id={id} aria-live="polite">
        {phase !== "closed" && (
          <span className="envelope" ref={envelopeRef} data-state={phase} aria-hidden={phase === "closing" || undefined}>
            <Defs p={p} />
            <span className="envelope-body">
              <Back p={p} />
              <Flap p={p} />
              <span className="envelope-slot">
                <span className="envelope-card">
                  <span className="envelope-title">Silencio.</span>{" "}
                  <span className="envelope-label">Favorite film</span>{" "}
                  <cite className="envelope-name">Mulholland Drive</cite>{" "}
                  <span className="envelope-year">(David Lynch, 2001)</span>
                  <span className="sr-only"> Press Escape to close.</span>
                </span>
              </span>
              <Front p={p} />
            </span>
          </span>
        )}
      </span>
    </span>
  );
}
