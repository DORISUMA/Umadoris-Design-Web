import React, { useState, useEffect, useRef } from "react";
import { 
  translations, 
  experiences, 
  educations, 
  softwareTools, 
  portfolio3D, 
  dynamicVisionItems,
  portfolioAI, 
  contactInfo 
} from "./data";
import { PortfolioItem } from "./types";
import Header from "./components/Header";
import PortfolioMarquee from "./components/PortfolioMarquee";
import Lightbox from "./components/Lightbox";
import EditorialLongPageBoard from "./components/EditorialLongPageBoard";
import BrowserShowcaseBoard from "./components/BrowserShowcaseBoard";
import { 
  Copy, 
  Check, 
  ArrowDown, 
  ExternalLink, 
  Sparkles, 
  FolderHeart, 
  PhoneCall, 
  Mail,
  Smartphone,
  RotateCcw,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Multi-group details presentation data for product detail preview board
const detailSets = [
  {
    code: "D8825-RESICD625WEVT",
    titleZh: "Dreamer系列 独立式双门\n模块化冷藏冷冻冰箱",
    titleEn: "Dreamer Series Freestanding Double-Door Fridge",
    subtitleZh: "metalcooling背板 奢品级不锈钢门板",
    subtitleEn: "Metalcooling back panel, luxury-grade fingerprint-resistant stainless steel",
    bgImage: "https://i.postimg.cc/mkKVDTWw/hua-ban-5.jpg",
    images: [
      "https://i.postimg.cc/ydSVRdCT/8825xiang-qing-yi-dong-duan-01.jpg",
      "https://i.postimg.cc/V6bYt6PK/8825xiang-qing-yi-dong-duan-02.jpg",
      "https://i.postimg.cc/Px8tDxny/8825xiang-qing-yi-dong-duan-03.jpg",
      "https://i.postimg.cc/j5Jsf5YX/8825xiang-qing-yi-dong-duan-04.jpg",
      "https://i.postimg.cc/rsXqNkq9/8825xiang-qing-yi-dong-duan-05.jpg"
    ]
  },
  {
    code: "D8710-RESICD424WT5XQ",
    titleZh: "Dreamer系列\n新一代零平嵌冰箱",
    titleEn: "Dreamer Series New-Gen Zero-Seamless Flat Fridge",
    subtitleZh: "超薄极窄法式多门\n零缝嵌入 全自动制冰",
    subtitleEn: "Ultra-thin and narrow French multi-door, zero-seam flush integration, automatic ice-maker",
    bgImage: "https://i.postimg.cc/t4Rj0VjC/wu-men-shou-ye.jpg",
    images: [
      "https://i.postimg.cc/C1YfGN8z/wu-men-bing-xiang-shu-ping-xiang-qing1-01.jpg",
      "https://i.postimg.cc/85DrRHvs/wu-men-bing-xiang-shu-ping-xiang-qing1-02.jpg",
      "https://i.postimg.cc/d1vT2BCh/wu-men-bing-xiang-shu-ping-xiang-qing1-03.jpg",
      "https://i.postimg.cc/Zq6dvgW8/wu-men-bing-xiang-shu-ping-xiang-qing1-04.jpg",
      "https://i.postimg.cc/k49tQcSx/wu-men-bing-xiang-shu-ping-xiang-qing1-05.jpg",
      "https://i.postimg.cc/NMYr64Xm/wu-men-bing-xiang-shu-ping-xiang-qing1-06.jpg",
      "https://i.postimg.cc/RF9n7Rtw/wu-men-bing-xiang-shu-ping-xiang-qing1-07.jpg",
      "https://i.postimg.cc/C1YfGN8G/wu-men-bing-xiang-shu-ping-xiang-qing1-08.jpg",
      "https://i.postimg.cc/QtsWQb7Y/wu-men-bing-xiang-shu-ping-xiang-qing1-09.jpg",
      "https://i.postimg.cc/1tPNGHFY/wu-men-bing-xiang-shu-ping-xiang-qing1-10.jpg",
      "https://i.postimg.cc/85DrRHvy/wu-men-bing-xiang-shu-ping-xiang-qing1-11.jpg",
      "https://i.postimg.cc/1tPNGHFJ/wu-men-bing-xiang-shu-ping-xiang-qing1-12.jpg",
      "https://i.postimg.cc/FRZkDLbG/wu-men-bing-xiang-shu-ping-xiang-qing1-13.jpg",
      "https://i.postimg.cc/Y93LbWNb/wu-men-bing-xiang-shu-ping-xiang-qing1-14.jpg",
      "https://i.postimg.cc/hjrQpd8C/wu-men-bing-xiang-shu-ping-xiang-qing1-15.jpg",
      "https://i.postimg.cc/gJDLNZyT/wu-men-bing-xiang-shu-ping-xiang-qing1-16.jpg",
      "https://i.postimg.cc/RFRJXH1y/wu-men-bing-xiang-shu-ping-xiang-qing1-17.jpg",
      "https://i.postimg.cc/XJ8BQCKT/wu-men-bing-xiang-shu-ping-xiang-qing1-18.jpg"
    ]
  }
];

// 9 Curated Gather Cards matching "画板 5.png" (Symmetric arch of 9 squircle cards with center apex & baseline gradient fade)
const gatherCards: PortfolioItem[] = [
  {
    id: "gather-1",
    imageUrl: "/assets/ai_visuals/ai_kitchen_pet_couple.webp",
    title: { en: "Timber Island & Companion", zh: "温暖居境 · 萌宠相伴中岛" },
    description: { 
      en: "Photorealistic AI composition of a modern timber kitchen with warm lighting, morning routines, and faithful pet companion interaction.", 
      zh: "木质温暖西厨中岛与晨光斜照下的温馨人宠互动日常，写实再现松弛的生活叙事。" 
    },
    year: "2026",
    medium: { en: "AI Realistic Scene & Pet", zh: "AI 写实人物与宠物" },
  },
  {
    id: "gather-2",
    imageUrl: "/assets/ai_visuals/ai_wine_cellar_macro.webp",
    title: { en: "Amber Decanter & Dual-Zone Cellar", zh: "琥珀琼浆 · 恒温酒柜微距" },
    description: { 
      en: "Exquisite ray-traced glass refraction and brushed metallic finish inside smart climate-controlled wine preservation chamber.", 
      zh: "高精度玻璃折射与暖光恒温酒柜陈酿，写实光影勾勒出微醺夜晚的精致质感。" 
    },
    year: "2026",
    medium: { en: "AI Photoreal Macro", zh: "AI 写实光影微距" },
  },
  {
    id: "gather-3",
    imageUrl: "/assets/ai_visuals/ai_luxury_living_dining.webp",
    title: { en: "Panoramic Architectural Salon", zh: "旷达全景 · 奢邸客厅餐厅" },
    description: { 
      en: "Grand architectural visualization blending ambient warm hearth, curated illuminated vitrines, and sleek banquet dining space.", 
      zh: "写实大场景概念视觉：通透发光立柜、壁炉微光与当代极简餐叙空间的无界交融。" 
    },
    year: "2026",
    medium: { en: "AI Architectural Space", zh: "AI 写实大场景空间" },
  },
  {
    id: "gather-4",
    imageUrl: "/assets/ai_visuals/ai_girl_cat_tree.webp",
    title: { en: "Playful Afternoon · Girl & Feline", zh: "童真暖阳 · 少女与猫爬架" },
    description: { 
      en: "Heartwarming AI generation of childhood innocence, gentle sunlight, playful feline acrobatics, and organic wood textures.", 
      zh: "写实人物与写实动物：金黄色午后光斑下的女孩与猫咪嬉戏，毛发与动作纤毫毕现的生动抓拍。" 
    },
    year: "2026",
    medium: { en: "AI Character & Pet", zh: "AI 写实人物与动物" },
  },
  {
    id: "gather-5",
    imageUrl: "/assets/ai_visuals/ai_kitchen_family_warm.webp",
    title: { en: "Morning Symphony · Family Kitchen", zh: "晨光餐叙 · 幸福三口之家" },
    description: { 
      en: "Flagship photorealistic AI composition depicting morning light over luxury marble island, genuine familial warmth, and high-end built-in culinary suite.", 
      zh: "旗舰写实人物与大场景：大理石中岛晨光倾洒，一家三口烹饪交流的温情瞬间与高端定制厨电实景。" 
    },
    year: "2026",
    medium: { en: "AI Flagship Scene", zh: "AI 旗舰写实人物场景" },
  },
  {
    id: "gather-6",
    imageUrl: "/assets/ai_visuals/ai_smart_oven_probe.webp",
    title: { en: "Thermal Precision Probe Roast", zh: "智控探针 · 精密低温慢烤" },
    description: { 
      en: "Cinematic close-up of smart steam oven glowing with deep cobalt ceramic lining and core temperature probe in roasted rack of lamb.", 
      zh: "写实人物与科技厨电：优雅女性手持专业探针轻触多汁羊排，星空蓝珐琅内胆在高温热力下的光感交响。" 
    },
    year: "2026",
    medium: { en: "AI Culinary Interaction", zh: "AI 写实人物与科技" },
  },
  {
    id: "gather-7",
    imageUrl: "/assets/ai_visuals/ai_island_blonde_lady.webp",
    title: { en: "Serene Connected Moments", zh: "晨间静思 · 西厨中岛视点" },
    description: { 
      en: "Photorealistic portrait of modern elegance in open kitchen architecture, accented by smart appliance connectivity.", 
      zh: "写实人物与空间：晨间西厨中岛前的专注神情，以克制纯粹的镜头语言展现当代优雅生活态度。" 
    },
    year: "2026",
    medium: { en: "AI Realistic Portrait", zh: "AI 写实人物视点" },
  },
  {
    id: "gather-8",
    imageUrl: "/assets/ai_visuals/ai_starry_hood_macro.webp",
    title: { en: "Cosmic Obsidian Crystalline Surface", zh: "星曜微晶 · 曜黑深邃概念" },
    description: { 
      en: "Concept visual effects exploring microscopic obsidian rock crystallization, nebulous starlight particles, and anodized aircraft alloy.", 
      zh: "概念特效与微观材质：曜黑机体上星空微晶与深海玄武岩般的微观质感探索，具象化冷冽科技感。" 
    },
    year: "2026",
    medium: { en: "AI Concept & VFX", zh: "AI 概念特效与微观" },
  },
  {
    id: "gather-9",
    imageUrl: "/assets/ai_visuals/ai_triptych_lifestyle.webp",
    title: { en: "Sensory Triptych: Coffee, Ice & Wine", zh: "感官三联 · 咖啡·冰粒·醇酿" },
    description: { 
      en: "Tactile high-contrast lifestyle triptych capturing morning iced latte condensation, prismatic crystalline ice cubes, and rich evening vintage pour.", 
      zh: "写实生活细节拼图：晨间冰咖、纯净水晶冰粒与晚间醇红酒液的流动触感，多维唤醒品质感官体验。" 
    },
    year: "2026",
    medium: { en: "AI Lifestyle Triptych", zh: "AI 写实生活拼图" },
  },
];

export default function App() {
  const [language, setLanguage] = useState<"en" | "zh">("zh");
  const [activeSection, setActiveSection] = useState<string>("cover");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isOrbitalHovered, setIsOrbitalHovered] = useState(false);

  // Automatically trigger beautiful fanned-out scatter animation on mount after a minor delay, persisting permanently
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOrbitalHovered(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Custom states for 3D Creative Visuals Carousel
  const [active3DIndex, setActive3DIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [carouselDirection, setCarouselDirection] = useState<"forward" | "backward">("forward");
  const [studioLight, setStudioLight] = useState<"sunset" | "studio" | "neon">("sunset");
  const [detailIndex, setDetailIndex] = useState(0);
  const [studioLight2, setStudioLight2] = useState<"sunset" | "studio" | "neon">("sunset");

  // Auto-play for 3D Creative Visuals carousel (左右播放, 鼠标移入时暂停)
  useEffect(() => {
    if (isCarouselHovered || portfolio3D.length <= 1) return;
    const maxIdx = portfolio3D.length - 1;
    const timer = setInterval(() => {
      setActive3DIndex((prev) => {
        if (carouselDirection === "forward") {
          if (prev >= maxIdx) {
            setCarouselDirection("backward");
            return Math.max(0, maxIdx - 1);
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            setCarouselDirection("forward");
            return Math.min(maxIdx, 1);
          }
          return prev - 1;
        }
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [isCarouselHovered, carouselDirection]);
  
  // Ref for phone viewport container
  const phoneViewportRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top when changing detail tab
  useEffect(() => {
    if (phoneViewportRef.current) {
      phoneViewportRef.current.scrollTop = 0;
    }
  }, [detailIndex]);
  
  // Custom states for Contacts copy-feedbacks
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [isResumeVisible, setIsResumeVisible] = useState(false);

  // Linkage state between BrowserShowcaseBoard (Section 1) and EditorialLongPageBoard (Section 2)
  const [isEditorialExpanded, setIsEditorialExpanded] = useState(true);
  const [linkedEditorialId, setLinkedEditorialId] = useState<string>("hao-shui");
  const [activeEditorialTab, setActiveEditorialTab] = useState<"wechat4" | "wechat_xinnian" | "wechat_haoshui" | "wechat_duanwu" | "wechat2" | "wechat_funv" | "wechat" | "detail" | "detail_dryer" | "web_brand" | "web_group" | "invitation">("wechat_haoshui");

  const handleBrowserCardSelect = (projectId: string, shouldNavigate?: boolean) => {
    setLinkedEditorialId(projectId);
    if (projectId === "song-chi") {
      setActiveEditorialTab("wechat2");
    } else if (projectId === "duan-wu") {
      setActiveEditorialTab("wechat_duanwu");
    } else if (projectId === "hao-shui") {
      setActiveEditorialTab("wechat_haoshui");
    } else if (projectId === "chu-fang-guan-xi" || projectId === "re-qing") {
      setActiveEditorialTab("wechat_xinnian");
    } else if (projectId === "yi-wu-jing-hua") {
      setActiveEditorialTab("wechat4");
    } else if (projectId === "liu-bai-zhu-yi") {
      setActiveEditorialTab("wechat_funv");
    } else if (projectId === "hua-kuang-zhi-jian") {
      setActiveEditorialTab("wechat");
    }

    if (shouldNavigate) {
      setIsEditorialExpanded(true);
      setTimeout(() => {
        const el = document.getElementById("editorial-longpage-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  // Active section monitor for the dots
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["cover", "detailed-resume", "intro", "portfolio", "contact"];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === "detailed-resume" ? "intro" : section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2005);
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleExperienceClick = () => {
    setIsExperienceExpanded(true);
    setIsResumeVisible(true);
    setTimeout(() => {
      const el = document.getElementById("experience-detailed-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  const handleSoftwareClick = () => {
    setIsResumeVisible(true);
    setTimeout(() => {
      const el = document.getElementById("skills-proficiency-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  // Vibe background color matching the studio light preset for 3D staging (画板7)
  const getLightingFilterClass = () => {
    switch (studioLight) {
      case "sunset": return "hue-rotate-15 saturate-125 contrast-105 brightness-[0.93]";
      case "neon": return "hue-rotate-[240deg] saturate-200 brightness-[0.88] contrast-110";
      default: return "saturate-100 contrast-100 brightness-100";
    }
  };

  const getLightingFilterClass2 = () => {
    switch (studioLight2) {
      case "sunset": return "hue-rotate-15 saturate-125 contrast-105 brightness-[0.93]";
      case "neon": return "hue-rotate-[240deg] saturate-200 brightness-[0.88] contrast-110";
      default: return "saturate-100 contrast-100 brightness-100";
    }
  };

  return (
    <div className="bg-[#050506] min-h-screen text-zinc-150 font-sans relative flex flex-col selection:bg-white selection:text-black antialiased">
      {/* Absolute Noise Overlay for Film Organic Style */}
      <div className="absolute inset-0 bg-[#050506] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-950/20 via-[#050506] to-[#050506] pointer-events-none z-0" />

      <div className="absolute top-[25%] left-[-10%] w-[45%] h-[45%] bg-teal-500/2 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/2 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Luxury Fixed Floating Header */}
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        activeSection={activeSection} 
      />

      {/* SECTION 1: COVER PAGE (Reflecting "画板2" with Ghostly Blur Glimmer & Minimalists Texts) */}
      <section
        id="cover"
        className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden z-10 pt-16"
      >
        {/* Underlay requested background cover image - full dimension stretch with smooth blending gradients */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img 
            src="https://i.postimg.cc/3rsHd8qn/zuo-pin-ji-bei-jing1.png" 
            alt="Home background footer cover" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-70 mix-blend-screen transition-opacity duration-500"
          />
          {/* Gradient transitions for top, bottom, and side integration */}
          <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-[#050506] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#050506] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-[25%] bg-gradient-to-r from-[#050506] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-[25%] bg-gradient-to-l from-[#050506] to-transparent pointer-events-none opacity-80" />
        </div>

        {/* Left Aspect: The Ghostly Blurry Figure (Pristine match to the glow in 画板2) */}
        <div className="absolute left-[3%] top-[12%] w-[85%] md:w-[45%] lg:w-[35%] h-[80%] rounded-full pointer-events-none z-0 flex items-center justify-center">
          <div className="blur-haze-figure w-full h-full mix-blend-screen opacity-90 relative">
            {/* Embedded glowing core for additional depth */}
            <div className="absolute top-[35%] left-[35%] w-[40px] h-[120px] bg-white rounded-full blur-xl opacity-80" />
            <div className="absolute top-[45%] left-[45%] w-[60px] h-[60px] bg-teal-300 rounded-full blur-2xl opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full relative z-10 py-12">
          
          {/* Top Left of grid: "PROFILE" master title with high weight contrast */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start">
            <motion.h1
              initial={{ opacity: 0, x: -15, y: -144, scaleX: 1.3 }}
              animate={{ opacity: 1, x: -35, y: -210, scaleX: 1.3 }}
              transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(1.8rem, 54pt, 7.5vw)",
                fontFamily: '"Outfit", "Gilroy", "Inter", sans-serif',
                transformOrigin: "left center",
                letterSpacing: "-0.015em",
                lineHeight: "0.85",
                width: "299.8px",
                height: "45px",
              }}
              className="font-display font-black text-white select-none mb-4 relative"
            >
              PROFILE
            </motion.h1>
          </div>

          {/* Right of grid: Separated details blocks (EXPERIENCE & SOFTWARE) representing 画板2 style */}
          <div className="lg:col-span-6 flex flex-col space-y-12 lg:pl-16 py-4">
            
            {/* Block A: 工作经历概要 */}
            <motion.div
              onClick={handleExperienceClick}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="space-y-3 relative group lg:-translate-x-44 lg:translate-y-24 lg:max-w-md transition-transform duration-500 cursor-pointer hover:scale-[1.01]"
            >
              <div className="absolute -left-4 top-1.5 w-1.5 h-1.5 bg-zinc-800 rounded-full group-hover:bg-white transition-colors duration-300" />
              <h3 className="font-sans font-normal text-[12pt] text-zinc-500 tracking-[0.25em] uppercase flex items-center space-x-2">
                <span>工作经历</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-650" style={{ fontFamily: '"Gilroy-Light", "Gilroy", sans-serif', fontSize: "16px", fontWeight: 300, letterSpacing: "normal" }}>EXPERIENCE</span>
              </h3>
              <p className="text-zinc-200 font-sans font-light leading-relaxed text-sm md:text-base pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-550 pointer-events-none group-hover:pointer-events-auto">
                {translations.cover.subtitle_experience[language]}
              </p>
              <div className="text-zinc-550 font-mono text-[10px] uppercase tracking-wider bg-zinc-950/40 border border-zinc-900/80 rounded-md px-2.5 py-1 inline-block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-550 pointer-events-none group-hover:pointer-events-auto">
                {language === "zh" ? "5年+ 设计与宣发资历 (点击详阅)" : "5 Years+ Art & Promotional Direction (Click to view)"}
              </div>
            </motion.div>

            {/* Block B: 熟练软件核心 */}
            <motion.div
              onClick={handleSoftwareClick}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.45 }}
              className="space-y-3 relative group lg:translate-x-20 lg:translate-y-16 lg:max-w-md transition-transform duration-500 cursor-pointer hover:scale-[1.01]"
            >
              <div className="absolute -left-4 top-1.5 w-1.5 h-1.5 bg-zinc-800 rounded-full group-hover:bg-white transition-colors duration-300" />
              <h3 className="font-sans font-normal text-[12pt] text-zinc-500 tracking-[0.25em] uppercase flex items-center space-x-2">
                <span>熟练软件</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-650" style={{ fontFamily: '"Gilroy-Light", "Gilroy", sans-serif', fontSize: "16px", fontWeight: 300, letterSpacing: "normal" }}>SOFTWARE</span>
              </h3>
              <p className="text-zinc-400 font-sans text-xs md:text-sm tracking-wide leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-550 pointer-events-none group-hover:pointer-events-auto">
                {translations.cover.subtitle_software[language]}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-550 pointer-events-none group-hover:pointer-events-auto">
                {["Blender", "octane", "Rhino", "SD"].map((t) => (
                  <span key={t} className="text-[10px] font-mono text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded-full bg-zinc-950/20">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll Helper */}
        <motion.div
          onClick={() => {
            if (isResumeVisible) {
              handleScrollToSection("detailed-resume");
            } else {
              handleScrollToSection("intro");
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer group z-20"
        >
          <span className="font-mono text-[9px] text-zinc-500 tracking-[0.25em] uppercase group-hover:text-zinc-300 transition-colors duration-300 mb-1.5 text-center">
            {language === "zh" ? "INTRO" : "BROWSE PROFILE"}
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-zinc-650 group-hover:text-zinc-300 transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 1.5: DETAILED RESUME (Moved up directly after first/cover page as requested, only visible on click) */}
      <AnimatePresence initial={false}>
        {isResumeVisible && (
          <motion.section
            id="detailed-resume"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-12 md:py-16 min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center px-6 md:px-12 bg-[#060607]/95 border-t border-zinc-950 z-10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto w-full">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-300 items-start">
                
                {/* COLUMN 1: Detailed Work Experience with ID and scrollable container */}
                <div id="experience-detailed-section" className="space-y-4 scroll-mt-24">
                  <h4 className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-4 flex items-center justify-between">
                    <span>{language === "zh" ? "[ 01. 职业长案概述 EXPERIENCE RECORDS ]" : "[ 01. DETAILED EXPERIENCE ARCHIVES ]"}</span>
                    {/* Status Indicator */}
                    <span className="inline-flex items-center space-x-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 py-0.5 text-[9px] font-mono tracking-wider text-zinc-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c07a3c] animate-pulse" />
                      <span>{language === "zh" ? "滑动条已开启 · 可滚动机动查看" : "SCROLLABLE TIMELINE"}</span>
                    </span>
                  </h4>

                  {/* Standard Webpage Length Scrollable Window Container (Direct scroll container) */}
                  <div 
                    className="relative rounded-2xl bg-[#09090b]/70 border border-zinc-900/90 p-5 sm:p-6 shadow-inner h-[400px] sm:h-[440px] md:h-[480px] overflow-y-scroll scroll-smooth select-text pr-3.5 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#121214] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c07a3c] hover:[&::-webkit-scrollbar-thumb]:bg-[#d97736] [&::-webkit-scrollbar-thumb]:rounded-full"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "#c07a3c #141210" }}
                  >
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="group border-b border-zinc-900/70 pb-5 last:border-none last:pb-1">
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5 flex-wrap gap-1">
                          <span className="text-white font-medium group-hover:text-[#c07a3c] transition-colors">{exp.title[language]}</span>
                          <span className="text-[#c07a3c] font-mono text-[11px] px-2 py-0.5 rounded bg-[#c07a3c]/10 border border-[#c07a3c]/25">{exp.period}</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400 tracking-wider mb-2.5 uppercase font-medium">{exp.company[language]}</p>
                        <p className="text-zinc-400 font-sans text-xs font-light leading-relaxed whitespace-pre-wrap">
                          {exp.description[language]}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom info note */}
                  <div className="pt-1 flex items-center justify-between text-zinc-500 font-mono text-[9px]">
                    <span className="flex items-center space-x-1.5 text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3c]" />
                      <span>{language === "zh" ? "共 4 段完整职业经历" : "4 Complete Experience Records"}</span>
                    </span>
                    <span className="text-zinc-500 flex items-center space-x-1">
                      <span>{language === "zh" ? "上下拖拽滑动条浏览" : "Drag scrollbar to browse"}</span>
                      <span>↓</span>
                    </span>
                  </div>
                </div>

                {/* COLUMN 2: Tech skill stats ("掌握技巧") & Education */}
                <div id="skills-proficiency-section" className="space-y-10 scroll-mt-24">
                  
                  {/* Education block */}
                  <div>
                    <h4 className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-4">
                      {language === "zh" ? "[ 02. 教育背景学术源统 EDUCATION ACADEMICS ]" : "[ 02. ACADEMIC GENEALOGY ]"}
                    </h4>
                    <div className="space-y-4">
                      {educations.map((edu, idx) => (
                        <div key={idx} className="border-l border-zinc-850 pl-4 py-0.5">
                          <span className="text-zinc-550 font-mono text-[10px]">{edu.period}</span>
                          <h5 className="text-white font-sans font-bold text-sm tracking-wide mt-0.5">{edu.school[language]}</h5>
                          <span className="text-zinc-450 font-sans text-xs font-light mt-0.5 block">{edu.degree[language]}</span>
                          {edu.description && (
                            <p className="text-zinc-400 font-sans text-xs font-light tracking-wide leading-relaxed mt-2 whitespace-pre-wrap">
                              {edu.description[language]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills/Software proficiency ("掌握技巧") block */}
                  <div>
                    <h4 className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-3 text-white flex items-center justify-between">
                      <span>{language === "zh" ? "[ 03. 掌握技巧与全链软件系统 SOFTWARE PROFICIENCY ]" : "[ 03. SOFTWARE & SKILLS CORE PROFICIENCY ]"}</span>
                      <span className="text-[8px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-mono uppercase">Mastery</span>
                    </h4>
                    
                    {/* Professional Skills Categorized Text block */}
                    <div className="bg-[#09090b]/80 border border-zinc-900/90 rounded-xl p-3.5 sm:p-4 mb-3 space-y-2 font-mono text-xs shadow-inner">
                      <div className="text-[#c07a3c] font-semibold text-xs tracking-wider flex items-center space-x-1.5 pb-1 border-b border-zinc-900/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3c]" />
                        <span>{language === "zh" ? "专业技能" : "PROFESSIONAL SKILLS"}</span>
                      </div>
                      <div className="space-y-1.5 text-zinc-300 font-sans text-xs pt-0.5 leading-relaxed">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                          <span className="text-zinc-400 font-mono text-[11px] shrink-0 font-medium">
                            {language === "zh" ? "三维软件:" : "3D Software:"}
                          </span>
                          <span className="text-zinc-200">Blender、Key-Shot、C4D、Rhino等</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                          <span className="text-zinc-400 font-mono text-[11px] shrink-0 font-medium">
                            {language === "zh" ? "平面软件:" : "Graphic Software:"}
                          </span>
                          <span className="text-zinc-200">Adobe PS、Adobe AI、Procreate等</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                          <span className="text-zinc-400 font-mono text-[11px] shrink-0 font-medium">
                            {language === "zh" ? "生成式AI软件:" : "Generative AI:"}
                          </span>
                          <span className="text-zinc-200">Stable Diffusion、Midjourney、ChatGPT等</span>
                        </div>
                      </div>
                    </div>

                    {/* Tools/Skills list */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {softwareTools.map((t) => (
                        <div key={t.name} className="flex items-center space-x-1.5 bg-zinc-950/60 border border-zinc-900 px-3 py-1 rounded-md text-xs font-mono hover:border-zinc-700 transition-colors">
                          <span className="text-zinc-300">{t.name}</span>
                          <span className="text-zinc-550 text-[10px]">({t.proficiency}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* SECTION 2: PERSONAL INTRO (Reflecting "画板8" Horizontal Bento layout with elite contrast and micro tags) */}
      <section
        id="intro"
        className="min-h-screen relative pt-40 pb-24 px-6 md:px-12 bg-[#060607]/90 flex flex-col justify-end border-t border-zinc-950"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-end space-y-12">
          
          {/* Header styling representing Image 5 画板8 ("Continue browsing") */}
          <div className="space-y-4 max-w-4xl pt-12 md:pt-16">
            {/* Elegant Display font title similar to Continue browsing */}
            <h2 
              className="text-white font-medium animate-fade-in"
              style={{
                fontFamily: "'Gilroy-Medium', 'Gilroy', 'Outfit', sans-serif",
                fontSize: "60px",
                letterSpacing: "-0.105em"
              }}
            >
              Continue browsing
            </h2>
          </div>

          {/* 4 exquisite horizontal bento columns matching the exact rounded rectangular boxes in 画板8 (Image 5) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* CARD 1: 创意视觉 (Pill Badge "Creative Visuals") */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(59, 130, 246, 0.3)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                const el = document.getElementById("3d-staging-zone");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="bg-[#08080a] border border-zinc-900/80 rounded-[20px] p-4.5 flex flex-col justify-between h-[120px] relative overflow-hidden group cursor-pointer transition-colors"
              id="intro-bento-1"
            >
              <div>
                <span className="inline-flex items-center bg-[#0c1424] text-[#3b82f6] border border-[#2563eb]/25 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-medium tracking-wide">
                  Creative Visuals
                </span>
              </div>
              
              <div className="space-y-0.5">
                <h3 className="font-sans font-semibold text-[13px] text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {language === "zh" ? "创意视觉" : "Creative Visuals"}
                </h3>
                <p className="text-zinc-400 font-sans text-[10px] font-light leading-tight whitespace-pre-line">
                  {language === "zh" 
                    ? "针对具体产品功能的视觉表达的\n实践融合探索" 
                    : "Exploring the practical integration of visual expression tailored to specific product functions."
                  }
                </p>
              </div>
            </motion.div>

            {/* CARD 2: 动态视觉 (Pill Badge "Dynamic Vision") */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(251, 191, 36, 0.3)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                const el = document.getElementById("marquee-section-container") || document.getElementById("marquee-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="bg-[#08080a] border border-zinc-900/80 rounded-[20px] p-4.5 flex flex-col justify-between h-[120px] relative overflow-hidden group cursor-pointer transition-colors"
              id="intro-bento-2"
            >
              <div>
                <span className="inline-flex items-center bg-[#1a120b] text-[#fbbf24] border border-[#d97706]/25 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-medium tracking-wide">
                  Dynamic Vision
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="font-sans font-semibold text-[13px] text-white group-hover:text-amber-400 transition-colors leading-tight">
                  {language === "zh" ? "动态视觉" : "Dynamic Vision"}
                </h3>
                <p className="text-zinc-400 font-sans text-[10px] font-light leading-tight whitespace-pre-line">
                  {language === "zh" 
                    ? "针对视觉过载时代下的动态\n视觉探索" 
                    : "Dynamic visual exploration in the era of visual overload."
                  }
                </p>
              </div>
            </motion.div>

            {/* CARD 3: 工作项目 (Pill Badge "Waterfall Collection") */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(52, 211, 153, 0.3)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                const el = document.getElementById("3d-staging-zone-2");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="bg-[#08080a] border border-zinc-900/80 rounded-[20px] p-4.5 flex flex-col justify-between h-[120px] relative overflow-hidden group cursor-pointer transition-colors"
              id="intro-bento-3"
            >
              <div>
                <span className="inline-flex items-center bg-[#0c1913] text-[#34d399] border border-[#059669]/25 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-medium tracking-wide">
                  Waterfall Collection
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="font-sans font-semibold text-[13px] text-white group-hover:text-emerald-400 transition-colors leading-tight">
                  {language === "zh" ? "工作项目" : "Work Projects"}
                </h3>
                <p className="text-zinc-400 font-sans text-[10px] font-light leading-tight whitespace-pre-line">
                  {language === "zh" 
                    ? "2022-2026工作轨迹，在不同职\n能下的殊途同归，保持初心" 
                    : "Work trajectory from 2022 to 2026, pathing different disciplines to same destination, staying true to craft."
                  }
                </p>
              </div>
            </motion.div>

            {/* CARD 4: 探索之外 (Pill Badge "Beyond Design") */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(167, 139, 250, 0.3)" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                const el = document.getElementById("beyond-design-zone");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="bg-[#08080a] border border-zinc-900/80 rounded-[20px] p-4.5 flex flex-col justify-between h-[120px] relative overflow-hidden group cursor-pointer transition-colors"
              id="intro-bento-4"
            >
              <div>
                <span className="inline-flex items-center bg-[#130f1e] text-[#a78bfa] border border-[#7c3aed]/25 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-medium tracking-wide">
                  Beyond Design
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="font-sans font-semibold text-[13px] text-white group-hover:text-purple-400 transition-colors leading-tight">
                  {language === "zh" ? "探索之外" : "Beyond Design"}
                </h3>
                <p className="text-zinc-400 font-sans text-[10px] font-light leading-tight whitespace-pre-line">
                  {language === "zh" 
                    ? "对灵光一现、迷茫与热爱的\n探索记录" 
                    : "Exploring and recording sparks of inspiration, moments of wonder, and ultimate passion."
                  }
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 3: PORTFOLIOS CONTROLLERS (Aesthetic split matching "画板7" and "画板3" respectively) */}
      <section
        id="portfolio"
        className="relative py-24 border-t border-zinc-950 z-10 bg-[#050506]"
      >
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <FolderHeart className="w-3.5 h-3.5 text-zinc-500 animate-pulse" />
              <span className="font-mono text-[10px] text-zinc-500 tracking-[0.25em] uppercase">
                {language === "zh" ? "核心创作者案集" : "CREATIVE EXHIBITION"}
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight text-white uppercase">
              {language === "zh" ? "作品展示集·数字展厅" : "PORTFOLIOS · DIGITAL EXHIBITION"}
            </h2>
          </div>
          <div className="text-right text-zinc-500 font-mono text-[10px] md:max-w-xs tracking-wider leading-relaxed">
            {translations.portfolio.instruction[language]}
          </div>
        </div>

        {/* 3D PORTFOLIO DIVISION: 三维创意视觉 8张可左右轮播交互画板 */}
        <div className="max-w-7xl mx-auto px-6 mb-28 scroll-mt-12" id="3d-staging-zone">
          
          <div className="mb-8 border-b border-zinc-900 pb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="h-1.5 w-1.5 bg-[#c07a3c] inline-block rounded-full animate-pulse shadow-[0_0_8px_#c07a3c]" />
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                {language === "zh" ? "三维创意视觉" : "3D CREATIVE VISUALS"}
              </span>
              <span className="text-zinc-500 text-xs font-mono ml-3">/ 3D CREATIVE VISUALS</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-zinc-500 font-mono text-[10px]">
              <span>{language === "zh" ? "支持左右点击轮播 · 悬停暂停" : "ROTATING CAROUSEL · HOVER TO PAUSE"}</span>
            </div>
          </div>

          <div 
            className="bg-[#070709] border border-zinc-900 rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[560px] sm:min-h-[620px] md:min-h-[660px]"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            
            {/* Dynamic Full-Bleed 3D Showcase Artwork */}
            <div 
              className="absolute inset-0 z-0 cursor-zoom-in group/bg flex items-center justify-center p-4 sm:p-8 md:p-10 overflow-hidden"
              onClick={() => setSelectedItem(portfolio3D[active3DIndex])}
              title={language === "zh" ? "点击查看高清大图" : "Click to view full image"}
            >
              {/* Soft atmospheric blurred background glow */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center filter blur-3xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
                style={{ backgroundImage: `url(${portfolio3D[active3DIndex]?.imageUrl})` }}
              />

              <AnimatePresence mode="wait">
                <motion.img
                  key={portfolio3D[active3DIndex]?.imageUrl || "3d-showcase"}
                  src={portfolio3D[active3DIndex]?.imageUrl}
                  alt={portfolio3D[active3DIndex]?.title[language] || ""}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45 }}
                  className="relative z-10 max-w-full max-h-[460px] sm:max-h-[520px] md:max-h-[580px] w-auto h-auto object-contain rounded-2xl drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] group-hover/bg:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none z-[1]" />

            {/* Left Navigation Arrow */}
            <button
              onClick={() => setActive3DIndex((prev) => (prev === 0 ? portfolio3D.length - 1 : prev - 1))}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#c07a3c] text-white hover:text-black border border-white/10 backdrop-blur-md transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer z-10"
              title={language === "zh" ? "上一张" : "Previous"}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={() => setActive3DIndex((prev) => (prev === portfolio3D.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#c07a3c] text-white hover:text-black border border-white/10 backdrop-blur-md transition-all duration-300 shadow-2xl hover:scale-110 cursor-pointer z-10"
              title={language === "zh" ? "下一张" : "Next"}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Top Badge */}
            <div className="absolute top-6 left-6 z-10">
              <span className="text-[11px] font-mono text-zinc-400 tracking-[0.2em] uppercase inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3c] animate-pulse" />
                <span>3D STAGING {active3DIndex + 1} / {portfolio3D.length}</span>
              </span>
            </div>

            {/* Bottom Info Pill */}
            <div 
              className="absolute bottom-20 sm:bottom-24 z-10 max-w-lg px-4 text-center cursor-pointer group/info"
              onClick={() => setSelectedItem(portfolio3D[active3DIndex])}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-zinc-200 group-hover/info:border-[#c07a3c] transition-colors">
                <span className="font-semibold text-white">{portfolio3D[active3DIndex]?.title[language]}</span>
                <span className="text-zinc-500">|</span>
                <span className="text-zinc-400">{portfolio3D[active3DIndex]?.medium[language]}</span>
                <span className="text-zinc-500">({portfolio3D[active3DIndex]?.year})</span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-center space-x-2 overflow-x-auto py-2 scrollbar-none">
              {portfolio3D.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActive3DIndex(idx)}
                  className={`relative w-10 sm:w-12 h-7 sm:h-8 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    active3DIndex === idx
                      ? "border-[#c07a3c] ring-2 ring-[#c07a3c]/50 scale-105"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                  title={item.title[language]}
                >
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D AUTO MARQUEE TRACK (Pause on hover, drag-to-scroll, hover-to-play animation) */}
        <div className="space-y-4 mb-28 scroll-mt-16" id="marquee-section-container">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-[#fbbf24] inline-block rounded-full animate-pulse" />
                <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                  {language === "zh" ? "动态视觉" : "DYNAMIC VISION"}
                </span>
                <span className="text-zinc-500 text-xs font-mono ml-2">/ HORIZONTAL INFINITE TIMELINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-[#c07a3c]/15 text-[#c07a3c] border border-[#c07a3c]/30 text-[11px] font-mono flex items-center space-x-2 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3c] animate-ping" />
                  <span>{language === "zh" ? "鼠标停留后自动播放动图" : "Hover to play animated motion"}</span>
                </span>
              </div>
            </div>
          </div>
          <PortfolioMarquee 
            items={dynamicVisionItems} 
            language={language} 
            onItemSelect={setSelectedItem} 
            speed={0.9} 
          />
        </div>

        {/* 3D PORTFOLIO DIVISION DUPLICATE (A replica with identical high-fidelity configuration) */}
        <div className="max-w-7xl mx-auto px-6 mb-28 scroll-mt-12 sm:scroll-mt-16" id="3d-staging-zone-2">
          
          <div className="mb-8 border-b border-zinc-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center flex-wrap">
              <span className="h-1.5 w-1.5 bg-white inline-block rounded-full mr-2" />
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                {language === "zh" ? "工作项目·详情页示例" : "Work Projects · Product Detail Page"}
              </span>
              <span className="text-zinc-500 text-xs font-mono ml-3">
                / WORK PROJECTS · PRODUCT DETAIL SHOWCASE
              </span>
            </div>
            <div className="text-zinc-400 text-xs font-mono flex items-center space-x-1.5 tracking-wide">
              <span>
                {language === "zh" 
                  ? "手机屏内鼠标滚轮上下滑动浏览 →" 
                  : "Scroll inside phone screen to browse →"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#070709] border border-transparent rounded-3xl p-6 md:p-10 relative overflow-hidden">
            
            {/* Background image placed only below content/text layers - expanded by 1px beyond edges to prevent sub-pixel gaps */}
            <div className="absolute -inset-[1px] pointer-events-none select-none z-0">
              <img 
                src={detailSets[detailIndex].bgImage} 
                alt="Section Background" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-100 scale-[1.01] origin-center transition-all duration-700"
              />
              {/* Soft dark visual mask for readability of text */}
              <div className="absolute inset-0 bg-[#070709]/15" />
            </div>

            {/* Fine decorative lighting background */}
            <div className={`absolute -right-20 -top-20 w-[400px] aspect-square rounded-full blur-[140px] opacity-20 pointer-events-none transition-all duration-700 ${
              studioLight2 === "sunset" ? "bg-amber-500" : studioLight2 === "neon" ? "bg-blue-600" : "bg-neutral-400"
            }`} />

            {/* LEFT PANELS: Product descriptions / details exactly mimicking Design Board 7 / Fridge Ad */}
            <div className="lg:col-span-6 space-y-8 z-10">
              
              {/* Product title labels */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-zinc-500 tracking-widest block">{detailSets[detailIndex].code}</span>
                <h3 className="text-white font-sans font-bold text-3xl md:text-4xl leading-tight whitespace-pre-line">
                  {language === "zh" ? (
                    detailSets[detailIndex].titleZh
                  ) : (
                    detailSets[detailIndex].titleEn
                  )}
                </h3>
                <h4 className="text-zinc-400 font-sans font-light text-sm tracking-wide border-l border-zinc-800 pl-4 py-0.5 whitespace-pre-line">
                  {language === "zh" 
                    ? detailSets[detailIndex].subtitleZh 
                    : detailSets[detailIndex].subtitleEn
                  }
                </h4>
              </div>

            </div>

            {/* RIGHT PANELS: Pristine Glossy iPhone Container showing live rendering under filter multiplier (Canvas 7) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-6 z-10">
              
              {/* Clean Minimalist 273x503px Display Viewport */}
              <div 
                style={{ width: "273px", height: "503px" }}
                className="relative bg-[#0a0a0d] rounded-2xl flex flex-col overflow-hidden border border-zinc-900 shadow-lg group/viewport"
              >
                
                {/* Scrollable image container simulating physical mobile screen scrolling */}
                <div 
                  ref={phoneViewportRef}
                  className="w-full h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#09090b] pointer-events-auto flex flex-col"
                >
                  {detailSets[detailIndex].images.map((imgUrl, idx) => (
                    <img 
                      key={idx}
                      src={imgUrl} 
                      alt={`Mobile Detail Preview Part ${idx + 1}`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block select-none"
                    />
                  ))}
                </div>

                {/* Glass glare effect reflection */}
                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[50%] -translate-y-[50%] rotate-30 pointer-events-none z-35" />

              </div>

              {/* Slider micro-controls underneath iPhone */}
              <div className="flex items-center space-x-5 mt-4">
                <button
                  onClick={() => {
                    setDetailIndex((prev) => (prev === 0 ? detailSets.length - 1 : prev - 1));
                    if (phoneViewportRef.current) {
                      phoneViewportRef.current.scrollTo({
                        top: 0,
                        behavior: "auto"
                      });
                    }
                  }}
                  className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
                  ACTIVE CASE: {detailIndex + 1} / {detailSets.length}
                </span>
                <button
                  onClick={() => {
                    setDetailIndex((prev) => (prev === detailSets.length - 1 ? 0 : prev + 1));
                    if (phoneViewportRef.current) {
                      phoneViewportRef.current.scrollTo({
                        top: 0,
                        behavior: "auto"
                      });
                    }
                  }}
                  className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>


        {/* BROWSER SHOWCASE BOARD matching "作品展示集.png" (Arda公众号推文 / WatchHouse. 浏览器数字展厅) */}
        <BrowserShowcaseBoard 
          language={language} 
          onSelectImage={setSelectedItem} 
          onCardSelect={handleBrowserCardSelect}
          isEditorialExpanded={isEditorialExpanded}
          onToggleEditorial={() => {
            setIsEditorialExpanded((prev) => {
              const next = !prev;
              if (next) {
                setTimeout(() => {
                  const el = document.getElementById("editorial-longpage-section");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 120);
              }
              return next;
            });
          }}
        />

        {/* EDITORIAL LONG PAGE BOARD matching "画板 7" (国庆产品软文 Arda艺术厨电公众号) */}
        <EditorialLongPageBoard 
          language={language} 
          onSelectImage={setSelectedItem} 
          isExpanded={isEditorialExpanded}
          onToggleExpand={(val) => setIsEditorialExpanded(val)}
          activeTab={activeEditorialTab}
          onTabChange={setActiveEditorialTab}
          linkedProjectId={linkedEditorialId}
        />

        {/* AI PORTFOLIO DIVISION (Rotational Orbit mimicking "画板3" image-wheel or orbital space) */}
        <div className="max-w-7xl mx-auto px-6 mb-24 overflow-hidden relative py-12" id="ai-orbital-zone">
          
          <div className="mb-8 border-b border-zinc-900 pb-4 flex items-center justify-between">
            <div>
              <span className="h-1.5 w-1.5 bg-white inline-block rounded-full mr-2" />
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                {translations.portfolio.titleAI[language]}
              </span>
              <span className="text-zinc-550 text-xs font-mono ml-3">/ EXHIBIT REFERENCE BOARD 3</span>
            </div>
          </div>

          {/* Interactive Dome Arch Showcase matching reference image ("Gather here" with squircle cards fanning overhead) */}
          <div 
            className="flex flex-col items-center justify-end relative w-full overflow-hidden bg-black border border-zinc-900 rounded-3xl h-[440px] sm:h-[490px] md:h-[530px] lg:h-[560px] select-none pb-0"
            id="gather-showcase-zone"
          >
            {/* Subtle atmospheric ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/5 to-transparent blur-3xl pointer-events-none" />

            {/* Stage container with responsive proportional scale pinned to bottom baseline */}
            <div className="relative w-[1000px] h-[500px] flex items-center justify-center scale-[0.36] xs:scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform duration-500 origin-bottom pointer-events-auto">
              
              {/* Semicircular Dome Arch of 9 Squircle Cards matching 画板 5.png */}
              {gatherCards.map((item, idx) => {
                // Symmetrically distributed angles along the upper arch: from -90° (left baseline) to +90° (right baseline)
                // Exactly 9 cards evenly distributed across 180°: 180 / 8 = 22.5° step
                // Center card (idx 4) is 0° at the exact top zenith
                const angles = [-90, -67.5, -45, -22.5, 0, 22.5, 45, 67.5, 90];
                const angle = angles[idx];
                const rad = (angle * Math.PI) / 180;
                
                const R = 380; // Precise circular radius of the arch
                const Cx = 500; // Center X of the canvas
                const Cy = 445; // Center Y of the canvas (baseline diameter for terminal cards)
                const cardSize = 104; // Card width and height (squircle)

                const targetX = Cx + R * Math.sin(rad) - cardSize / 2;
                const targetY = Cy - R * Math.cos(rad) - cardSize / 2;
                const targetRotate = angle; // Centripetal tilt: bottom edge faces center (Cx, Cy), top edge flares outward

                const isBottomCard = idx === 0 || idx === gatherCards.length - 1;

                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      left: `${targetX}px`,
                      top: `${targetY}px`,
                      width: `${cardSize}px`,
                      height: `${cardSize}px`,
                      ...(isBottomCard ? {
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 96%)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 96%)",
                      } : {}),
                    }}
                    className={`z-20 cursor-pointer ${isBottomCard ? "opacity-95 hover:opacity-100 transition-opacity duration-300" : ""}`}
                  >
                    <motion.div
                      style={{
                        width: "100%",
                        height: "100%",
                        transformOrigin: "center center",
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.35,
                        rotate: targetRotate - 100,
                        y: 35,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        rotate: targetRotate,
                        y: 0,
                      }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        type: "spring",
                        stiffness: 85,
                        damping: 14,
                        mass: 0.85,
                        delay: idx * 0.055,
                      }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.14,
                          zIndex: 50,
                          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.95)",
                          transition: { duration: 0.2 },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="w-full h-full rounded-[26px] overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/50 shadow-2xl relative group/gather-card transition-colors duration-300"
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.title[language]} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-[26px] transition-transform duration-500 group-hover/gather-card:scale-105"
                        />
                        {/* Hover Info Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/gather-card:opacity-100 transition-opacity duration-300 p-2.5 flex flex-col justify-end text-left rounded-[26px]">
                          <h6 className="text-[10px] text-white font-bold font-display leading-tight truncate">
                            {item.title[language]}
                          </h6>
                          <span className="text-[8px] font-mono text-zinc-300 mt-0.5">
                            {item.medium[language]}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}

              {/* Center Content placed directly underneath the arch */}
              <div 
                className="absolute z-10 flex flex-col items-center justify-center text-center max-w-[440px] px-4 pointer-events-auto"
                style={{
                  left: "50%",
                  top: "330px",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="text-zinc-300 font-sans leading-relaxed max-w-[420px] font-normal tracking-wide">
                  {language === "zh" ? (
                    <>
                      <span className="text-white font-display font-bold text-xl sm:text-2xl block mb-2 tracking-wide">
                        AI视觉生成
                      </span>
                      <span className="text-zinc-300 text-xs sm:text-sm block leading-relaxed font-light">
                        包括写实场景，写实人物，写实动物，概念特效等
                      </span>
                      <span className="text-zinc-500 font-mono text-[10px] sm:text-[11px] block mt-2 tracking-widest uppercase">
                        AI VISUAL GENERATION · REALISTIC SCENES, CHARACTERS, ANIMALS & CONCEPT VFX
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-white font-display font-bold text-xl sm:text-2xl block mb-2 tracking-wide">
                        AI Visual Generation
                      </span>
                      <span className="text-zinc-300 text-xs sm:text-sm block leading-relaxed font-light">
                        Including realistic scenes, realistic characters, lifelike animals, and conceptual visual effects.
                      </span>
                    </>
                  )}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* AI AUTO MARQUEE TRACK (Reverse motion flow for dramatic velocity contrast) */}
        <div className="space-y-4 mb-20 scroll-mt-12 sm:scroll-mt-16" id="beyond-design-zone">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 bg-[#a78bfa] inline-block rounded-full animate-pulse" />
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                {language === "zh" ? "探索之外" : "BEYOND DESIGN"}
              </span>
              <span className="text-zinc-500 text-xs font-mono ml-2">/ HORIZONTAL INFINITE REVERSE</span>
            </div>
          </div>
          <PortfolioMarquee 
            items={portfolioAI} 
            language={language} 
            onItemSelect={setSelectedItem} 
            speed={1.1} 
            reverse={true} 
          />
        </div>

      </section>

      {/* SECTION 4: CONTACT & FOOTER (Pure telephone, working email, and WeChat QR Code inside container) */}
      <section
        id="contact"
        className="min-h-[85vh] relative py-20 border-t border-zinc-950 flex flex-col justify-between items-center px-6 z-10 bg-[#060607]/80"
      >
        <div className="max-w-5xl w-full mx-auto my-auto py-12 flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
          
          {/* LEFT: Text introduction columns */}
          <div className="space-y-6 text-center lg:text-left max-w-lg">
            <div className="inline-flex items-center space-x-2 bg-zinc-950/80 border border-zinc-900 px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="font-mono text-[9px] text-zinc-300 font-medium tracking-[0.2em] uppercase">
                {language === "zh" ? "开放承接3D/AI视觉全案委托" : "OPEN FOR DIGITAL COMMISSIONS"}
              </span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-tight">
              {translations.contact.title[language]}
            </h2>
            
            <p className="text-zinc-500 font-sans text-sm md:text-base font-light">
              {translations.contact.subtitle[language]}
            </p>

            {/* List Contact Anchors strictly representing Phone Call & Work Email */}
            <div className="space-y-3.5 pt-4 max-w-sm mx-auto lg:mx-0">
              
              {/* CONTACT PHONE CALL */}
              <div 
                onClick={() => copyToClipboard(contactInfo.phone, "phone")}
                className="group cursor-pointer flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 hover:bg-[#09090b] rounded-xl transition-all duration-300"
                id="contact-phone-badge"
              >
                <div className="flex items-center space-x-3.5 text-left">
                  <div className="p-2.5 bg-[#050506] border border-zinc-900 rounded-lg group-hover:bg-white group-hover:text-black text-zinc-400 transition-colors duration-300">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase leading-none mb-1">
                      {translations.contact.phoneLabel[language]}
                    </h5>
                    <p className="text-zinc-200 font-mono font-semibold text-xs sm:text-sm tracking-wide">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
                
                <button className="text-zinc-500 hover:text-white transition-colors duration-200">
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 animate-scale-in" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </div>

              {/* BUSINESS EMAIL ADDRESS */}
              <div 
                onClick={() => copyToClipboard(contactInfo.email, "email")}
                className="group cursor-pointer flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 hover:bg-[#09090b] rounded-xl transition-all duration-300"
                id="contact-email-badge"
              >
                <div className="flex items-center space-x-3.5 text-left">
                  <div className="p-2.5 bg-[#050506] border border-zinc-900 rounded-lg group-hover:bg-white group-hover:text-black text-zinc-400 transition-colors duration-300">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase leading-none mb-1">
                      {translations.contact.emailLabel[language]}
                    </h5>
                    <p className="text-zinc-200 font-mono font-semibold text-xs sm:text-sm tracking-wide">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 hover:text-white text-zinc-500 hover:scale-110 transition hidden sm:block"
                    title="Send Email Directly"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button className="text-zinc-500 hover:text-white transition-colors duration-200">
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 animate-scale-in" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: High quality WeChat QR Code Layout card */}
          <div className="flex flex-col items-center p-6 bg-[#070709] border border-zinc-900 rounded-3xl relative shadow-xl z-20 w-64 md:w-72" id="wechat-qr-card">
            
            {/* Fine decoration detail */}
            <div className="absolute top-3.5 left-4 flex space-x-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
            </div>
            
            <div className="w-full aspect-square bg-[#050506] border border-zinc-900 rounded-2xl overflow-hidden p-3.5 relative flex items-center justify-center group/qr">
              <img
                src={contactInfo.wechatQrUrl}
                alt="WeChat QR Code Client Card"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-contain rounded-xl relative z-10 transition-transform duration-500 group-hover/qr:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-20" />
            </div>

            <div className="text-center mt-4.5 space-y-1 w-full">
              <h4 className="font-mono text-[9px] text-[#c77dff] tracking-[0.25em] uppercase">
                {translations.contact.wechatLabel[language]}
              </h4>
              <p className="text-zinc-300 font-sans text-xs font-light">
                {language === "zh" ? "微信一键扫码加为好友" : "Scan Code to Connect on WeChat"}
              </p>
            </div>
          </div>

        </div>

        {/* Fine minimal footer section */}
        <div className="max-w-7xl mx-auto w-full border-t border-zinc-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 text-zinc-650 font-mono text-[9px] uppercase tracking-wider relative z-10 select-none">
          <div>
            {translations.contact.copyright[language]}
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-zinc-400 transition-colors pointer-events-none text-right">DESIGN.3D.AIDORIS STUDIO</span>
          </div>
        </div>

      </section>

      {/* DETAILED EXPANSION ZOOM PORTFOLIO MODAL (Lightbox) */}
      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        language={language}
      />
    </div>
  );
}
