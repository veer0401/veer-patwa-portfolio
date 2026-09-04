export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  navigation: NavigationItem[];
}
