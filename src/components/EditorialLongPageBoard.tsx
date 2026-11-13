import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  ImageIcon, 
  ExternalLink, 
  Check, 
  X, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Maximize2,
  Globe,
  Lock
} from "lucide-react";
import { PortfolioItem } from "../types";

type ActiveTab = "wechat4" | "wechat_xinnian" | "wechat_haoshui" | "wechat_duanwu" | "wechat2" | "wechat_funv" | "wechat" | "detail" | "detail_dryer" | "web_brand" | "web_group" | "invitation";

interface EditorialLongPageBoardProps {
  language: "en" | "zh";
  onSelectImage?: (item: PortfolioItem) => void;
  isExpanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
  activeTab?: ActiveTab;
  onTabChange?: (tab: ActiveTab) => void;
  linkedProjectId?: string;
}

interface TabPreset {
  tabKey: ActiveTab;
  nameZh: string;
  nameEn: string;
  edition?: string;
  titleMain: string;
  titleSub: string;
  version: string;
  versionSub: string;
  conceptText: string;
  colorBars: { name: string; color: string; percent: number }[];
  phoneSellingPoints: string[];
  phoneImage: string;
  phoneImages?: string[];
  aspectRatio?: string;
  cardImages: string[];
}

// Preset content sets for the tabs: 公众号设计 (4.0版 洗护净衣 & 3.0版 新年 & 3.0版 净饮 & 2.0版 端午 & 2.0版 洗护 & 1.0版 妇女节 & 1.0版 国庆), 详情页设计, 网页设计优化示例
const tabPresets: Record<ActiveTab, TabPreset> = {
  wechat4: {
    tabKey: "wechat4",
    nameZh: "公众号设计 4.0版",
    nameEn: "WeChat Editorial v4.0",
    edition: "4.0版",
    titleMain: "洗护净衣系列产品软文",
    titleSub: "Arda艺术厨电公众号",
    version: "4.0版",
    versionSub: "全新升级*",
    conceptText: "核心需求：26年全新升级版本，加入全场景生成固定的家庭人员形象，在建模场景内延续人物形象使用，模拟广告短片质感制作整套软文，使整套宣传更有画面感，宣传更有可依托的家庭范本。P1强调场景，P2引入人物，P3四图构建完整产品细节与精确卖点，使整套公众号推文更精致完善。",
    colorBars: [
      { name: "亚麻暖杏 / Warm Linen Almond", color: "#e7dcc8", percent: 60 },
      { name: "云峰米白 / Ivory Summit White", color: "#f9faf5", percent: 30 },
      { name: "暮色烟粉 / Muted Twilight Rose", color: "#c3a49c", percent: 10 },
    ],
    phoneSellingPoints: [
      "重塑全屋衣物“净”化论，洗护中心全新定义",
      "全场景固定家庭人员形象，模拟广告短片质感",
      "P1强调场景、P2引入人物、P3四图构建完整产品细节",
      "智能洗烘套组与壁挂式mini洗烘一体机无界赋能",
    ],
    phoneImage: "/assets/aistudio/4_c8bf0de5.png",
    aspectRatio: "649 / 1173",
    cardImages: [
      "/assets/editorial_v4/col1.png",
      "/assets/editorial_v4/col2.png",
      "/assets/editorial_v4/col3.png",
      "/assets/editorial_v4/col4.png"
    ],
  },
  wechat2: {
    tabKey: "wechat2",
    nameZh: "公众号设计 2.0版",
    nameEn: "WeChat Editorial v2.0",
    edition: "2.0版",
    titleMain: "洗护产品软文",
    titleSub: "Arda艺术厨电公众号",
    version: "2.0版",
    versionSub: "二次升级*",
    conceptText: "核心需求：针对产品对应的特殊卖点，以及后续持续性出文，设计新版出文版式，使公众号更有记忆点，滑动互动：P1使用软文点出产品型号与最具吸引力的卖点，使用产品场景图；P2深化介绍卖点细节，使用特效图更强调功能。",
    colorBars: [
      { name: "象牙暖金 / Warm Ivory", color: "#f3dec2", percent: 70 },
      { name: "静谧暖灰 / Quiet Gray", color: "#9a9084", percent: 20 },
      { name: "复古赭石 / Vintage Ochre", color: "#b3685e", percent: 10 },
    ],
    phoneSellingPoints: [
      "解锁阳台AB面，美学与功能双向进化",
      "独嵌两用专业洗烘套组，定义真chill生活",
      "壁挂式洗烘一体机，释放阳台自由生长空间",
      "兼具除皱塑性、除菌净螨与轻柔烘干",
    ],
    phoneImage: "/assets/aistudio/6_102887bf.png",
    aspectRatio: "649 / 1173",
    cardImages: [
      "/assets/editorial_v2/col1.png",
      "/assets/editorial_v2/col2.png"
    ],
  },
  wechat_duanwu: {
    tabKey: "wechat_duanwu",
    nameZh: "公众号设计 2.0版 (端午)",
    nameEn: "WeChat Editorial v2.0 (Dragon Boat)",
    edition: "2.0版",
    titleMain: "系列产品软文",
    titleSub: "Arda艺术厨电公众号",
    version: "2.0版",
    versionSub: "二次升级*",
    conceptText: "核心需求：以“一蒸一烤，端阳家宴”为主线，粽叶青+暖金+米白显东方雅致，长图分粽香复热、蒸鱼蒸粽、冰箱保鲜、家宴开席场景植入蒸箱烤箱；思路：标题打端午家宴，软文按节日痛点一场景一蒸烤等产品多的卖点递进，末尾留中厨场景收口。",
    colorBars: [
      { name: "暖金米白 / Warm Sand Gold", color: "#e8cca8", percent: 70 },
      { name: "温润木质暖灰 / Muted Taupe", color: "#a89f92", percent: 20 },
      { name: "粽叶箬竹青 / Bamboo Leaf Cyan", color: "#b2c39e", percent: 10 },
    ],
    phoneSellingPoints: [
      "以“一蒸一烤，端阳家宴”为主线，传承东方家宴雅致",
      "冰箱干湿分储，封印江南梅雨湿气与鲜叶原生",
      "蒸箱“糯香曲线”，还原本味外婆土灶柴火经验",
      "中岛三重动线设计，让备餐烹饪与相聚无界交融",
    ],
    phoneImage: "/assets/aistudio/5_4f0d7bd0.png",
    aspectRatio: "649 / 1173",
    cardImages: [
      "/assets/editorial_duanwu/col1.png",
      "/assets/editorial_duanwu/col2.png"
    ],
  },
  wechat_haoshui: {
    tabKey: "wechat_haoshui",
    nameZh: "公众号设计 3.0版 (净饮)",
    nameEn: "WeChat Editorial v3.0 (Drinking Water)",
    edition: "3.0版",
    titleMain: "净饮系列产品软文",
    titleSub: "Arda艺术厨电公众号",
    version: "3.0版",
    versionSub: "三代升级*",
    conceptText: "核心概念：一条水光动线，串起全屋好水日常。视觉以：清透、温润、克制。全文调性，以高端厨电的生活叙事，少堆参数，多讲“用水时刻”。针对注重饮水品质、母婴冲奶、烹饪煲汤、新年家宴的中高端家庭人群。互动处点击展开详细介绍功能。\n\n视觉系统：色彩：暖灰+深墨+少量香槟金；避免高饱和。\n取景场景：自然光厨房、手部触屏、晨起水杯。\n版本核心：净饮机种草版重晨起/冲奶/泡茶；全屋系统版重水路图，执行注意移动端字号。",
    colorBars: [
      { name: "静谧暖灰 / Warm Gray", color: "#9b9690", percent: 60 },
      { name: "深墨曜黑 / Deep Charcoal", color: "#222325", percent: 30 },
      { name: "香槟流金 / Champagne Gold", color: "#d5b27e", percent: 10 },
    ],
    phoneSellingPoints: [
      "一条水光动线，串起全屋好水日常",
      "全场景饮水核心基底，温润克制生活叙事",
      "高端饮品品质边界，晨起冲奶烹饪煲汤随心应答",
      "回归生活本真从容，全链智能水质与状态监测",
    ],
    phoneImage: "/assets/editorial_haoshui/phone.png",
    aspectRatio: "636 / 1166",
    cardImages: [
      "/assets/editorial_haoshui/col1.png",
      "/assets/editorial_haoshui/col2.png",
      "/assets/editorial_haoshui/col3.png"
    ],
  },
  wechat_xinnian: {
    tabKey: "wechat_xinnian",
    nameZh: "公众号设计 3.0版 (新年)",
    nameEn: "WeChat Editorial v3.0 (New Year)",
    edition: "3.0版",
    titleMain: "新年贺岁推文",
    titleSub: "Arda艺术厨电公众号",
    version: "3.0版",
    versionSub: "三代升级*",
    conceptText: "核心需求：应当对新年的品牌节日推文以“让所有关系在厨房里重新沸腾”为主线，红金+银月灰金属显高级，长图分年味备餐、团圆烹饪、开席场景植入厨电；思路：标题聚焦新年焕新，软文按年味痛点一P1场景一P2卖点递进，末尾留全场景欢聚时刻收束。",
    colorBars: [
      { name: "朱砂绛红 / Festive Crimson", color: "#852b1b", percent: 60 },
      { name: "暖金流沙 / Warm Sand Gold", color: "#dec39e", percent: 30 },
      { name: "曜石深灰 / Obsidian Dark", color: "#3d3733", percent: 10 },
    ],
    phoneSellingPoints: [
      "让所有关系在厨房里重新沸腾",
      "红金与银月灰金属质感，重塑新年高端欢聚场",
      "年味备餐、团圆烹饪与温情开席场景连贯递进",
      "全场景高端厨电植入，定格欢聚温润年味时刻",
    ],
    phoneImage: "/assets/aistudio/2_50310314.png",
    aspectRatio: "649 / 1173",
    cardImages: [
      "/assets/editorial_xinnian/col1.png",
      "/assets/editorial_xinnian/col2.png",
      "/assets/editorial_xinnian/col3.png"
    ],
  },
  wechat_funv: {
    tabKey: "wechat_funv",
    nameZh: "公众号设计 1.0版 (妇女节)",
    nameEn: "WeChat Editorial v1.0 (Women's Day)",
    edition: "1.0版",
    titleMain: "妇女节产品软文",
    titleSub: "Arda艺术厨电公众号",
    version: "1.0版",
    versionSub: "初代升级*",
    conceptText: `核心概念：方寸厨房，悦己日常。

人群洞察：大城市高级职场女性，厨房小、时间碎、重颜值效率，不愿将就生活。

调性：不煽情、不“女神”刻板，讲自我关怀、效率与松弛感。强调轻盈、通透、克制、都市感、生活气。

场景：小户型厨房、一人食、闺蜜小聚。

文案：大城市小厨房日常开篇→空间与时间痛点→悦己不是大厨房才能拥有→晨起/下班/周末场景植入集成厨电→卖点软化→产品矩阵→妇女节福利CTA。字数1200—1800字，语气克制、生活化，避免“女神”“精致穷”等刻板表达。`,
    colorBars: [
      { name: "迷迭香琥珀棕 / Rosemary Amber", color: "#8b5a3c", percent: 60 },
      { name: "燕麦浅岩暖灰 / Oatmeal Slate Gray", color: "#c8bcae", percent: 30 },
      { name: "暮色星空曜黑 / Twilight Charcoal", color: "#232120", percent: 10 },
    ],
    phoneSellingPoints: [
      "方寸厨房，悦己日常",
      "8m²的留白主义，给忙碌生活打上温柔补丁",
      "晨起/下班/闺蜜小聚场景，集成厨电艺术融入",
      "避免刻板表达，讲究自我关怀、效率与都市松弛感",
    ],
    phoneImage: "/assets/aistudio/__2_08_96f08f1c.png",
    phoneImages: [
      "/assets/aistudio/__2_08_96f08f1c.png",
      "/assets/aistudio/__2_081_45693c03.png",
      "/assets/aistudio/__2_082_bcd7773b.png"
    ],
    aspectRatio: "601 / 1147",
    cardImages: [
      "/assets/editorial_funv/col1.png",
      "/assets/editorial_funv/col2.png",
      "/assets/editorial_funv/col3.png"
    ],
  },
  wechat: {
    tabKey: "wechat",
    nameZh: "公众号设计 1.0版 (五一)",
    nameEn: "WeChat Editorial v1.0 (Labor Day)",
    edition: "1.0版",
    titleMain: "五一产品软文",
    titleSub: "Arda艺术厨电 · 于四季无声 藏鲜有序",
    version: "1.0版",
    versionSub: "初代升级*",
    conceptText: "核心需求：对品牌节日推文避免生硬的产品卖点罗列，以“于四季无声，藏鲜有序”为主线，将春夏秋冬自然时序与现代嵌入式冰箱保鲜科技紧密结合；长图分春日锁鲜、夏日冷饮、秋日珍馐、冬日储鲜四个生活篇章，展现极致保鲜实力；互动层在手机端支持滑动预览四季长卷与邀请函全貌。",
    colorBars: [
      { name: "松石青绿 / Pine Moss Green", color: "#546b5b", percent: 50 },
      { name: "落霞暖赭 / Sunset Ochre", color: "#9e4334", percent: 30 },
      { name: "雅致暖灰 / Architectural Slate", color: "#b3a99c", percent: 20 },
    ],
    phoneSellingPoints: [
      "于四季无声，藏鲜有序 · 艺术保鲜长图",
      "超大专属果蔬与变温抽屉，全时锁鲜",
      "0度生物养鲜，温湿双控营养不流失",
      "以技术见未来 · 新品私享会邀请函联动",
    ],
    phoneImage: "/assets/aistudio/______8f990f1c.png",
    phoneImages: [
      "/assets/aistudio/______8f990f1c.png",
      "/assets/aistudio/1_13ca2467.png",
      "/assets/aistudio/bianwen_2_1f7ee836.png"
    ],
    aspectRatio: "1080 / 2560",
    cardImages: [
      "/assets/aistudio/______8f990f1c.png",
      "/assets/aistudio/1_13ca2467.png",
      "/assets/aistudio/bianwen_2_1f7ee836.png"
    ],
  },
  detail: {
    tabKey: "detail",
    nameZh: "跨境电商详情页设计 · 猫咪转盘玩具",
    nameEn: "Cross-Border E-Commerce · Cat Turntable",
    edition: "猫咪转盘",
    titleMain: "跨境电商详情页设计",
    titleSub: "猫咪转盘玩具详情",
    version: "跨境电商",
    versionSub: "A+ 视觉设计*",
    conceptText: `1. 内容思路：主打“趣味性”与“易清洁”
· 首图区（抓眼球）：核心文案 “Double the Fun, Non-Stop Play”（双倍乐趣，不停玩耍）。配合猫咪正在玩顶部弹簧球的实拍图，立刻唤起消费者的情绪价值——希望猫咪开心。
· 痛点解决区（打消顾虑）：宠物玩具最大的痛点是“藏污纳垢、难清洗”。所以中间最大的篇幅给了 “Detachable Design, Easy Clean”（可拆卸设计，易清洗）。文案强调“seconds（几秒钟）”和“no dead corners（无死角）”。
· 场景适配区（增加购买理由）：通过对比图展示“Tile Floors（瓷砖）”和“Carpet Floors（地毯）”都能稳定运行，打消买家对家中环境的顾虑。
· 颜值与选择区（促转化）：底部大字标明 “5 Fresh Colors to Match Your Home”，用马卡龙色系吸引注重家居审美的猫奴，提供多样化选择。

2. 设计排版：暖色调、情绪化、平滑过渡
· 色彩：以明黄、奶黄为主色调，搭配柔和的马卡龙色，视觉上非常温馨、治愈。
· 视觉焦点：上方用生活场景大图（Lifestyle image）定调；中间用拆分爆炸图（左侧）和细节特写（右侧）形成左右对比排版，信息密度适中，不显得拥挤。
· 图标运用：顶部使用了4个极简线框Icon（弹簧球、双轨道、摇晃旋转、安全材质），让买家在3秒内迅速Get核心卖点。
· 视线引导：用虚线（Dotted lines）将“拆卸状态”、“不同地面使用”、“可水洗”和“边缘光滑安全”串联起来，形成一个流畅的阅读闭环，排版非常灵动。`,
    colorBars: [
      { name: "暖阳奶黄 / Butter Yellow", color: "#f7d358", percent: 45 },
      { name: "家居温馨米白 / Warm Beige", color: "#fff9eb", percent: 35 },
      { name: "马卡龙彩调 / Macaron Colors", color: "#e88080", percent: 20 },
    ],
    phoneSellingPoints: [
      "Double the Fun, Non-Stop Play 双倍玩乐体验",
      "Detachable Design 可拆卸无死角秒速清洁",
      "多地面平稳适配与马卡龙 5 色家居美学",
    ],
    phoneImage: "/assets/aistudio/____80474724.png",
    aspectRatio: "1728 / 2304",
    cardImages: [
      "/assets/aistudio/____80474724.png"
    ],
  },
  detail_dryer: {
    tabKey: "detail_dryer",
    nameZh: "跨境电商详情页设计 · 宠物烘干箱头图",
    nameEn: "Cross-Border E-Commerce · Pet Dryer Box",
    edition: "烘干箱头图",
    titleMain: "跨境电商详情页设计",
    titleSub: "宠物烘干箱头图设计",
    version: "跨境电商",
    versionSub: "A+ 视觉设计*",
    conceptText: `1. 内容思路：主打“解放双手”与“专业安全”
· 核心主张（直击痛点）：大字标题 “Hands-Free Drying, Reimagined”（重新定义免提烘干）。副标题直接戳中痛点：“No more pet chasing or exhausted arms”（再也不用追着宠物跑或手臂酸痛了）。
· 功能拆解（模块化展示）：
  - 空间：醒目的橙色“60L”大数字，配合两只猫在里面的实图，证明“不拥挤”。
  - 噪音：这是烘干箱最容易引起宠物应激的痛点。展示一张“优雅女性在沙发上办公，旁边有猫熟睡”的场景图，加上“55dB”的视觉化声波对比图，建立信任感。
  - 风道（专业背书）：右侧给出了带光效的“8 Fans 循环风道透视图（Blueprint/Schematic）”，用科技感的设计证明产品性能，提升高客单价的价值感。
· 理性决策辅助（降低退货率）：
  - 左下角：UI操作面板特写（温度、风速、定时），证明易用性。
  - 中下部：给出具体的“不同品种/毛发长度/体重”的烘干时间参考表，非常专业且贴心。
  - 右下角：折叠收纳图，解决“大件家电占地方”的顾虑。

2. 设计排版：科技风、网格化、高信息密度
· 色彩：整体偏冷感和科技感，使用了白、灰、浅木色，并用亮橙色（60L）和蓝绿色（8 Fans）作为强调色，打破沉闷，引导视觉重点。
· 排版结构：采用典型的网格化（Grid）信息图表排版。上半部分是场景+功能Icon矩阵；下半部分严格切分为2x3的六宫格/九宫格，每个格子讲透一个具体功能。
· 视觉层级：非常清晰。用户先看到大场景（解决什么问题） -> 再看到三大核心卖点（空间、静音、风道） -> 最后看使用细节（面板、时间、收纳）。`,
    colorBars: [
      { name: "科技冷灰白 / Tech Slate White", color: "#f1f3f5", percent: 45 },
      { name: "活力醒目橙 / Vibrant 60L Orange", color: "#ff6600", percent: 30 },
      { name: "专业风道青蓝 / Airflow Cyan", color: "#00a896", percent: 25 },
    ],
    phoneSellingPoints: [
      "Hands-Free Drying, Reimagined 免提烘干新定义",
      "60L超大空间 + 55dB低噪 + 8-Fan立体风道",
      "2x3精密六宫格图表 + 理性决策辅助面板",
    ],
    phoneImage: "/assets/aistudio/___A__fa2c32a7.png",
    aspectRatio: "1728 / 2304",
    cardImages: [
      "/assets/aistudio/___A__fa2c32a7.png"
    ],
  },
  web_brand: {
    tabKey: "web_brand",
    nameZh: "网页设计优化示例 · 品牌官网",
    nameEn: "Web Design Optimization · Brand Website",
    edition: "品牌官网",
    titleMain: "网页升级方案",
    titleSub: "安德品牌官网视觉升级方案",
    version: "品牌官网",
    versionSub: "视觉升级方案*",
    conceptText: "【01 设计总纲】\n· 核心转变：从“功能罗列与性价比展示”升级为“高端生活方式与品牌价值传递”。新版极简的视觉系统、电影级的艺术短片场景和全屏沉浸的滚动逻辑，意欲塑造一个高端、国际化、极具设计感的厨电品牌形象，向高奢家电定位的完美数字端转型。\n· 旧版逻辑（目录式）：旧版重在“填鸭式”信息输出，页面上塞满了产品图标、跑车背书、技术参数、获奖证书、厨师形象等。试图证明“我们什么都有”，但缺乏统一的品牌调性，视觉感受略显杂乱和传统。\n· 新版逻辑（叙事式）：新版主打“Living emotion（生活美学）”。设计总纲确立了“让厨房成为艺术馆”的基调。通过“Alpha系列星空蓝塘”、“Titan系列”、“Gravity系列”等不同套系，讲述不同的生活场景。它不再卖单一的烤箱或油烟机，而是卖“套系化、高端化、场景化”的厨电解决方案，精准锁定高净值人群。\n\n【02 视觉系统】\n· 核心转变：从“明亮繁杂的电商风”走向“极简、暗黑、电影级的奢侈品风”。\n· 图像风格：全面换成电影级精修场景图（古典雕塑与红墙、宇宙月球与玫瑰）。通过艺术装置、光影营造、专业模特出镜，将冷冰冰的家电完美融入高端艺术家居环境，产生强烈的视觉冲击力（视觉锤）。\n\n【03 分屏规划与信息架构】\n· 核心转变：从“卡片堆叠”转向“沉浸式全屏滚动体验”。",
    colorBars: [
      { name: "极暗曜石 / Obsidian Noir", color: "#0a0a0c", percent: 55 },
      { name: "暮光绯红 / Crimson Accent", color: "#d43c33", percent: 25 },
      { name: "经典冷灰 / Slate Classic", color: "#6e7681", percent: 20 },
    ],
    phoneSellingPoints: [
      "从功能罗列升级为高端生活方式与品牌价值传递",
      "以生活美学为叙事轴心，构建套系化场景体验",
      "极简暗黑电影级精修大片，打造高奢视觉锤",
      "沉浸式全屏滚动架构，告别传统碎片化堆叠",
    ],
    phoneImage: "/assets/editorial_web/web_brand_upgrade.webp",
    aspectRatio: "1920 / 2875",
    cardImages: [
      "/assets/editorial_web/web_brand_upgrade.webp"
    ],
  },
  web_group: {
    tabKey: "web_group",
    nameZh: "网页设计优化示例 · 集团官网",
    nameEn: "Web Design Optimization · Group Website",
    edition: "集团官网",
    titleMain: "网页升级方案",
    titleSub: "安德集团官网视觉升级方案",
    version: "集团官网",
    versionSub: "视觉升级方案*",
    conceptText: "【01 设计总纲】\n· 核心转变：从“传统企业黄页”到“高端制造与全球化品牌叙事”，安德电器的官网更新，不仅需要美观，而是能体现企业战略升级在数字端的具象化。摒弃过时的框架布局和晦涩的视觉隐喻，用高精度的工业实景、现代化的栅格排版、全屏滚动的沉浸式体验，成功地传递出一个高端、科技、全球化的现代智能厨电制造集团形象。\n· 旧版逻辑：偏向传统的“信息罗列”。左侧固定导航，右侧内容区。隐喻性强（如切辣椒的手、麦克风），但缺乏实质业务支撑，给用户一种神秘、沉闷，无法体现“厨电制造”的实体产业优势。\n· 新版逻辑：强调“硬核科技”、“全球视野”与“全产业链实力”。首屏直接亮出“高端全场景厨电工厂”，用极大的视觉冲击力确立行业地位。整体叙事逻辑清晰：企业实力展示（产能/研发）-> 产业矩阵（三大品牌）-> 全球布局 -> 品牌动态，旨在建立B端客户（商业合作）与C端用户的双重信任感。\n\n【02 视觉系统】\n· 核心转变：从“暗黑压抑”到“明亮、科技、国际化”。\n· 图像风格：全面替换为高清真实的工业场景、产品特写、大型活动纪实。例如：全自动机械臂、精美的嵌入式厨电、全球地图的发光特效、20周年庆典实景。用真实画面说话，增强说服力。\n\n【03 分屏规划与信息架构】\n· 核心转变：从“左右分栏（Frameset）”到“全屏滚动叙事（Full-screen Scrolling）”。",
    colorBars: [
      { name: "科技纯白 / Pure Tech White", color: "#f8f9fa", percent: 50 },
      { name: "智造海蓝 / Corporate Blue", color: "#1865b4", percent: 35 },
      { name: "精工深灰 / Industrial Charcoal", color: "#2c3437", percent: 15 },
    ],
    phoneSellingPoints: [
      "从传统企业黄页升级为高端智造与全球化品牌叙事",
      "首屏亮相智能超级工厂，确立硬核科技全产业链实力",
      "明亮科技国际化视觉，工业实景与发光全球版图",
      "全屏滚动叙事架构，建立B端与C端深度信任感",
    ],
    phoneImage: "/assets/editorial_web/web_group_upgrade.webp",
    aspectRatio: "1920 / 2875",
    cardImages: [
      "/assets/editorial_web/group_old_snaps.webp",
      "/assets/editorial_web/group_new_snaps.webp"
    ],
  },
  invitation: {
    tabKey: "invitation",
    nameZh: "网页设计优化示例 · 品牌官网",
    nameEn: "Web Design Optimization · Brand Website",
    edition: "品牌官网",
    titleMain: "网页升级方案",
    titleSub: "安德品牌官网视觉升级方案",
    version: "品牌官网",
    versionSub: "视觉升级方案*",
    conceptText: "【01 设计总纲】\n· 核心转变：从“功能罗列与性价比展示”升级为“高端生活方式与品牌价值传递”。新版极简的视觉系统、电影级的艺术短片场景和全屏沉浸的滚动逻辑，意欲塑造一个高端、国际化、极具设计感的厨电品牌形象，向高奢家电定位的完美数字端转型。\n· 旧版逻辑（目录式）：重在“填鸭式”信息输出，页面上塞满了产品图标、跑车背书、技术参数、获奖证书等。\n· 新版逻辑（叙事式）：主打“Living emotion（生活美学）”，通过Alpha、Titan、Gravity等套系讲述生活场景，精准锁定高净值人群。\n\n【02 视觉系统】\n· 核心转变：从“明亮繁杂的电商风”走向“极简、暗黑、电影级的奢侈品风”。\n\n【03 分屏规划与信息架构】\n· 核心转变：从“卡片堆叠”转向“沉浸式全屏滚动体验”。",
    colorBars: [
      { name: "极暗曜石 / Obsidian Noir", color: "#0a0a0c", percent: 55 },
      { name: "暮光绯红 / Crimson Accent", color: "#d43c33", percent: 25 },
      { name: "经典冷灰 / Slate Classic", color: "#6e7681", percent: 20 },
    ],
    phoneSellingPoints: [
      "从功能罗列升级为高端生活方式与品牌价值传递",
      "以生活美学为叙事轴心，构建套系化场景体验",
      "极简暗黑电影级精修大片，打造高奢视觉锤",
      "沉浸式全屏滚动架构，告别传统碎片化堆叠",
    ],
    phoneImage: "/assets/aistudio/__11_e0902154.png",
    aspectRatio: "1028 / 1507",
    cardImages: [
      "/assets/aistudio/___4_4caea99d.png",
      "/assets/aistudio/__11_e0902154.png"
    ],
  }
};

interface WebDesignStrategySection {
  number: string;
  prefix: string;
  accent: string;
  items: {
    label: string;
    text: string;
  }[];
}

const webBrandSections: WebDesignStrategySection[] = [
  {
    number: "01",
    prefix: "设计",
    accent: "总纲",
    items: [
      {
        label: "核心转变：",
        text: "从“功能罗列与性价比展示”升级为“高端生活方式与品牌价值传递”。新版极简的视觉系统、电影级的艺术短片场景和全屏沉浸的滚动逻辑，意欲塑造一个高端、国际化、极具设计感的厨电品牌形象，向高奢家电定位的完美数字端转型。"
      },
      {
        label: "旧版逻辑（目录式）：",
        text: "旧版重在“填鸭式”信息输出，页面上塞满了产品图标、跑车背书、技术参数、获奖证书、厨师形象等。试图证明“我们什么都有”，但缺乏统一的品牌调性，视觉感受略显杂乱和传统。"
      },
      {
        label: "新版逻辑（叙事式）：",
        text: "新版主打“Living emotion（生活美学）”。设计总纲确立了“让厨房成为艺术馆”的基调。通过“Alpha系列星空蓝塘”、“Titan系列”、“Gravity系列”等不同套系，讲述不同的生活场景。它不再卖单一的烤箱或油烟机，而是卖“套系化、高端化、场景化”的厨电解决方案，精准锁定高净值人群。"
      }
    ]
  },
  {
    number: "02",
    prefix: "视觉",
    accent: "系统",
    items: [
      {
        label: "核心转变：",
        text: "从“明亮繁杂的电商风”走向“极简、暗黑、电影级的奢侈品风”"
      },
      {
        label: "图像风格：",
        text: ""
      },
      {
        label: "旧版：",
        text: "图片多采用白底产品图、普通家庭使用图或零散的工业图。图1试图用跑车元素拔高调性，但排版割裂，像素材拼凑。"
      },
      {
        label: "新版：",
        text: "图像全部换成电影级精修场景图（图5的古典雕塑与红墙、图6的宇宙月球与玫瑰）。通过艺术装置、光影营造、专业模特出镜，将冷冰冰的家电完美融入高端艺术家居环境，产生强烈的视觉冲击力（视觉锤）。"
      }
    ]
  },
  {
    number: "03",
    prefix: "分屏",
    accent: "规划与信息架构",
    items: [
      {
        label: "核心转变：",
        text: "从“卡片堆叠”转向“沉浸式全屏滚动体验”"
      }
    ]
  }
];

const webGroupSections: WebDesignStrategySection[] = [
  {
    number: "01",
    prefix: "设计",
    accent: "总纲",
    items: [
      {
        label: "核心转变：",
        text: "从“传统企业黄页”到“高端制造与全球化品牌叙事”，安德电器的官网更新，不仅需要美观，而是能体现企业战略升级在数字端的具象化。摒弃过时的框架布局和晦涩的视觉隐喻，用高精度的工业实景、现代化的栅格排版、全屏滚动的沉浸式体验，成功地传递出一个高端、科技、全球化的现代智能厨电制造集团形象。"
      },
      {
        label: "旧版逻辑：",
        text: "偏向传统的“信息罗列”。左侧固定导航，右侧内容区。隐喻性强（如切辣椒的手、麦克风），但缺乏实质业务支撑，给用户一种神秘、沉闷，无法体现“厨电制造”的实体产业优势。"
      },
      {
        label: "新版逻辑：",
        text: "强调“硬核科技”、“全球视野”与“全产业链实力”。首屏直接亮出“高端全场景厨电工厂”，用极大的视觉冲击力确立行业地位。整体叙事逻辑清晰：企业实力展示（产能/研发）-> 产业矩阵（三大品牌）-> 全球布局 -> 品牌动态，旨在建立B端客户（商业合作）与C端用户的双重信任感。"
      }
    ]
  },
  {
    number: "02",
    prefix: "视觉",
    accent: "系统",
    items: [
      {
        label: "核心转变：",
        text: "从“暗黑压抑”到“明亮、科技、国际化”"
      },
      {
        label: "图像风格：",
        text: ""
      },
      {
        label: "旧版：",
        text: "采用隐喻化、艺术化的局部特写（手切辣椒），与主营业务关联度极低。"
      },
      {
        label: "新版：",
        text: "全面替换为高清真实的工业场景、产品特写、大型活动纪实。例如：全自动机械臂、精美的嵌入式厨电、全球地图的发光特效、20周年庆典实景。用真实画面说话，增强说服力。"
      }
    ]
  },
  {
    number: "03",
    prefix: "分屏",
    accent: "规划与信息架构",
    items: [
      {
        label: "核心转变：",
        text: "从“左右分栏（Frameset）”到“全屏滚动叙事（Full-screen Scrolling）”"
      }
    ]
  }
];

const detailCatSections: WebDesignStrategySection[] = [
  {
    number: "01",
    prefix: "内容",
    accent: "思路：主打“趣味性”与“易清洁”",
    items: [
      {
        label: "首图区（抓眼球）：",
        text: "核心文案 “Double the Fun, Non-Stop Play”（双倍乐趣，不停玩耍）。配合猫咪正在玩顶部弹簧球的实拍图，立刻唤起消费者的情绪价值——希望猫咪开心。"
      },
      {
        label: "痛点解决区（打消顾虑）：",
        text: "宠物玩具最大的痛点是“藏污纳垢、难清洗”。所以中间最大的篇幅给了 “Detachable Design, Easy Clean”（可拆卸设计，易清洗）。文案强调“seconds（几秒钟）”和“no dead corners（无死角）”。"
      },
      {
        label: "场景适配区（增加购买理由）：",
        text: "通过对比图展示“Tile Floors（瓷砖）”和“Carpet Floors（地毯）”都能稳定运行，打消买家对家中环境的顾虑。"
      },
      {
        label: "颜值与选择区（促转化）：",
        text: "底部大字标明 “5 Fresh Colors to Match Your Home”，用马卡龙色系吸引注重家居审美的猫奴，提供多样化选择。"
      }
    ]
  },
  {
    number: "02",
    prefix: "设计",
    accent: "排版：暖色调、情绪化、平滑过渡",
    items: [
      {
        label: "色彩：",
        text: "以明黄、奶黄为主色调，搭配柔和的马卡龙色，视觉上非常温馨、治愈。"
      },
      {
        label: "视觉焦点：",
        text: "上方用生活场景大图（Lifestyle image）定调；中间用拆分爆炸图（左侧）和细节特写（右侧）形成左右对比排版，信息密度适中，不显得拥挤。"
      },
      {
        label: "图标运用：",
        text: "顶部使用了4个极简线框Icon（弹簧球、双轨道、摇晃旋转、安全材质），让买家在3秒内迅速Get核心卖点。"
      },
      {
        label: "视线引导：",
        text: "用虚线（Dotted lines）将“拆卸状态”、“不同地面使用”、“可水洗”和“边缘光滑安全”串联起来，形成一个流畅的阅读闭环，排版非常灵动。"
      }
    ]
  }
];

const detailDryerSections: WebDesignStrategySection[] = [
  {
    number: "01",
    prefix: "内容",
    accent: "思路：主打“解放双手”与“专业安全”",
    items: [
      {
        label: "核心主张（直击痛点）：",
        text: "大字标题 “Hands-Free Drying, Reimagined”（重新定义免提烘干）。副标题直接戳中痛点：“No more pet chasing or exhausted arms”（再也不用追着宠物跑或手臂酸痛了）。"
      },
      {
        label: "功能拆解（模块化展示）：",
        text: "· 空间：醒目的橙色“60L”大数字，配合两只猫在里面的实图，证明“不拥挤”。\n· 噪音：这是烘干箱最容易引起宠物应激的痛点。展示一张“优雅女性在沙发上办公，旁边有猫熟睡”的场景图，加上“55dB”的视觉化声波对比图，建立信任感。\n· 风道（专业背书）：右侧给出了带光效的“8 Fans 循环风道透视图（Blueprint/Schematic）”，用科技感的设计证明产品性能，提升高客单价的价值感。"
      },
      {
        label: "理性决策辅助（降低退货率）：",
        text: "· 左下角：UI操作面板特写（温度、风速、定时），证明易用性。\n· 中下部：给出具体的“不同品种/毛发长度/体重”的烘干时间参考表，非常专业且贴心。\n· 右下角：折叠收纳图，解决“大件家电占地方”的顾虑。"
      }
    ]
  },
  {
    number: "02",
    prefix: "设计",
    accent: "排版：科技风、网格化、高信息密度",
    items: [
      {
        label: "色彩：",
        text: "整体偏冷感和科技感，使用了白、灰、浅木色，并用亮橙色（60L）和蓝绿色（8 Fans）作为强调色，打破沉闷，引导视觉重点。"
      },
      {
        label: "排版结构：",
        text: "采用典型的网格化（Grid）信息图表排版。上半部分是场景+功能Icon矩阵；下半部分严格切分为2x3的六宫格/九宫格，每个格子讲透一个具体功能。"
      },
      {
        label: "视觉层级：",
        text: "非常清晰。用户先看到大场景（解决什么问题） -> 再看到三大核心卖点（空间、静音、风道） -> 最后看使用细节（面板、时间、收纳）。"
      }
    ]
  }
];

const detailVersionList: { key: ActiveTab; labelZh: string; labelEn: string; edition: string }[] = [
  { key: "detail", labelZh: "示例 01 · 猫咪转盘玩具详情", labelEn: "Example 01 · Cat Turntable", edition: "猫咪转盘" },
  { key: "detail_dryer", labelZh: "示例 02 · 宠物烘干箱头图设计", labelEn: "Example 02 · Pet Dryer Box", edition: "烘干箱头图" },
];

const webVersionList: { key: ActiveTab; labelZh: string; labelEn: string; edition: string }[] = [
  { key: "web_brand", labelZh: "方案一：安德品牌官网视觉升级", labelEn: "Plan 1: Brand Website Upgrade", edition: "品牌官网" },
  { key: "web_group", labelZh: "方案二：安德集团官网视觉升级", labelEn: "Plan 2: Group Website Upgrade", edition: "集团官网" },
];

const projectNames: Record<string, { zh: string; en: string }> = {
  "song-chi": { zh: "松弛 · 洗护产品推文 (2.0版)", en: "Relaxation · Garment Care (v2.0)" },
  "duan-wu": { zh: "端午 · 系列产品软文 (2.0版)", en: "Dragon Boat · Editorial Series (v2.0)" },
  "hao-shui": { zh: "让好水融入进家的日常 · 净饮推文 (3.0版)", en: "Pure Water in Daily Life (v3.0)" },
  "chu-fang-guan-xi": { zh: "让所有关系在厨房里重新沸腾 · 新年推文 (3.0版)", en: "Kitchen Connections · New Year (v3.0)" },
  "re-qing": { zh: "让所有关系在厨房里重新沸腾 · 新年推文 (3.0版)", en: "Kitchen Connections · New Year (v3.0)" },
  "yi-wu-jing-hua": { zh: "重塑全屋衣物\"净\"化论 · 洗护软文 (4.0版)", en: "Garment Care Purification (v4.0)" },
  "liu-bai-zhu-yi": { zh: "《8m²的留白主义》 · 妇女节软文 (1.0版)", en: "8m² White Space · Women's Day (v1.0)" },
  "hua-kuang-zhi-jian": { zh: "于四季无声 藏鲜有序 · 节日推文 (1.0版)", en: "Four Seasons Freshness · Editorial (v1.0)" },
};

const wechatVersionList: { key: ActiveTab; labelZh: string; labelEn: string; edition: string }[] = [
  { key: "wechat_haoshui", labelZh: "3.0版 · 净饮系列软文 (好水)", labelEn: "v3.0 · Drinking Water Feature", edition: "3.0版" },
  { key: "wechat_xinnian", labelZh: "3.0版 · 新年贺岁推文 (关系)", labelEn: "v3.0 · New Year Feature", edition: "3.0版" },
  { key: "wechat4", labelZh: "4.0版 · 洗护净衣软文 (全屋)", labelEn: "v4.0 · Whole-Home Purification", edition: "4.0版" },
  { key: "wechat_funv", labelZh: "1.0版 · 妇女节软文 (8m²留白)", labelEn: "v1.0 · Women's Day Feature", edition: "1.0版" },
  { key: "wechat", labelZh: "1.0版 · 节日产品软文 (藏鲜有序)", labelEn: "v1.0 · Four Seasons Freshness", edition: "1.0版" },
  { key: "wechat_duanwu", labelZh: "2.0版 · 系列产品软文 (端午)", labelEn: "v2.0 · Dragon Boat Feature", edition: "2.0版" },
  { key: "wechat2", labelZh: "2.0版 · 洗护产品软文 (松弛)", labelEn: "v2.0 · Laundry Editorial", edition: "2.0版" },
];

export default function EditorialLongPageBoard({ 
  language, 
  onSelectImage,
  isExpanded: propIsExpanded,
  onToggleExpand,
  activeTab: propActiveTab,
  onTabChange,
  linkedProjectId
}: EditorialLongPageBoardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = propIsExpanded !== undefined ? propIsExpanded : internalExpanded;

  const toggleExpand = (val?: boolean) => {
    const nextVal = val !== undefined ? val : !isExpanded;
    if (onToggleExpand) {
      onToggleExpand(nextVal);
    } else {
      setInternalExpanded(nextVal);
    }
  };

  const [internalTab, setInternalTab] = useState<ActiveTab>("wechat_haoshui");
  const activeTab = propActiveTab !== undefined ? propActiveTab : internalTab;

  const changeTab = (tab: ActiveTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const isWechatTab = activeTab === "wechat4" || activeTab === "wechat_xinnian" || activeTab === "wechat_haoshui" || activeTab === "wechat_duanwu" || activeTab === "wechat2" || activeTab === "wechat_funv" || activeTab === "wechat";
  const [lastWechatTab, setLastWechatTab] = useState<ActiveTab>("wechat4");

  const isDetailTab = activeTab === "detail" || activeTab === "detail_dryer";
  const [lastDetailTab, setLastDetailTab] = useState<ActiveTab>("detail");

  const isWebTab = activeTab === "web_brand" || activeTab === "web_group" || activeTab === "invitation";
  const [lastWebTab, setLastWebTab] = useState<ActiveTab>("web_brand");

  React.useEffect(() => {
    if (isWechatTab) {
      setLastWechatTab(activeTab);
    }
    if (isDetailTab) {
      setLastDetailTab(activeTab);
    }
    if (isWebTab) {
      setLastWebTab(activeTab);
    }
  }, [activeTab, isWechatTab, isDetailTab, isWebTab]);

  const currentWechatIdx = wechatVersionList.findIndex(v => v.key === activeTab);

  const handlePrevVersion = () => {
    if (currentWechatIdx > 0) {
      changeTab(wechatVersionList[currentWechatIdx - 1].key);
    } else {
      changeTab(wechatVersionList[wechatVersionList.length - 1].key);
    }
  };

  const handleNextVersion = () => {
    if (currentWechatIdx >= 0 && currentWechatIdx < wechatVersionList.length - 1) {
      changeTab(wechatVersionList[currentWechatIdx + 1].key);
    } else {
      changeTab(wechatVersionList[0].key);
    }
  };

  const currentDetailIdx = detailVersionList.findIndex(v => v.key === activeTab);

  const handlePrevDetailVersion = () => {
    if (currentDetailIdx > 0) {
      changeTab(detailVersionList[currentDetailIdx - 1].key);
    } else {
      changeTab(detailVersionList[detailVersionList.length - 1].key);
    }
  };

  const handleNextDetailVersion = () => {
    if (currentDetailIdx >= 0 && currentDetailIdx < detailVersionList.length - 1) {
      changeTab(detailVersionList[currentDetailIdx + 1].key);
    } else {
      changeTab(detailVersionList[0].key);
    }
  };

  const currentWebIdx = webVersionList.findIndex(v => v.key === activeTab);

  const handlePrevWebVersion = () => {
    if (currentWebIdx > 0) {
      changeTab(webVersionList[currentWebIdx - 1].key);
    } else {
      changeTab(webVersionList[webVersionList.length - 1].key);
    }
  };

  const handleNextWebVersion = () => {
    if (currentWebIdx >= 0 && currentWebIdx < webVersionList.length - 1) {
      changeTab(webVersionList[currentWebIdx + 1].key);
    } else {
      changeTab(webVersionList[0].key);
    }
  };

  // Synchronize tab based on linked project from showcase board
  React.useEffect(() => {
    if (linkedProjectId) {
      if (linkedProjectId === "song-chi") {
        changeTab("wechat2");
      } else if (linkedProjectId === "duan-wu") {
        changeTab("wechat_duanwu");
      } else if (linkedProjectId === "hao-shui") {
        changeTab("wechat_haoshui");
      } else if (linkedProjectId === "chu-fang-guan-xi" || linkedProjectId === "re-qing") {
        changeTab("wechat_xinnian");
      } else if (linkedProjectId === "yi-wu-jing-hua") {
        changeTab("wechat4");
      } else if (linkedProjectId === "liu-bai-zhu-yi") {
        changeTab("wechat_funv");
      } else if (linkedProjectId === "hua-kuang-zhi-jian") {
        changeTab("wechat");
      }
    }
  }, [linkedProjectId]);

  const linkedInfo = linkedProjectId ? projectNames[linkedProjectId] : null;
  
  // Custom replaced images for each slot
  const [customPhoneImage, setCustomPhoneImage] = useState<string | null>(null);
  const [customCol1, setCustomCol1] = useState<string | null>(null);
  const [customCol2, setCustomCol2] = useState<string | null>(null);
  const [customCol3, setCustomCol3] = useState<string | null>(null);
  const [customCol4, setCustomCol4] = useState<string | null>(null);

  // Modal for replacement
  const [replacingSlot, setReplacingSlot] = useState<"phone" | "col1" | "col2" | "col3" | "col4" | null>(null);
  const [inputUrl, setInputUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPreset = tabPresets[activeTab];

  // Phone sequence & right-swipe interaction state
  const [phoneSeqIndex, setPhoneSeqIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Dynamic aspect ratio based on loaded image, defaulting to current preset's ratio
  const [imageAspect, setImageAspect] = useState<string>(
    currentPreset.aspectRatio || "649 / 1173"
  );

  useEffect(() => {
    if (currentPreset.aspectRatio) {
      setImageAspect(currentPreset.aspectRatio);
    }
  }, [activeTab, currentPreset.aspectRatio]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight && naturalHeight > 0) {
      setImageAspect(`${naturalWidth} / ${naturalHeight}`);
    }
  };

  // Reset sequence index whenever activeTab changes
  useEffect(() => {
    setPhoneSeqIndex(0);
  }, [activeTab]);

  const phoneImageList = currentPreset.phoneImages && currentPreset.phoneImages.length > 0 
    ? currentPreset.phoneImages 
    : [customPhoneImage || currentPreset.phoneImage];
  const totalPhoneImgs = phoneImageList.length;
  const activePhoneImage = phoneImageList[phoneSeqIndex % totalPhoneImgs];

  const handleNextPhoneSeq = () => {
    setPhoneSeqIndex((prev) => (prev + 1) % totalPhoneImgs);
  };

  const handlePrevPhoneSeq = () => {
    setPhoneSeqIndex((prev) => (prev - 1 + totalPhoneImgs) % totalPhoneImgs);
  };

  // Touch swipe handlers (Right swipe advances in sequence)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 28) {
      if (deltaX > 0) {
        handleNextPhoneSeq();
      } else {
        handlePrevPhoneSeq();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStartX(e.clientX);
    setIsMouseDown(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMouseDown && mouseStartX !== null) {
      const deltaX = e.clientX - mouseStartX;
      if (Math.abs(deltaX) > 28) {
        if (deltaX > 0) {
          handleNextPhoneSeq();
        } else {
          handlePrevPhoneSeq();
        }
      }
    }
    setIsMouseDown(false);
    setMouseStartX(null);
  };

  // Resolve current active image for each slot
  const currentPhoneImg = customPhoneImage || currentPreset.phoneImage;
  const currentCol1Img = customCol1 || currentPreset.cardImages[0];
  const currentCol2Img = customCol2 || currentPreset.cardImages[1];
  const currentCol3Img = customCol3 || currentPreset.cardImages[2];
  const currentCol4Img = customCol4 || currentPreset.cardImages[3];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      applyReplacement(url);
    }
  };

  const applyReplacement = (url: string) => {
    if (!url.trim()) return;
    if (replacingSlot === "phone") setCustomPhoneImage(url);
    else if (replacingSlot === "col1") setCustomCol1(url);
    else if (replacingSlot === "col2") setCustomCol2(url);
    else if (replacingSlot === "col3") setCustomCol3(url);
    else if (replacingSlot === "col4") setCustomCol4(url);
    setReplacingSlot(null);
    setInputUrl("");
  };

  const resetAllImages = () => {
    setCustomPhoneImage(null);
    setCustomCol1(null);
    setCustomCol2(null);
    setCustomCol3(null);
    setCustomCol4(null);
  };


  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 relative" 
      id="editorial-longpage-section"
    >
      {/* Outer Luxury Board Container */}
      <div className={`relative rounded-[32px] bg-[#090807] border border-[#2b2520] ${isExpanded ? "p-6 sm:p-8 md:p-12" : "p-6 sm:p-8"} overflow-hidden shadow-2xl transition-all duration-500`}>
        
        {/* Subtle Warm Amber Glow Behind Header */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-[#c07a3c]/10 rounded-full blur-[140px] pointer-events-none" />

        {!isExpanded ? (
          /* Collapsed Bar State: clean linked teaser */
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
            <div className="flex items-center space-x-3.5">
              <span className="w-4 h-[2px] bg-[#c07a3c] inline-block shrink-0" />
              <div>
                <div className="flex items-center flex-wrap gap-2.5">
                  <h2 className="text-white font-display font-medium text-base sm:text-lg tracking-wider">
                    {language === "zh" ? "长页版式设计示例" : "Editorial Long Page Layout Examples"}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#c07a3c]/15 text-[#c07a3c] border border-[#c07a3c]/35 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3c] animate-pulse" />
                    <span>
                      {language === "zh" 
                        ? (linkedInfo ? `已联动：${linkedInfo.zh}` : "已与上方数字展厅联动")
                        : (linkedInfo ? `Linked: ${linkedInfo.en}` : "Linked with Showcase Above")}
                    </span>
                  </span>
                </div>
                <p className="text-zinc-400 text-xs font-sans mt-1">
                  {language === "zh"
                    ? "点击上方展厅列表互动卡片（如松弛、画框之间等），即可展开对应的长页版式设计案例与三联长图展示窗口"
                    : "Click interactive cards in the showcase board above or the button to expand this editorial layout window"}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleExpand(true)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2b211a] to-[#1c1613] hover:from-[#3a2d23] hover:to-[#261f1a] border border-[#c07a3c]/50 text-[#c07a3c] hover:text-white font-medium text-xs sm:text-sm flex items-center space-x-2 shadow-[0_4px_20px_rgba(192,122,60,0.15)] transition-all duration-300 hover:scale-[1.02] cursor-pointer shrink-0"
            >
              <span>{language === "zh" ? "展开长页版式设计示例" : "Expand Long Page Layout"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            {/* 1. Header Bar: 长页版式设计示例 & Tabs & Collapse button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2b2520] mb-8 gap-4">
              <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                <span className="w-4 h-[2px] bg-[#c07a3c] inline-block" />
                <h2 className="text-white font-display font-medium text-base sm:text-lg tracking-wider">
                  {language === "zh" ? "长页版式设计示例" : "Editorial Long Page Layout Examples"}
                </h2>
              </div>

              {/* Tab Navigation: 公众号设计，跨境电商详情页设计，网页设计优化示例三个分项 */}
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-sans flex-wrap gap-y-2">
                <button
                  onClick={() => {
                    if (!isWechatTab) {
                      changeTab(lastWechatTab || "wechat4");
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                    isWechatTab
                      ? "text-[#c07a3c] bg-[#26201b] font-medium shadow-sm border border-[#593d25]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{language === "zh" ? "公众号设计" : "WeChat Editorial"}</span>
                  {isWechatTab && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#c07a3c]/20 text-[#c07a3c] ml-1">
                      {currentPreset.edition}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { 
                    if (!isDetailTab) {
                      changeTab(lastDetailTab || "detail");
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                    isDetailTab
                      ? "text-[#c07a3c] bg-[#26201b] font-medium shadow-sm border border-[#593d25]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{language === "zh" ? "跨境电商详情页设计" : "Cross-Border Detail Design"}</span>
                  {isDetailTab && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#c07a3c]/20 text-[#c07a3c] ml-1">
                      {currentPreset.edition}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (!isWebTab) {
                      changeTab(lastWebTab || "web_brand");
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                    isWebTab
                      ? "text-[#c07a3c] bg-[#26201b] font-medium shadow-sm border border-[#593d25]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{language === "zh" ? "网页设计优化示例" : "Web Design Optimization"}</span>
                  {isWebTab && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#c07a3c]/20 text-[#c07a3c] ml-1">
                      {currentPreset.edition}
                    </span>
                  )}
                </button>

                {/* Collapse Button */}
                <button
                  onClick={() => toggleExpand(false)}
                  className="px-3.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs flex items-center space-x-1.5 transition cursor-pointer"
                  title={language === "zh" ? "收起长页版式案例窗口" : "Collapse window"}
                >
                  <span>{language === "zh" ? "收起窗口" : "Collapse"}</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* WeChat Editorial Sub-Pagination Switcher Bar */}
            {isWechatTab && (
              <div className="flex items-center mb-8 p-1.5 bg-[#141210] border border-[#2b2520] rounded-2xl flex-wrap gap-2.5">
                <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 pl-2">
                    {language === "zh" ? "公众号版本切换：" : "WeChat Editions:"}
                  </span>

                  {/* Direct Version Buttons */}
                  {wechatVersionList.map((ver) => {
                    const isSelected = activeTab === ver.key;
                    return (
                      <button
                        key={ver.key}
                        onClick={() => changeTab(ver.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-sans transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#c07a3c] text-black font-semibold shadow-md"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{language === "zh" ? ver.labelZh : ver.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cross-border E-commerce Sub-Pagination Switcher Bar */}
            {isDetailTab && (
              <div className="flex items-center mb-8 p-1.5 bg-[#141210] border border-[#2b2520] rounded-2xl flex-wrap gap-2.5">
                <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 pl-2">
                    {language === "zh" ? "设计示例切换：" : "Detail Examples:"}
                  </span>

                  {/* Direct Version Buttons */}
                  {detailVersionList.map((ver) => {
                    const isSelected = activeTab === ver.key;
                    return (
                      <button
                        key={ver.key}
                        onClick={() => changeTab(ver.key)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-sans transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#c07a3c] text-black font-semibold shadow-md"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{language === "zh" ? ver.labelZh : ver.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Web Design Optimization Sub-Pagination Switcher Bar */}
            {isWebTab && (
              <div className="flex items-center mb-8 p-1.5 bg-[#141210] border border-[#2b2520] rounded-2xl flex-wrap gap-2.5">
                <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 pl-2">
                    {language === "zh" ? "方案分页切换：" : "Web Design Plans:"}
                  </span>

                  {/* Direct Version Buttons */}
                  {webVersionList.map((ver) => {
                    const isSelected = activeTab === ver.key || (activeTab === "invitation" && ver.key === "web_brand");
                    return (
                      <button
                        key={ver.key}
                        onClick={() => changeTab(ver.key)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-sans transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#c07a3c] text-black font-semibold shadow-md"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{language === "zh" ? ver.labelZh : ver.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

        {/* 2. Main Title & Version Badge */}
        <div className="flex items-start justify-between mb-10 gap-4">
          <div>
            <div className={`font-display font-black text-3xl sm:text-4xl md:text-5xl ${isWebTab ? "text-[#d43c33]" : "text-[#c07a3c]"} tracking-tight leading-none mb-2 drop-shadow-sm`}>
              {currentPreset.titleMain}
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              {currentPreset.titleSub}
            </div>
          </div>

          {/* Circular Version Stamp with prev/next buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            {(isWechatTab || isWebTab || isDetailTab) && (
              <button
                onClick={
                  isWechatTab 
                    ? handlePrevVersion 
                    : isWebTab 
                      ? handlePrevWebVersion 
                      : handlePrevDetailVersion
                }
                title={language === "zh" ? "切换至上一方案/版本" : "Previous Plan"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900/90 hover:bg-[#c07a3c] text-zinc-300 hover:text-black border border-zinc-700/70 transition flex items-center justify-center cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 flex flex-col items-center justify-center text-center p-2 shrink-0 bg-black/40 backdrop-blur-sm shadow-inner">
              <span className="font-display font-bold text-white text-xs sm:text-sm leading-tight">
                {currentPreset.version}
              </span>
              <span className="text-[9px] font-sans text-zinc-400 scale-90 sm:scale-100 tracking-tighter mt-0.5">
                {currentPreset.versionSub}
              </span>
            </div>

            {(isWechatTab || isWebTab || isDetailTab) && (
              <button
                onClick={
                  isWechatTab 
                    ? handleNextVersion 
                    : isWebTab 
                      ? handleNextWebVersion 
                      : handleNextDetailVersion
                }
                title={language === "zh" ? "切换至下一方案/版本" : "Next Plan"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900/90 hover:bg-[#c07a3c] text-zinc-300 hover:text-black border border-zinc-700/70 transition flex items-center justify-center cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Main Content Grid: Left Column (Concept, Phone, Colors) & Right Column (3 Vertical Editorial Strips) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ============ LEFT COLUMN (lg:col-span-5) ============ */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-24 self-start">
            
            {isDetailTab ? (
              /* Cross-border E-commerce Detail Layout: 01 内容思路, 02 设计排版, 03 核心色彩设定 (No phone display) */
              <div className="flex flex-col space-y-7">
                {(activeTab === "detail_dryer" ? detailDryerSections : detailCatSections).map((sec) => (
                  <div key={sec.number} className="space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="bg-[#c07a3c] text-black font-mono font-bold text-xs px-2.5 py-0.5 rounded shadow-sm">
                        {sec.number}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                        {sec.prefix}
                        <span className="text-[#c07a3c]">{sec.accent}</span>
                      </h3>
                    </div>

                    <div className="space-y-3.5 font-sans text-xs sm:text-[13px] leading-relaxed">
                      {sec.items.map((item, iIdx) => (
                        <div key={iIdx} className="text-justify whitespace-pre-line">
                          {item.label && (
                            <span className="text-[#e59b5f] font-semibold mr-1.5 inline">
                              {item.label}
                            </span>
                          )}
                          {item.text && (
                            <span className="text-zinc-100 font-normal leading-relaxed inline">
                              {item.text}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 03 核心色彩设定 */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="bg-[#c07a3c] text-black font-mono font-bold text-xs px-2.5 py-0.5 rounded shadow-sm">
                      03
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                      核心色彩<span className="text-[#c07a3c]">设定</span>
                    </h3>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {currentPreset.colorBars.map((bar, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="flex-1 bg-zinc-900 h-6 sm:h-7 rounded-sm overflow-hidden flex items-center shadow-inner border border-zinc-800">
                          <div 
                            className="h-full rounded-sm transition-all duration-500"
                            style={{ 
                              width: `${bar.percent}%`,
                              backgroundColor: bar.color 
                            }}
                          />
                        </div>
                        <div className="flex items-center space-x-2 text-right">
                          <span className="text-zinc-400 font-sans text-xs truncate max-w-[140px] hidden sm:inline">{bar.name}</span>
                          <span className="font-mono font-bold text-sm sm:text-base text-zinc-200 w-12 text-right">
                            {bar.percent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : isWebTab ? (
              /* Web Design Poster Layout: 01 设计总纲, 02 视觉系统, 03 分屏规划与信息架构, 04 颜色设定 */
              <div className="flex flex-col space-y-7">
                {(activeTab === "web_group" ? webGroupSections : webBrandSections).map((sec) => (
                  <div key={sec.number} className="space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="bg-[#d43c33] text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded shadow-sm">
                        {sec.number}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                        {sec.prefix}
                        <span className="text-[#d43c33]">{sec.accent}</span>
                      </h3>
                    </div>

                    <div className="space-y-3 font-sans text-xs sm:text-[13px] leading-relaxed">
                      {sec.items.map((item, iIdx) => (
                        <div key={iIdx} className="text-justify">
                          {item.label && (
                            <span className="text-[#e59b5f] font-semibold mr-1.5 inline">
                              {item.label}
                            </span>
                          )}
                          {item.text && (
                            <span className="text-zinc-100 font-normal leading-relaxed inline">
                              {item.text}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* 04 颜色设定 */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="bg-[#d43c33] text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded shadow-sm">
                      04
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                      颜色<span className="text-[#d43c33]">设定</span>
                    </h3>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {currentPreset.colorBars.map((bar, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="flex-1 bg-zinc-900 h-6 sm:h-7 rounded-sm overflow-hidden flex items-center shadow-inner border border-zinc-800">
                          <div 
                            className="h-full rounded-sm transition-all duration-500"
                            style={{ 
                              width: `${bar.percent}%`,
                              backgroundColor: bar.color 
                            }}
                          />
                        </div>
                        <div className="flex items-center space-x-2 text-right">
                          <span className="text-zinc-400 font-sans text-xs truncate max-w-[130px] hidden sm:inline">{bar.name}</span>
                          <span className="font-mono font-bold text-sm sm:text-base text-zinc-200 w-12 text-right">
                            {bar.percent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Mobile Editorial Layout (Phone Mockup + Color Bars) */
              <>
                {/* 01 设计思路 */}
                <div>
                  <div className="flex items-center space-x-2.5 mb-3">
                    <span className="bg-[#c07a3c] text-black font-mono font-bold text-[11px] px-2 py-0.5 rounded-full shadow-sm">
                      01
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                      {language === "zh" ? "设计思路" : "Design Concept"}
                    </h3>
                  </div>
                  <p className="text-[#c07a3c]/90 font-sans text-xs sm:text-[13px] leading-relaxed font-normal text-justify whitespace-pre-line">
                    {currentPreset.conceptText}
                  </p>
                </div>

                {/* 真实手机模型直出效果 */}
                <div className="relative group/phone py-2">
                  <div className="w-full max-w-[315px] sm:max-w-[340px] lg:max-w-[350px] mx-auto lg:mx-0 relative select-none">
                    {/* Ambient Warm Backlight Glow behind Phone */}
                    <div className="absolute -inset-2 bg-gradient-to-b from-[#c07a3c]/25 via-[#c07a3c]/8 to-transparent rounded-[44px] blur-xl opacity-70 group-hover/phone:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Phone Render Container */}
                    <div 
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={() => { setIsMouseDown(false); setMouseStartX(null); }}
                      style={{ aspectRatio: imageAspect }}
                      className="relative rounded-[36px] sm:rounded-[42px] border border-[#2b2520] hover:border-[#c07a3c]/60 overflow-hidden transition-all duration-300 shadow-2xl cursor-grab active:cursor-grabbing bg-transparent flex items-center justify-center group/screen"
                    >
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={activePhoneImage}
                          src={activePhoneImage} 
                          alt={`手机端视觉效果展示 ${phoneSeqIndex + 1}`} 
                          referrerPolicy="no-referrer"
                          onLoad={handleImageLoad}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/assets/shou_ji.png";
                          }}
                          initial={{ opacity: 0.82, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0.82, x: -20 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="w-full h-full object-contain mx-auto block select-none pointer-events-none"
                        />
                      </AnimatePresence>

                      {/* Subtle Sheen Reflection Overlay */}
                      <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent rotate-45 pointer-events-none transition-transform duration-1000 group-hover/phone:translate-x-12" />

                      {totalPhoneImgs > 1 && (
                        <>
                          {/* Hover Left / Right Navigation Controls */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevPhoneSeq();
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-[#c07a3c] text-white hover:text-black border border-white/20 transition-all flex items-center justify-center opacity-0 group-hover/screen:opacity-100 z-30 cursor-pointer shadow-xl backdrop-blur-sm"
                            title={language === "zh" ? "上一页" : "Previous"}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextPhoneSeq();
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-[#c07a3c] text-white hover:text-black border border-white/20 transition-all flex items-center justify-center opacity-0 group-hover/screen:opacity-100 z-30 cursor-pointer shadow-xl backdrop-blur-sm"
                            title={language === "zh" ? "向右滑动揭秘下一幕" : "Swipe Right to Reveal Next"}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {/* Top Right Step Badge */}
                          <div className="absolute top-3.5 right-3.5 z-30 pointer-events-none">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/80 border border-[#c07a3c]/40 text-[#c07a3c] shadow-md flex items-center space-x-1">
                              <span>{phoneSeqIndex + 1}/{totalPhoneImgs}</span>
                            </span>
                          </div>

                          {/* Interactive Pill Prompt over '右滑揭秘' area */}
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextPhoneSeq();
                            }}
                            className="absolute bottom-5 left-4 z-30 cursor-pointer group/swipepill"
                            title={language === "zh" ? "点击或向右滑动揭秘下一张" : "Click or swipe right to reveal next"}
                          >
                            <div className="px-3 py-1 rounded-full bg-black/85 hover:bg-[#c07a3c] text-white hover:text-black border border-[#c07a3c]/50 transition-all text-[10px] font-sans flex items-center space-x-1.5 shadow-xl backdrop-blur-md">
                              <Sparkles className="w-3 h-3 text-[#c07a3c] group-hover/swipepill:text-black transition" />
                              <span>{language === "zh" ? "右滑揭秘" : "Swipe Right"}</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover/swipepill:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Subtitle Caption & Steps under Phone */}
                    <div className="mt-3 text-center lg:text-left flex flex-col items-center lg:items-start space-y-2">
                      <div className="flex items-center space-x-2 text-[11px] text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c07a3c]" />
                        <span>
                          {language === "zh" 
                            ? (totalPhoneImgs > 1 ? `手机端互动呈现 · 依序右滑切换 (第 ${phoneSeqIndex + 1} / ${totalPhoneImgs} 幕)` : "手机端视觉效果呈现 · 依图自适应尺寸长度") 
                            : (totalPhoneImgs > 1 ? `Mobile Interaction · Swipe Right (${phoneSeqIndex + 1} / ${totalPhoneImgs})` : "Mobile Presentation · Auto-scaled to Asset Dimensions")}
                        </span>
                      </div>

                      {totalPhoneImgs > 1 && (
                        <div className="flex items-center space-x-2 pt-0.5">
                          {phoneImageList.map((_, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setPhoneSeqIndex(pIdx)}
                              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                phoneSeqIndex === pIdx 
                                  ? "w-8 bg-[#c07a3c] shadow-sm shadow-[#c07a3c]/30" 
                                  : "w-2.5 bg-zinc-700 hover:bg-zinc-500"
                              }`}
                              title={`Step ${pIdx + 1}`}
                            />
                          ))}
                          <span className="text-[10px] text-zinc-400 font-mono ml-1">
                            {phoneSeqIndex === 0 
                              ? (language === "zh" ? "01 晨起痛点" : "01 Morning") 
                              : phoneSeqIndex === 1 
                                ? (language === "zh" ? "02 蒸烤魔术" : "02 Magic") 
                                : (language === "zh" ? "03 温柔补丁" : "03 Care")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 02 颜色设定 */}
                <div className="pt-2">
                  <div className="flex items-center space-x-2.5 mb-4">
                    <span className="bg-[#c07a3c] text-black font-mono font-bold text-[11px] px-2 py-0.5 rounded-full shadow-sm">
                      02
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                      {language === "zh" ? "颜色设定" : "Color Palette"}
                    </h3>
                  </div>

                  {/* Color Bars */}
                  <div className="space-y-3">
                    {currentPreset.colorBars.map((bar, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="flex-1 bg-zinc-900 h-6 sm:h-7 rounded-sm overflow-hidden flex items-center shadow-inner">
                          <div 
                            className="h-full rounded-sm transition-all duration-500"
                            style={{ 
                              width: `${bar.percent}%`,
                              backgroundColor: bar.color 
                            }}
                          />
                        </div>
                        <span className="font-mono font-bold text-sm sm:text-base text-zinc-300 w-12 text-right">
                          {bar.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>

          {/* ============ RIGHT COLUMN (lg:col-span-7) ============ */}
          {/* Long-Format Editorial Panels (Side-by-Side: 1 column for web design board, 2 columns for v2, 3 columns for v1/detail) */}
          <div className="lg:col-span-7">
            {isDetailTab ? (
              /* Cross-Border E-Commerce Detail Showcase: Pure High-Res Design Display */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                  <div className="text-base sm:text-lg font-display tracking-wide flex items-center space-x-2">
                    <span className="text-[#c07a3c] font-bold">
                      {activeTab === "detail" ? "示例 01" : "示例 02"}
                    </span>
                    <span className="text-white font-bold">
                      {activeTab === "detail" ? "猫咪转盘玩具详情" : "宠物烘干箱头图设计"}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#c07a3c] bg-[#c07a3c]/15 px-2.5 py-0.5 rounded border border-[#c07a3c]/30 font-medium">
                    1728 × 2304 HD · 跨境电商详情页设计
                  </span>
                </div>

                {/* Pure Design Image Display */}
                <div 
                  onClick={() => {
                    if (onSelectImage) {
                      onSelectImage({
                        id: `detail-${activeTab}`,
                        imageUrl: activeTab === "detail" ? "/assets/aistudio/____80474724.png" : "/assets/aistudio/___A__fa2c32a7.png",
                        title: { 
                          zh: activeTab === "detail" ? "猫咪转盘玩具详情 · 跨境电商详情页设计" : "宠物烘干箱头图设计 · 跨境电商详情页设计", 
                          en: activeTab === "detail" ? "Cat Turntable Detail Page" : "Pet Dryer Box Hero Image" 
                        },
                        description: { zh: currentPreset.conceptText, en: currentPreset.nameEn },
                        year: "2026",
                        medium: { zh: "跨境电商详情页设计", en: "Cross-Border E-Commerce Detail Design" }
                      });
                    }
                  }}
                  className="relative group rounded-2xl overflow-hidden border border-[#2b2520] hover:border-[#c07a3c]/60 bg-zinc-950 shadow-2xl transition-all duration-300 cursor-zoom-in"
                  title={language === "zh" ? "点击全屏查看高清大图" : "Click to view full image"}
                >
                  <img 
                    src={activeTab === "detail" ? "/assets/aistudio/____80474724.png" : "/assets/aistudio/___A__fa2c32a7.png"} 
                    alt={activeTab === "detail" ? "猫咪转盘玩具详情" : "宠物烘干箱头图设计"}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto block select-none pointer-events-auto transition-transform duration-500 group-hover:scale-[1.006]" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-4 py-2 rounded-full bg-black/85 border border-[#c07a3c]/70 text-[#c07a3c] text-xs font-mono shadow-2xl backdrop-blur-md flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#c07a3c]" />
                      <span>{language === "zh" ? "点击全屏放大查看" : "Click to Zoom"}</span>
                    </span>
                  </div>
                </div>

                {/* Inspect Action Bar */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs gap-3">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Sparkles className="w-4 h-4 text-[#c07a3c]" />
                    <span className="font-medium">
                      {activeTab === "detail" 
                        ? (language === "zh" ? "猫咪转盘玩具详情 · 高清跨境电商排版设计" : "Cat Turntable Detail Design HD")
                        : (language === "zh" ? "宠物烘干箱头图设计 · 高清跨境电商排版设计" : "Pet Dryer Box Hero Image HD")
                      }
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectImage) {
                        onSelectImage({
                          id: `detail-${activeTab}-full`,
                          imageUrl: activeTab === "detail" ? "/assets/aistudio/____80474724.png" : "/assets/aistudio/___A__fa2c32a7.png",
                          title: { 
                            zh: activeTab === "detail" ? "猫咪转盘玩具详情 · 跨境电商详情页设计" : "宠物烘干箱头图设计 · 跨境电商详情页设计", 
                            en: activeTab === "detail" ? "Cat Turntable Detail Page" : "Pet Dryer Box Hero Image" 
                          },
                          description: { zh: currentPreset.conceptText, en: currentPreset.nameEn },
                          year: "2026",
                          medium: { zh: "跨境电商详情页设计", en: "Cross-Border E-Commerce Detail Design" }
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-[#c07a3c] hover:bg-[#a6652c] text-black font-semibold transition flex items-center space-x-2 shadow-lg shadow-[#c07a3c]/25 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{language === "zh" ? "查看高清大图" : "Inspect HD Image"}</span>
                  </button>
                </div>
              </div>
            ) : isWebTab ? (
              /* Web Design Showcase Layout: Pure Image Displays (No faux browser templates) */
              <div className="space-y-6">
                {activeTab === "web_group" ? (
                  /* 集团官网: 2 Columns Side-by-Side (Left: 5 cols 旧版集团官网, Right: 7 cols 新版集团官网) */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
                    {/* Left: 旧版集团官网 */}
                    <div className="md:col-span-5 flex flex-col space-y-2.5">
                      <div className="text-base sm:text-lg font-display tracking-wide flex items-center space-x-1">
                        <span className="text-[#d43c33] font-bold">旧版</span>
                        <span className="text-white font-bold">集团官网</span>
                      </div>

                      {/* Pure Image Display */}
                      <div 
                        onClick={() => {
                          if (onSelectImage) {
                            onSelectImage({
                              id: "group-old-snaps",
                              imageUrl: "/assets/editorial_web/group_old_snaps.webp",
                              title: { zh: "旧版集团官网 · 历史快照", en: "Legacy Group Website Snapshots" },
                              description: { zh: "偏向传统的“信息罗列”。左侧固定导航，右侧内容区。隐喻性强（手切辣椒、麦克风），缺乏真实实体产业实力展示。", en: "Legacy information listing with frameset navigation." },
                              year: "历史版本",
                              medium: { zh: "网页设计与视觉升级方案", en: "Web Design & UI/UX Upgrade" }
                            });
                          }
                        }}
                        className="relative group rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl transition-all duration-300 cursor-zoom-in"
                        title={language === "zh" ? "点击全屏查看" : "Click to view full image"}
                      >
                        <img 
                          src="/assets/editorial_web/group_old_snaps.webp" 
                          alt="旧版集团官网"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block select-none pointer-events-auto transition-transform duration-500 group-hover:scale-[1.008]" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-3 py-1 rounded-full bg-black/85 border border-[#d43c33]/70 text-[#d43c33] text-[11px] font-mono shadow-2xl backdrop-blur-md flex items-center space-x-1.5">
                            <Sparkles className="w-3 h-3 text-[#d43c33]" />
                            <span>{language === "zh" ? "点击全屏放大" : "Click to Zoom"}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: 新版集团官网 */}
                    <div className="md:col-span-7 flex flex-col space-y-2.5">
                      <div className="text-base sm:text-lg font-display tracking-wide flex items-center space-x-1">
                        <span className="text-[#d43c33] font-bold">新版</span>
                        <span className="text-white font-bold">集团官网</span>
                      </div>

                      {/* Pure Image Display */}
                      <div 
                        onClick={() => {
                          if (onSelectImage) {
                            onSelectImage({
                              id: "group-new-snaps",
                              imageUrl: "/assets/editorial_web/group_new_snaps.webp",
                              title: { zh: "新版集团官网 · 全屏长页视觉升级", en: "Upgraded Group Website Continuous Scroll" },
                              description: { zh: "首屏硬核工业智造工厂，全产业链实力展示，发光全球版图，全屏滚动沉浸式叙事体验。", en: "Full-screen scrolling modern industrial smart kitchen manufacturing narrative." },
                              year: "2026",
                              medium: { zh: "现代网页设计 · 方案落地", en: "Modern Web Design" }
                            });
                          }
                        }}
                        className="relative group rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl transition-all duration-300 cursor-zoom-in"
                        title={language === "zh" ? "点击全屏查看" : "Click to view full image"}
                      >
                        <img 
                          src="/assets/editorial_web/group_new_snaps.webp" 
                          alt="新版集团官网"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block select-none pointer-events-auto transition-transform duration-500 group-hover:scale-[1.008]" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-3 py-1 rounded-full bg-black/85 border border-[#d43c33]/70 text-[#d43c33] text-[11px] font-mono shadow-2xl backdrop-blur-md flex items-center space-x-1.5">
                            <Sparkles className="w-3 h-3 text-[#d43c33]" />
                            <span>{language === "zh" ? "点击全屏放大" : "Click to Zoom"}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 品牌官网: Top & Bottom (Top: 旧版品牌官网, Bottom: 新版品牌官网) */
                  <div className="flex flex-col space-y-6">
                    {/* Top: 旧版品牌官网 */}
                    <div className="flex flex-col space-y-2.5">
                      <div className="text-base sm:text-lg font-display tracking-wide flex items-center space-x-1">
                        <span className="text-[#d43c33] font-bold">旧版</span>
                        <span className="text-white font-bold">品牌官网</span>
                      </div>

                      {/* Pure Image Display */}
                      <div 
                        onClick={() => {
                          if (onSelectImage) {
                            onSelectImage({
                              id: "brand-old-snaps",
                              imageUrl: "/assets/aistudio/___4_4caea99d.png",
                              title: { zh: "旧版品牌官网 · 历史快照", en: "Legacy Brand Website Snapshots" },
                              description: { zh: "旧版重在“填鸭式”目录式信息输出，页面堆叠产品图标、跑车背书、技术参数与零散素材，缺乏统一的品牌高级调性。", en: "Legacy catalog-style fragmented presentation." },
                              year: "历史版本",
                              medium: { zh: "网页设计与视觉升级方案", en: "Web Design & UI/UX Upgrade" }
                            });
                          }
                        }}
                        className="relative group rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl transition-all duration-300 cursor-zoom-in"
                        title={language === "zh" ? "点击全屏查看" : "Click to view full image"}
                      >
                        <img 
                          src="/assets/aistudio/___4_4caea99d.png" 
                          alt="旧版品牌官网"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block select-none pointer-events-auto transition-transform duration-500 group-hover:scale-[1.008]" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-3 py-1 rounded-full bg-black/85 border border-[#d43c33]/70 text-[#d43c33] text-[11px] font-mono shadow-2xl backdrop-blur-md flex items-center space-x-1.5">
                            <Sparkles className="w-3 h-3 text-[#d43c33]" />
                            <span>{language === "zh" ? "点击全屏放大" : "Click to Zoom"}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: 新版品牌官网 */}
                    <div className="flex flex-col space-y-2.5">
                      <div className="text-base sm:text-lg font-display tracking-wide flex items-center space-x-1">
                        <span className="text-[#d43c33] font-bold">新版</span>
                        <span className="text-white font-bold">品牌官网</span>
                      </div>

                      {/* Pure Image Display */}
                      <div 
                        onClick={() => {
                          if (onSelectImage) {
                            onSelectImage({
                              id: "brand-new-snaps",
                              imageUrl: "/assets/aistudio/__11_e0902154.png",
                              title: { zh: "新版品牌官网 · 电影级沉浸式双栏长卷", en: "Upgraded Brand Website Dual-Column Narrative" },
                              description: { zh: "从明亮繁杂走向极简暗黑高奢风，Living Emotion 生活美学场景叙事，套系化厨房艺术生活呈现。", en: "Luxury dark aesthetic with cinematic scenes and emotional narrative." },
                              year: "2026",
                              medium: { zh: "网页设计与视觉升级方案", en: "Web Design & UI/UX Upgrade" }
                            });
                          }
                        }}
                        className="relative group rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl transition-all duration-300 cursor-zoom-in"
                        title={language === "zh" ? "点击全屏查看" : "Click to view full image"}
                      >
                        <img 
                          src="/assets/aistudio/__11_e0902154.png" 
                          alt="新版品牌官网"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block select-none pointer-events-auto transition-transform duration-500 group-hover:scale-[1.008]" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-3 py-1 rounded-full bg-black/85 border border-[#d43c33]/70 text-[#d43c33] text-[11px] font-mono shadow-2xl backdrop-blur-md flex items-center space-x-1.5">
                            <Sparkles className="w-3 h-3 text-[#d43c33]" />
                            <span>{language === "zh" ? "点击全屏放大" : "Click to Zoom"}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Inspect Full 1920x2875 Board Action Bar */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-xs gap-3">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Sparkles className="w-4 h-4 text-[#d43c33]" />
                    <span className="font-medium">
                      {language === "zh" ? "完整 1920 × 2875 4K 超清升级方案设计大展板" : "Full 1920 × 2875 4K Visual Upgrade Board"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectImage) {
                        onSelectImage({
                          id: `${currentPreset.tabKey}-fullboard`,
                          imageUrl: activeTab === "web_group" ? "/assets/editorial_web/web_group_upgrade.webp" : "/assets/editorial_web/web_brand_upgrade.webp",
                          title: { zh: `${currentPreset.titleSub} · 完整设计展板`, en: currentPreset.nameEn },
                          description: { zh: currentPreset.conceptText, en: currentPreset.nameEn },
                          year: "2026",
                          medium: { zh: "网页设计与视觉升级方案", en: "Web Design & UI/UX Upgrade" }
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-[#d43c33] hover:bg-[#b82e26] text-white font-medium transition flex items-center space-x-2 shadow-lg shadow-[#d43c33]/25 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{language === "zh" ? "查看 4K 完整展板" : "Inspect 4K Board"}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Mobile Editorial Image Columns */
              <div className={`grid grid-cols-1 ${
                currentPreset.cardImages.length === 1
                  ? "grid-cols-1 max-w-2xl mx-auto"
                  : currentPreset.cardImages.length === 2 
                    ? "sm:grid-cols-2 gap-4 md:gap-6" 
                    : currentPreset.cardImages.length === 4 
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3" 
                      : "sm:grid-cols-3 gap-3 md:gap-4"
              } items-start`}>
                {currentPreset.cardImages.map((imgUrl, idx) => {
                  const currentImg = (idx === 0 ? customCol1 : idx === 1 ? customCol2 : idx === 2 ? customCol3 : customCol4) || imgUrl;
                  const badgeNum = String(idx + 1).padStart(2, "0");

                  return (
                    <div 
                      key={idx}
                      onClick={() => {
                        if (onSelectImage) {
                          onSelectImage({
                            id: `${currentPreset.tabKey}-${idx}`,
                            imageUrl: currentImg,
                            title: { zh: `${currentPreset.titleSub} · 完整设计展板`, en: currentPreset.nameEn },
                            description: { zh: currentPreset.conceptText, en: currentPreset.nameEn },
                            year: "2026",
                            medium: { zh: "长页版式设计", en: "Editorial Long-Page Layout" }
                          });
                        }
                      }}
                      className="relative group rounded-2xl border border-[#2b2520] hover:border-[#c07a3c]/60 overflow-hidden shadow-2xl flex flex-col transition-all duration-300 hover:shadow-[#c07a3c]/15 self-start w-full cursor-zoom-in"
                      title={language === "zh" ? "点击查看全景大图" : "Click to view full image"}
                    >
                      {/* Floating Top Badge */}
                      <div className="absolute top-3 left-3 z-30">
                        <span className="font-mono text-[9px] px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/15 rounded-md text-[#c07a3c] font-semibold shadow-md">
                          {badgeNum}
                        </span>
                      </div>

                      {/* Floating Zoom Hint overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors z-20 flex items-center justify-center pointer-events-none">
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 px-3.5 py-1.5 rounded-full bg-black/85 border border-[#c07a3c]/60 text-[#c07a3c] text-xs font-mono shadow-2xl backdrop-blur-md flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#c07a3c]" />
                          <span>{language === "zh" ? "点击全屏放大查看" : "Click to View Full"}</span>
                        </span>
                      </div>

                      {/* Long Strip Image Container */}
                      <div className="w-full relative overflow-hidden bg-black/40">
                        <img 
                          src={currentImg} 
                          alt={`${currentPreset.titleMain}-${idx + 1}`} 
                          referrerPolicy="no-referrer"
                          className="w-full h-auto block select-none pointer-events-auto transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Collapse Bar */}
        <div className="mt-12 pt-6 border-t border-[#2b2520] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
          <span className="font-mono text-[11px] text-zinc-500">
            {language === "zh" 
              ? "长页版式设计展示窗口已展开 · 支持点击上方互动卡片切换联动" 
              : "Editorial layout window expanded · Click interactive cards above to switch linkage"}
          </span>
          <button
            onClick={() => toggleExpand(false)}
            className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition flex items-center space-x-1.5 cursor-pointer text-xs"
          >
            <span>{language === "zh" ? "收起长页版式窗口" : "Collapse Window"}</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    )}

  </div>

      {/* Image Replacement Modal Dialog */}
      <AnimatePresence>
        {replacingSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#181513] border border-[#3d3229] rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setReplacingSlot(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-display font-bold text-lg text-white mb-1 flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-[#c07a3c]" />
                <span>
                  {language === "zh" 
                    ? `替换${replacingSlot === "phone" ? "手机主屏" : "排版第 " + replacingSlot.replace("col", "") + " 列"}图片`
                    : `Replace ${replacingSlot} Image`}
                </span>
              </h4>
              <p className="text-xs text-zinc-400 mb-5">
                {language === "zh" ? "支持直接上传本地图片或粘贴网络图片 URL 链接。" : "Upload a local image or paste any image URL."}
              </p>

              {/* 1. Local File Upload */}
              <div className="mb-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-sm font-medium text-white flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#c07a3c]" />
                  <span>{language === "zh" ? "从本地电脑上传图片" : "Upload Local Image"}</span>
                </button>
              </div>

              <div className="flex items-center my-4">
                <div className="flex-1 h-[1px] bg-zinc-800" />
                <span className="px-3 text-[11px] font-mono text-zinc-500 uppercase">{language === "zh" ? "或输入链接" : "OR URL"}</span>
                <div className="flex-1 h-[1px] bg-zinc-800" />
              </div>

              {/* 2. URL Input */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c07a3c]"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setReplacingSlot(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    {language === "zh" ? "取消" : "Cancel"}
                  </button>
                  <button
                    onClick={() => applyReplacement(inputUrl)}
                    disabled={!inputUrl.trim()}
                    className="px-5 py-2 bg-[#c07a3c] hover:bg-[#d48b4b] disabled:opacity-40 text-black font-semibold rounded-xl text-xs transition"
                  >
                    {language === "zh" ? "确认替换" : "Confirm"}
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
