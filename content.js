// 知乎顶栏自动隐藏：下滑隐藏、上滑显示
(function () {
  'use strict';

  const TRANSITION = 'transform 0.25s ease';

  let header = null;
  let hidden = false;

  function findHeader() {
    // 知乎首页顶栏为 .Sticky.AppHeader，专栏页等用 .AppHeader 兜底
    return document.querySelector('.Sticky.AppHeader') || document.querySelector('.AppHeader');
  }

  function setHidden(v) {
    if (!header || hidden === v) return;
    hidden = v;
    header.style.transform = v ? 'translateY(-100%)' : '';
  }

  // 以滚轮方向为准：只有真正拨动滚轮才切换，点「收起」等按钮引发的
  // 页面自动回滚（scrollY 变化）不会误触发
  function onWheel(e) {
    if (e.deltaY > 0) {
      setHidden(true);
    } else if (e.deltaY < 0) {
      setHidden(false);
    }
  }

  // 回到页面最顶部时始终显示
  function onScroll() {
    if (window.scrollY <= 0) setHidden(false);
  }

  function setup() {
    header = findHeader();
    if (!header) return false;
    // 首次进入默认隐藏：先设 transform 再开过渡，避免加载时播放收起动画
    header.style.transform = 'translateY(-100%)';
    hidden = true;
    header.style.transition = TRANSITION;
    header.style.willChange = 'transform';
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return true;
  }

  // 知乎是 React SPA，脚本执行时顶栏可能尚未渲染，用 MutationObserver 等它出现
  if (!setup()) {
    const observer = new MutationObserver(() => {
      if (setup()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
