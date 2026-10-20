import { useEffect, useRef } from 'react';

/**
 * iPadOS-style pointer: a small translucent dot that follows the mouse, morphs to wrap buttons and
 * links, becomes a text bar over inputs, and squeezes when pressed. Mouse only; touch keeps native behaviour.
 */

const INTERACTIVE =
  'a[href], button:not([disabled]), [role="button"], summary, select, label[for], [data-cursor="hover"], input[type="checkbox"], input[type="radio"]';
const TEXT_FIELD =
  'input:not([type]), input[type="text"], input[type="search"], input[type="email"], input[type="url"], textarea, [contenteditable="true"]';

const DOT = 14;
const LARGE_W = 340; // bigger than this and the pointer stays a ring instead of wrapping the element
const LARGE_H = 130;

type Mode = 'dot' | 'hover' | 'large' | 'text';

interface Frame {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  s: number;
}

function pickRect(el: Element, mx: number, my: number): DOMRect {
  const rects = Array.from(el.getClientRects());
  const hit = rects.find((r) => mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom);
  return hit ?? el.getBoundingClientRect();
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = { x: -100, y: -100 };
    const cur: Frame = { x: -100, y: -100, w: DOT, h: DOT, r: DOT / 2, s: 1 };
    let target: Element | null = null;
    let mode: Mode = 'dot';
    let pressed = false;
    let visible = false;
    let raf = 0;
    let last = 0;

    const setMode = (m: Mode) => {
      if (m !== mode) {
        mode = m;
        el.dataset.mode = m;
      }
    };

    const classify = (node: EventTarget | null) => {
      const n = node instanceof Element ? node : null;
      const text = n?.closest(TEXT_FIELD) ?? null;
      if (text) {
        target = text;
        setMode('text');
        return;
      }
      const hit = n?.closest(INTERACTIVE) ?? null;
      target = hit;
      if (!hit) {
        setMode('dot');
        return;
      }
      const r = pickRect(hit, mouse.x, mouse.y);
      setMode(r.width > LARGE_W || r.height > LARGE_H ? 'large' : 'hover');
    };

    const frame = (now: number) => {
      const dt = Math.min(now - (last || now), 50);
      last = now;
      // frame-rate independent smoothing
      const kPos = reduced ? 1 : 1 - Math.exp(-dt / 38);
      const kShape = reduced ? 1 : 1 - Math.exp(-dt / 70);

      let tx = mouse.x;
      let ty = mouse.y;
      let tw = DOT;
      let th = DOT;
      let tr = DOT / 2;

      if (mode === 'text') {
        tw = 3;
        th = 22;
        tr = 2;
      } else if (target && mode === 'hover') {
        const r = pickRect(target, mouse.x, mouse.y);
        const padX = r.height < 44 ? 12 : 8;
        const padY = r.height < 44 ? 7 : 6;
        tw = r.width + padX * 2;
        th = r.height + padY * 2;
        const cs = getComputedStyle(target);
        const base = parseFloat(cs.borderTopLeftRadius) || 8;
        tr = Math.min(base + Math.min(padX, padY), th / 2);
        // a little magnetic pull towards the pointer, like iPadOS
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = cx + (mouse.x - cx) * 0.12;
        ty = cy + (mouse.y - cy) * 0.18;
      } else if (mode === 'large') {
        tw = 26;
        th = 26;
        tr = 13;
      }

      const ts = pressed ? (mode === 'hover' ? 0.94 : 0.8) : 1;

      const snap = mode === 'hover' ? kShape : kPos;
      cur.x += (tx - cur.x) * snap;
      cur.y += (ty - cur.y) * snap;
      cur.w += (tw - cur.w) * kShape;
      cur.h += (th - cur.h) * kShape;
      cur.r += (tr - cur.r) * kShape;
      cur.s += (ts - cur.s) * (reduced ? 1 : 1 - Math.exp(-dt / 45));

      el.style.width = `${cur.w}px`;
      el.style.height = `${cur.h}px`;
      el.style.borderRadius = `${cur.r}px`;
      el.style.transform = `translate3d(${cur.x - cur.w / 2}px, ${cur.y - cur.h / 2}px, 0) scale(${cur.s})`;

      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const show = () => {
      visible = true;
      el.style.opacity = '1';
      start();
    };
    const hide = () => {
      visible = false;
      el.style.opacity = '0';
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!root.classList.contains('has-cursor')) {
        root.classList.add('has-cursor');
        // first sighting: start at the pointer instead of sliding in from the corner
        cur.x = e.clientX;
        cur.y = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      classify(e.target);
      if (!visible) show();
    };

    const onTouch = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        root.classList.remove('has-cursor');
        hide();
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => hide();
    const onEnter = () => {
      if (root.classList.contains('has-cursor')) show();
    };
    const onScrollOrResize = () => classify(document.elementFromPoint(mouse.x, mouse.y));
    const onVisibility = () => {
      if (document.hidden) hide();
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onTouch, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onTouch);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('visibilitychange', onVisibility);
      root.classList.remove('has-cursor');
    };
  }, []);

  return <div ref={ref} className="ios-cursor" data-mode="dot" aria-hidden="true" />;
}
