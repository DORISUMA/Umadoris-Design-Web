import React, { useRef, useEffect, useState } from "react";
import { PortfolioItem } from "../types";
import { MoveLeft, MoveRight, Play } from "lucide-react";
import { motion } from "motion/react";

interface PortfolioMarqueeProps {
  items: PortfolioItem[];
  language: "en" | "zh";
  onItemSelect: (item: PortfolioItem) => void;
  speed?: number; // Pixels per second/frame
  reverse?: boolean;
}

interface MarqueeCardProps {
  key?: string;
  item: PortfolioItem;
  idx: number;
  totalCount: number;
  language: "en" | "zh";
  onSelect: (item: PortfolioItem) => void;
  isDragging: boolean;
}

function MarqueeCard({
  item,
  idx,
  totalCount,
  language,
  onSelect,
  isDragging,
}: MarqueeCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);

  const handleMouseEnter = () => {
    setIsCardHovered(true);
    // Increment hover key to re-mount animated image and restart animation from frame 0
    setHoverKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
  };

  const uniqueId = `${item.id}-${idx}`;

  const isImageMp4 = Boolean(item.imageUrl?.endsWith(".mp4"));
  const isAnimatedMp4 = Boolean(item.animatedUrl?.endsWith(".mp4"));

  return (
    <motion.div
      key={uniqueId}
      onClick={() => {
        if (!isDragging) {
          onSelect(item);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="flex-shrink-0 w-[290px] sm:w-[360px] md:w-[420px] aspect-[16/10] bg-[#0c0c0e] border border-zinc-800/80 hover:border-[#c07a3c]/70 rounded-2xl overflow-hidden group/item relative cursor-zoom-in shadow-2xl transition-all duration-300 hover:shadow-[#c07a3c]/15"
      id={`portfolio-card-${uniqueId}`}
    >
      {/* Background skeleton placeholder */}
      <div className="absolute inset-0 bg-neutral-950 animate-pulse z-0" />

      {/* Static Base Image / Video Layer */}
      {isImageMp4 ? (
        <video
          src={item.imageUrl}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover/item:scale-105 ${
            item.animatedUrl && isCardHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <img
          src={item.imageUrl}
          alt={item.title[language]}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover/item:scale-105 ${
            item.animatedUrl && isCardHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Animated Motion Layer (Mounts on mouse hover to start playback from frame 0) */}
      {item.animatedUrl && isCardHovered && (
        isAnimatedMp4 ? (
          <video
            key={`anim-${hoverKey}`}
            src={item.animatedUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0 z-10 transition-transform duration-700 group-hover/item:scale-105"
          />
        ) : (
          <img
            key={`anim-${hoverKey}`}
            src={item.animatedUrl}
            alt={`${item.title[language]} 动态演示`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover absolute inset-0 z-10 transition-transform duration-700 group-hover/item:scale-105"
          />
        )
      )}

      {/* Chic Top Floating Badges (Hidden when hovered so the animated artwork is 100% clean and unobstructed) */}
      <div className={`absolute top-3.5 right-3.5 z-30 pointer-events-none flex items-center space-x-2 transition-opacity duration-300 ${
        isCardHovered ? "opacity-0" : "opacity-100"
      }`}>
        {(item.animatedUrl || isImageMp4) && (
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider flex items-center space-x-1.5 border shadow-lg bg-black/75 backdrop-blur-md text-zinc-200 border-white/15">
            <Play className="w-2.5 h-2.5 text-[#c07a3c] fill-[#c07a3c]" />
            <span>
              {isImageMp4 || isAnimatedMp4
                ? (language === "zh" ? "视频" : "VIDEO")
                : (language === "zh" ? "动图" : "MOTION")}
            </span>
          </span>
        )}
        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono text-zinc-400 bg-black/70 backdrop-blur-md border border-white/10 shadow-md">
          {(idx % totalCount) + 1} / {totalCount}
        </span>
      </div>
    </motion.div>
  );
}

export default function PortfolioMarquee({
  items,
  language,
  onItemSelect,
  speed = 0.8,
  reverse = false,
}: PortfolioMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Drag states
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const lastInteractionTimeRef = useRef(0);

  // Preload all animated WebP files in background so hover transition is instantaneous (0ms)
  useEffect(() => {
    items.forEach((item) => {
      if (item.animatedUrl && !item.animatedUrl.endsWith(".mp4")) {
        const img = new Image();
        img.src = item.animatedUrl;
      }
    });
  }, [items]);

  // Triple the items array to create a completely seamless infinite-loop marquee buffer
  const extendedItems = [...items, ...items, ...items];

  // Auto-scrolling engine via requestAnimationFrame for silky smooth 60fps performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let accumulatedScroll = container.scrollLeft;

    const scroll = () => {
      // Pause scroll if hovered, dragging, or recently interacted with
      const now = Date.now();
      const recentlyInteracted = now - lastInteractionTimeRef.current < 1500;

      if (!isHovered && !isDragging && !recentlyInteracted) {
        const itemWidth = container.scrollWidth / 3; // Length of one unit set of items

        if (reverse) {
          accumulatedScroll -= speed;
          if (accumulatedScroll <= 0) {
            accumulatedScroll += itemWidth;
          }
        } else {
          accumulatedScroll += speed;
          if (accumulatedScroll >= itemWidth * 2) {
            accumulatedScroll -= itemWidth;
          }
        }
        container.scrollLeft = accumulatedScroll;
      } else {
        // Sync accumulatedScroll with natural user scrolling/dragging
        accumulatedScroll = container.scrollLeft;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, speed, reverse]);

  // Handle click-and-drag desktop mouse scrolling
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    lastInteractionTimeRef.current = Date.now();
    
    dragStartRef.current = {
      x: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;

    e.preventDefault();
    lastInteractionTimeRef.current = Date.now();

    const x = e.pageX - container.offsetLeft;
    const walkX = (x - dragStartRef.current.x) * 1.5; // Drag sensitivity multiplier
    container.scrollLeft = dragStartRef.current.scrollLeft - walkX;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Adjust scroll position to center-aligned if user manually scroll wheel gets out of bounds
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = container.scrollWidth / 3;
    if (container.scrollLeft >= itemWidth * 2) {
      container.scrollLeft -= itemWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += itemWidth;
    }
  };

  return (
    <div className="relative group/marquee py-6 select-none scroll-mt-16" id="marquee-section">
      {/* Scrollable Track Wrapper */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={() => {
          handleMouseUpOrLeave();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onScroll={handleScroll}
        className={`flex overflow-x-auto no-scrollbar py-4 px-4 cursor-grab ${
          isDragging ? "cursor-grabbing active:scale-[0.995] transition-transform duration-200" : ""
        } space-x-6 touch-pan-x`}
      >
        {extendedItems.map((item, idx) => (
          <MarqueeCard
            key={`${item.id}-${idx}`}
            item={item}
            idx={idx}
            totalCount={items.length}
            language={language}
            onSelect={onItemSelect}
            isDragging={isDragging}
          />
        ))}
      </div>

      {/* Visual Navigation indicator arrows for chic agency feel */}
      <div className="max-w-7xl mx-auto px-6 mt-2 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-1.5 text-zinc-600 font-mono text-[9px] tracking-widest uppercase">
          <MoveLeft className="w-3 h-3 animate-bounce" />
          <span>DRAG OR SWIPE</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3c] animate-pulse" />
          <span>{language === "zh" ? "鼠标悬停任一卡片即可自动播放动图" : "Hover any card to play animation"}</span>
        </div>
        <div className="flex items-center space-x-1.5 text-zinc-600 font-mono text-[9px] tracking-widest uppercase">
          <span>{reverse ? "Reversed Flow" : "Infinite Flow"}</span>
          <MoveRight className="w-3 h-3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
