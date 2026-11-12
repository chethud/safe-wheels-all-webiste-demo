"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LivePreviewThumbProps {
  url: string;
  title: string;
  fallbackSrc?: string;
}

const FRAME_WIDTH = 1280;

export function LivePreviewThumb({
  url,
  title,
  fallbackSrc,
}: LivePreviewThumbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth || FRAME_WIDTH;
      setScale(width / FRAME_WIDTH);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [url]);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setFailed(true), 6000);
    return () => window.clearTimeout(timer);
  }, [url, loaded]);

  if (failed) {
    if (fallbackSrc) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f3efeb] p-8">
          <Image
            src={fallbackSrc}
            alt={`${title} logo`}
            width={320}
            height={180}
            className="max-h-full w-auto max-w-[78%] object-contain"
          />
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#f3efeb] px-6 text-center">
        <p className="text-sm font-medium text-charcoal/55">{title}</p>
        <p className="text-xs text-charcoal/40">
          Live preview blocked — open Ready to view
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-white">
      <iframe
        title={`${title} homepage preview`}
        src={url}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin"
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-white"
        style={{
          width: `${FRAME_WIDTH}px`,
          height: `${Math.ceil(FRAME_WIDTH * 0.7)}px`,
          transform: `scale(${scale})`,
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      {!loaded && fallbackSrc ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-[#f3efeb] p-8">
          <Image
            src={fallbackSrc}
            alt=""
            width={280}
            height={160}
            className="max-h-full w-auto max-w-[70%] object-contain opacity-80"
          />
        </div>
      ) : null}
    </div>
  );
}
