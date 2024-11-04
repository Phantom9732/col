export const countPagination = (page: number, paginationSize: number) => {
  const start = paginationSize * (page - 1)
  const end = start + paginationSize
  return [start, end]
}
