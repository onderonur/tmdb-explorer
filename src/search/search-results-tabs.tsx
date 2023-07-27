'use client';

import { Maybe } from '@/common/common-types';
import { MediaType } from '@/medias/media-enums';
import { Tab, Tabs, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

type SearchResultsTabsProps = {
  value: Maybe<MediaType>;
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

  if (!isMoviesTabVisible && !isPeopleTabVisible) {
    return <Typography>Nothing has been found</Typography>;
  }

  return (
    <Tabs
      value={value}
      onChange={(event, newMediaType) => {
        const newSearchParams = new URLSearchParams();

        newSearchParams.set('mediaType', newMediaType);

        router.replace(`${pathname}?${newSearchParams.toString()}`);
      }}
    >
      {isMoviesTabVisible && <Tab value={MediaType.MOVIE} label={'Movies'} />}
      {isPeopleTabVisible && <Tab value={MediaType.PERSON} label={'People'} />}
    </Tabs>
  );
}
