export interface Translation {
  en: string;
  zh: string;
}

export interface ExperienceItem {
  period: string;
  title: Translation;
  company: Translation;
  description?: Translation;
  highlights?: Translation[];
}

export interface EducationItem {
  period: string;
  degree: Translation;
  school: Translation;
  description?: Translation;
}

export interface SoftwareTool {
  name: string;
  category: "3D" | "2D" | "AI" | "Core";
  proficiency: number; // 1-5 or 1-100%
  iconName?: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  animatedUrl?: string;
  title: Translation;
  description: Translation;
  year: string;
  medium: Translation;
}

export interface ContactInfo {
  phone: string;
  email: string;
  wechatQrUrl: string;
}
