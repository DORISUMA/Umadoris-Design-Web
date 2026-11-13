import { ExperienceItem, EducationItem, SoftwareTool, PortfolioItem, ContactInfo } from "./types";

export const translations = {
  header: {
    logo: "LU78",
    navWork: { en: "Home", zh: "首页" },
    navIntro: { en: "Profile", zh: "个人介绍" },
    navPortfolio: { en: "Portfolios", zh: "作品集" },
    navContact: { en: "Contact", zh: "联系方式" },
  },
  cover: {
    subtitle_experience: {
      en: "5+ YEARS OF 3D TABLEWARE RENDERING & NEW MEDIA GRAPHIC INNOVATION DIRECTING",
      zh: "5年以上中高端3D渲染视觉呈现与新媒体平面视觉创新经验",
    },
    subtitle_software: {
      en: "Proficient in Blender, Adobe Photoshop, Stable Diffusion Custom Workflows & AI Visual Engines",
      zh: "精通Blender/Adobe Photoshop/Stable Diffusion Custom Worlflows 及AI视觉引擎",
    },
  },
  intro: {
    title: { en: "ABOUT / PROFILE", zh: "关于 / 个人介绍" },
    name: { en: "LUO CHENAN / CHENAN LUO", zh: "罗晨安 LU78" },
    role: { en: "Lead 3D Render & AI Visual Designer", zh: "资深 3D 渲染表现与 AI 创意设计师" },
    bio: {
      en: "Focusing on high-end 3D spatial rendering, photorealistic product staging, and AI-assisted generative graphic design. Balancing physical realism with virtual aesthetic boundaries.",
      zh: "致力于高端3D空间渲染、写实产品演绎和AI生成艺术设计。在物理真实性与虚拟美学边界之间寻找平衡，为全球品牌打造极致的数字视觉资产。",
    },
    sections: {
      experience: { en: "EXPERIENCE", zh: "工作经历" },
      education: { en: "EDUCATION", zh: "教育经历" },
      tools: { en: "SOFTWARE & TOOLS", zh: "熟练软件与工具" },
    },
  },
  portfolio: {
    title3D: { en: "3D CREATIVE VISUALS", zh: "三维创意视觉" },
    desc3D: { en: "Explore realistic structural simulations, interior atmospheres, and luxury abstract objects.", zh: "探索极致的物理写实渲染、三维空间氛围以及奢华材质模拟表现。" },
    titleAI: { en: "AI CREATIVE PORTFOLIO", zh: "AI 视觉创意作品集" },
    descAI: { en: "Generative artwork merging human creative direction with stable diffusion neural styling.", zh: "结合前沿AI生成引擎与人工创意指导的未来数字先锋插画、视觉实验。" },
    instruction: {
      en: "← Drag horizontally to explore • Click to expand zoom • Hover to pause auto-scroll →",
      zh: "← 左右拖拽滑动浏览 • 鼠标点击放大查看高像素图 • 鼠标悬停暂停自动滚动 →",
    },
  },
  contact: {
    title: { en: "GET IN TOUCH", zh: "联络合作" },
    subtitle: { en: "Let's create something extraordinary together.", zh: "让我们携手打造非凡视觉体验。" },
    phoneLabel: { en: "Phone", zh: "联系电话" },
    emailLabel: { en: "Business Email", zh: "工作邮箱" },
    wechatLabel: { en: "WeChat Scan Code", zh: "微信号 (扫码添加)" },
    copyright: { en: "2026 DORIS ZHENG PORTFOLIO. ALL RIGHTS RESERVED.", zh: "2026 郑睿斯 DORIS 个人作品集.保留所有权利." },
  },
};

export const experiences: ExperienceItem[] = [
  {
    period: "2024.05 - 2026.07",
    title: { en: "Senior 3D & Graphic Designer", zh: "高级三维及平面设计师" },
    company: { en: "ARDA Electric Co., Ltd. · Marketing & Brand Department", zh: "ARDA安德电器 · 市场品牌部" },
    description: {
      en: "· Responsible for 3D modeling, hero images, A+ page spatial environment building, photorealistic rendering, and retouching for luxury kitchen and home appliances; independently handled end-to-end pipelines from modeling, texturing, lighting/rendering to post-production compositing, completing 7 full-suite flagship hero & detail pages and 20+ A+ scenes.\n\n· Designed hero banners, A+ modules, and e-commerce visuals grounded in product selling points and conversion logic; familiar with domestic e-commerce A+ and official platform visual standards; collaborated smoothly with operations, marketing, and brand teams.\n\n· Leveraged AIGC tools (ChatGPT, Stable Diffusion, Midjourney, Photoshop AI) for scene ideation, asset generation, and workflow optimization, actively pioneering AI applications in digital commerce.\n\n· Supported visual upgrades for brand and group portals; contributed to PC/mobile frontend visual architecture, web design, key visuals, and marketing assets; benchmarked against Gaggenau, Liebherr, and Fotile to revitalize brand visual tone.\n\n· Led social media marketing creatives across WeChat and Xiaohongshu (RED), producing official WeChat editorial long-pages, festive posters, and brand brochures.\n\n· Spearheaded offline and retail store collateral, including roll-up banners, invitations, flyers, and anniversary campaign graphics, ensuring strict offline-to-online visual cohesion.\n\n· Researched aesthetics and competitor trends; tracked global user visual preferences and conversion heuristics to consistently drive visual iterations.",
      zh: "·负责电商产品，品牌高端厨电与家电类产品的3D建模、主图、A+页面整体场景搭建、照片级渲染及后期精修处理，输出高品质写实视觉素材，支撑电商详情页与活动页面转化;独立完成从建模、材质调节、灯光渲染到后期合成的全流程，累计完成品牌主打产品全流程7套主图与详情页与20+的A+场景。\n\n·结合产品卖点与电商转化逻辑进行主图、A+页面及场景视觉设计，熟悉国内电商A+页面与官网/购物平台视觉规范，配合运营、市场、品牌等跨部门高效沟通，精准理解需求并快速响应输出。\n\n·使用AIGC工具，如GPT、Stable Diffusion、Midjourney、PS AI等，辅助场景概念、素材生成与后期效率提升，探索AI在电商视觉与品牌视觉中的新技术运用。\n\n·协助品牌官网、集团官网视觉提升，参与PC端与移动端官方购物平台前端视觉搭建，包含网页设计、主视觉设计及发布物料等;通过定位嘉格纳、利勃海尔、方太等国内外高端厨房电器竞品品牌基调，参与品牌视觉焕新，提升品牌视觉调性。\n\n·负责市场品牌新媒体营销活动创意与日常配图设计，覆盖微信、小红书等社交媒体平台，包括公众号文章、节日海报、品牌图册等产品视觉物料。\n\n·统筹与设计线下活动与门店设计需求，包括易拉宝、邀请函、宣传单页、周年庆典等物料，保障品牌线下视觉统一。\n\n·调研整理竞品及整体美学流行趋势，关注海内外用户视觉偏好与电商转化逻辑，持续输出设计方向建议并推动品牌视觉优化迭代。"
    },
  },
  {
    period: "2022.09 - 2024.03",
    title: { en: "3D Model Designer & AIGC Lead Specialist", zh: "3D模型设计师 - AIGC模型负责人与人像需求组组长" },
    company: { en: "Hangzhou Baixin Technology Co., Ltd.", zh: "杭州白心科技有限公司" },
    description: {
      en: "· 2022.09 - 2023.04 · 3D Model Designer\nProduced and edited 3D commercial animation clips for brands including Suntory and St. Yves.\nPrimarily utilized Cinema 4D and Blender, responsible for 3D modeling, asset validation, and UV adjustments for the online 3D asset platform B3D; created and rendered 3D scenes.\n\n· 2023.04 - 2024.03 · AIGC Lead & Midjourney Portrait Group Leader\nIntroduced DALL·E, Midjourney, Stable Diffusion, and ChatGPT to establish complete AIGC workflows from prompt engineering and LoRA fine-tuning to image generation, applied to early concept illustrations and cross-brand visual collaborations.\n\n· Collaborated with Hong Kong educational publishing partners on children's book stylistic adaptation commercial projects, delivering 35 pages of high-consistency illustrated publications.\n\n· Partnered with engineering and product teams to co-develop enterprise internal AI image-generation software, boosting internal visual production efficiency by 50%.\n\n· Researched generation demands for illustration, realistic products, and portraits; established robust AIGC workflows, prompt libraries, and LoRA training methodologies, recording tutorials for internal team enablement.\n\n· Authored Prompt Framework Recommendations, Stable Diffusion Fundamentals, and LoRA Training Manuals; handled business and sales departmental requests with commercial-grade delivery, enabling agile cross-department response.",
      zh: "· 2022年09月 - 2023年04月 · 3D模型设计师\n承接三得利、圣悠活等品牌3D动画宣传片制作、剪辑。\n主用C4D与Blender，负责线上在线模型网站B3D的3D模型制作、验收、UV调整；3D场景制作与渲染。\n\n· 2023年04月 - 2024年03月 · AIGC模型负责人与人像需求组组长\n引入DALL·E、Midjourney、Stable Diffusion、ChatGPT等工具，搭建从提示词工程、LoRA模型炼制到图像生成的AIGC工作流，应用于早期方案插画素材与其他品牌商业项目视觉合作测试与输出。\n\n·与香港教育出版合作方完成儿童书籍风格转化商业项目，保障风格一致性与交付质量，累计完成35页图书。\n\n·协同技术与产品团队开发企业内网AI制图软件，配合优化算力利用与出图效率，提升内部制图效率50%。\n\n·研究插画、写实产品、人像等出图需求，沉淀稳定有效的AIGC工作流、提示词库与LoRA训练方法，并录制课程进行内部实践推广。\n\n·编写Prompt思路推荐、SD基础教程、LoRA模型训练教程，承接销售/业务部门需求，按商业交付标准输出，支持跨部门快速响应。"
    },
  },
  {
    period: "2021.04 - 2023.02",
    title: { en: "Custom Furniture & Soft-Staging Render Designer", zh: "全屋定制与软装渲染设计师" },
    company: { en: "Hangzhou Muchenmule Home Furnishings Co., Ltd.", zh: "杭州慕宸慕勒家居有限公司" },
    description: {
      en: "Mainly gathered specialized furniture specs; designed modern customization frameworks for entire house soft furnishing elements and kitchen cabinetry; rendered high-definition imagery and generated client VR spatial walkthrough profiles.",
      zh: "·主要参与收集家具数据，设计全屋定制方案软装部分与全套定制橱柜，设计渲染出图，制作VR全景效果。"
    },
  },
  {
    period: "2021.01 - 2022.03",
    title: { en: "Draft Sketching & Drawing Collaboration Advisor", zh: "方案手绘学习与草图视觉设计师" },
    company: { en: "Shanghai Puxiang Culture Communication Co., Ltd.", zh: "上海普象文化传播有限公司" },
    description: {
      en: "Mainly guided team hand-drawing masteries and aesthetic sketches. Delivered design reviews, optimized production drawing outputs, and spearheaded original draft styling blueprints.",
      zh: "·主要参与组织成员手绘学习，主要工作内容包括但不限于：组织汇报、修改出图、方案草图设计等"
    },
  },
];

export const educations: EducationItem[] = [
  {
    period: "2018 - 2022",
    school: { en: "Zhejiang Agricultural University", zh: "浙江农业大学" },
    degree: { en: "Industrial Design - Bachelor's Degree / Undergraduate", zh: "工业设计 学士 / 本科" },
    description: {
      en: "· Seeking E-commerce Design / 3D Designer and related creative design roles. Available for interview and onboarding after November 10, 2026.\n· Strong graphic and visual design capabilities, proficient in major 2D graphics suites and professional 3D modeling and rendering pipelines. Rigorous, patient, responsible, with excellent team collaboration, cross-department communication, and group management skills.\nPossesses acute market insight to craft customer-compelling solutions. Continuously iterates professional craftsmanship and injects positive momentum into collaborative workflows, precisely achieving business milestones while maintaining brand style integrity.",
      zh: "·本人应征电商设计/3D设计师等设计类职位。2026年11月10日之后，可面试入职。\n·平面设计能力较强，熟练掌握各类平面软件与专业建模制作软件。个性严谨认真，耐心负责，善于沟通协调，了解团队合作与跨部门沟通与小组成员管理。\n能以细腻观察捕捉市场取向，提供吸引客户的解决方案。持续迭代专业技能，通过协作型工作模式为团队注入动能，在精准实现商业目标的同时保持品牌风格。"
    }
  }
];

export const softwareTools: SoftwareTool[] = [
  // 3D Rendering & Modeling
  { name: "Blender", category: "3D", proficiency: 98 },
  { name: "KeyShot", category: "3D", proficiency: 92 },
  { name: "Cinema 4D", category: "3D", proficiency: 90 },
  { name: "Octane Render", category: "3D", proficiency: 90 },
  { name: "Unreal Engine 5", category: "3D", proficiency: 55 },
  { name: "Marvelous Designer", category: "3D", proficiency: 50 },

  // Graphic Design / 2D
  { name: "Adobe Photoshop", category: "2D", proficiency: 98 },
  { name: "Adobe Illustrator", category: "2D", proficiency: 95 },
  { name: "Adobe After Effects", category: "2D", proficiency: 88 },

  // AI & Generative Workflows
  { name: "Midjourney Studio", category: "AI", proficiency: 98 },
  { name: "Stable Diffusion WebUI / ComfyUI", category: "AI", proficiency: 98 },
  { name: "Runway Gen-3 Alpha", category: "AI", proficiency: 90 },
  { name: "Luma Dream Machine", category: "AI", proficiency: 87 },
];

export const contactInfo: ContactInfo = {
  phone: "+86 180-5881-2885",
  email: "zhengreisi@163.com",
  wechatQrUrl: "/assets/aistudio/_____20261107223255_41_30_6fa17bca.png",
};

export const portfolio3D: PortfolioItem[] = [
  {
    id: "3d-lunar-oven",
    imageUrl: "/assets/aistudio/Tuding____f3093890.png",
    title: { en: "Celestial Hearth · Lunar Obsidian Staging", zh: "星穹熔岩 · 嵌入式烤箱月境置景" },
    description: { 
      en: "Hyper-realistic surreal product staging featuring luxury obsidian oven resting upon lunar volcanic rocks beneath an ethereal celestial moon.", 
      zh: "极具张力的超写实超现实置景：深空冷月与粗粝黑色熔岩晶石之上，嵌入式智能烤箱曜黑微晶面板在天光下的电影级光影呈现。" 
    },
    year: "2026",
    medium: { en: "Blender Cycles + High-End Staging", zh: "Blender Cycles + 商业空间置景" },
  },
  {
    id: "3d-kitchen-island",
    imageUrl: "/assets/aistudio/___3_55c18c1c.png",
    title: { en: "Architectural Timber Villa · Open Island Kitchen", zh: "原木奢邸 · 开放式西厨岛台全景" },
    description: { 
      en: "Grand architectural open-concept villa kitchen featuring warm oak cabinetry, built-in culinary suite, and sculptural cantilevered island.", 
      zh: "挑高自然光奢华住宅：温润天然橡木整墙高柜、嵌入式咖啡机与多功能岛台中西厨烹饪宴饮全景空间渲染。" 
    },
    year: "2026",
    medium: { en: "3ds Max + Corona Photorealistic Interior", zh: "3ds Max + Corona 照片级写实空间" },
  },
  {
    id: "3d-dishwasher-scene",
    imageUrl: "/assets/aistudio/__1_7fe3b14e.png",
    title: { en: "Morning Radiance · Built-In Dishwasher & Kitchen Suite", zh: "晨光漫步 · 全嵌洗碗机与现代厨境" },
    description: { 
      en: "Sun-drenched architectural kitchen featuring architectural bay windows, walking silhouette, and illuminated dishwasher interior.", 
      zh: "自然采光全景转角观景窗下，典雅女性走过岛台，全嵌洗碗机门板轻启与极简集成油烟机相得益彰的动态生活叙事。" 
    },
    year: "2026",
    medium: { en: "C4D + Corona Lifestyle Culinary Staging", zh: "Cinema 4D + Corona 写真级生活美学渲染" },
  },
  {
    id: "3d-laundry-sanctuary",
    imageUrl: "/assets/aistudio/________1_58c6ecc1.png",
    title: { en: "Midnight Walnut · Smart Garment Care Sanctuary", zh: "极简暗香 · 智能洗烘护理与衣帽空间" },
    description: { 
      en: "Deep charcoal architectural louver doors revealing modular washer-dryer columns and illuminated smart garment care closet.", 
      zh: "深色格栅推拉门隐入墙体，洗烘套组与智能鞋履护理镜柜在微暖线型光带映照下构筑出克制沉稳的高定玄关衣帽间。" 
    },
    year: "2026",
    medium: { en: "C4D + Octane Custom Cabinetry Rendering", zh: "Cinema 4D + Octane 高端定制家居渲染" },
  },
  {
    id: "3d-variable-fridge",
    imageUrl: "/assets/aistudio/bianwen_2_1f7ee836.png",
    title: { en: "Magic Variable · Precision Climate Preservation Chamber", zh: "Magic Variable · 智能变温锁鲜舱微距" },
    description: { 
      en: "Macro industrial photography of refrigerator preservation compartment featuring brushed titanium push handle and backlit temperature display.", 
      zh: "金属拉丝推弹把手、独立温控透光数显与冷光离子保鲜氛围，生动刻画高端冰箱专属变温储鲜舱的微距工业质感。" 
    },
    year: "2026",
    medium: { en: "KeyShot Pro Industrial Macro Rendering", zh: "KeyShot Pro + 工业级微距材质渲染" },
  },
  {
    id: "3d-1",
    imageUrl: "/assets/portfolio_3d/3d_steam_oven_thermal.webp",
    title: { en: "Dual-Vortex Thermal Convection", zh: "双旋对流 · 蒸烤箱热风透视" },
    description: { 
      en: "Hyper-realistic raytraced cross-section of smart oven heating chamber with dual-vortex air circulation.", 
      zh: "高精度三维剖视镜头：双旋风道立体对流与环形发热管动态光影，展现工业级极致均温科技。" 
    },
    year: "2026",
    medium: { en: "Cinema 4D + Octane", zh: "Cinema 4D + Octane 物理光追" },
  },
  {
    id: "3d-2",
    imageUrl: "/assets/portfolio_3d/3d_steam_oven_front.webp",
    title: { en: "Precision Steam Atomization Chamber", zh: "极光热流 · 蒸烤动态粒子场" },
    description: { 
      en: "Full-body optical transparency visualization illustrating steam vaporization and multi-zone heating coils.", 
      zh: "全景透明机体材质解构，生动还原高温蒸汽分子雾化与多区热力场环绕扩散。" 
    },
    year: "2026",
    medium: { en: "Cinema 4D + Redshift", zh: "Cinema 4D + Redshift 粒子光效" },
  },
  {
    id: "3d-3",
    imageUrl: "/assets/portfolio_3d/3d_curved_screen_ui.webp",
    title: { en: "Curved Interactive Culinary OS", zh: "环幕曲面 · 智能交互中控" },
    description: { 
      en: "Curved OLED interactive cockpit interface floating over gourmet dish culinary staging.", 
      zh: "极具未来感的高端厨电曲面触控交互，将米其林食谱矩阵与精密温控无界融合。" 
    },
    year: "2026",
    medium: { en: "C4D & Octane + UI", zh: "C4D + Octane 智能曲面屏" },
  },
  {
    id: "3d-4",
    imageUrl: "/assets/portfolio_3d/3d_hood_cooktop.webp",
    title: { en: "Architectural Noir Hood System", zh: "极简曜黑 · 旗舰天幕烟机" },
    description: { 
      en: "Minimalist architectural kitchen staging featuring matte obsidian stainless hood and triple brass burners.", 
      zh: "曜黑微砂金属质感与窗景光影自然延伸，构筑克制内敛的高端厨居美学空间。" 
    },
    year: "2025",
    medium: { en: "KeyShot Pro Physical", zh: "KeyShot Pro 物理写实渲染" },
  },
  {
    id: "3d-5",
    imageUrl: "/assets/portfolio_3d/3d_timber_loft_fridge.webp",
    title: { en: "Nordic Timber Villa Cold Series", zh: "原木奢邸 · 零嵌多门冰箱" },
    description: { 
      en: "Sun-drenched alpine wooden loft showcasing modular seamless flush-mount refrigeration columns.", 
      zh: "挑高原木天顶与落日海景相衬，纯平全嵌不锈钢多门冰箱与定制高柜的完美无缝契合。" 
    },
    year: "2025",
    medium: { en: "3ds Max + Corona", zh: "3ds Max + Corona 全景渲染" },
  },
  {
    id: "3d-6",
    imageUrl: "/assets/portfolio_3d/3d_acrylic_helix.webp",
    title: { en: "Chromodynamic Optical Helix", zh: "流彩极光 · 透镜螺旋雕塑" },
    description: { 
      en: "Parametric dispersion disks capturing caustics, soft tint gradients, and iridescent refractive sheen.", 
      zh: "参数化多层色散光学透镜矩阵，在纯净柔光下折射出极光般绚烂梦幻的渐变流彩。" 
    },
    year: "2026",
    medium: { en: "C4D + Octane Caustics", zh: "Cinema 4D + Octane 焦散色散" },
  },
  {
    id: "3d-7",
    imageUrl: "/assets/portfolio_3d/3d_luxury_perfume.webp",
    title: { en: "Gilded Nectar Haute Parfumerie", zh: "流金琼浆 · 高定香水瓶" },
    description: { 
      en: "Sensual amber glass flacon crowned with coiled gold rings and pearl stopper on sunlit stucco.", 
      zh: "暖金日光斜照石膏肌理，细腻刻画手工金丝缠颈与珍珠晶莹光晕的高奢艺术质感。" 
    },
    year: "2025",
    medium: { en: "Cinema 4D + Octane", zh: "Cinema 4D + Octane 奢品微距" },
  },
  {
    id: "3d-8",
    imageUrl: "/assets/portfolio_3d/3d_skinceuticals_oasis.webp",
    title: { en: "Phyto Botanical Oasis", zh: "植萃秘境 · 绿宝精华瓶" },
    description: { 
      en: "Luxury skincare bottle nestled among dewy monstera and lush rainforest foliage under dappled sunlight.", 
      zh: "晨露龟背竹与深林苔藓原生置景，晶莹橄榄绿瓶身在斑驳林隙光下的纯粹自然生命力。" 
    },
    year: "2025",
    medium: { en: "Blender Cycles Nature", zh: "Blender Cycles 自然光影置景" },
  },
  {
    id: "3d-9",
    imageUrl: "/assets/portfolio_3d/3d_prism_bottle.webp",
    title: { en: "Ergonomic Prism Cream Vessel", zh: "极简三角 · 裸感护肤包材" },
    description: { 
      en: "Architectural triangular lotion dispenser with decoupled cap resting on tactile warm ceramic sand.", 
      zh: "突破传统圆柱形态的三角倒角人体工学瓶体，温润米白哑光质感与细腻旋口螺纹细节。" 
    },
    year: "2025",
    medium: { en: "KeyShot Pro Minimalist", zh: "KeyShot Pro 极简写实包材" },
  },
  {
    id: "3d-10",
    imageUrl: "/assets/portfolio_3d/3d_lemon_sparkling.webp",
    title: { en: "Midsummer Lime Effervescence", zh: "盛夏柠檬 · 冰爽青柠气泡" },
    description: { 
      en: "Crisp sparkling fruit juice with carbonated bubbles, lime wedges, and fresh mint on organic live-edge wood.", 
      zh: "原木树芯托盘、晶莹微气泡透光与青柠檬切面，定格盛夏海风与天光澄澈的沁爽时刻。" 
    },
    year: "2025",
    medium: { en: "Cinema 4D + Octane", zh: "Cinema 4D + Octane 饮料写实" },
  },
  {
    id: "3d-11",
    imageUrl: "/assets/portfolio_3d/3d_pineapple_can.webp",
    title: { en: "Richina Tropical Spark Can", zh: "热带欢腾 · 菠萝气泡听装" },
    description: { 
      en: "Metallic aluminum beverage can with vibrant Hawaiian illustration resting on tactile pineapple scales.", 
      zh: "金属拉丝铝罐在暖金阳光下的高光反射，伴随粗粝编织粗呢与菠萝鳞纹的趣味碰撞。" 
    },
    year: "2025",
    medium: { en: "C4D + Redshift Commercial", zh: "C4D + Redshift 商业广告" },
  },
  {
    id: "3d-12",
    imageUrl: "/assets/portfolio_3d/3d_suntory_tea.webp",
    title: { en: "Jasmine Oolong Tea Ceremony", zh: "清香自然 · 茉莉乌龙茶韵" },
    description: { 
      en: "Crystal clear amber tea bottle with iced tea tumbler on sunlit wooden tray with fresh tea leaves.", 
      zh: "通透琥珀茶汤与浮水薄荷叶，光影斜穿白纱窗幔，烘托恬淡悠然的当代茶饮美学。" 
    },
    year: "2025",
    medium: { en: "Blender Cycles Lighting", zh: "Blender Cycles 产品商业置景" },
  },
  {
    id: "3d-13",
    imageUrl: "/assets/portfolio_3d/3d_ion_tech.webp",
    title: { en: "Natural Ion Tech Deep Cleanse", zh: "离子净护 · 微观除菌科技" },
    description: { 
      en: "Photorealistic 3D visualization of ionic plasma disintegration destroying microscopic pathogens in dishwasher racks.", 
      zh: "高能离子束瞬时裂解微观病菌的粒子碰撞模拟，为高端洗碗机除菌科技赋能视觉感染力。" 
    },
    year: "2026",
    medium: { en: "C4D + Octane Micro Tech", zh: "Cinema 4D + Octane 科技视觉" },
  },
];

export const dynamicVisionItems: PortfolioItem[] = [
  {
    id: "motion-1",
    imageUrl: "/assets/aistudio/Video_Project_6_2a8284f2.webp",
    animatedUrl: "/assets/aistudio/Video_Project_6_2a8284f2.webp",
    title: { en: "Smart Freshness · Dynamic Preservation Curve", zh: "Smart Freshness · 智慧保鲜系统动态视觉" },
    description: {
      en: "3D refractive glass visualization illustrating intelligent constant-temperature waveform vs. conventional refrigerator fluctuation over fresh blueberries.",
      zh: "三维光学折射与动态数据可视化：蓝莓保鲜舱内智慧恒温波动曲线与传统冰箱温差动态对比演绎。"
    },
    year: "2026",
    medium: { en: "C4D & After Effects Motion", zh: "Cinema 4D + AE 动态视觉表现" },
  },
  {
    id: "motion-2",
    imageUrl: "/assets/aistudio/anim_2_poster.png",
    animatedUrl: "/assets/aistudio/2_9701ff26.webp",
    title: { en: "Iridescent Silk Fluence", zh: "幻彩流光 · 柔体丝绸" },
    description: {
      en: "Hypnotic iridescent fabric simulation featuring soft pastel refraction dispersion and fluid breeze kinematics.",
      zh: "流光溢彩的柔性丝绸物理模拟，呈现梦幻折射色散与极其细腻的微风律动。"
    },
    year: "2026",
    medium: { en: "Houdini Vellum Simulation", zh: "Houdini Vellum 柔体动态模拟" },
  },
  {
    id: "motion-3",
    imageUrl: "/assets/aistudio/anim_3_poster.png",
    animatedUrl: "/assets/aistudio/3_fcffe215.webp",
    title: { en: "Quantum Particle Matrix", zh: "量子引力 · 点阵微粒" },
    description: {
      en: "Generative organic dot-matrix motion capturing turbulent quantum field distortions and harmonic ripples.",
      zh: "程序化生成的有机蓝紫微粒流动，捕捉微观量子场力扰动下的浩瀚涌动。"
    },
    year: "2025",
    medium: { en: "TouchDesigner & GLSL", zh: "TouchDesigner 实时粒子生成" },
  },
  {
    id: "motion-4",
    imageUrl: "/assets/aistudio/anim_4_poster.png",
    animatedUrl: "/assets/aistudio/4_ec18d644.webp",
    title: { en: "Monochrome Grain Ripple", zh: "光影织物 · 黑白噪波" },
    description: {
      en: "High-contrast tactile monochrome folds with filmic grain texture and dynamic ambient light sweeps.",
      zh: "质感深沉的黑白折叠曲面，伴随电影胶片颗粒与环境光遮蔽的静谧明暗变幻。"
    },
    year: "2025",
    medium: { en: "Blender Eevee Next", zh: "Blender 动态着色材质" },
  },
  {
    id: "motion-5",
    imageUrl: "/assets/aistudio/anim_5_poster.png",
    animatedUrl: "/assets/aistudio/5_6e037856.webp",
    title: { en: "Cosmic Nebula Ring", zh: "星云引力 · 螺旋光环" },
    description: {
      en: "Astrophysical simulation of glowing starlight particles orbiting an interstellar singularity.",
      zh: "微光璀璨的宇宙星尘粒子解算，在恒星奇点周围形成旋涡状超现实光环律动。"
    },
    year: "2026",
    medium: { en: "X-Particles Vortex Flow", zh: "X-Particles 引力场粒子解算" },
  },
  {
    id: "motion-6",
    imageUrl: "/assets/aistudio/anim_6_poster.png",
    animatedUrl: "/assets/aistudio/6_a85e513d.webp",
    title: { en: "Architectural Louver Sweep", zh: "建筑百叶 · 体积光掠" },
    description: {
      en: "Geometric architectural slatted shutters with passing cinematic volumetric beam illumination.",
      zh: "深邃建筑格栅立面，一道柔和冷紫体积光束自暗处徐徐掠过的高级极简光影。"
    },
    year: "2025",
    medium: { en: "C4D & Redshift Volumetrics", zh: "Cinema 4D + Redshift 体积光" },
  },
  {
    id: "motion-7",
    imageUrl: "/assets/aistudio/anim_7_poster.png",
    animatedUrl: "/assets/aistudio/7_3790794a.webp",
    title: { en: "Cyber Terminal Cipher", zh: "赛博矩阵 · 字符数字雨" },
    description: {
      en: "Cascading alphanumeric code rain with glitching phosphor luminescent characters in cyberspace.",
      zh: "数字终极终端密码流，荧光青绿字符如同雨滴般在深邃幽暗中翻滚与涌动。"
    },
    year: "2026",
    medium: { en: "Motion Graphics & After Effects", zh: "AE 动态图形 + 表达式代码流" },
  },
];

export const portfolioAI: PortfolioItem[] = [
  {
    id: "ai-watch-kinetics",
    imageUrl: "/assets/aistudio/_____641d7eb6.mp4",
    animatedUrl: "/assets/aistudio/_____641d7eb6.mp4",
    title: { en: "Chronograph Calibre · 3D Exploded Kinematics", zh: "机械腕表机芯 · 三维爆炸动态解构" },
    description: {
      en: "High-precision 3D exploded watch movement featuring mechanical gear trains, hairspring escapement, and futuristic suspended transparency.",
      zh: "高精细三维机械腕表零件爆炸视图：精密齿轮传动矩阵、游丝擒纵机构与未来透明悬浮质感动态解算。"
    },
    year: "2026",
    medium: { en: "Cinema 4D + Octane Mechanical Motion", zh: "Cinema 4D + Octane 机械精密动态模拟" },
  },
  {
    id: "ai-mystic-key",
    imageUrl: "/assets/aistudio/p1_2-ezgif.com-loop-count_db6e1aa3.mp4",
    animatedUrl: "/assets/aistudio/p1_2-ezgif.com-loop-count_db6e1aa3.mp4",
    title: { en: "The Gilded Enigma · Tome of Enlightenment", zh: "鎏金秘境 · 典籍之匙动态视觉" },
    description: {
      en: "Dynamic 3D simulation of an ornate golden key and chains unlocking a classical tome, with luminous radiance and floating page kinetics.",
      zh: "心形金匙缠绕精密锁链解开赤红古典秘典，金芒流淌与纸页悬浮翻动的电影级三维动态特效。"
    },
    year: "2026",
    medium: { en: "C4D & Octane 3D Motion Simulation", zh: "Cinema 4D + Octane 动态解算与粒子光效" },
  },
  {
    id: "ai-oven-lunar",
    imageUrl: "/assets/aistudio/Tuding____f3093890.png",
    title: { en: "Celestial Hearth · Lunar Obsidian Staging", zh: "星穹熔岩 · 嵌入式烤箱月境置景" },
    description: {
      en: "Hyper-realistic surreal product staging featuring luxury obsidian oven resting upon lunar volcanic rocks beneath an ethereal celestial moon.",
      zh: "极具张力的超写实超现实置景：深空冷月与粗粝黑色熔岩晶石之上，嵌入式智能烤箱曜黑微晶面板在天光下的电影级光影呈现。"
    },
    year: "2026",
    medium: { en: "Blender Cycles + High-End Staging", zh: "Blender Cycles + 商业空间置景" },
  },
  {
    id: "ai-kitchen-villa",
    imageUrl: "/assets/aistudio/___3_55c18c1c.png",
    title: { en: "Architectural Timber Villa · Open Island Kitchen", zh: "原木奢邸 · 开放式西厨岛台全景" },
    description: {
      en: "Grand architectural open-concept villa kitchen featuring warm oak cabinetry, built-in culinary suite, and sculptural cantilevered island.",
      zh: "挑高自然光奢华住宅：温润天然橡木整墙高柜、嵌入式咖啡机与多功能岛台中西厨烹饪宴饮全景空间渲染。"
    },
    year: "2026",
    medium: { en: "3ds Max + Corona Photorealistic Interior", zh: "3ds Max + Corona 照片级写实空间" },
  },
  {
    id: "ai-kitchen-motion",
    imageUrl: "/assets/aistudio/__1_7fe3b14e.png",
    title: { en: "Morning Radiance · Built-In Dishwasher & Kitchen Suite", zh: "晨光漫步 · 全嵌洗碗机与现代厨境" },
    description: {
      en: "Sun-drenched architectural kitchen featuring architectural bay windows, walking silhouette, and illuminated dishwasher interior.",
      zh: "自然采光全景转角观景窗下，典雅女性走过岛台，全嵌洗碗机门板轻启与极简集成油烟机相得益彰的动态生活叙事。"
    },
    year: "2026",
    medium: { en: "C4D + Corona Lifestyle Culinary Staging", zh: "Cinema 4D + Corona 写真级生活美学渲染" },
  },
  {
    id: "ai-laundry-closet",
    imageUrl: "/assets/aistudio/________1_58c6ecc1.png",
    title: { en: "Midnight Walnut · Smart Garment Care Sanctuary", zh: "极简暗香 · 智能洗烘护理与衣帽空间" },
    description: {
      en: "Deep charcoal architectural louver doors revealing modular washer-dryer columns and illuminated smart garment care closet.",
      zh: "深色格栅推拉门隐入墙体，洗烘套组与智能鞋履护理镜柜在微暖线型光带映照下构筑出克制沉稳的高定玄关衣帽间。"
    },
    year: "2026",
    medium: { en: "C4D + Octane Custom Cabinetry Rendering", zh: "Cinema 4D + Octane 高端定制家居渲染" },
  },
  {
    id: "ai-refrigerator-macro",
    imageUrl: "/assets/aistudio/bianwen_2_1f7ee836.png",
    title: { en: "Magic Variable · Precision Climate Preservation Chamber", zh: "Magic Variable · 智能变温锁鲜舱微距" },
    description: {
      en: "Macro industrial photography of refrigerator preservation compartment featuring brushed titanium push handle and backlit temperature display.",
      zh: "金属拉丝推弹把手、独立温控透光数显与冷光离子保鲜氛围，生动刻画高端冰箱专属变温储鲜舱的微距工业质感。"
    },
    year: "2026",
    medium: { en: "KeyShot Pro Industrial Macro Rendering", zh: "KeyShot Pro + 工业级微距材质渲染" },
  },
  {
    id: "ai-invitation-vip",
    imageUrl: "/assets/aistudio/1_13ca2467.png",
    title: { en: "The Power of Technology · VIP Salon Invitation", zh: "以技术 见未来 · Arda 新品私享会邀请函" },
    description: {
      en: "Futuristic architectural light tunnel and flow lines defining a luxury VIP product launch salon invitation long-page layout.",
      zh: "未来光廊与流光织物构筑的科技视觉锤，融合私享会日程安排与极简版式设计的品牌高端线下活动视觉长卷。"
    },
    year: "2026",
    medium: { en: "3D Concept Visual + Brand Editorial", zh: "3D 概念视觉 + 品牌公关长页版式" },
  },
  {
    id: "ai-seasons-freshness",
    imageUrl: "/assets/aistudio/______8f990f1c.png",
    title: { en: "Four Seasons Silent Freshness · Refrigerator Editorial", zh: "于四季无声 藏鲜有序 · 冰箱系列长页版式" },
    description: {
      en: "Artistic long-page editorial linking natural four-season cycles with seamless built-in refrigerator freshness preservation.",
      zh: "将“春生、夏茂、秋收、冬藏”自然时序与现代嵌入式冰箱保鲜科技融为一体的艺术长卷推文排版设计。"
    },
    year: "2026",
    medium: { en: "New Media Long-Strip + Holiday Campaign", zh: "新媒体营销长图 + 节日视觉全案" },
  },
];
