import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  ChevronRight, 
  ChevronDown,
  Upload, 
  Image as ImageIcon, 
  Maximize2, 
  RefreshCw, 
  Check, 
  X, 
  ExternalLink,
  Lock,
  Sparkles
} from "lucide-react";
import { PortfolioItem } from "../types";

interface BrowserShowcaseBoardProps {
  language: "en" | "zh";
  onSelectImage?: (item: PortfolioItem) => void;
  onCardSelect?: (projectId: string, shouldNavigate?: boolean) => void;
  isEditorialExpanded?: boolean;
  onToggleEditorial?: () => void;
}

interface ProjectCard {
  id: string;
  seq: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  heroHeadline: string;
  heroHeadlineEn: string;
  heroSubheadline: string;
  heroSubheadlineEn: string;
  url: string;
  thumbnail: string;
  bgImage: string;
  tag?: string;
}

const initialProjects: ProjectCard[] = [
  {
    id: "hao-shui",
    seq: "01",
    title: "让好水融入进家的日常",
    titleEn: "Pure Water in Daily Life",
    subtitle: "3.0版 · 净饮系列推文",
    subtitleEn: "v3.0 · Drinking Water Editorial",
    heroHeadline: "让好水\n融入进家的日常",
    heroHeadlineEn: "Pure Water\nin Daily Life",
    heroSubheadline: "3.0版 · 净饮系列推文 · Arda艺术厨电公众号",
    heroSubheadlineEn: "Arda Art Kitchen WeChat Visual Upgrade v3.0 · Water Purification Editorial",
    url: "https://mp.weixin.qq.com/s/drVHWl0t4duu9Quo_o8-tw",
    thumbnail: "/assets/browser_thumbs/thumb_3.png",
    bgImage: "/assets/aistudio/3_8f17aba7.png",
    tag: "3.0版"
  },
  {
    id: "chu-fang-guan-xi",
    seq: "02",
    title: "让所有关系在厨房里重新沸腾",
    titleEn: "Kitchen Connections Reimagined",
    subtitle: "3.0版 · 新年贺岁推文",
    subtitleEn: "v3.0 · New Year Celebration Feature",
    heroHeadline: "让所有关系\n在厨房里重新沸腾",
    heroHeadlineEn: "Kitchen Connections\nReimagined",
    heroSubheadline: "3.0版 · 新年贺岁推文 · Arda艺术厨电公众号",
    heroSubheadlineEn: "Arda Art Kitchen WeChat Visual Upgrade v3.0 · New Year Celebration Feature",
    url: "https://mp.weixin.qq.com/s/yhD0cN25i8xYfwthIlVL5g",
    thumbnail: "/assets/browser_thumbs/thumb_4.png",
    bgImage: "/assets/aistudio/4_9b92621c.jpg",
    tag: "3.0版"
  },
  {
    id: "yi-wu-jing-hua",
    seq: "03",
    title: "重塑全屋衣物“净”化论",
    titleEn: "Whole-Home Garment Purification",
    subtitle: "4.0版 · 洗护净衣软文",
    subtitleEn: "v4.0 · Garment Care Editorial",
    heroHeadline: "重塑全屋\n衣物\"净\"化论",
    heroHeadlineEn: "Whole-Home\nGarment Purification",
    heroSubheadline: "4.0版 · 洗护净衣软文 · Arda艺术厨电公众号",
    heroSubheadlineEn: "Arda Art Kitchen WeChat Visual Upgrade v4.0 · Garment Care Editorial",
    url: "https://mp.weixin.qq.com/s/drVHWl0t4duu9Quo_o8-tw",
    thumbnail: "/assets/browser_thumbs/thumb_5.png",
    bgImage: "/assets/aistudio/5_8ba58e46.jpg",
    tag: "4.0版"
  },
  {
    id: "liu-bai-zhu-yi",
    seq: "04",
    title: "《8m²的留白主义》",
    titleEn: "8m² White Space Philosophy",
    subtitle: "1.0版 · 妇女节产品软文",
    subtitleEn: "v1.0 · Women's Day Feature",
    heroHeadline: "《8m²的留白主义》",
    heroHeadlineEn: "8m² White Space Philosophy",
    heroSubheadline: "1.0版 · 妇女节产品软文 · Arda艺术厨电公众号",
    heroSubheadlineEn: "Women's Day Product Feature · Arda Art Kitchen Official WeChat",
    url: "https://mp.weixin.qq.com/s/GT6_mQ6XnczygofnhkdWwg",
    thumbnail: "/assets/browser_thumbs/thumb_7.png",
    bgImage: "/assets/aistudio/7_e97e8404.png",
    tag: "1.0版"
  },
  {
    id: "hua-kuang-zhi-jian",
    seq: "05",
    title: "画框之间",
    titleEn: "Between Frames",
    subtitle: "国庆产品软文",
    subtitleEn: "National Day Editorial",
    heroHeadline: "画框之间",
    heroHeadlineEn: "Between Frames",
    heroSubheadline: "国庆产品软文 · Arda艺术厨电公众号",
    heroSubheadlineEn: "National Day Product Feature · Arda Art Kitchen Official WeChat",
    url: "https://mp.weixin.qq.com/s/bInG9LqFbPpwgA-LDGOxEQ",
    thumbnail: "/assets/browser_thumbs/thumb_6.png",
    bgImage: "/assets/aistudio/P1_2eaa0934.png",
    tag: "国庆软文"
  },
  {
    id: "duan-wu",
    seq: "06",
    title: "端 午",
    titleEn: "Dragon Boat Festival",
    subtitle: "2.0版 · 端午系列软文",
    subtitleEn: "v2.0 · Dragon Boat Feature",
    heroHeadline: "端 午",
    heroHeadlineEn: "Dragon Boat Festival",
    heroSubheadline: "2.0版 · 端午系列软文 · Arda艺术厨电公众号",
    heroSubheadlineEn: "Arda Art Kitchen WeChat Visual Upgrade v2.0 · Dragon Boat Feature",
    url: "https://mp.weixin.qq.com/s/HU0ZyuKuM5mXoYB1o8xlfQ",
    thumbnail: "/assets/browser_thumbs/thumb_2.png",
    bgImage: "/assets/aistudio/2_e855fb58.png",
    tag: "2.0版"
  },
  {
    id: "song-chi",
    seq: "07",
    title: "松 弛",
    titleEn: "Relaxed Harmony",
    subtitle: "2.0版 · 洗护产品推文",
    subtitleEn: "v2.0 · Laundry Care Editorial",
    heroHeadline: "松 弛",
    heroHeadlineEn: "Relaxed Care",
    heroSubheadline: "2.0版 · 洗护产品推文 · Arda艺术厨电公众号",
    heroSubheadlineEn: "Arda Art Kitchen WeChat Visual Upgrade v2.0 · Laundry Care Editorial",
    url: "https://mp.weixin.qq.com/s/eL0rGsM2-QyYSledkuC-qw",
    thumbnail: "/assets/browser_thumbs/thumb_1.png",
    bgImage: "/assets/aistudio/1_c8f57753.png",
    tag: "2.0版"
  }
];

export default function BrowserShowcaseBoard({ 
  language, 
  onSelectImage,
  onCardSelect,
  isEditorialExpanded,
  onToggleEditorial
}: BrowserShowcaseBoardProps) {
  const [projects, setProjects] = useState<ProjectCard[]>(initialProjects);
  const [activeId, setActiveId] = useState<string>(initialProjects[0].id);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  const handleSelectCard = (id: string) => {
    if (activeId === id) {
      // 再次点击相同页面：转到链接的长页示例
      if (onCardSelect) {
        onCardSelect(id, true);
      }
    } else {
      // 单击切换：切换当前展厅画面，并联动更新长页数据，不强制离开当前视野
      setActiveId(id);
      if (onCardSelect) {
        onCardSelect(id, false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProjects((prev) =>
            prev.map((p) =>
              p.id === activeId
                ? { ...p, bgImage: result, thumbnail: result }
                : p
            )
          );
          setIsReplaceModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (customInputUrl.trim()) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeId
            ? { ...p, bgImage: customInputUrl.trim(), thumbnail: customInputUrl.trim() }
            : p
        )
      );
      setCustomInputUrl("");
      setIsReplaceModalOpen(false);
    }
  };

  const handleResetToDefault = () => {
    const original = initialProjects.find((p) => p.id === activeId);
    if (original) {
      setProjects((prev) =>
        prev.map((p) => (p.id === activeId ? { ...original } : p))
      );
    }
    setIsReplaceModalOpen(false);
  };

  const openLightbox = () => {
    if (onSelectImage) {
      onSelectImage({
        id: activeProject.id,
        imageUrl: activeProject.bgImage,
        title: {
          zh: activeProject.heroHeadline,
          en: activeProject.heroHeadlineEn
        },
        description: {
          zh: activeProject.heroSubheadline,
          en: activeProject.heroSubheadlineEn
        },
        year: "2024",
        medium: {
          zh: "品牌视觉升级 / 浏览器数字展厅",
          en: "Visual Identity & Browser Digital Showroom"
        }
      });
    }
  };

  return (
    <div 
      className="max-w-7xl mx-auto px-6 mb-24 relative select-none" 
      id="browser-showcase-section"
    >
      {/* Section Header */}
      <div className="mb-6 border-b border-zinc-900 pb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="h-2 w-2 bg-[#d97736] rounded-full inline-block animate-pulse shadow-[0_0_8px_#d97736]" />
          <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
            {language === "zh" ? "工作项目·长页版式设计示例" : "Work Projects · Long Page Layout Showcase"}
          </h2>
          <span className="text-zinc-500 text-xs font-mono hidden sm:inline">
            / WORK PROJECTS · LONG PAGE LAYOUT SHOWCASE
          </span>
        </div>
      </div>

      {/* Atmospheric Ambient Glow behind Browser Window Frame */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#c07a3c]/20 via-[#993b1b]/15 to-[#d97736]/20 rounded-[38px] blur-2xl opacity-70 pointer-events-none" />

        {/* Outer Browser Window Frame matching reference image "画板 4 / 作品展示集.png" */}
        <div className="relative w-full rounded-[26px] sm:rounded-[34px] border border-white/20 bg-[#0d0c0c] shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Top Browser Chrome Bar */}
          <div className="relative h-12 sm:h-14 border-b border-white/15 bg-black/60 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-20">
            {/* Window control dots: 3 white hollow circles matching reference image */}
            <div className="flex items-center space-x-2.5">
              <span className="w-3 h-3 rounded-full border border-white/60 inline-block hover:border-white transition-colors" />
              <span className="w-3 h-3 rounded-full border border-white/60 inline-block hover:border-white transition-colors" />
              <span className="w-3 h-3 rounded-full border border-white/60 inline-block hover:border-white transition-colors" />
            </div>

            {/* Pill Search / Address Bar matching reference image */}
            <div className="flex-1 max-w-xl mx-4 sm:mx-8">
              <div className="relative flex items-center justify-between h-7 sm:h-8 rounded-full border border-white/30 bg-black/40 backdrop-blur-md px-4 sm:px-5 text-white/50 text-[11px] sm:text-xs font-mono tracking-wide shadow-inner group/address">
                <a
                  href={activeProject.url.startsWith("http://") || activeProject.url.startsWith("https://") ? activeProject.url : `https://${activeProject.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 overflow-hidden truncate hover:text-white transition-colors cursor-pointer"
                  title={language === "zh" ? "在微信中打开此链接" : "Open URL in new tab"}
                >
                  <Lock className="w-3 h-3 text-white/40 group-hover/address:text-emerald-400 shrink-0 transition-colors" />
                  <span className="truncate text-white/70 group-hover/address:text-white">
                    {activeProject.url.startsWith("http://") || activeProject.url.startsWith("https://") ? activeProject.url : `https://${activeProject.url}`}
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 text-white/30 group-hover/address:text-white/80 shrink-0 ml-1" />
                </a>
                <span className="hidden md:inline-block text-[10px] text-white/30 tracking-widest uppercase shrink-0 ml-2">
                  HTTPS://SSL SECURE
                </span>
              </div>
            </div>

            {/* Right Hamburger Menu Icon (3 white lines) matching reference image */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsReplaceModalOpen(true)}
                className="text-white/80 hover:text-white transition p-1 cursor-pointer"
                title={language === "zh" ? "菜单 / 设置" : "Menu / Settings"}
              >
                <Menu className="w-5 h-5 text-white stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Main Inner Canvas / Stage Area */}
          <div className="relative w-full min-h-[580px] sm:min-h-[660px] md:min-h-[760px] overflow-hidden bg-black flex flex-col justify-between">
            
            {/* Dynamic Background Image with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id + activeProject.bgImage}
                initial={{ opacity: 0.2, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.1, scale: 0.99 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
              >
                <img
                  src={activeProject.bgImage}
                  alt={activeProject.heroHeadline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-[1.03]"
                />
              </motion.div>
            </AnimatePresence>


            {/* Ambient vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none z-[2]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/80 pointer-events-none z-[2]" />

            {/* Top Right Hero Typography matching reference image */}
            <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 flex justify-end">
              <div className="text-right max-w-xl">
                <motion.h1
                  key={`headline-${activeProject.id}`}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] whitespace-pre-line leading-[1.15]"
                >
                  {language === "zh" ? activeProject.heroHeadline : activeProject.heroHeadlineEn}
                </motion.h1>

                <motion.p
                  key={`subheadline-${activeProject.id}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-2 text-sm sm:text-base md:text-lg text-white/85 font-light tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                >
                  {language === "zh" ? activeProject.heroSubheadline : activeProject.heroSubheadlineEn}
                </motion.p>
              </div>
            </div>

            {/* Right-Hand Floating Sidebar Cards matching reference image */}
            <div className="relative z-10 w-full flex justify-end p-4 sm:p-8 md:p-12">
              <div className="w-full sm:w-[320px] md:w-[360px] flex flex-col space-y-2 sm:space-y-2.5 max-h-[500px] sm:max-h-[540px] overflow-y-auto pr-1 scrollbar-none">
                {projects.map((proj) => {
                  const isActive = proj.id === activeId;

                  return (
                    <motion.div
                      key={proj.id}
                      onClick={() => handleSelectCard(proj.id)}
                      whileHover={{ scale: 1.015, x: -2 }}
                      whileTap={{ scale: 0.985 }}
                      className={`group relative p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-xl border text-left flex flex-col ${
                        isActive
                          ? "bg-black/85 border-white/50 shadow-[0_12px_32px_rgba(0,0,0,0.9)] ring-1 ring-white/25"
                          : "bg-black/55 hover:bg-black/75 border-white/10 hover:border-white/25 shadow-lg"
                      }`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-3.5 w-full">
                        {/* Thumbnail matching reference image */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-zinc-900 shadow-md">
                          <img
                            src={proj.thumbnail}
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-[#d97736]/20 border border-[#d97736]/60 rounded-xl pointer-events-none" />
                          )}
                        </div>

                        {/* Content Info */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-start justify-between gap-1.5">
                            <h4 className="text-sm font-semibold text-white tracking-wide whitespace-pre-line leading-snug">
                              {language === "zh" ? proj.title : proj.titleEn}
                            </h4>
                            <ChevronRight 
                              className={`w-3.5 h-3.5 transition-transform duration-300 shrink-0 mt-0.5 ${
                                isActive 
                                  ? "text-white translate-x-0.5" 
                                  : "text-white/40 group-hover:text-white group-hover:translate-x-0.5"
                              }`} 
                            />
                          </div>

                          <p className="text-[11px] sm:text-xs text-zinc-300 font-light mt-0.5 leading-snug whitespace-pre-line">
                            {language === "zh" ? proj.subtitle : proj.subtitleEn}
                          </p>
                        </div>
                      </div>

                      {/* Left indicator bar for active state */}
                      {isActive && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#d97736] rounded-r-full" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Bar: Quick Hint & Status */}
            <div className="relative z-10 px-6 py-3 bg-black/40 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 font-mono gap-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d97736]" />
                <span>
                  {language === "zh"
                    ? "提示：单击卡片切换展项，再次点击当前卡片即可前往对应长页版式案例"
                    : "Tip: Click card to switch exhibit; click again to navigate to linked long-page editorial"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    if (onCardSelect) {
                      onCardSelect(activeId, true);
                    } else if (onToggleEditorial) {
                      onToggleEditorial();
                    }
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#d97736]/20 hover:bg-[#d97736]/30 border border-[#d97736]/50 text-[#d97736] hover:text-white transition cursor-pointer text-xs font-sans"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>
                    {isEditorialExpanded
                      ? (language === "zh" ? "长页版式已展开 ↓" : "Editorial Window Open ↓")
                      : (language === "zh" ? "展开联动长页版式 ↓" : "Expand Linked Editorial ↓")}
                  </span>
                </button>
                {/* Number badge removed as requested */}
                <button
                  onClick={openLightbox}
                  className="text-white/80 hover:text-white transition flex items-center space-x-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>{language === "zh" ? "画廊高清" : "Full View"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Replace Image Modal */}
      <AnimatePresence>
        {isReplaceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121110] border border-[#3b322b] rounded-2xl max-w-md w-full p-6 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-[#d97736]" />
                  <h3 className="text-white font-medium text-sm">
                    {language === "zh" ? "替换当前展项底图" : "Replace Showcase Image"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsReplaceModalOpen(false)}
                  className="text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-4">
                <p className="text-xs text-zinc-400">
                  {language === "zh"
                    ? `当前替换展项：${activeProject.title} (${activeProject.heroHeadline})`
                    : `Currently replacing: ${activeProject.titleEn}`}
                </p>

                {/* Upload local file */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    {language === "zh" ? "上传本地图片" : "Upload Local Image"}
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-4 rounded-xl border border-dashed border-zinc-700 hover:border-[#d97736] bg-zinc-900/60 hover:bg-zinc-900 text-xs text-zinc-300 flex items-center justify-center space-x-2 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-[#d97736]" />
                    <span>{language === "zh" ? "选择并上传图片" : "Select & Upload Image"}</span>
                  </button>
                </div>

                <div className="flex items-center my-2">
                  <div className="flex-1 border-t border-zinc-800" />
                  <span className="px-3 text-[10px] text-zinc-500 uppercase font-mono">
                    {language === "zh" ? "或输入图片链接" : "Or Image URL"}
                  </span>
                  <div className="flex-1 border-t border-zinc-800" />
                </div>

                {/* Paste image URL */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    {language === "zh" ? "在线图片 URL" : "Online Image URL"}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={customInputUrl}
                      onChange={(e) => setCustomInputUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-[#d97736] focus:outline-none rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                    <button
                      onClick={handleApplyUrl}
                      className="px-4 py-2 bg-[#d97736] hover:bg-[#c26528] text-white text-xs font-medium rounded-xl transition cursor-pointer"
                    >
                      {language === "zh" ? "确认" : "Apply"}
                    </button>
                  </div>
                </div>

                {/* Reset to default */}
                <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center">
                  <button
                    onClick={handleResetToDefault}
                    className="flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{language === "zh" ? "恢复默认展示图" : "Reset Default"}</span>
                  </button>

                  <button
                    onClick={() => setIsReplaceModalOpen(false)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-lg transition cursor-pointer"
                  >
                    {language === "zh" ? "关闭" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
