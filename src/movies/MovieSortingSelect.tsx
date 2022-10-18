import { Box, MenuItem, TextField } from '@mui/material';
import { Maybe } from '@/common/CommonTypes';

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
    <Box sx={{ minWidth: 220 }}>
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
