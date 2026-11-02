"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { frameSources, playbackIndices, progressToFrame } from "./frames";
import { drawFrameContain, sizeCanvas } from "./drawFrame";
import { loadPreparedFrame } from "./prepareFrame";

type Props = {
  progress: MotionValue<number>;
  light?: boolean;
};

const DECODE_AT_ONCE = 6;

export default function MacBookSequence({ progress, light = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(ImageBitmap | null)[]>([]);
  const frameRef = useRef(0);
  const readyRef = useRef(false);
  const drawnRef = useRef(-1);
  const paintRef = useRef<() => void>(() => {});
  const progressRef = useRef(progress);
  const lightRef = useRef(light);
  progressRef.current = progress;
  lightRef.current = light;
  const scale = useTransform(progress, [0, 1], [1.12, 1.16]);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    if (!readyRef.current) return;
    const next = progressToFrame(value);
    if (next === frameRef.current) return;
    frameRef.current = next;
    paintRef.current();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let queued = false;
    let alive = true;

    const paintNow = () => {
      queued = false;
      if (!alive) return;

      const index = frameRef.current;
      const image = imagesRef.current[index];
      if (!image) return;

      const resized = sizeCanvas(canvas);
      if (!resized && index === drawnRef.current) return;

      drawFrameContain(ctx, image, canvas.width, canvas.height);
      drawnRef.current = index;
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
    const controller = new AbortController();
    const sources = frameSources();
    const order = playbackIndices();
    const images = new Array<ImageBitmap | null>(sources.length).fill(null);
    imagesRef.current = images;
    readyRef.current = false;
    drawnRef.current = -1;
    setReady(false);
    setLoaded(0);
    setTotal(order.length);

    let cursor = 0;
    let active = 0;
    let finished = 0;
    let disposed = false;

    const pump = () => {
      while (active < DECODE_AT_ONCE && cursor < order.length) {
        const index = order[cursor];
        cursor += 1;
        active += 1;
        loadPreparedFrame(sources[index], lightRef.current, controller.signal).then((bitmap) => {
          active -= 1;
          if (disposed || !bitmap) {
            bitmap?.close();
            if (!disposed) pump();
            return;
          }
          images[index]?.close();
          images[index] = bitmap;
          finished += 1;
          setLoaded(finished);
          if (index === 0 || index === frameRef.current) {
            drawnRef.current = -1;
            paintRef.current();
          }
          if (finished >= order.length) {
            readyRef.current = true;
            frameRef.current = progressToFrame(progressRef.current.get());
            drawnRef.current = -1;
            setReady(true);
            paintRef.current();
          }
          pump();
        });
      }
    };

    pump();

    return () => {
      disposed = true;
      controller.abort();
      readyRef.current = false;
      for (const bitmap of images) bitmap?.close();
      imagesRef.current = [];
    };
  }, [light]);

  const pct = total === 0 ? 0 : Math.round((loaded / total) * 100);

  return (
    <div className="absolute inset-0 overflow-hidden bg-white dark:bg-[#000000]">
      <motion.div style={{ scale }} className="absolute inset-0 origin-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 52% 46% at 50% 52%, rgba(214,226,255,0.42) 0%, rgba(11,70,253,0.2) 34%, rgba(11,70,253,0.06) 52%, transparent 70%)",
          }}
        />
        <canvas ref={canvasRef} className="relative z-10 block h-full w-full" aria-hidden />
      </motion.div>
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
