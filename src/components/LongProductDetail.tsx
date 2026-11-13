import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Layers, Cpu, ArrowDown } from "lucide-react";
import { PortfolioItem } from "../types";

interface LongProductDetailProps {
  item: PortfolioItem;
  language: "en" | "zh";
  studioLight: "noon" | "sunset" | "neon" | "studio";
  getLightingFilterClass: () => string;
}

interface DetailConfig {
  detail1: string;
  detail2: string;
  colors: string[];
  specs: {
    label: { en: string; zh: string };
    val: { en: string; zh: string };
  }[];
}

const DETAIL_MAP: Record<string, DetailConfig> = {
  "3d-1": {
    detail1: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&q=80",
    colors: ["#c084fc", "#818cf8", "#38bdf8", "#e9d5ff"],
    specs: [
      { label: { en: "REFRACTION INDEX", zh: "折射率" }, val: { en: "1.52 (CRWN GLASS)", zh: "1.52 (高硼硅玻璃)" } },
      { label: { en: "ABBE NUMBER", zh: "阿贝数" }, val: { en: "58.6 HIGH DISPERSE", zh: "58.6 高色散" } },
      { label: { en: "CAUSTICS MODE", zh: "焦散模式" }, val: { en: "PATH-TRACED DIRECT", zh: "单路径追踪焦散" } }
    ]
  },
  "3d-2": {
    detail1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
    colors: ["#fbcfe8", "#fdecfe", "#cbd5e1", "#f1f5f9"],
    specs: [
      { label: { en: "CLAY FRACTION", zh: "吸光度" }, val: { en: "0.92 MATTE CLAY", zh: "0.92 哑光陶土" } },
      { label: { en: "SUNLIGHT ANGLE", zh: "日光投射角" }, val: { en: "42.5° GOLDEN HOUR", zh: "42.5° 黄金时刻" } },
      { label: { en: "MESH SMOOTHING", zh: "多边形细分" }, val: { en: "SUBDIV 4 LEVEL", zh: "4级视口细分" } }
    ]
  },
  "3d-3": {
    detail1: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80",
    colors: ["#0ea5e9", "#0284c7", "#38bdf8", "#0f172a"],
    specs: [
      { label: { en: "FROST ROUGHNESS", zh: "磨砂粗糙度" }, val: { en: "0.28 HIGH DEFLECTION", zh: "0.28 高折向偏转" } },
      { label: { en: "TRANSMISSION", zh: "透光率" }, val: { en: "0.85 LIGHT SPREAD", zh: "0.85 透物光合" } },
      { label: { en: "INTERFACE GLOW", zh: "界面自发光" }, val: { en: "NEON GIGA FLUX", zh: "流光高流明自发光" } }
    ]
  },
  "3d-4": {
    detail1: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=500&q=80",
    colors: ["#71717a", "#27272a", "#a1a1aa", "#09090b"],
    specs: [
      { label: { en: "METAL ROUGH", zh: "金属粗糙度" }, val: { en: "0.08 MIRROR STEEL", zh: "0.08 镜面不锈钢" } },
      { label: { en: "CONCRETE BUMP", zh: "微孔凹凸深度" }, val: { en: "0.015 TRACE TEXTURE", zh: "0.015 细微清水模" } },
      { label: { en: "REVERB SCENE", zh: "空间混响反射" }, val: { en: "ACCURATE ENVIRONMENT", zh: "环境精确遮蔽" } }
    ]
  },
  "3d-5": {
    detail1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
    colors: ["#52525b", "#3f3f46", "#e4e4e7", "#18181b"],
    specs: [
      { label: { en: "GI METHOD", zh: "全局光照算法" }, val: { en: "LUMEN REAL-TIME RAY", zh: "Lumen 硬件实时光追" } },
      { label: { en: "EXPOSURE VALUE", zh: "相机曝光补偿" }, val: { en: "EV 12.4 BALANCED", zh: "EV 12.4 平衡白平衡" } },
      { label: { en: "BOUNDS BOX", zh: "空间物理包围" }, val: { en: "HI-FI COLLIDER SET", zh: "高保真碰撞光线包围" } }
    ]
  },
  "3d-6": {
    detail1: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80",
    colors: ["#b45309", "#78350f", "#fef3c7", "#292524"],
    specs: [
      { label: { en: "FABRIC DISPLACE", zh: "织物置换纹理" }, val: { en: "4K TEXTURED BINDING", zh: "4K法线与织物纤维" } },
      { label: { en: "SHEEN STRENGTH", zh: "表面绒毛透射" }, val: { en: "0.45 SATIN SOFTNESS", zh: "0.45 奢华丝绒微光" } },
      { label: { en: "STUFFING BOUNCE", zh: "回弹形变衰减" }, val: { en: "RIGID PHYSICS TEST", zh: "高精重力形变解算" } }
    ]
  },
  "3d-7": {
    detail1: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80",
    colors: ["#ec4899", "#a855f7", "#3b82f6", "#030712"],
    specs: [
      { label: { en: "CYBER GLOW LUMENS", zh: "霓虹管道流明度" }, val: { en: "2500LM HI-INTENSITY", zh: "2500LM 高饱自发光" } },
      { label: { en: "METALNESS RATIO", zh: "电镀金属面占比" }, val: { en: "1.0 ANODIZED CORROS", zh: "1.0 阳极氧化防生锈" } },
      { label: { en: "HEAT INDEX DISP", zh: "量子热辐射图" }, val: { en: "GRADIENT TEMP WARP", zh: "色温梯度反射热图" } }
    ]
  },
  "3d-8": {
    detail1: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80",
    colors: ["#94a3b8", "#475569", "#cbd5e1", "#0f172a"],
    specs: [
      { label: { en: "FLUID DENSITY", zh: "流体基础密度" }, val: { en: "1350kg/m³ CR-MASS", zh: "1350kg/m³ 液态铬质量" } },
      { label: { en: "REBOND VISCOSITY", zh: "重力粘稠解算" }, val: { en: "0.78 SMOOTH FLOW", zh: "0.78 流体摩擦耗散" } },
      { label: { en: "MOTION SHUTTER", zh: "光流运动模糊" }, val: { en: "0.5 FPS DECAY WAVE", zh: "0.5毫秒高精运动模糊" } }
    ]
  },
  "3d-9": {
    detail1: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
    colors: ["#10b981", "#065f46", "#34d399", "#022c22"],
    specs: [
      { label: { en: "LIQUID COOL TEMP", zh: "液冷循环恒温" }, val: { en: "-12.5°C CRYO LOOP", zh: "-12.5°C 恒定深冷循环" } },
      { label: { en: "FIBER EMISSION", zh: "光纤信号频闪" }, val: { en: "500HZ DYNAMIC FEED", zh: "500HZ 高频模拟频闪" } },
      { label: { en: "RACK STRUCT", zh: "服务器多机组装" }, val: { en: "MODULAR CLUSTER VIX", zh: "模块化算力集群" } }
    ]
  },
  "3d-10": {
    detail1: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80",
    detail2: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
    colors: ["#d97706", "#b45309", "#f59e0b", "#450a0a"],
    specs: [
      { label: { en: "DIAL MECHANICALS", zh: "指针齿轮组契合" }, val: { en: "COOPERATIVE GEARS", zh: "精铜多轴齿轮动力学" } },
      { label: { en: "SCRATCH INDEX", zh: "镜面划痕与噪点" }, val: { en: "0.12 RETRO COPPER", zh: "0.12 复古黄铜氧化印记" } },
      { label: { en: "GLASS SHINE", zh: "表镜凸透率" }, val: { en: "SPHERICAL FISHEYE", zh: "球形鱼眼多重镜片反射" } }
    ]
  }
};

const DEFAULT_DETAIL: DetailConfig = {
  detail1: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=500&q=80",
  detail2: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&q=80",
  colors: ["#ea580c", "#ca8a04", "#65a30d", "#1c1917"],
  specs: [
    { label: { en: "RENDER DETAIL", zh: "渲染细节" }, val: { en: "ULTRA RAYTRACED", zh: "超高清光线追踪" } },
    { label: { en: "MESH POLYS", zh: "网格多边形" }, val: { en: "4,200,000 VERTS", zh: "4,200,000 顶点树" } },
    { label: { en: "STUDIO REFLECT", zh: "演播厅反射" }, val: { en: "HDRI STAGING LIGHT", zh: "HDRI 摄影棚级环境光" } }
  ]
};

export default function LongProductDetail({
  item,
  language,
  studioLight,
  getLightingFilterClass
}: LongProductDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const lastWheelTime = useRef<number>(0);

  const detailInfo = DETAIL_MAP[item.id] || DEFAULT_DETAIL;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // If we have wheeled in the last 800ms, ignore mouse absolute movement to avoid jumps
    if (Date.now() - lastWheelTime.current < 800) return;

    if (!containerRef.current || !contentRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top; // cursor position relative to container
    const h = rect.height; // container height (viewport height)

    // Calculate raw ratio
    let ratio = y / h;
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;

    // Expand sweet range to make scrolling easier
    const padding = 0.08;
    let t = (ratio - padding) / (1 - 2 * padding);
    if (t < 0) t = 0;
    if (t > 1) t = 1;

    const scrollableHeight = contentRef.current.scrollHeight - rect.height;
    if (scrollableHeight > 0) {
      setScrollY(t * scrollableHeight);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return to top
    setScrollY(0);
  };

  // Ensure content starts at top when active item changes
  useEffect(() => {
    setScrollY(0);
  }, [item.id]);

  // Synchronize wheel events with passive: false to allow preventing document scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Always prevent outer page scroll when mouse is hovering this area
      e.preventDefault();
      
      lastWheelTime.current = Date.now();

      if (!contentRef.current) return;
      const rect = container.getBoundingClientRect();
      const scrollableHeight = contentRef.current.scrollHeight - rect.height;

      if (scrollableHeight > 0) {
        setScrollY((prev) => {
          const next = prev + e.deltaY;
          return Math.max(0, Math.min(scrollableHeight, next));
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [item.id]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative overflow-hidden bg-[#0a0a0d] flex flex-col cursor-row-resize select-none"
    >
      {/* Scrollable Long Content Frame */}
      <div
        ref={contentRef}
        style={{
          transform: `translateY(-${scrollY}px)`,
          transition: isHovered 
            ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" 
            : "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="w-full flex flex-col absolute top-0 left-0"
      >
        {/* -- SECTION 1: HERO HEADER -- */}
        <div className="w-full h-[320px] relative shrink-0">
          <img
            src={item.imageUrl}
            alt={item.title[language]}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover relative transition-all duration-700 ${getLightingFilterClass()}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/25 flex flex-col justify-end p-4 text-left">
            <span className="text-[9px] font-mono text-zinc-500 tracking-[0.25em] uppercase mb-1">
              {language === "zh" ? "高端三维美学展示 // BOARD 07" : "3D LUXURY STAGING // BOARD 07"}
            </span>
            <h4 className="font-display font-black text-xl text-white tracking-tight leading-tight uppercase drop-shadow-md">
              {item.title[language]}
            </h4>
            <div className="flex items-center space-x-2 mt-1.5 text-[9px] font-mono text-zinc-400">
              <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
                CYCLES_2026
              </span>
              <span>•</span>
              <span>{item.medium[language]}</span>
            </div>
          </div>
        </div>

        {/* -- SECTION 2: INTRO CARD & THEME PALETTE -- */}
        <div className="p-4 bg-zinc-950 text-left space-y-4 shrink-0 border-y border-zinc-900/60 shadow-inner">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-mono tracking-widest font-bold">
                {language === "zh" ? "美学研究与概念" : "CONCEPT & AESTHETICS"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans font-light pt-1">
              {item.description[language]}
            </p>
          </div>

          {/* Color palette circles block */}
          <div className="space-y-1.5 pt-1.5 border-t border-zinc-900">
            <span className="text-[8px] font-mono text-zinc-500 tracking-wider block">
              {language === "zh" ? "渲染色域方案" : "AESTHETICS DESIGN PALETTE"}
            </span>
            <div className="flex items-center space-x-1.5">
              {detailInfo.colors.map((color, index) => (
                <div
                  key={index}
                  className="group relative flex items-center justify-center cursor-default"
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="w-5 h-5 rounded-full border border-white/10 shadow-md transform hover:scale-110 transition duration-200"
                  />
                  <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-[7px] text-zinc-400 px-1 border border-zinc-800 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                    {color}
                  </span>
                </div>
              ))}
              <span className="text-[8px] font-mono text-zinc-600 ml-1">RGB DECAY CODES</span>
            </div>
          </div>
        </div>

        {/* -- SECTION 3: DETAIL IMAGE ZOOM -- */}
        <div className="w-full h-[220px] relative shrink-0 overflow-hidden bg-black border-b border-zinc-900">
          <img
            src={detailInfo.detail1}
            alt="Physical detail snapshot"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md border border-zinc-800 px-1.5 py-0.5 rounded flex items-center space-x-1">
            <Layers className="w-2.5 h-2.5 text-zinc-400" />
            <span className="text-[8px] font-mono text-zinc-300">MACRO SPECIMEN 01</span>
          </div>
        </div>

        {/* -- SECTION 4: HI-FI TECH SPECIFICATIONS -- */}
        <div className="p-4 bg-[#08080b] text-left shrink-0 space-y-3.5">
          <div className="flex items-center space-x-1.5 text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-mono tracking-widest font-bold">
              {language === "zh" ? "技术流算参数" : "SIMULATION MATRIX"}
            </span>
          </div>

          {/* Table list */}
          <div className="text-[9px] font-mono divide-y divide-zinc-900 pb-1">
            {detailInfo.specs.map((spec, i) => (
              <div key={i} className="flex justify-between py-2 text-zinc-400">
                <span className="text-zinc-550 uppercase">{spec.label[language]}</span>
                <span className="text-zinc-200 font-medium">{spec.val[language]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* -- SECTION 5: SECOND DETAIL IMAGE -- */}
        <div className="w-full h-[200px] relative shrink-0 overflow-hidden bg-black border-y border-zinc-900">
          <img
            src={detailInfo.detail2}
            alt="Secondary detail closeup"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md border border-zinc-800 px-1.5 py-0.5 rounded flex items-center space-x-1">
            <Layers className="w-2.5 h-2.5 text-zinc-400" />
            <span className="text-[8px] font-mono text-zinc-300">SPECTRAL EXPOSURE 02</span>
          </div>
        </div>

        {/* -- SECTION 6: STUDIO OUTRO FOOTER -- */}
        <div className="p-6 bg-zinc-950 shrink-0 border-t border-zinc-900 flex flex-col items-center justify-center text-center space-y-2 h-[160px]">
          <span className="text-[9px] font-mono text-zinc-600 tracking-[0.2em] font-black">
            LU78 LAB SOLUTIONS
          </span>
          <p className="text-[8px] font-mono text-zinc-500 uppercase max-w-[200px] leading-relaxed">
            {language === "zh" 
              ? "探求数字视界 逼近真实极限" 
              : "Bridging architectural logic with digital refractions."
            }
          </p>
          <div className="h-0.5 w-10 bg-gradient-to-r from-zinc-800 via-white/20 to-zinc-800 my-1" />
          <span className="text-[8px] font-mono text-zinc-700">
            © 2026 CHENAN LUO. ALL RENDER SEED ARCHIVED.
          </span>
        </div>

      </div>

      {/* -- PERSISTENT GUIDING INTERACTIVE OVERLAY -- */}
      <div
        className={`absolute bottom-3 left-4 right-4 bg-black/80 backdrop-blur-md border border-zinc-900 text-center py-2 px-3 rounded-full flex items-center justify-center space-x-2 pointer-events-none z-50 transition-all duration-500 shadow-xl ${
          isHovered ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
        <span className="text-[9px] font-mono text-zinc-300 tracking-wider uppercase font-medium flex items-center space-x-1 mt-0.5">
          <span>{language === "zh" ? "🖯 鼠标在此区域内滑动 滚动详情看长图" : "🖯 HOVER & SLIDE MOUSE VERTICALLY TO VIEW DETAIL PAGE"}</span>
          <ArrowDown className="w-3 h-3 text-emerald-400 animate-bounce inline-block" />
        </span>
      </div>

      {/* Applied lighting color overlay based on chosen dome style */}
      <div className={`absolute inset-0 bg-gradient-to-t mix-blend-color pointer-events-none z-30 transition-all duration-700 ${
        studioLight === "sunset" 
          ? "from-amber-600/15 via-orange-500/5 to-transparent" 
          : studioLight === "neon" 
          ? "from-violet-900/25 via-blue-800/10 to-transparent" 
          : "from-transparent to-transparent"
      }`} />
    </div>
  );
}
