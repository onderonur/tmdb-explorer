'use client';

import { NextLink } from '@/core/routing/components/next-link';
import { createUrl } from '@/core/routing/routing.utils';
import type { Maybe, Omit } from '@/core/shared/shared.types';
import { MediaType } from '@/features/media/media.utils';
import type { TabProps } from '@mui/material';
import { Tab, Tabs, Typography } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';

type SearchResultsTabLinkProps = Omit<
  TabProps<typeof NextLink, { component?: typeof NextLink }>,
  'href'
> & {
  searchResultType: MediaType;
};

function SearchResultsTabLink({
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
      href={createUrl(pathname, newSearchParams)}
      {...rest}
    />
  );
}

type SearchResultsTabsProps = {
  value: Maybe<MediaType>;
  isMoviesTabVisible: boolean;
  isPeopleTabVisible: boolean;
};

export function SearchResultsTabs({
  value,
  isMoviesTabVisible,
  isPeopleTabVisible,
}: SearchResultsTabsProps) {
  const tabs: Array<{ key: MediaType; content: React.ReactNode }> = [];

  if (isMoviesTabVisible) {
    tabs.push({
      key: MediaType.MOVIE,
      content: (
        <SearchResultsTabLink
          key={MediaType.MOVIE}
          label="Movies"
          searchResultType={MediaType.MOVIE}
        />
      ),
    });
  }

  if (isPeopleTabVisible) {
    tabs.push({
      key: MediaType.PERSON,
      content: (
        <SearchResultsTabLink
          key={MediaType.PERSON}
          label="People"
          searchResultType={MediaType.PERSON}
        />
      ),
    });
  }

  if (!tabs.length) {
    return <Typography>Nothing has been found</Typography>;
  }

  return (
    <Tabs value={tabs.findIndex((tab) => tab.key === value)}>
      {tabs.map((tab) => tab.content)}
    </Tabs>
  );
}
