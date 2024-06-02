export function createUrl(pathname: string, searchParams?: URLSearchParams) {
  const searchParamsString = searchParams?.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : '';
  return `${pathname}${queryString}`;
}
