type SearchEntry = { title: string; url: string; section: string; body: string };
let index: Promise<SearchEntry[]> | undefined;

function loadIndex() {
  return index ??= fetch(`${import.meta.env.BASE_URL}search.json`).then(response => {
    if (!response.ok) throw new Error(`Search index: ${response.status}`);
    return response.json() as Promise<SearchEntry[]>;
  }).catch(error => {
    index = undefined;
    throw error;
  });
}

function highlightExcerpt(element: HTMLElement, text: string, keywords: string[]) {
  const pattern = new RegExp(keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi');
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const offset = match.index!;
    element.append(document.createTextNode(text.slice(cursor, offset)));
    const highlight = document.createElement('em');
    highlight.className = 'search-keyword';
    highlight.textContent = match[0];
    element.append(highlight);
    cursor = offset + match[0].length;
  }
  element.append(document.createTextNode(text.slice(cursor)));
}

document.querySelectorAll<HTMLInputElement>('input[type="search"][data-search]').forEach(input => {
  const root = input.closest<HTMLElement>('.search');
  const panel = root?.querySelector<HTMLElement>('.results-panel');
  const clearButton = root?.querySelector<HTMLButtonElement>('.clear-button');
  if (!panel || !clearButton) return;
  panel.setAttribute('aria-live', 'polite');
  let timer = 0;
  let revision = 0;
  const search = () => {
    window.clearTimeout(timer);
    const query = input.value.trim().toLocaleLowerCase();
    const keywords = [...new Set(query.split(/\s+/).filter(Boolean))];
    const currentRevision = ++revision;
    panel.hidden = !query;
    panel.classList.toggle('show', Boolean(query));
    clearButton.hidden = !input.value;
    panel.replaceChildren();
    if (!query) return;
    panel.textContent = '正在搜索…';
    timer = window.setTimeout(async () => {
      try {
        const entries = await loadIndex();
        if (currentRevision !== revision) return;
        const matches = entries.map(entry => {
          const title = entry.title.toLocaleLowerCase();
          const body = entry.body.toLocaleLowerCase();
          const offsets = keywords.map(keyword => body.indexOf(keyword)).filter(offset => offset >= 0);
          return {
            entry,
            matches: keywords.every(keyword => title.includes(keyword) || body.includes(keyword)),
            score: keywords.filter(keyword => title.includes(keyword)).length,
            offset: offsets.length ? Math.min(...offsets) : 0,
          };
        }).filter(match => match.matches)
          .sort((left, right) => right.score - left.score).slice(0, 10);
        panel.replaceChildren();
        if (!matches.length) {
          panel.textContent = '没有找到相关内容。';
          return;
        }
        for (const { entry, offset } of matches) {
          const item = document.createElement('div');
          item.className = 'matching-post';
          const link = document.createElement('a');
          link.href = entry.url;
          const title = document.createElement('h2');
          title.textContent = entry.title;
          const excerpt = document.createElement('p');
          const start = Math.max(0, offset - 30);
          const end = Math.min(entry.body.length, start + 110);
          highlightExcerpt(excerpt, `${start ? '…' : ''}${entry.body.slice(start, end)}${end < entry.body.length ? '…' : ''}`, keywords);
          link.append(title, excerpt);
          item.append(link);
          panel.append(item);
        }
      } catch {
        if (currentRevision === revision) panel.textContent = '搜索加载失败，请重新输入以重试。';
      }
    }, 150);
  };
  input.addEventListener('input', search);
  clearButton.addEventListener('click', () => {
    input.value = '';
    search();
    input.focus();
  });
});
