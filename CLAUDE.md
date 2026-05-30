# Agent 开发规范

## 1. 项目上下文

本项目为**个人作品集网站**，纯前端静态展示，无后端、无数据库、无用户认证。核心目标：
- 展示个人形象和项目
- 深色主题、现代简洁设计
- 流畅滚动动画
- 完美的移动端适配

## 2. 技术约束

- **必须使用 Next.js App Router**，禁止 Pages Router
- **必须使用 TypeScript**，禁止 `any` 类型，所有 Props 必须显式定义接口
- **必须使用 Tailwind CSS**，禁止手写 `.css` 文件（`globals.css` 除外）
- **动画必须使用 Framer Motion**，禁止手写 CSS `@keyframes`
- **图标必须使用 Lucide React**，禁止引入其他图标库
- 必须配置 `output: 'export'` 静态导出
- 图片必须使用 Next.js `<Image>` 组件，禁止原生 `<img>`
- 字体必须使用 `next/font/google` 加载 Inter

## 3. 代码风格

### 命名规范
| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件/名 | PascalCase | `ProjectCard.tsx`, `function ProjectCard()` |
| 工具函数/文件 | camelCase | `data.ts`, `function formatDate()` |
| 常量 | UPPER_SNAKE_CASE | `const FADE_IN_UP = {...}` |
| 类型/接口 | PascalCase | `interface ProjectCardProps` |
| CSS 类名 | kebab-case | `section-title` |

### 导出规范
- 组件使用**命名导出** `export function`，禁止默认导出
- 每个文件只导出一个组件（单一职责）
- imports 顺序：外部库 → 内部组件 → 类型/数据

## 4. Tailwind CSS

### 类名排序（组间空一格）
1. 布局：`flex`, `grid` → 2. 定位：`relative`, `absolute` → 3. 尺寸：`w-*`, `h-*` → 4. 间距：`m-*`, `p-*`, `gap-*` → 5. 背景：`bg-*` → 6. 边框：`rounded-*`, `border-*` → 7. 文字：`text-*`, `font-*` → 8. 效果：`shadow-*`, `opacity-*` → 9. 交互：`hover:*`, `transition-*` → 10. 响应式：`md:*`, `lg:*`

### 颜色系统（强制）
| 用途 | 类名 |
|------|------|
| 主背景 | `bg-neutral-950` / `#0a0a0a` |
| 卡片背景 | `bg-neutral-900` / `#171717` |
| 主文字 | `text-neutral-200` / `#e5e5e5` |
| 次要文字 | `text-neutral-400` / `#a3a3a3` |
| 强调色 | `text-blue-400` / `#60a5fa` |
| 边框 | `border-neutral-800` / `#262626` |

深色主题通过 `dark:` 前缀实现（始终深色，不依赖系统）。

### 禁止
- `!important`（`!` 前缀）
- 任意值（`w-[100px]`），优先使用标准值
- 内联样式 `style={{...}}`

## 5. Framer Motion

- 所有动画变体定义在 `lib/animations.ts`，禁止组件内随意定义
- **只允许 `transform` 和 `opacity` 做动画**，禁止 `width/height/top/left/margin/padding`
- 禁止 `transition: "all"`，必须明确指定属性
- 所有 `whileInView` 必须设置 `viewport={{ once: true }}`
- 缓动：入场 `[0.22, 1, 0.36, 1]`，悬停 `[0.4, 0, 0.2, 1]`

## 6. 组件规范

- Section 必须设置 `id`（如 `id="hero"`），包裹在 `<section>` 内
- 统一内边距：`py-20 px-4 sm:px-6 lg:px-8 xl:px-12`
- 最大内容宽度：`max-w-7xl mx-auto`
- Props 扁平，可选参数用 `?` 并提供默认值
- 事件处理命名：`on[Action]`，如 `onClick`

## 7. 数据管理

- 展示内容集中在 `lib/data.ts`
- 数据结构先在 `lib/types.ts` 定义接口
- 禁止在组件内硬编码文本

## 8. 图片资源

- 头像 `/public/avatar.jpg`，宠物 `/public/pet.jpg`，项目截图 `/public/projects/project-{name}.jpg`
- 必须指定 `width/height`（或 `fill` + 父容器尺寸）
- 首屏图片加 `priority`，其他懒加载
- 必须写描述性 `alt` 文本

## 9. 响应式

- **移动端优先**：默认移动端，通过 `md:`、`lg:` 适配大屏
- 断点：`sm:640px` `md:768px` `lg:1024px` `xl:1280px`
- 可点击元素最小 44×44px（`min-w-11 min-h-11`）
- 悬停效果配合 `md:hover:`，避免移动端误触残留

## 10. 常见错误

| ❌ 禁止 | ✅ 正确 |
|---------|---------|
| `export default function` | `export function` |
| `const Component = () =>` | `function Component()` |
| `any` 类型 | 显式接口/类型 |
| 手写 CSS 文件 | Tailwind 工具类 |
| `<img>` | `<Image>` |
| CSS `@keyframes` | Framer Motion |
| `style={{...}}` | Tailwind 类名 |
| `useEffect` 监听 scroll | `whileInView` |
| 硬编码文本在 JSX | `lib/data.ts` |
| 忘记 `alt` | 描述性 `alt` 文本 |

## 11. 提交规范

格式：`<type>: <description>`

| type | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 |
| `style` | 样式调整（不涉及功能） |
| `refactor` | 重构 |
| `chore` | 配置/依赖更新 |
