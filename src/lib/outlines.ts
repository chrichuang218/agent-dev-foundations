import { articles, renderArticle } from './content';

export const outlines = new Map(articles.map(article => [
  article.path, renderArticle(article).headings.filter(heading => heading.depth === 2),
]));
