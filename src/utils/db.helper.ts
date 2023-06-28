import { PaginationDto } from '@/common/common.dto';
import { SelectQueryBuilder } from 'typeorm';

export const conditionUtils = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] });
    }
  });
  return queryBuilder;
};

export async function paginationUtils<T>(
  fetch: Promise<[T[], number]>,
  currentPage: number,
  pageSize: number,
) {
  const [data, total] = await fetch;
  return {
    pagination: {
      total,
      currentPage: currentPage,
      pageSize,
    },
    data,
  };
}

export function handlePageParams<T extends PaginationDto>(query: T) {
  const { currentPage = 1, pageSize = 10 } = query;
  const take = pageSize || 10;
  const skip = (currentPage - 1) * take;
  return { take, skip, currentPage, pageSize };
}
