import './search';

const sidebar = document.querySelector<HTMLElement>('#desktop-sidebar');
const sidebarToggle = document.querySelector<HTMLButtonElement>('.sidebar-toggle');
const content = document.querySelector<HTMLElement>('.content');
const mobile = window.matchMedia('(max-width: 767px)');

// The reference theme uses body.close for mobile-open and desktop-collapsed.
function sidebarIsVisible() {
  const closed = document.body.classList.contains('close');
  return mobile.matches ? closed : !closed;
}

function sidebarScrollKey(element: HTMLElement) {
  const section = element.querySelector<HTMLElement>('.section-current[data-section]')?.dataset.section ?? 'index';
  const surface = mobile.matches ? 'chapter-drawer' : 'desktop-sidebar';
  return `typescript-guide:sidebar:${section}:${surface}`;
}

function saveSidebarScroll() {
  if (!sidebar || !sidebarIsVisible() || sidebar.querySelector<HTMLInputElement>('[data-search]')?.value.trim()) return;
  try {
    sessionStorage.setItem(sidebarScrollKey(sidebar), String(sidebar.scrollTop));
  } catch {
    // Directory navigation still works when session storage is unavailable.
  }
}

function revealSidebarItem(element: HTMLElement, item: HTMLElement | null) {
  if (!item || !item.getClientRects().length) return;
  const bounds = element.getBoundingClientRect();
  const position = item.getBoundingClientRect();
  // The sticky search box covers the top of the sidebar once the list scrolls.
  const search = element.querySelector<HTMLElement>(':scope > .search');
  const top = Math.max(bounds.top, search?.getBoundingClientRect().bottom ?? bounds.top);
  if (position.top < top + 8) element.scrollTop += position.top - top - 8;
  else if (position.bottom > bounds.bottom - 8) element.scrollTop += position.bottom - bounds.bottom + 8;
}

function restoreSidebarScroll(element: HTMLElement | null) {
  if (!element || !sidebarIsVisible() || element.querySelector<HTMLInputElement>('[data-search]')?.value.trim()) return;
  try {
    const saved = sessionStorage.getItem(sidebarScrollKey(element));
    if (saved !== null && Number.isFinite(Number(saved)) && Number(saved) >= 0) element.scrollTop = Number(saved);
  } catch {
    // Reveal the current chapter even when a saved position cannot be read.
  }
  revealSidebarItem(element, element.querySelector<HTMLElement>('.section-children a[aria-current="page"]'));
}

function updateSidebarState() {
  const open = sidebarIsVisible();
  sidebarToggle?.setAttribute('aria-expanded', String(open));
  if (sidebar) sidebar.inert = !open;
  if (content) content.inert = mobile.matches && open;
}

function setSidebarOpen(open: boolean) {
  saveSidebarScroll();
  document.body.classList.toggle('close', mobile.matches ? open : !open);
  updateSidebarState();
  if (open) restoreSidebarScroll(sidebar);
}

sidebar?.addEventListener('scroll', saveSidebarScroll, { passive: true });
window.addEventListener('pagehide', saveSidebarScroll);
sidebarToggle?.addEventListener('click', () => setSidebarOpen(!sidebarIsVisible()));
// In the reference theme the same transparent toggle covers the shifted body.
// It closes the menu on a tap, without a modal or dimmed backdrop.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && sidebarIsVisible()) {
    setSidebarOpen(false);
    sidebarToggle?.focus({ preventScroll: true });
  }
});
mobile.addEventListener('change', () => {
  document.body.classList.remove('close');
  updateSidebarState();
  restoreSidebarScroll(sidebar);
});
updateSidebarState();
restoreSidebarScroll(sidebar);

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

document.querySelectorAll<HTMLButtonElement>('.chapter-toggle').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const outline = link.nextElementSibling;
    if (!outline?.classList.contains('app-sub-sidebar')) return;
    event.preventDefault();
    const collapsed = link.parentElement!.classList.toggle('outline-collapsed');
    link.setAttribute('aria-expanded', String(!collapsed));
  });
});

// Clicking the chapter already open toggles its outline instead of reloading the page.
document.querySelectorAll<HTMLAnchorElement>('.chapter-item > a[aria-current="page"]').forEach(link => {
  link.addEventListener('click', event => {
    const toggle = link.parentElement?.querySelector<HTMLButtonElement>(':scope > .chapter-toggle');
    if (!toggle || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    toggle.click();
  });
});

// Remember where a chapter link sat so the next page can keep it in the same place.
sidebar?.addEventListener('click', event => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('.chapter-item > a[href]');
  if (!link || mobile.matches || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.pathname === location.pathname) return;
  try {
    sessionStorage.setItem('typescript-guide:sidebar-anchor', String(link.getBoundingClientRect().top - sidebar.getBoundingClientRect().top));
  } catch {
    // Without storage the saved scroll position alone is restored.
  }
});

sidebar?.addEventListener('click', event => {
  if (!mobile.matches || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  setSidebarOpen(false);
  if (link.pathname !== location.pathname || !link.hash) return;
  const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
  if (!target) return;
  event.preventDefault();
  history.pushState(null, '', link.hash);
  if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  // Scroll only vertically while the content is still sliding back into place.
  const offset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'instant' });
});

const darkToggle = document.querySelector<HTMLButtonElement>('#dark-toggle');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  if (!darkToggle) return;
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
// Follow system changes until the reader picks a theme explicitly.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  try {
    if (localStorage.getItem('theme')) return;
  } catch {
    // Without storage there is no saved choice to respect.
  }
  document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
  updateThemeButton();
});

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

const headingLinks = [...document.querySelectorAll<HTMLAnchorElement>('.section-link[href^="#"]')].map(link => ({
  link,
  heading: document.getElementById(decodeURIComponent(link.hash.slice(1))),
})).filter(item => item.heading);
let scheduled = false;
let previousHeading: HTMLElement | null = null;
function updateReadingPosition() {
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
    const toc = document.querySelector<HTMLElement>('.page-toc');
    if (toc?.getClientRects().length) revealSidebarItem(toc, toc.querySelector<HTMLElement>('.section-link[aria-current="location"]'));
    if (sidebar && sidebarIsVisible() && !sidebar.matches(':hover') && !sidebar.contains(document.activeElement) && !sidebar.querySelector<HTMLInputElement>('[data-search]')?.value.trim()) {
      revealSidebarItem(sidebar, sidebar.querySelector<HTMLElement>('.section-link[aria-current="location"]'));
    }
  }
  previousHeading = current;
  scheduled = false;
}
let lastScrollY = window.scrollY;
function updateScrollChrome() {
  // On phones the top bar slides away while reading down and returns on scroll up.
  const delta = window.scrollY - lastScrollY;
  if (window.scrollY < 64 || delta < -4) document.body.classList.remove('bar-hidden');
  else if (delta > 4 && !(mobile.matches && sidebarIsVisible())) document.body.classList.add('bar-hidden');
  if (Math.abs(delta) > 4) lastScrollY = window.scrollY;
}
window.addEventListener('scroll', () => {
  requestAnimationFrame(updateScrollChrome);
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateReadingPosition);
  }
}, { passive: true });
window.addEventListener('resize', () => { updateReadingPosition(); updateScrollChrome(); });
updateScrollChrome();
updateReadingPosition();
