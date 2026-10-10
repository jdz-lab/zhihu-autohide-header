# 知乎顶栏自动隐藏（Edge 扩展）

知乎网页版增强小插件：**滚轮下滑时自动隐藏顶部标题栏，上滑时自动展示**，让阅读时更沉浸。

## 功能

- 滚轮/触摸板下滑 → 顶栏平滑滑出屏幕（0.25s 过渡动画）
- 滚轮上滑 → 顶栏自动还原
- 滚回页面最顶部时始终显示顶栏
- 只监听滚轮方向，点「收起」等按钮引发的页面自动滚动不会误触发
- 纯 DOM + CSS 操作，不拦截、不修改任何网络请求

## 支持范围

- 知乎首页及各页面：`www.zhihu.com`
- 专栏文章：`zhuanlan.zhihu.com`

## 安装（开发者模式加载）

1. 下载本仓库（`git clone` 或 Download ZIP 解压）
2. 打开 Edge，地址栏输入 `edge://extensions/`
3. 打开左下角「**开发人员模式**」开关
4. 点「**加载解压缩的扩展**」，选择本文件夹（含 `manifest.json` 的目录）
5. 刷新知乎页面即可生效

> 注意：保持「开发人员模式」开启，否则扩展会被停用。

## 原理

通过 Manifest V3 内容脚本（content script）注入页面：

- 用 CSS 选择器 `.Sticky.AppHeader`（专栏页 `.AppHeader` 兜底）找到顶栏元素
- 监听 `wheel` 事件判断滚动方向，对顶栏施加 `transform: translateY(-100%)` 实现隐藏/显示（GPU 合成，不触发布局重排）
- 知乎是 React 单页应用，脚本注入时顶栏可能尚未渲染，用 `MutationObserver` 等其出现后再绑定

## 文件结构

```
├── manifest.json   # 扩展配置（Manifest V3）
├── content.js      # 核心逻辑（内容脚本）
└── README.md
```
