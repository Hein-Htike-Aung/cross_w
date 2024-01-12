export const lastPage = (total: number) => {
  const itemsPerPage = 10;

  return Math.ceil(total / itemsPerPage);
};
