export const ITEMS_PER_PAGE = 20;

export const calculateTotalPages = (totalItems: number, limit: number = ITEMS_PER_PAGE) => {
  return Math.ceil(totalItems / limit);
};

export const paginateClientItems = <T,>(items: T[], currentPage: number, limit: number = ITEMS_PER_PAGE): T[] => {
  const startIndex = (currentPage - 1) * limit;
  return items.slice(startIndex, startIndex + limit);
};