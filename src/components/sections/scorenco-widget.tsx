"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    iFrameResize?: (
      options: Record<string, unknown>,
      target: HTMLIFrameElement | HTMLIFrameElement[],
    ) => void;
    _scorencoResizerLoaded?: boolean;
  }
}

const RESIZER_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.9/iframeResizer.min.js";

function loadIframeResizer(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._scorencoResizerLoaded && window.iFrameResize) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RESIZER_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      if (window.iFrameResize) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = RESIZER_SRC;
    script.async = true;
    script.onload = () => {
      window._scorencoResizerLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("iframe-resizer load failed"));
    document.body.appendChild(script);
  });
}

interface ScorencoWidgetProps {
  widgetId: string;
  title?: string;
  badge?: string;
  minHeight?: number;
}

export function ScorencoWidget({
  widgetId,
  title,
  badge = "Score'n'co",
  minHeight = 320,
}: ScorencoWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const instanceId = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    loadIframeResizer()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.iFrameResize) return;
        window.iFrameResize(
          { checkOrigin: false, interval: 100, log: false },
          iframeRef.current,
        );
      })
      .catch(() => {
        /* iframe reste utilisable sans auto-resize */
      });

    return () => {
      cancelled = true;
    };
  }, [widgetId]);

  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-line bg-white">
      {title && (
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="font-display text-lg uppercase tracking-tight text-ink">
            {title}
          </h3>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
            {badge}
          </span>
        </div>
      )}
      <iframe
        ref={iframeRef}
        id={`scorenco-${widgetId}-${instanceId}`}
        src={`https://scorenco.com/widget/${widgetId}/?auto_height=true`}
        title={title ?? "Calendrier et résultats Score'n'co"}
        className="block w-full overflow-hidden border-0"
        style={{ minHeight }}
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}
