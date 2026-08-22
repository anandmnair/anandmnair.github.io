/**
 * Single place for the details that show up all over the site.
 * Everything marked TODO is a placeholder — replace with your own copy.
 */
export const site = {
  name: 'Anand M Nair',
  initials: 'AMN',
  role: 'TODO — your title, e.g. "Principal Engineer, Java & Distributed Systems"',
  tagline: 'TODO — one line about what you build and why it matters.',
  intro:
    'TODO — two or three sentences for the home page. What you work on, the kind of problems you like, and what a reader will find here.',
  location: 'TODO — City, Country',
  email: 'anand.manissery@gmail.com',
  url: 'https://anandmnair.github.io',
  /** Shown in the footer and on /about. Drop any you do not want. */
  socials: [
    { label: 'GitHub', href: 'https://github.com/anandmnair' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/TODO' },
    { label: 'Email', href: 'mailto:anand.manissery@gmail.com' },
  ],
  nav: [
    { label: 'Projects', href: '/projects/' },
    { label: 'Writing', href: '/blog/' },
    { label: 'Résumé', href: '/resume/' },
    { label: 'About', href: '/about/' },
  ],
};

export type Site = typeof site;
