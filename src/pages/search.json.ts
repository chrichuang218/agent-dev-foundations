import { sitePath } from '../lib/site';
import { load } from 'cheerio';
import { articles, renderArticle } from '../lib/content';

export function GET() {
  const index = articles.flatMap(article => {
    const rendered = renderArticle(article);
    const $ = load(rendered.html, null, false);
    $('button.copy-code').remove();
    $('.heading-anchor').filter((_, element) => $(element).text() === '#').remove();
    let current = { title: article.title, url: article.path, section: article.section, body: article.summary };
    const entries = [current];
    // Read IDs from the rendered article so duplicate and formatted headings stay aligned.
    $.root().children().each((_, element) => {
      const heading = $(element);
      if (heading.is('h2, h3')) {
        const slug = heading.attr('id');
        const title = rendered.headings.find(item => item.slug === slug)?.text;
        if (slug && title) {
          current = { title, url: `${article.path}#${encodeURIComponent(slug)}`, section: article.section, body: '' };
          entries.push(current);
          return;
        }
      }
      current.body += ` ${heading.text()}`;
    });
    return entries.map(entry => ({ ...entry, url: sitePath(entry.url), body: entry.body.replace(/\s+/g, ' ').trim() }));
  });
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
