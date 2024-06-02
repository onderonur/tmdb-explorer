import type { Maybe, PaginationResponse } from '@/core/shared/shared.types';
import { BaseAutocomplete } from '@/core/ui/components/base-autocomplete';
import { useDebounce, useHasChanged } from '@/core/ui/ui.hooks';
import { MediaType } from '@/features/media/media.utils';
import { getMovieReleaseYear } from '@/features/movies/movies.utils';
import type {
  MovieSearchResult,
  MultiSearchResult,
  PersonSearchResult,
} from '@/features/search/search.types';
import { TmdbAvatar } from '@/features/tmdb/components/tmdb-avatar';
import type { ListItemProps, SxProps, Theme } from '@mui/material';
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

type AutocompleteItemProps<C extends React.ElementType = 'li'> = ListItemProps<
  C,
  {
    component?: C;
    avatarUrl: string;
    primaryText: string;
    secondaryText?: Maybe<string>;
  }
>;

function AutocompleteItem<C extends React.ElementType>({
  avatarUrl,
  primaryText,
  secondaryText,
  ...rest
}: AutocompleteItemProps<C>) {
  return (
    <ListItem disablePadding>
      <ListItemButton dense sx={{ alignItems: 'flex-start' }} {...rest}>
        <ListItemAvatar>
          <TmdbAvatar src={avatarUrl} alt={'Avatar'} />
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}

type MovieAutocompleteItemProps = {
  movie: MovieSearchResult;
};

function MovieAutocompleteItem({ movie, ...rest }: MovieAutocompleteItemProps) {
  return (
    <AutocompleteItem
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
      secondaryText={getMovieReleaseYear(movie)?.toString()}
      // Required for SearchAutocomplete
      {...rest}
    />
  );
}

type PersonAutocompleteItemProps = { person: PersonSearchResult };

function PersonAutocompleteItem({
  person,
  ...rest
}: PersonAutocompleteItemProps) {
  return (
    <AutocompleteItem
      avatarUrl={person.profile_path}
      primaryText={person.name}
      // Required for SearchAutocomplete
      {...rest}
    />
  );
}

type SearchAutocompleteProps = {
  autoFocus?: boolean;
  sx?: SxProps<Theme>;
};

export function SearchAutocomplete({ autoFocus, sx }: SearchAutocompleteProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const [searchValue, setSearchValue] = useState(searchQuery);
  if (useHasChanged(searchQuery)) {
    setSearchValue(searchQuery);
  }

  const debouncedSearchValue = useDebounce(searchValue);

  const { data, isValidating } = useSWR<PaginationResponse<MultiSearchResult>>(
    () => {
      if (!debouncedSearchValue) return null;

      const apiSearchParams = new URLSearchParams();
      apiSearchParams.set('page', '1');
      apiSearchParams.set('query', debouncedSearchValue);

      return `/api/search/multi?${apiSearchParams.toString()}`;
    },
  );

  const handleRedirect = (inputValue: string) => {
    const trimmedValue = inputValue.trim();

    const newSearchParams = new URLSearchParams({ query: trimmedValue });

    if (trimmedValue) {
      router.push(`/search?${newSearchParams.toString()}`);
    }
  };

  const handleSelect = (selectedOption: Maybe<MultiSearchResult>) => {
    if (selectedOption) {
      switch (selectedOption.media_type) {
        case MediaType.MOVIE: {
          router.push(`/movies/${selectedOption.id}`);
          break;
        }
        case MediaType.PERSON: {
          router.push(`/people/${selectedOption.id}`);
          break;
        }
        default:
      }
    }
  };

  const options =
    data?.results.filter((option) =>
      [MediaType.MOVIE, MediaType.PERSON].includes(option.media_type),
    ) ?? [];

  return (
    <BaseAutocomplete<MultiSearchResult, false, true, true>
      sx={sx}
      options={options}
      inputProps={{
        placeholder: 'Search Movies & People',
        autoFocus,
      }}
      renderOption={(props, option) => {
        return option.media_type === MediaType.MOVIE ? (
          <MovieAutocompleteItem
            {...props}
            key={`${option.media_type}_${option.id}`}
            movie={option}
          />
        ) : (
          <PersonAutocompleteItem
            {...props}
            key={`${option.media_type}_${option.id}`}
            person={option}
          />
        );
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          // For freeSolo
          return option;
        }
        return option.media_type === MediaType.MOVIE
          ? option.title
          : option.name;
      }}
      loading={isValidating}
      inputValue={searchValue ?? ''}
      onInputChange={(e, newInputValue) => {
        setSearchValue(newInputValue);
      }}
      freeSolo
      // To make repeatedly hitting Enter work, we set the value as empty string.
      // Otherwise, after user selects an option or hits enter, `onChange` does not get triggered
      // by hitting Enter again without changing the input text value.
      value=""
      onChange={(e, newValue) => {
        // Because we set freeSolo as true,
        // newValue can be a string too.
        if (typeof newValue === 'string') {
          handleRedirect(newValue);
        } else if (!Array.isArray(newValue)) {
          handleSelect(newValue);
        }
      }}
      onSearchClick={handleRedirect}
    />
  );
}
