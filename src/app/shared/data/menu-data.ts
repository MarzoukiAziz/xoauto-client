export const menuItemsData = [
  { label: 'Acceuil', link: '/' },
  {
    label: 'Neuf',
    children: [
      { label: 'Recherche', link: '/n/search' },
      { label: 'Marques', link: '/new/brands' },
      { label: 'Comparateur', link: '/n/comparateur' },
    ],
  },
  {
    label: 'Annonces',
    children: [
      { label: 'Recherche', link: 'ad/search' },
      { label: 'Annonces Du Jour', link: 'ad/today' },
      { label: 'Comparateur', link: 'ad/comparator' },
    ],
  },
  { label: 'Magazine', link: '/blog' },
];
