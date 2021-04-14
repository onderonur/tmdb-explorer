import React, { useState, useCallback, useMemo, useEffect } from 'react';
import AutoSearch from './AutoSearch';
import useFetch from '@/modules/shared/useFetch';
import useDebounce from '@/modules/shared/useDebounce';
import { useRouter } from 'next/router';
import {
  Movie,
  Person,
  InfiniteFetchResponse,
  Maybe,
} from '@/modules/shared/SharedTypes';
import { isMovie } from '@/modules/shared/SharedUtils';
import { Suggestion } from './SearcherTypes';
import MovieListItem from '../movies-listing/MovieListItem';
import PersonListItem from '../people-listing/PersonListItem';
import { SearchType } from './SearcherEnums';

function extractSuggestionKey(suggestion: Suggestion) {
  return `${suggestion.searchType}_${suggestion.id}`;
}

function renderSuggestion(suggestion: Suggestion) {
  return isMovie(suggestion) ? (
    <MovieListItem movie={suggestion} />
  ) : (
    <PersonListItem person={suggestion} />
  );
}

interface MovieAndPersonAutoSearchProps {
  className?: string;
  autoFocus?: boolean;
}

function MovieAndPersonAutoSearch({
  className,
  autoFocus,
}: MovieAndPersonAutoSearchProps) {
  const router = useRouter();
  const { query } = router.query;
  const queryValue = typeof query === 'string' ? query : '';
  const [searchValue, setSearchValue] = useState<string>(queryValue);

  useEffect(() => {
    setSearchValue(queryValue);
  }, [queryValue]);

  const debouncedSearchValue = useDebounce(searchValue);

  const { data: movies, loading: isLoadingMovies } = useFetch<
    InfiniteFetchResponse<Movie>
  >(debouncedSearchValue ? '/search/movie' : undefined, {
    query: debouncedSearchValue,
  });
  const { data: people, loading: isLoadingPeople } = useFetch<
    InfiniteFetchResponse<Person>
  >(debouncedSearchValue ? '/search/person' : undefined, {
    query: debouncedSearchValue,
  });

  const isLoading = Boolean(
    debouncedSearchValue && (isLoadingMovies || isLoadingPeople),
  );

  const handleInputValueChange = useCallback((inputValue: string) => {
    setSearchValue(inputValue);
  }, []);

  const handleRedirect = useCallback(
    (inputValue: string) => {
      if (inputValue) {
        router.push({
          pathname: '/search',
          query: { searchType: SearchType.MOVIES, query: inputValue },
        });
      }
    },
    [router],
  );

  const handleSelectSuggestion = useCallback(
    (selectedSuggestion: Maybe<Suggestion>) => {
      if (selectedSuggestion) {
        switch (selectedSuggestion.searchType) {
          case SearchType.MOVIES:
            router.push(`/movie/${selectedSuggestion.id}`);
            break;
          case SearchType.PEOPLE:
            router.push(`/person/${selectedSuggestion.id}`);
            break;
          default:
            return;
        }
      }
    },
    [router],
  );

  const suggestions = useMemo<Suggestion[]>(
    () =>
      [
        ...(movies?.results.map((movie) => ({
          ...movie,
          searchType: SearchType.MOVIES,
        })) || []),
        ...(people?.results.map((person) => ({
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
    <AutoSearch
      className={className}
      extractSuggestionKey={extractSuggestionKey}
      placeholder="Search Movies & People"
      suggestions={suggestions}
      renderSuggestion={renderSuggestion}
      loading={isLoading}
      inputValue={searchValue}
      onInputValueChange={handleInputValueChange}
      onPressEnterOrClickSearch={handleRedirect}
      onItemSelect={handleSelectSuggestion}
      autoFocus={autoFocus}
    />
  );
}

export default MovieAndPersonAutoSearch;
