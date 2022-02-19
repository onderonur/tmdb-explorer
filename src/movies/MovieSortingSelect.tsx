import React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { Maybe } from '@/common/CommonTypes';

const MOVIE_SORTING = {
  popularity: {
    id: 'popularity.desc',
    title: 'Popularity',
  },
  voteCount: {
    id: 'vote_count.desc',
    title: 'Vote Count',
  },
  voteAverage: {
    id: 'vote_average.desc',
    title: 'Vote Average',
  },
  releaseDate: {
    id: 'release_date.desc',
    title: 'Release Date',
  },
};

const sortings = Object.values(MOVIE_SORTING);

export function getSelectedSorting(sortBy: Maybe<string | string[]>) {
  const defaultSorting = MOVIE_SORTING.popularity;

  if (typeof sortBy !== 'string') {
    return defaultSorting;
  }

  const selectedSorting =
    sortings.find((sorting) => sorting.id === sortBy) ?? defaultSorting;

  return selectedSorting;
}

interface MovieSortingSelectProps {
  value: string;
  onChange: (value: string) => void;
}

function MovieSortingSelect({ value, onChange }: MovieSortingSelectProps) {
  return (
    <Box minWidth={220}>
      <TextField
        label="Sort by"
        select
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

export default MovieSortingSelect;
