import React from "react";
import { X, Calendar, Compass, Layers } from "lucide-react";
import { PortfolioItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface LightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
  language: "en" | "zh";
}

export default function Lightbox({ item, onClose, language }: LightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop (Dark blur) */}
        <motion.div
          id="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/92 backdrop-blur-xl z-10"
        />

        {/* Content Box */}
        <motion.div
          id="lightbox-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row relative z-20 shadow-2xl shadow-black/80"
        >
          {/* Close Action Floating (Always absolute top right corner of layout) */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/60 hover:bg-white text-white hover:text-black hover:scale-110 p-2.5 rounded-full border border-zinc-800/65 z-30 transition-all duration-300"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Visual Display Container (Left or Top) */}
          <div className="flex-[5] bg-zinc-900/40 relative min-h-[300px] md:min-h-[auto] overflow-hidden flex items-center justify-center p-2">
            {(item.animatedUrl?.endsWith(".mp4") || item.imageUrl?.endsWith(".mp4")) ? (
              <video
                src={item.animatedUrl?.endsWith(".mp4") ? item.animatedUrl : item.imageUrl}
                autoPlay
                loop
                muted
                controls
                playsInline
                className="w-full h-full object-contain max-h-[45vh] md:max-h-[80vh] rounded-lg shadow-2xl"
              />
            ) : (
              <img
                src={item.animatedUrl || item.imageUrl}
                alt={item.title[language]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[45vh] md:max-h-[80vh] select-none pointer-events-none"
              />
            )}
          </div>

          {/* Metadata Captions Container (Right or Bottom) */}
          <div className="flex-[4] p-6 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-900/80 bg-zinc-950 overflow-y-auto max-h-[40vh] md:max-h-[auto]">
            <div>
              {/* Category tag */}
              <div className="flex items-center space-x-2 mb-6">
                <span className="h-1.5 w-1.5 bg-zinc-100 rounded-full animate-ping" />
                <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                  {item.medium[language]}
                </span>
                <span className="text-zinc-700 font-mono">•</span>
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                  {item.year}
                </span>
              </div>

              {/* Multi-language contrasting headers */}
              <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white mb-2 leading-tight">
                {item.title.en}
              </h2>
              <h3 className="font-sans font-medium text-lg text-zinc-300 tracking-wide mb-6">
                {item.title.zh}
              </h3>

              {/* Inner descriptive blocks */}
              <div className="space-y-4 border-t border-zinc-900 pt-6">
                {/* English explanation */}
                <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                  {item.description.en}
                </p>

                {/* Chinese explanation with contrast styling */}
                <p className="text-zinc-300 font-sans text-sm md:text-[15px] leading-relaxed font-light border-l-2 border-zinc-800 pl-4 py-1">
                  {item.description.zh}
                </p>
              </div>
            </div>

            {/* Quick summary grid footer */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-900">
              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <div>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Created</p>
                  <p className="text-[11px] font-mono text-zinc-300 font-medium">{item.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Compass className="w-3.5 h-3.5 text-zinc-500" />
                <div>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Technique</p>
                  <p className="text-[11px] font-mono text-zinc-300 font-medium truncate max-w-[140px]">{item.medium.en}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
