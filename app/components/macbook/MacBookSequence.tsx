"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { frameSources, nearestLoaded, progressToFrame } from "./frames";
import { preloadFrames } from "./preloadFrames";
import { drawFrameContain, sizeCanvas } from "./drawFrame";

type Props = {
  progress: MotionValue<number>;
  light?: boolean;
};

export default function MacBookSequence({ progress, light = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef(0);
  const readyRef = useRef(false);
  const drawnRef = useRef(-1);
  const themeDrawnRef = useRef(light);
  const paintRef = useRef<() => void>(() => {});
  const progressRef = useRef(progress);
  const lightRef = useRef(light);
  progressRef.current = progress;
  lightRef.current = light;
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [ready, setReady] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    if (!readyRef.current) return;
    const next = progressToFrame(value, imagesRef.current.length);
    if (next === frameRef.current) return;
    frameRef.current = next;
    paintRef.current();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
    if (!ctx) return;

    let raf = 0;
    let queued = false;
    let alive = true;

    const paintNow = () => {
      queued = false;
      if (!alive) return;

      const canDraw = readyRef.current || Boolean(imagesRef.current[0]);
      if (!canDraw) return;

      const index = readyRef.current ? frameRef.current : 0;
      const resized = sizeCanvas(canvas);
      const theme = lightRef.current;
      if (!resized && index === drawnRef.current && theme === themeDrawnRef.current) return;

      const image = nearestLoaded(imagesRef.current, index);
      if (!image) return;

      drawFrameContain(ctx, image, canvas.width, canvas.height, theme);
      drawnRef.current = index;
      themeDrawnRef.current = theme;
    };

    const requestPaint = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(paintNow);
    };

    paintRef.current = requestPaint;

    const onResize = () => {
      drawnRef.current = -1;
      requestPaint();
    };

    const observer = new ResizeObserver(onResize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    window.addEventListener("resize", onResize);
    requestPaint();

    return () => {
      alive = false;
      paintRef.current = () => {};
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    drawnRef.current = -1;
    paintRef.current();
  }, [light]);

  useEffect(() => {
    const cancel = { cancelled: false };
    const sources = frameSources();
    imagesRef.current = new Array(sources.length).fill(null);
    setTotal(sources.length);

    let lastBucket = -1;
    preloadFrames(
      sources,
      (count, frameTotal) => {
        if (cancel.cancelled) return;
        const bucket = Math.floor((count / frameTotal) * 25);
        if (bucket !== lastBucket || count === frameTotal) {
          lastBucket = bucket;
          setLoaded(count);
        }
      },
      cancel,
      (index, image) => {
        if (cancel.cancelled) return;
        imagesRef.current[index] = image;
        if (index === 0) paintRef.current();
      },
    ).then((images) => {
      if (cancel.cancelled) return;
      imagesRef.current = images;
      readyRef.current = true;
      frameRef.current = progressToFrame(progressRef.current.get(), images.length);
      drawnRef.current = -1;
      setReady(true);
      setLoaded(sources.length);
      paintRef.current();
    });

    return () => {
      cancel.cancelled = true;
      readyRef.current = false;
      imagesRef.current = [];
    };
  }, []);

  const pct = total === 0 ? 0 : Math.round((loaded / total) * 100);

  return (
    <div className="absolute inset-0 bg-white dark:bg-[#000000]">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
      {!ready && (
        <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center">
          <div className="w-36">
            <div className="h-px w-full bg-black/15 dark:bg-white/20">
              <div className="h-px bg-[#0B46FD]" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-center text-[10px] font-medium tracking-[0.25em] text-black/45 uppercase dark:text-white/50">
              {pct}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
