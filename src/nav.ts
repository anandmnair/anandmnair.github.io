import { getCollection, type CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;

export interface NavItem {
  label: string;
  title: string;
  description: string;
  href: string;
  /** Section key: '' for home, otherwise the top-level folder name. */
  section: string;
  isIndex: boolean;
}

/**
 * The glob loader gives an `index.md` file the id of its own folder — e.g.
 * `src/content/docs/ai/index.md` has id `'ai'`, not `'ai/index'`. Only a
 * non-index page carries a slash: `'ai/automation'`.
 *
 *   'home'            -> '/'
 *   'ai'               -> '/ai/'            (section overview)
 *   'ai/automation'    -> '/ai/automation/' (page inside a section)
 */
export function routeOf(id: string): string {
  if (id === 'home') return '/';
  return '/' + id + '/';
}

export function sectionOf(id: string): string {
  if (id === 'home') return '';
  return id.split('/')[0];
}

function isIndexId(id: string): boolean {
  return id === 'home' || !id.includes('/');
}

function toItem(doc: Doc): NavItem {
  return {
    label: doc.data.navLabel ?? doc.data.title,
    title: doc.data.title,
    description: doc.data.description,
    href: routeOf(doc.id),
    section: sectionOf(doc.id),
    isIndex: isIndexId(doc.id),
  };
}

async function allDocs(): Promise<Doc[]> {
  return getCollection('docs', ({ data }) => !data.draft);
}

/** The top navigation: home plus every section's overview page, in `order`. */
export async function getSections(): Promise<NavItem[]> {
  const docs = await allDocs();
  return docs
    .filter((d) => isIndexId(d.id))
    .sort((a, b) => a.data.order - b.data.order)
    .map(toItem);
}

/** The left navigation for one section: its overview, then its pages. */
export async function getSectionPages(section: string): Promise<NavItem[]> {
  if (!section) return [];
  const docs = await allDocs();
  const index = docs.find((d) => d.id === section);
  const children = docs
    .filter((d) => sectionOf(d.id) === section && d.id !== section)
    .sort((a, b) => a.data.order - b.data.order)
    .map(toItem);
  return index ? [{ ...toItem(index), label: 'Overview' }, ...children] : children;
}

/** Every page in reading order — drives the previous/next pager. */
export async function getReadingOrder(): Promise<NavItem[]> {
  const sections = await getSections();
  const out: NavItem[] = [];
  for (const s of sections) {
    if (!s.section) {
      out.push(s);
      continue;
    }
    out.push(...(await getSectionPages(s.section)));
  }
  return out;
}
