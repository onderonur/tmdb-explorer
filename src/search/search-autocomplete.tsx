'use client';

import { useState } from 'react';
import BaseAutocomplete from '@/common/BaseAutocomplete';
import { useRouter } from 'next/navigation';
import { Maybe, PaginationResponse } from '@/common/CommonTypes';
import MovieAutocompleteItem from './movie-autocomplete-item';
import PersonAutocompleteItem from './person-autocomplete-item';
import { isMovie } from '@/movies/movie-utils';
import { MediaType } from '@/medias/media-enums';
import { isPerson } from '@/people/people-utils';
import { SxProps, Theme } from '@mui/material';
import { useDebounce, useHasChanged } from '@/common/CommonHooks';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { MultiSearchResult } from './search-types';

type SearchAutocompleteProps = {
  autoFocus?: boolean;
  sx?: SxProps<Theme>;
};

function SearchAutocomplete({ autoFocus, sx }: SearchAutocompleteProps) {
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
      if (!debouncedSearchValue) {
        return null;
      }

      const apiSearchParams = new URLSearchParams();
      apiSearchParams.set('page', '1');
      apiSearchParams.set('query', debouncedSearchValue);

      return `/search/multi/api?${apiSearchParams.toString()}`;
    },
  );

  const handleRedirect = (inputValue: string) => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      router.push(`/search/${trimmedValue}`);
    }
  };

  const handleSelect = (selectedOption: Maybe<MultiSearchResult>) => {
    if (selectedOption) {
      switch (selectedOption.media_type) {
        case MediaType.MOVIE:
          router.push(`/movies/${selectedOption.id}`);
          break;
        case MediaType.PERSON:
          router.push(`/people/${selectedOption.id}`);
          break;
        default:
          return;
      }
    }
  };

  const options =
    data?.results.filter((option) => isMovie(option) || isPerson(option)) ?? [];

  return (
    <BaseAutocomplete<MultiSearchResult, false, true, true>
      sx={sx}
      placeholder="Search Movies & People"
      options={options}
      renderOption={(props, option) => {
        return isMovie(option) ? (
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
        return isMovie(option) ? option.title : option.name;
      }}
      loading={isValidating}
      inputValue={searchValue ?? ''}
      onInputChange={(e, newInputValue) => setSearchValue(newInputValue)}
      freeSolo
      autoFocus={autoFocus}
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

export default SearchAutocomplete;
