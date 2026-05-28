export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

export interface Skill {
  name: string;
  category?: "frontend" | "backend" | "tools" | "design";
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
