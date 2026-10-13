import './search';

const drawer = document.querySelector<HTMLDialogElement>('#chapter-drawer');
const desktopSidebar = document.querySelector<HTMLElement>('#desktop-sidebar');
const sidebarToggle = document.querySelector<HTMLButtonElement>('.sidebar-toggle');
const mobile = window.matchMedia('(max-width: 767px)');
let drawerAnchor: { target: HTMLElement; hash: string } | null = null;

function sidebarIsVisible(sidebar: HTMLElement) {
  return sidebar === drawer ? drawer.open : !mobile.matches && !document.body.classList.contains('sidebar-hidden');
}

function sidebarScrollKey(sidebar: HTMLElement) {
  const section = sidebar.querySelector<HTMLElement>('.section-current[data-section]')?.dataset.section ?? 'index';
  return `typescript-guide:sidebar:${section}:${sidebar.id}`;
}

function saveSidebarScroll(sidebar: HTMLElement | null) {
  if (!sidebar || !sidebarIsVisible(sidebar) || sidebar.querySelector<HTMLInputElement>('[data-search]')?.value.trim()) return;
  try {
    sessionStorage.setItem(sidebarScrollKey(sidebar), String(sidebar.scrollTop));
  } catch {
    // Directory navigation still works when session storage is unavailable.
  }
}

function revealSidebarItem(sidebar: HTMLElement, item: HTMLElement | null) {
  if (!item || !item.getClientRects().length) return;
  const bounds = sidebar.getBoundingClientRect();
  const position = item.getBoundingClientRect();
  if (position.top < bounds.top + 8) sidebar.scrollTop += position.top - bounds.top - 8;
  else if (position.bottom > bounds.bottom - 8) sidebar.scrollTop += position.bottom - bounds.bottom + 8;
}

function restoreSidebarScroll(sidebar: HTMLElement | null) {
  if (!sidebar || !sidebarIsVisible(sidebar) || sidebar.querySelector<HTMLInputElement>('[data-search]')?.value.trim()) return;
  try {
    const saved = sessionStorage.getItem(sidebarScrollKey(sidebar));
    if (saved !== null && Number.isFinite(Number(saved)) && Number(saved) >= 0) sidebar.scrollTop = Number(saved);
  } catch {
    // Reveal the current chapter even when a saved position cannot be read.
  }
  revealSidebarItem(sidebar, sidebar.querySelector<HTMLElement>('.section-children a[aria-current="page"]'));
}

for (const sidebar of [desktopSidebar, drawer]) {
  sidebar?.addEventListener('scroll', () => saveSidebarScroll(sidebar), { passive: true });
}
window.addEventListener('pagehide', () => {
  saveSidebarScroll(desktopSidebar);
  saveSidebarScroll(drawer);
});

function closeDrawer() {
  saveSidebarScroll(drawer);
  drawer?.close();
}

function updateSidebarToggle() {
  sidebarToggle?.setAttribute('aria-controls', mobile.matches ? 'chapter-drawer' : 'desktop-sidebar');
  sidebarToggle?.setAttribute('aria-expanded', String(mobile.matches ? Boolean(drawer?.open) : !document.body.classList.contains('sidebar-hidden')));
  if (mobile.matches) sidebarToggle?.setAttribute('aria-haspopup', 'dialog');
  else sidebarToggle?.removeAttribute('aria-haspopup');
}

sidebarToggle?.addEventListener('click', () => {
  if (mobile.matches) {
    if (drawer?.open) closeDrawer();
    else {
      drawer?.showModal();
      document.body.classList.add('drawer-open');
      restoreSidebarScroll(drawer);
    }
  } else {
    document.body.classList.toggle('sidebar-hidden');
    restoreSidebarScroll(desktopSidebar);
  }
  updateSidebarToggle();
});
document.querySelector('.close-drawer')?.addEventListener('click', closeDrawer);
drawer?.addEventListener('cancel', () => saveSidebarScroll(drawer));
drawer?.addEventListener('click', event => {
  if (event.target === drawer) {
    const bounds = drawer.getBoundingClientRect();
    if (event.clientX > bounds.right || event.clientX < bounds.left) closeDrawer();
  }
});
drawer?.addEventListener('close', () => {
  document.body.classList.remove('drawer-open');
  updateSidebarToggle();
  if (drawerAnchor) {
    const { target, hash } = drawerAnchor;
    drawerAnchor = null;
    history.pushState(null, '', hash);
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
  } else {
    sidebarToggle?.focus({ preventScroll: true });
  }
});
mobile.addEventListener('change', () => {
  if (!mobile.matches && drawer?.open) closeDrawer();
  updateSidebarToggle();
  if (!mobile.matches) restoreSidebarScroll(desktopSidebar);
});
updateSidebarToggle();
restoreSidebarScroll(desktopSidebar);

document.querySelectorAll<HTMLAnchorElement>('[data-section-toggle]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const children = link.closest('.nav-section')?.querySelector<HTMLElement>(':scope > .section-children');
    if (!children) return;
    event.preventDefault();
    children.hidden = !children.hidden;
    link.setAttribute('aria-expanded', String(!children.hidden));
  });
});

document.querySelectorAll<HTMLAnchorElement>('.sidebar-nav a[aria-current="page"][aria-expanded]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const outline = link.nextElementSibling;
    if (!outline?.classList.contains('app-sub-sidebar')) return;
    event.preventDefault();
    const collapsed = link.parentElement!.classList.toggle('collapse');
    link.setAttribute('aria-expanded', String(!collapsed));
  });
});

drawer?.querySelectorAll<HTMLAnchorElement>('.section-link[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    drawerAnchor = { target, hash: link.hash };
    closeDrawer();
  });
});

const darkToggle = document.querySelector<HTMLButtonElement>('#dark-toggle');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  if (!darkToggle) return;
  darkToggle.textContent = dark ? '☀️' : '🌙';
  darkToggle.setAttribute('aria-pressed', String(dark));
  darkToggle.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  darkToggle.title = dark ? '切换浅色模式' : '切换深色模式';
}
darkToggle?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // The selected theme still works when the browser disallows persistence.
  }
  updateThemeButton();
});
updateThemeButton();

document.querySelectorAll<HTMLButtonElement>('button.copy-code').forEach(button => {
  let resetTimer = 0;
  button.addEventListener('click', async () => {
    const code = button.closest('.code-block')?.querySelector('pre code')?.textContent;
    const status = button.querySelector('[aria-live]');
    if (code === undefined || code === null) return;
    window.clearTimeout(resetTimer);
    button.classList.remove('success', 'error');
    try {
      await navigator.clipboard.writeText(code);
      button.classList.add('success');
      if (status) status.textContent = '代码已复制到剪贴板';
    } catch {
      button.classList.add('error');
      if (status) status.textContent = '浏览器未允许访问剪贴板，请选择代码后手动复制';
    }
    resetTimer = window.setTimeout(() => {
      button.classList.remove('success', 'error');
      if (status) status.textContent = '';
    }, 1000);
  });
});

const backToTop = document.querySelector<HTMLButtonElement>('.back-to-top');
backToTop?.addEventListener('click', () => {
  document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  restoreSidebarScroll(desktopSidebar);
});

const headingLinks = [...document.querySelectorAll<HTMLAnchorElement>('.section-link[href^="#"]')].map(link => ({
  link,
  heading: document.getElementById(decodeURIComponent(link.hash.slice(1))),
})).filter(item => item.heading);
let scheduled = false;
let previousHeading: HTMLElement | null = null;
function updateReadingPosition() {
  backToTop?.classList.toggle('visible', window.scrollY > 300);
  let current: HTMLElement | null = null;
  for (const item of headingLinks) {
    const offset = Number.parseFloat(getComputedStyle(item.heading!).scrollMarginTop) || 0;
    if (item.heading!.getBoundingClientRect().top <= offset + 2) current = item.heading;
  }
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = headingLinks.at(-1)?.heading ?? current;
  }
  for (const item of headingLinks) {
    const active = item.heading === current;
    item.link.parentElement?.classList.toggle('active', active);
    if (active) item.link.setAttribute('aria-current', 'location');
    else item.link.removeAttribute('aria-current');
  }
  if (current && current !== previousHeading) {
    for (const sidebar of [desktopSidebar, drawer]) {
      if (!sidebar || !sidebarIsVisible(sidebar) || sidebar.matches(':hover') || sidebar.contains(document.activeElement) || sidebar.querySelector<HTMLInputElement>('[data-search]')?.value.trim()) continue;
      revealSidebarItem(sidebar, sidebar.querySelector<HTMLElement>('.section-link[aria-current="location"]'));
    }
  }
  previousHeading = current;
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateReadingPosition);
  }
}, { passive: true });
window.addEventListener('resize', updateReadingPosition);
updateReadingPosition();
