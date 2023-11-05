'use client';

import { Box, MenuItem, TextField } from '@mui/material';
import type { Maybe } from '@/common/common-types';
import { useRouter, useSearchParams } from 'next/navigation';

const MOVIE_SORTING = {
  popularity: {
    id: 'popularity.desc',
    title: 'Most Popular',
  },
  voteCount: {
    id: 'vote_count.desc',
    title: 'Most Voted',
  },
  voteAverage: {
    id: 'vote_average.desc',
    title: 'Top Rated',
  },
  newToOld: {
    id: 'release_date.desc',
    title: 'New to Old',
  },
  releaseDate: {
    id: 'release_date.asc',
    title: 'Old to New',
  },
};

const sortings = Object.values(MOVIE_SORTING);

function getSelectedSorting(sortBy: Maybe<string | string[]>) {
  const defaultSorting = MOVIE_SORTING.popularity;

  if (typeof sortBy !== 'string') {
    return defaultSorting;
  }

  const selectedSorting =
    sortings.find((sorting) => sorting.id === sortBy) ?? defaultSorting;

  return selectedSorting;
}

export default function MovieSortingSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSorting = getSelectedSorting(searchParams.get('sortBy'));

  return (
    <Box sx={{ minWidth: 220 }}>
      <TextField
        label="Sort by"
        select
        fullWidth
        size="small"
        value={selectedSorting.id}
        onChange={(e) => {
          // https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams
          const newSearchParams = new URLSearchParams(searchParams);

          newSearchParams.set('sortBy', e.target.value);

          router.push(`/movies/discover?${newSearchParams.toString()}`);
        }}
      >
        {sortings.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          );
        })}
      </TextField>
    </Box>
  );
}
