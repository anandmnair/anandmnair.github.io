/**
 * Site-wide details. Page content and the nav order live in
 * src/content/pages/*.md — the nav is built from their `order` field.
 */
export const site = {
  name: 'Anand Manissery',
  initials: 'AM',
  role: 'Technology Evangelist | Architect | Engineering Lead',
  taglineLines: [
    'Open Source Contributor : Creator of open source libraries in GitHub.',
    'Driving AI-Powered Digital Transformation through Domain-Driven Design, Distributed Systems, and Legacy Modernization.Mastering AI engineering and championing craftsmanship through continuous hands-on experimentation.'
  ],
  location: 'Bangalore, India',
  email: 'anand.manissery@gmail.com',
  url: 'https://anandmnair.github.io',
  /** Site-wide work-in-progress notice. Set enabled: false when the writing is done. */
  wip: {
    enabled: true,
    label: 'Draft',
    note: 'Work in progress — this page is still being written and will change.',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/anandmnair' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anandmanissery/' },
    { label: 'Email', href: 'mailto:anand.manissery@gmail.com' },
  ],
};

/** Tagline as a single string — for meta description and other single-line uses. */
export const tagline = site.taglineLines.join(' ');

export type Site = typeof site;
