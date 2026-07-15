---
name: 项目说明
category: PersonWeb Docs
tags: [项目介绍, 技术栈, 快速开始]
order: 3
---

# Case魔法袋

> 一个使用 React + Vite 构建的个人作品集网站，展示个人项目、技术文档。

## ✨ 功能特性

- **首页 Hero 区域** — 带动画效果的头像展示与磁性交互效果
- **关于我** — 滚动驱动的逐字渐显动画
- **个人项目** — 项目卡片展示，支持跳转 GitHub 仓库
- **技术文档** — 手风琴折叠卡片，自动发现 MD 文件并内嵌 Markdown 渲染
- **联系弹窗** — 一键复制手机号 / 邮箱
- **滚动动画** — 基于 Framer Motion 的入场动画与视差效果

## 🛠️ 技术栈

| 类别       | 技术                                      |
| ---------- | ----------------------------------------- |
| 框架       | React 19                                  |
| 构建工具   | Vite 7                                    |
| 动画       | Framer Motion 12                          |
| 图标       | Lucide React                              |
| Markdown   | marked                                    |
| 语言       | JavaScript (ESM)                          |

## 📁 项目结构

```
├── src/
│   ├── assets/docs/        # Markdown 文档源文件
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # 入口文件
│   └── styles.css          # 全局样式
├── source/                 # 静态图片资源
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
└── package.json
```

## 📦 依赖清单

项目所需的全部 npm 依赖包：

```bash
npm install react@^19.0.0 react-dom@^19.0.0 framer-motion@^12.42.2 lucide-react@^0.468.0 marked@^18.0.6
npm install -D vite@^7.0.0 @vitejs/plugin-react@^5.0.0
```

| 包名                          | 版本        | 类型       | 说明                 |
| ----------------------------- | ----------- | ---------- | -------------------- |
| `react`                       | ^19.0.0     | 生产依赖   | React 核心库         |
| `react-dom`                   | ^19.0.0     | 生产依赖   | React DOM 渲染       |
| `framer-motion`               | ^12.42.2    | 生产依赖   | 动画库               |
| `lucide-react`                | ^0.468.0    | 生产依赖   | 图标库               |
| `marked`                      | ^18.0.6     | 生产依赖   | Markdown 解析器      |
| `vite`                        | ^7.0.0      | 开发依赖   | 构建工具             |
| `@vitejs/plugin-react`        | ^5.0.0      | 开发依赖   | Vite React 插件      |

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 预览构建产物

```bash
npm run preview
```

## 📄 页面模块说明

| 模块       | 说明                                     |
| ---------- | ---------------------------------------- |
| Hero       | 导航栏 + 头像轨道动画 + 磁性交互        |
| 关于我     | 个人介绍 + 装饰元素 + 滚动文字动画      |
| 个人项目   | 项目列表卡片，含简介与外链              |
| 文档       | 手风琴式 Markdown 文档展示               |
| 联系弹窗   | 弹窗展示联系方式，支持一键复制          |

## 📝 文档管理

文档以 Markdown 文件形式存放在 `src/assets/docs/` 目录下，通过 `import.meta.glob` 自动扫描发现，由内置的轻量 frontmatter 解析器提取元数据，并使用 `marked` 库渲染内容。

### 新增文档

只需在 `src/assets/docs/` 下新建 `.md` 文件，在顶部添加 YAML frontmatter 定义元数据：

```markdown
---
name: 文档名称
category: 分类名
tags: [标签1, 标签2]
order: 3
---

# 文档标题

正文内容...
```

| 字段       | 必填 | 说明                                       |
| ---------- | ---- | ------------------------------------------ |
| `name`     | 否   | 文档显示名称，缺省从 H1 标题推断            |
| `category` | 否   | 分类名，缺省从文件名推断                    |
| `tags`     | 否   | 标签数组，展示在卡片折叠状态                |
| `order`    | 否   | 排序权重（数字越小越靠前），缺省排到最后    |

> **注意**：新增文件后需重启 dev server（`import.meta.glob` 的限制，HMR 对新增文件不敏感）。

## 📦 项目链接

- [LocalUseFunasr](https://github.com/CaiXinXiang/LocalUseFunasr) — 基于 FunASR 的本地语音识别 WebUI
- [SauceDemo Test](https://github.com/CaiXinXiang/test_for_saucedemo) — SauceDemo 电商演示站自动化测试项目
- [PersonWebByCai](https://github.com/CaiXinXiang/PersonWebByCai) — 本项目，React + Vite 个人作品集网站

## 📜 License

MIT
