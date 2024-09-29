export const menuItemsData = [
  { label: 'Acceuil', link: '/' },
  {
    label: 'Neuf',
    children: [
      { label: 'Recherche', link: '/n/search' },
      { label: 'Marques', link: '/marques' },
      { label: 'Comparateur', link: '/n/comparateur' },
    ],
  },
  {
    label: 'Occasions',
    children: [
      { label: 'Recherche', link: 'ads' },
      { label: 'Annonces Du Jour', link: 'ad/today' },
      { label: 'Comparateur', link: 'ad/comparator' },
    ],
  },
  { label: 'Magazine', link: '/blog' },
];
