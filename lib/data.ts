import { Project, Skill, SocialLink } from "./types";

export const projects: Project[] = [
  {
    title: "个人博客系统",
    description: "基于 Next.js 构建的静态博客，支持 Markdown 渲染与代码高亮",
    image: "/projects/project-blog.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://github.com",
  },
  {
    title: "任务管理应用",
    description: "支持拖拽排序的看板式任务管理工具，数据持久化到本地存储",
    image: "/projects/project-todo.jpg",
    tags: ["React", "Zustand", "DnD"],
    href: "https://github.com",
  },
  {
    title: "天气仪表盘",
    description: "实时天气数据可视化面板，支持多城市切换与图表展示",
    image: "/projects/project-weather.jpg",
    tags: ["Vue", "ECharts", "API"],
    href: "https://github.com",
  },
  {
    title: "电商小程序",
    description: "完整的移动端电商解决方案，包含商品浏览、购物车与订单管理",
    image: "/projects/project-shop.jpg",
    tags: ["Taro", "React", "Node.js"],
    href: "https://github.com",
  },
];

export const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vue", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Docker", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "Figma", category: "design" },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com", icon: "github" },
  { name: "邮箱", href: "mailto:hello@example.com", icon: "mail" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
];
