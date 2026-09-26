"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, X, ExternalLink, Sparkles, ArrowRight, 
  Play, Film, Image as ImageIcon, ChevronLeft, ChevronRight, CheckCircle2 
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { PortfolioCategory, PortfolioItem } from "@/lib/cmsStore";

const CATEGORIES: PortfolioCategory[] = [
  "Branding", "Logo", "Social Media", "Packaging", "Motion", "Video", "Marketing"
];

function formatUrl(url?: string): string {
  if (!url || !url.trim()) return "";
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

function getEmbedVideoUrl(url?: string): { isEmbed: boolean; src: string } {
  if (!url) return { isEmbed: false, src: "" };
  const trimmed = url.trim();
  
  // YouTube watch?v= or youtu.be/
  if (trimmed.includes("youtube.com/watch?v=")) {
    const videoId = trimmed.split("watch?v=")[1]?.split("&")[0];
    return { isEmbed: true, src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` };
  }
  if (trimmed.includes("youtu.be/")) {
    const videoId = trimmed.split("youtu.be/")[1]?.split("?")[0];
    return { isEmbed: true, src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` };
  }
  // Vimeo
  if (trimmed.includes("vimeo.com/")) {
    const vimeoId = trimmed.split("vimeo.com/")[1]?.split("?")[0];
    return { isEmbed: true, src: `https://player.vimeo.com/video/${vimeoId}?autoplay=1` };
  }

  // Direct MP4 or other video file
  return { isEmbed: false, src: trimmed };
}

interface PortfolioSectionProps {
  onOrderClick?: () => void;
  hideHeader?: boolean;
}

function PortfolioCard({ 
  item, 
  index, 
  onClick 
}: { 
  item: PortfolioItem; 
  index: number; 
  onClick: () => void;
}) {
  const allImages = Array.from(new Set([item.imageUrl, ...(item.galleryImages || [])].filter(Boolean)));
  const hasMultipleImages = allImages.length > 1;
  const hasVideo = !!item.videoUrl && item.videoUrl.trim().length > 0;
  const directLink = formatUrl(item.projectUrl);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-slate-200/90 aspect-[4/3] hover:border-[#00875A] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* Cover Image — explicit z-0 so overlays always sit above it */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
        loading="lazy"
      />

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" />

      {/* Content on Hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-[2]">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#00FF87] font-bold mb-1">
          {item.category}
        </div>
        <h4 className="text-base font-bold text-white leading-tight">
          {item.title}
        </h4>
        <p className="text-xs text-slate-300 mt-1 line-clamp-1">{item.description}</p>
        
        {/* Media indicator badge */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 text-[10.5px] text-slate-300 font-mono">
          {hasMultipleImages && (
            <span className="inline-flex items-center gap-1">
              <ImageIcon className="w-3 h-3 text-[#00FF87]" />
              <span>{allImages.length} Photos</span>
            </span>
          )}
          {hasVideo && (
            <span className="inline-flex items-center gap-1">
              <Film className="w-3 h-3 text-[#00FF87]" />
              <span>Video Included</span>
            </span>
          )}
          <span className="ml-auto text-[#00FF87] font-sans font-semibold">View Project &rarr;</span>
        </div>
      </div>

      {/* Top Right Direct Live Link or View Icon */}
      {directLink ? (
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 hover:bg-[#00FF87] hover:text-[#02180C] backdrop-blur-sm border border-white flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all shadow-md z-[3] cursor-pointer"
          title="Open Live Project"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      ) : (
        <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-white flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-[3]">
          <ExternalLink className="w-4 h-4" />
        </div>
      )}

      {/* Category badge */}
      <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-800 shadow-sm z-[3]">
        {item.category}
      </div>
    </motion.div>
  );
}

function PortfolioModal({ 
  item, 
  onClose,
  onOrderClick 
}: { 
  item: PortfolioItem; 
  onClose: () => void;
  onOrderClick?: () => void;
}) {
  const allImages = Array.from(new Set([item.imageUrl, ...(item.galleryImages || [])].filter(Boolean)));
  const hasVideo = !!item.videoUrl && item.videoUrl.trim().length > 0;
  const [activeMedia, setActiveMedia] = useState<"image" | "video">(hasVideo && allImages.length === 0 ? "video" : "image");
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const directLink = formatUrl(item.projectUrl);
  const videoData = getEmbedVideoUrl(item.videoUrl);

  const nextImage = () => {
    setSelectedImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center px-2 pt-2 pb-24 sm:px-6 sm:pb-28 bg-slate-950/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        className="relative max-w-4xl w-full bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all shadow-lg cursor-pointer"
          title="Close Project View"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ═══ MEDIA VIEWER AREA (Photos & Video Support) ═══ */}
        <div className="relative w-full bg-slate-950 shrink-0 flex flex-col justify-center items-center overflow-hidden">
          
          {/* Media Switcher Tab (if both video & photos exist) */}
          {hasVideo && allImages.length > 0 && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
              <button
                onClick={() => setActiveMedia("image")}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeMedia === "image"
                    ? "bg-[#00FF87] text-[#02180C] shadow-sm font-bold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos ({allImages.length})</span>
              </button>
              <button
                onClick={() => setActiveMedia("video")}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeMedia === "video"
                    ? "bg-[#00FF87] text-[#02180C] shadow-sm font-bold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Video Player</span>
              </button>
            </div>
          )}

          {/* Active View: Video or Image */}
          {activeMedia === "video" && hasVideo ? (
            <div className="w-full aspect-video max-h-[440px] bg-black flex items-center justify-center">
              {videoData.isEmbed ? (
                <iframe
                  src={videoData.src}
                  title={item.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoData.src}
                  controls
                  playsInline
                  autoPlay
                  className="w-full h-full max-h-[440px] object-contain"
                />
              )}
            </div>
          ) : (
            <div className="relative w-full max-h-[460px] aspect-video bg-slate-900 flex items-center justify-center overflow-hidden group/img">
              <img
                src={allImages[selectedImgIndex] || item.imageUrl}
                alt={`${item.title} - View ${selectedImgIndex + 1}`}
                className="w-full h-full object-contain select-none"
              />

              {/* Prev / Next Controls if multiple images */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Photo Counter */}
                  <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                    {selectedImgIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Multiple Image Thumbnail Strip */}
          {activeMedia === "image" && allImages.length > 1 && (
            <div className="w-full bg-[#0B0F19] p-2.5 flex items-center gap-2 overflow-x-auto border-t border-white/10 no-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImgIndex === idx
                      ? "border-[#00FF87] scale-105 shadow-[0_0_10px_rgba(0,255,135,0.4)]"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ═══ PROJECT DETAILS CONTENT ═══ */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00875A] text-xs font-mono font-bold uppercase tracking-wider">
              {item.category}
            </span>
            {item.client && (
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Client: <strong>{item.client}</strong>
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {item.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            {item.description}
          </p>

          {/* Deliverables / Scope Tags */}
          {item.deliverables && item.deliverables.length > 0 && (
            <div className="mb-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Project Deliverables &amp; Assets
              </span>
              <div className="flex flex-wrap gap-2">
                {item.deliverables.map((del, dIdx) => (
                  <span key={dIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00875A]" />
                    <span>{del}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons Row (Direct Link Guaranteed) */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
            {directLink ? (
              <a
                href={directLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-[#00875A] text-white text-xs sm:text-sm font-bold transition-all shadow-md group cursor-pointer"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ) : (
              <a
                href="https://www.behance.net/qllix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-[#00875A] text-white text-xs sm:text-sm font-bold transition-all shadow-md group cursor-pointer"
              >
                <span>Explore Agency Showcase</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {onOrderClick && (
              <button
                onClick={() => {
                  onClose();
                  onOrderClick();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EAF8F1] hover:bg-[#00875A] text-[#00875A] hover:text-white text-xs sm:text-sm font-bold transition-all border border-[#00875A]/20 cursor-pointer"
              >
                <span>Request Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection({ onOrderClick, hideHeader = false }: PortfolioSectionProps) {
  const { cmsData } = useCms();
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const section = cmsData.homeSections.find((s) => s.id === "portfolio");
  if (section && !section.enabled) return null;

  const activeItems = [...(cmsData.portfolioItems || [])]
    .filter((p) => p.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const categories = ["All", ...CATEGORIES];

  const filtered = selectedCat === "All"
    ? activeItems
    : activeItems.filter((p) => p.category === selectedCat);

  return (
    <section className={`relative bg-white ${hideHeader ? "pt-4 sm:pt-6 pb-20" : "py-24 md:py-32"}`} id="portfolio">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Only if hideHeader is false) */}
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00875A] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#00875A]" />
              <span>Selected Case Studies</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif mb-4">
              {section?.title || "Signature Work & Portfolio"}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
              {section?.subtitle || "Explore our collection of high-converting visual branding, 3D packaging, cinematic reels, and digital creative production."}
            </p>
          </motion.div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCat === cat
                  ? "bg-slate-950 text-white shadow-md scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
              {cat === "All" && (
                <span className="ml-1.5 opacity-75 font-mono text-xs">({activeItems.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setActiveItem(item)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Layers className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-semibold">No projects found in this category.</p>
          </div>
        )}

      </div>

      {/* Rich Project Modal Viewer — rendered via Portal to escape transformed parents */}
      {typeof document !== "undefined" && ReactDOM.createPortal(
        <AnimatePresence>
          {activeItem && (
            <PortfolioModal
              item={activeItem}
              onClose={() => setActiveItem(null)}
              onOrderClick={onOrderClick}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
