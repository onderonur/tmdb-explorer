import React, { useState, useMemo, useEffect } from 'react';
import BaseAutocomplete from '../common/BaseAutocomplete';
import useDebounce from '@/common/useDebounce';
import { useRouter } from 'next/router';
import { Maybe } from '@/common/CommonTypes';
import { getAllPageResults, isMovie } from '@/common/CommonUtils';
import { Suggestion } from './SearchTypes';
import MovieListItem from '../movies-listing/MovieListItem';
import PersonListItem from '../people-listing/PersonListItem';
import { SearchType } from './SearchEnums';
import { useInfiniteQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';

interface MovieAndPersonAutocompleteProps {
  className?: string;
  autoFocus?: boolean;
}

function MovieAndPersonAutocomplete({
  className,
  autoFocus,
}: MovieAndPersonAutocompleteProps) {
  const router = useRouter();
  const { query } = router.query;
  const queryValue = typeof query === 'string' ? query : '';
  const [searchValue, setSearchValue] = useState<string>(queryValue);

  useEffect(() => {
    setSearchValue(queryValue);
  }, [queryValue]);

  const debouncedSearchValue = useDebounce(searchValue);

  const isSearchEnabled = !!debouncedSearchValue;
  const { data: movies, isFetching: isFetchingMovies } = useInfiniteQuery({
    ...apiQueries.search.searchMovies(debouncedSearchValue),
    enabled: isSearchEnabled,
  });

  const { data: people, isFetching: isFetchingPeople } = useInfiniteQuery({
    ...apiQueries.search.searchPeople(debouncedSearchValue),
    enabled: isSearchEnabled,
  });

  const isFetching = Boolean(
    debouncedSearchValue && (isFetchingMovies || isFetchingPeople),
  );

  const handleRedirect = (inputValue: string) => {
    if (inputValue) {
      router.push({
        pathname: '/search',
        query: { searchType: SearchType.MOVIES, query: inputValue },
      });
    }
  };

  const handleSelect = (seleectedOption: Maybe<Suggestion>) => {
    if (seleectedOption) {
      switch (seleectedOption.searchType) {
        case SearchType.MOVIES:
          router.push(`/movie/${seleectedOption.id}`);
          break;
        case SearchType.PEOPLE:
          router.push(`/person/${seleectedOption.id}`);
          break;
        default:
          return;
      }
    }
  };

  const options = useMemo<Suggestion[]>(
    () =>
      [
        ...(getAllPageResults(movies).map((movie) => ({
          ...movie,
          searchType: SearchType.MOVIES,
        })) || []),
        ...(getAllPageResults(people).map((person) => ({
          ...person,
          searchType: SearchType.PEOPLE,
        })) || []),
      ].sort((a, b) =>
        (isMovie(a) ? a.title : a.name).localeCompare(
          isMovie(b) ? b.title : b.name,
        ),
      ),
    [movies, people],
  );

  return (
    <BaseAutocomplete<Suggestion, false, true, true>
      className={className}
      placeholder="Search Movies & People"
      options={options}
      renderOption={(props, option) => {
        return isMovie(option) ? (
          <MovieListItem
            {...props}
            key={`${SearchType.MOVIES}_${option.id}`}
            movie={option}
          />
        ) : (
          <PersonListItem
            {...props}
            key={`${SearchType.PEOPLE}_${option.id}`}
            person={option}
          />
        );
      }}
      getOptionLabel={(option) =>
        typeof option === 'string'
          ? // For freeSolo
            option
          : isMovie(option)
          ? option.title
          : option.name
      }
      loading={isFetching}
      inputValue={searchValue}
      onInputChange={(e, newInputValue) => setSearchValue(newInputValue)}
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
      freeSolo
      autoFocus={autoFocus}
    />
  );
}

export default MovieAndPersonAutocomplete;
