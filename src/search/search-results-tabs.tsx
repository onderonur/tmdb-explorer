'use client';

import { Maybe } from '@/common/common-types';
import { SearchResultType } from '@/medias/media-enums';
import { Tabs, Typography } from '@mui/material';
import SearchResultsTabLink from './search-results-tab-link';

type SearchResultsTabsProps = {
  value: Maybe<SearchResultType>;
  isMoviesTabVisible: boolean;
  isPeopleTabVisible: boolean;
};

export default function SearchResultsTabs({
  value,
  isMoviesTabVisible,
  isPeopleTabVisible,
}: SearchResultsTabsProps) {
  const tabs: Array<{ key: SearchResultType; content: React.ReactNode }> = [];

  if (isMoviesTabVisible) {
    tabs.push({
      key: SearchResultType.MOVIE,
      content: (
        <SearchResultsTabLink
          key={SearchResultType.MOVIE}
          label="Movies"
          searchResultType={SearchResultType.MOVIE}
        />
      ),
    });
  }

  if (isPeopleTabVisible) {
    tabs.push({
      key: SearchResultType.PERSON,
      content: (
        <SearchResultsTabLink
          key={SearchResultType.PERSON}
          label="People"
          searchResultType={SearchResultType.PERSON}
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
