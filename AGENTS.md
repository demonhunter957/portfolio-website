# Agent 开发规范

## 1. 项目上下文

本项目为**个人作品集网站**，纯前端静态展示，无后端、无数据库、无用户认证。核心目标是：
- 展示个人形象和项目
- 深色主题、现代简洁设计
- 流畅滚动动画
- 完美的移动端适配

## 2. 技术约束（必须遵守）

### 2.1 技术栈红线
- **必须使用 Next.js App Router**，禁止 Pages Router
- **必须使用 TypeScript**，禁止 `any` 类型，所有 Props 必须显式定义接口
- **必须使用 Tailwind CSS**，禁止手写 `.css` 文件（`globals.css` 除外）
- **动画必须使用 Framer Motion**，禁止手写 CSS `@keyframes` 动画
- **图标必须使用 Lucide React**，禁止引入其他图标库

### 2.2 构建约束
- 必须配置 `output: 'export'` 静态导出
- 图片必须使用 Next.js `<Image>` 组件，禁止原生 `<img>`
- 字体必须使用 `next/font/google` 加载 Inter，禁止 `<link>` 引入 Google Fonts

## 3. 代码风格规范

### 3.1 命名规范
| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `ProjectCard.tsx` |
| 组件名 | PascalCase | `function ProjectCard()` |
| 工具函数文件 | camelCase | `data.ts`, `utils.ts` |
| 工具函数 | camelCase | `function formatDate()` |
| 常量 | UPPER_SNAKE_CASE | `const FADE_IN_UP = {...}` |
| 类型/接口 | PascalCase | `interface ProjectCardProps` |
| CSS 类名 | kebab-case | `section-title` |

### 3.2 组件结构
每个组件文件必须按以下顺序组织：

```tsx
// 1. imports（外部库 → 内部组件 → 类型/数据）
import { motion } from "framer-motion";
import Image from "next/image";
import { SkillTag } from "@/app/components/SkillTag";
import { Project } from "@/lib/types";

// 2. 类型定义（如需要）
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

// 3. 组件实现
export function ProjectCard({ title, description, image, tags, href }: ProjectCardProps) {
  return (
    // JSX
  );
}
```

### 3.3 导出规范
- 组件使用**命名导出** `export function`，禁止使用默认导出 `export default`
- 数据/工具函数使用命名导出
- 每个文件只导出一个组件（单一职责）

## 4. Tailwind CSS 使用规范

### 4.1 类名排序规则
类名按以下优先级分组，组间空一格：

1. **布局**：`flex`, `grid`, `block`, `hidden`
2. **定位**：`relative`, `absolute`, `fixed`, `top-*`, `left-*`
3. **尺寸**：`w-*`, `h-*`, `max-w-*`, `min-h-*`
4. **间距**：`m-*`, `p-*`, `gap-*`, `space-x-*`
5. **背景**：`bg-*`, `bg-gradient-*`
6. **边框**：`rounded-*`, `border`, `border-*`
7. **文字**：`text-*`, `font-*`, `leading-*`
8. **效果**：`shadow-*`, `opacity-*`, `blur-*`
9. **交互**：`hover:*`, `focus:*`, `transition-*`, `duration-*`, `cursor-*`
10. **响应式**：`md:*`, `lg:*`

```tsx
// ✅ 正确示例
<div className="flex flex-col items-center gap-4 bg-neutral-900 rounded-xl p-6 text-neutral-200 hover:bg-neutral-800 transition-colors duration-300 md:flex-row">

// ❌ 错误示例（顺序混乱）
<div className="p-6 flex hover:bg-neutral-800 bg-neutral-900 gap-4 rounded-xl text-neutral-200 flex-col items-center transition-colors duration-300 md:flex-row">
```

### 4.2 颜色系统（强制）
必须使用设计文档定义的颜色，禁止随意使用 Tailwind 默认色：

| 用途 | Tailwind 类 |
|------|-------------|
| 主背景 | `bg-neutral-950` 或 `#0a0a0a` |
| 卡片背景 | `bg-neutral-900` 或 `#171717` |
| 主文字 | `text-neutral-200` 或 `#e5e5e5` |
| 次要文字 | `text-neutral-400` 或 `#a3a3a3` |
| 强调色 | `text-blue-400`, `bg-blue-400` 或 `#60a5fa` |
| 边框 | `border-neutral-800` 或 `#262626` |

深色主题通过 Tailwind `dark:` 前缀实现，不依赖系统主题切换（本站点始终深色）。

### 4.3 禁止使用
- 禁止 `!important`（`!` 前缀）
- 禁止任意值（`w-[100px]`），优先使用标准值 `w-24`
- 禁止内联样式 `style={{...}}`

## 5. Framer Motion 动画规范

### 5.1 动画配置中心化管理
所有动画变体定义在 `lib/animations.ts`，禁止在组件内随意定义：

```ts
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, // ease-out-expo
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true, margin: "-100px" },
};
```

### 5.2 动画性能红线
- **只允许使用 `transform` 和 `opacity` 属性做动画**
- 禁止动画 `width`, `height`, `top`, `left`, `margin`, `padding`（会导致重排）
- 禁止 `transition: "all"`，必须明确指定属性
- 所有 `whileInView` 必须设置 `viewport={{ once: true }}`，防止反复触发

### 5.3 缓动函数
统一使用自定义 cubic-bezier：
- 入场动画：`[0.22, 1, 0.36, 1]`（ease-out-expo）
- 悬停动画：`[0.4, 0, 0.2, 1]`（ease-in-out）

## 6. 组件开发规范

### 6.1 Section 组件规范
- 每个 Section 必须设置 `id` 属性，用于导航锚点跳转：`id="hero"`, `id="about"` 等
- 必须包裹在 `<section>` 标签内
- 统一内边距：`py-20 px-4 sm:px-6 lg:px-8 xl:px-12`
- 最大内容宽度：`max-w-7xl mx-auto`

### 6.2 Props 设计原则
- Props 尽可能扁平，避免深层嵌套对象
- 可选参数使用 `?` 标记，提供默认值
- 事件处理函数命名：`on[Action]`，如 `onClick`, `onToggle`

### 6.3 可复用组件清单
开发前检查是否已有类似组件，避免重复：

| 组件 | 路径 | 用途 |
|------|------|------|
| `SectionTitle` | `app/components/SectionTitle.tsx` | 带装饰线的居中标题 |
| `SkillTag` | `app/components/SkillTag.tsx` | 圆角技能标签 |
| `ProjectCard` | `app/components/ProjectCard.tsx` | 项目展示卡片 |
| `SocialLink` | `app/components/SocialLink.tsx` | 带图标的社交链接 |

## 7. 数据管理规范

### 7.1 数据文件
- 所有展示内容集中在 `lib/data.ts`
- 数据结构必须定义类型接口（`lib/types.ts`）
- 禁止在组件内硬编码文本内容

### 7.2 类型定义示例
```ts
// lib/types.ts
export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

export interface Skill {
  name: string;
  category?: "frontend" | "backend" | "tools";
}
```

## 8. 图片资源规范

### 8.1 存放位置
- 头像：`/public/avatar.jpg`
- 宠物照片：`/public/pet.jpg`
- 项目截图：`/public/projects/project-{name}.jpg`

### 8.2 图片使用
- 必须指定 `width` 和 `height` 属性（或 `fill` + 父容器尺寸）
- 项目截图使用 `priority` 首屏加载，其他图片懒加载
- 图片格式优先使用 `.jpg`（照片）或 `.png`（需透明）

```tsx
// ✅ 正确
<Image
  src="/projects/demo.jpg"
  alt="项目截图 - 个人博客系统"
  width={800}
  height={450}
  className="rounded-lg object-cover"
/>

// ❌ 错误（缺少 alt，使用 img）
<img src="/projects/demo.jpg" />
```

## 9. 响应式开发规范

### 9.1 移动端优先
所有样式默认针对移动端，通过 `md:`、`lg:` 适配大屏：

```tsx
// ✅ 正确（移动优先）
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ❌ 错误（桌面优先）
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```

### 9.2 断点使用
| 断点 | 用途 | 最小宽度 |
|------|------|----------|
| 默认 | 手机竖屏 | 0 |
| `sm:` | 手机横屏 | 640px |
| `md:` | 平板 | 768px |
| `lg:` | 桌面 | 1024px |
| `xl:` | 大屏桌面 | 1280px |

### 9.3 触摸适配
- 可点击元素最小尺寸 44×44px（`min-w-11 min-h-11`）
- 悬停效果必须配合 `md:hover:`，避免移动端误触残留 hover 状态

## 10. 开发流程检查清单

实现每个功能前，按以下顺序执行：

1. **需求确认**：对照 PRD 确认功能范围和交互要求
2. **组件复用检查**：查看 `app/components/` 是否有可复用组件
3. **类型定义**：如需新数据结构，先在 `lib/types.ts` 定义接口
4. **数据准备**：展示内容放入 `lib/data.ts`
5. **组件实现**：
   - [ ] 命名导出
   - [ ] Props 显式类型定义
   - [ ] 无 `any` 类型
   - [ ] 无内联样式
   - [ ] Tailwind 类名按规范排序
   - [ ] 动画使用 Framer Motion
   - [ ] 响应式适配
6. **视觉检查**：
   - [ ] 深色主题下对比度正常
   - [ ] 移动端布局无溢出
   - [ ] 动画流畅不卡顿

## 11. 常见错误与禁止项

| ❌ 禁止 | ✅ 正确做法 |
|---------|------------|
| `export default function` | `export function` |
| `const Component = () =>` | `function Component()` |
| `any` 类型 | 显式定义接口/类型 |
| 手写 CSS 文件 | Tailwind 工具类 |
| `<img>` 标签 | `<Image>` 组件 |
| CSS `@keyframes` | Framer Motion |
| `style={{ color: 'red' }}` | Tailwind `text-red-500` |
| `useEffect` 监听 scroll | Framer Motion `whileInView` |
| 硬编码文本在 JSX | 抽离到 `lib/data.ts` |
| `magic numbers` | 使用设计系统常量 |
| 忘记 `alt` 属性 | 描述性 `alt` 文本 |

## 12. 提交规范

提交信息格式：`<type>: <description>`

| type | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 |
| `style` | 样式调整（不涉及功能） |
| `refactor` | 重构 |
| `chore` | 配置/依赖更新 |

示例：
- `feat: add ProjectCard component`
- `fix: adjust mobile navbar padding`
- `style: update hero gradient colors`
