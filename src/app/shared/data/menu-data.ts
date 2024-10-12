export const MENU_ITEMS_DATA = [
  { label: 'Acceuil', link: '/' },
  {
    label: 'Neuf',
    children: [
      { label: 'Recherche', link: '/new/search' },
      { label: 'Marques', link: '/new/brands' },
      { label: 'Comparateur', link: '/new/comparator' },
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
