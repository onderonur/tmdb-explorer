import type { Omit } from '@/common/common-types';
import type { SearchResultType } from '@/medias/media-enums';
import NextLink from '@/routing/next-link';
import type { TabProps } from '@mui/material';
import { Tab } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';

type SearchResultsTabLinkProps = Omit<
  TabProps<typeof NextLink, { component?: typeof NextLink }>,
  'href'
> & {
  searchResultType: SearchResultType;
};

export default function SearchResultsTabLink({
  searchResultType,
  // This is required for `Tabs` component to style `Tab` components
  // when props like `variant` is used on `Tabs`.
  ...rest
}: SearchResultsTabLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set('type', searchResultType);

  return (
    <Tab
      component={NextLink}
      href={`${pathname}?${newSearchParams.toString()}`}
      {...rest}
    />
  );
}
