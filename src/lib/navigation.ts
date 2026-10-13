export interface ChapterLink { title: string; href: string }

export interface NavigationSection {
  id: string;
  label: string;
  href: string;
  groups: { label: string; items: ChapterLink[] }[];
}

export function chapterLabel(title: string): string {
  if (title === 'any 类型，unknown 类型，never 类型') return 'any / unknown / never';
  return title.replace(/^(?:TypeScript|JavaScript)\s*(?:的\s*)?/, '');
}
