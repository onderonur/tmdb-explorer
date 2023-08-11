'use client';

import { Maybe } from '@/common/common-types';
import { SearchResultType } from '@/medias/media-enums';
import { Tab, Tabs, Typography } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!isMoviesTabVisible && !isPeopleTabVisible) {
    return <Typography>Nothing has been found</Typography>;
  }

  return (
    <Tabs
      value={value}
      onChange={(event, newType) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        newSearchParams.set('type', newType);

        router.replace(`${pathname}?${newSearchParams.toString()}`);
      }}
    >
      {isMoviesTabVisible && (
        <Tab value={SearchResultType.MOVIE} label={'Movies'} />
      )}
      {isPeopleTabVisible && (
        <Tab value={SearchResultType.PERSON} label={'People'} />
      )}
    </Tabs>
  );
}
