# 个人作品集网站技术设计文档

## 1. 技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Next.js | 15.x | React 框架，支持 SSG 静态导出 |
| 语言 | TypeScript | 5.x | 类型安全 |
| 样式 | Tailwind CSS | 4.x | 原子化 CSS，内置深色模式支持 |
| 动画 | Framer Motion | 12.x | 滚动触发动画、页面过渡 |
| 图标 | Lucide React | latest | 矢量图标库 |
| 字体 | Inter | Google Fonts | 现代无衬线字体 |

### 选型理由
- **Next.js**：SSG 静态导出性能优异，图片自动优化，内置路由
- **Tailwind CSS**：无需手写 CSS 文件，深色模式通过 `dark:` 前缀即可实现
- **Framer Motion**：声明式动画 API，与 React 组件深度集成，支持 `whileInView` 滚动触发

## 2. 项目结构

```
portfolio/
├── app/
│   ├── sections/           # 页面区块组件
│   │   ├── Hero.tsx        # 首页大标题 + 简介 + 头像
│   │   ├── About.tsx       # 关于我 + 技能 + 宠物
│   │   ├── Projects.tsx    # 项目展示网格
│   │   └── Contact.tsx     # 联系方式
│   ├── components/         # 可复用组件
│   │   ├── Navbar.tsx      # 导航栏（锚点跳转）
│   │   ├── ProjectCard.tsx # 项目卡片
│   │   ├── SkillTag.tsx    # 技能标签
│   │   └── SectionTitle.tsx # 区块标题
│   ├── page.tsx            # 主页面（组合所有 section）
│   ├── layout.tsx          # 根布局（字体、元数据、全局样式）
│   └── globals.css         # 全局 CSS + Tailwind 指令
├── public/
│   ├── avatar.jpg          # 头像
│   ├── pet.jpg             # 宠物照片
│   └── projects/           # 项目截图
│       ├── project-1.jpg
│       └── ...
├── lib/
│   └── data.ts             # 静态数据（项目、技能、联系方式）
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## 3. 组件设计

### 3.1 页面区块（Sections）

| 组件 | 职责 | 关键交互 |
|------|------|----------|
| `Hero` | 首屏视觉冲击 | 入场动画（标题淡入上移、头像缩放） |
| `About` | 个人介绍 | 技能标签悬停效果，滚动进入动画 |
| `Projects` | 项目网格 | 卡片悬停上浮 + 阴影，点击跳转外部链接 |
| `Contact` | 联系信息 | 链接悬停下划线动画 |

### 3.2 可复用组件

| 组件 | Props | 说明 |
|------|-------|------|
| `ProjectCard` | `title, image, description, tags, href` | 图片懒加载，技术栈用 SkillTag 渲染 |
| `SkillTag` | `name` | 圆角标签，悬停变色 |
| `SectionTitle` | `children` | 带装饰线的居中标题，滚动淡入 |

### 3.3 布局组件

| 组件 | 职责 |
|------|------|
| `Navbar` | 固定在顶部，点击平滑滚动到对应 section，移动端折叠为汉堡菜单 |
| `Footer` | 底部版权信息 |

## 4. 状态管理

本项目为纯展示型静态网站，**无需全局状态管理库**。状态仅存在于：

- **移动端菜单**：`useState<boolean>` 控制 Navbar 汉堡菜单展开/收起
- **滚动位置**：Framer Motion 的 `whileInView` 自动处理，无需手动监听 scroll

## 5. 样式方案

### 5.1 颜色系统（深色主题）

```
--background: #0a0a0a       /* 主背景 */
--surface: #171717          /* 卡片背景 */
--primary: #e5e5e5          /* 主文字 */
--secondary: #a3a3a3        /* 次要文字 */
--accent: #60a5fa           /* 强调色（蓝） */
--border: #262626           /* 边框 */
```

### 5.2 响应式断点

| 断点 | 范围 | 布局调整 |
|------|------|----------|
| sm | >= 640px | 小屏手机 |
| md | >= 768px | 平板，网格开始多列 |
| lg | >= 1024px | 桌面，导航展开 |
| xl | >= 1280px | 大屏桌面，最大内容宽度 |

### 5.3 排版

- 主字体：Inter，字重 300/400/600/700
- 标题：渐变文字效果（`bg-clip-text`）提升视觉层次
- 行高：标题 1.2，正文 1.7

## 6. 动画方案

### 6.1 全局动画配置

```ts
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "-100px" }
};
```

### 6.2 各区块动画

| 区块 | 动画效果 | 触发条件 |
|------|----------|----------|
| Hero 标题 | 淡入 + 上移 30px，stagger 0.1s | 页面加载 |
| Hero 头像 | 缩放 0.8→1 + 淡入，延迟 0.3s | 页面加载 |
| About 文字 | 淡入 + 上移 20px | 滚动进入视口 |
| 技能标签 | 淡入，stagger 0.05s | 滚动进入视口 |
| 项目卡片 | 淡入 + 上移 30px，stagger 0.1s | 滚动进入视口 |
| 联系方式 | 淡入，图标轻微弹跳 | 滚动进入视口 |

### 6.3 交互动画

- **卡片悬停**：`translateY(-4px)` + 阴影加深，过渡 0.3s
- **链接悬停**：颜色过渡到 accent，下划线从左到右展开
- **按钮/标签悬停**：背景色加深，缩放 1.02

## 7. 性能优化

1. **静态导出**：`output: 'export'` 生成纯静态 HTML，无需服务器
2. **图片优化**：使用 Next.js `<Image>` 组件，自动 WebP 格式、懒加载
3. **字体优化**：`next/font` 本地加载 Inter，消除字体闪烁
4. **动画性能**：仅使用 `transform` 和 `opacity`，触发 GPU 加速
5. **代码分割**：Framer Motion 按需导入，减少首屏 JS

## 8. 开发计划

| 阶段 | 内容 | 预计时间 |
|------|------|----------|
| 1 | 初始化项目 + 配置 Tailwind 深色主题 + 全局布局 | 30 分钟 |
| 2 | 实现 Navbar + Hero 区块 | 45 分钟 |
| 3 | 实现 About 区块（技能标签 + 宠物区域） | 45 分钟 |
| 4 | 实现 Projects 区块 + ProjectCard 组件 | 60 分钟 |
| 5 | 实现 Contact 区块 + Footer | 30 分钟 |
| 6 | 添加 Framer Motion 滚动动画 | 45 分钟 |
| 7 | 移动端适配测试 + 细节调整 | 30 分钟 |
| **总计** | | **约 5 小时** |

## 9. 部署

- **平台**：Vercel（与 Next.js 深度集成）
- **构建命令**：`next build`
- **输出目录**：`dist`（静态导出）
- **自定义域名**：可选配置个人域名

## 10. 数据文件

所有展示内容抽离至 `lib/data.ts`，便于维护：

```ts
export const projects = [
  {
    title: "项目名",
    description: "简短描述",
    image: "/projects/xxx.jpg",
    tags: ["React", "TypeScript"],
    href: "https://github.com/..."
  },
  // ...
];

export const skills = ["React", "TypeScript", "Next.js", "Tailwind CSS", ...];
export const socialLinks = { github: "...", email: "...", ... };
```
