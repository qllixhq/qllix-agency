"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Maximize2, MoreVertical, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

function timestamp(seconds: number) {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

export default function TestimonialVimeoPlayer({ src, title, onInteraction }: {
  src: string;
  title: string;
  onInteraction: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [ratio, setRatio] = useState(9 / 16);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = frameHostRef.current;
    if (!host) return;
    let disposed = false;
    // The SDK owns this iframe so Strict Mode cleanup cannot remove React-owned DOM.
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = title;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.className = "h-full w-full border-0 pointer-events-none";
    iframe.tabIndex = -1;
    host.appendChild(iframe);
    const player = new Player(iframe);
    playerRef.current = player;
    setFailed(false);
    setPlaying(false);
    setMuted(true);
    setSeconds(0);
    setDuration(0);

    player.on("timeupdate", (event: { seconds: number; duration: number }) => {
      if (!disposed) { setSeconds(event.seconds); setDuration(event.duration); }
    });
    player.on("play", () => { if (!disposed) setPlaying(true); });
    player.on("pause", () => { if (!disposed) setPlaying(false); });
    player.on("volumechange", (event: { volume: number; muted: boolean }) => {
      if (!disposed) setMuted(event.muted || event.volume === 0);
    });
    player.on("error", () => { if (!disposed) setFailed(true); });

    void player.ready().then(async () => {
      const [width, height, length] = await Promise.all([
        player.getVideoWidth(), player.getVideoHeight(), player.getDuration(),
      ]);
      if (disposed) return;
      if (width > 0 && height > 0) setRatio(width / height);
      setDuration(length);
      // Autoplay rejection leaves the small bottom Play control available.
      void player.play().catch(() => { if (!disposed) setPlaying(false); });
    }).catch(() => { if (!disposed) setFailed(true); });

    return () => {
      disposed = true;
      playerRef.current = null;
      void player.destroy().catch(() => iframe.remove());
    };
  }, [src, title]);

  const run = (action: (player: Player) => Promise<unknown>) => {
    onInteraction();
    const player = playerRef.current;
    if (player) void action(player).catch((error: unknown) => console.warn("Testimonial player action failed", error));
  };
  const frameWidth = Math.max(size.width, size.height * ratio);
  const frameHeight = frameWidth / ratio;
  const progress = duration > 0 ? Math.min(100, seconds / duration * 100) : 0;
  const controlClass = "flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00FF87]";

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black" onClick={(event) => event.stopPropagation()}>
      <div
        ref={frameHostRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: frameWidth || "100%", height: frameHeight || "133.34%" }}
      />
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1">
        <button type="button" className={controlClass} aria-label={muted ? "Unmute video" : "Mute video"}
          onClick={() => run(async (player) => { if (muted) await player.setVolume(1); await player.setMuted(!muted); })}>
          {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
        </button>
        <button type="button" className={controlClass} aria-label="Video options" aria-expanded={menuOpen}
          onClick={() => { onInteraction(); setMenuOpen(!menuOpen); }}>
          <MoreVertical className="h-3 w-3" />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute right-2 top-10 z-20 rounded-xl border border-white/15 bg-black/80 p-1 text-[10px] text-white shadow-lg backdrop-blur-md">
          <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10"
            onClick={() => { setMenuOpen(false); run(async (player) => { await player.setCurrentTime(0); await player.play(); }); }}>
            <RotateCcw className="h-3 w-3" /> Restart
          </button>
          <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10"
            onClick={() => { setMenuOpen(false); run((player) => player.requestFullscreen()); }}>
            <Maximize2 className="h-3 w-3" /> Fullscreen
          </button>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-8">
        {failed ? (
          <p className="text-center text-[9px] text-white/80">Video unavailable</p>
        ) : (
          <div className="flex items-center gap-2 text-white">
            <button type="button" className="flex h-6 w-5 shrink-0 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00FF87]"
              aria-label={playing ? "Pause video" : "Play video"}
              onClick={() => run((player) => playing ? player.pause() : player.play())}>
              {playing ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
            </button>
            <input type="range" min={0} max={duration || 1} step={0.1} value={Math.min(seconds, duration || 1)} disabled={!duration}
              aria-label="Video progress" aria-valuetext={`${timestamp(seconds)} of ${timestamp(duration)}`}
              onChange={(event) => { const value = Number(event.target.value); setSeconds(value); run((player) => player.setCurrentTime(value)); }}
              className="testimonial-video-progress min-w-0 flex-1"
              style={{ background: `linear-gradient(to right, #00FF87 ${progress}%, rgba(255,255,255,0.3) ${progress}%)` }} />
            <span className="shrink-0 text-[8px] font-medium tabular-nums text-white/90">{timestamp(seconds)} / {timestamp(duration)}</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .testimonial-video-progress { appearance: none; height: 3px; border-radius: 999px; cursor: pointer; }
        .testimonial-video-progress::-webkit-slider-thumb { appearance: none; width: 7px; height: 7px; border-radius: 50%; background: #00FF87; }
        .testimonial-video-progress::-moz-range-thumb { width: 7px; height: 7px; border: 0; border-radius: 50%; background: #00FF87; }
        .testimonial-video-progress:focus-visible { outline: 2px solid #00FF87; outline-offset: 5px; }
      `}</style>
    </div>
  );
}
