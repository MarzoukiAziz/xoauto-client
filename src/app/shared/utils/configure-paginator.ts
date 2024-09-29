export const configurePaginator = (paginator, items) => {
  paginator._intl.itemsPerPageLabel = items + ' par Page';
  paginator._intl.nextPageLabel = 'Page Suivante';
  paginator._intl.previousPageLabel = 'Page Précedente';
  return paginator;
};
