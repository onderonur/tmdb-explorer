import React, { useState, useCallback, useMemo } from 'react';
import AutoSearch from '@/components/AutoSearch';
import PersonListItem from './PersonListItem';
import MovieListItem from './MovieListItem';
import useFetch from '@/hooks/useFetch';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/router';
import {
  Suggestion,
  Movie,
  Person,
  InfiniteFetchResponse,
  SuggestionType,
  Maybe,
} from '@/types';
import { isMovie } from '@/utils';

function extractSuggestionKey(suggestion: Suggestion) {
  return `${suggestion.suggestionType}_${suggestion.id}`;
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
  const [searchValue, setSearchValue] = useState('');
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

  const router = useRouter();

  const handleRedirect = useCallback(
    (inputValue: string) => {
      if (inputValue) {
        router.push({
          pathname: '/search',
          query: { searchType: 'movie', query: inputValue },
        });
      }
    },
    [router],
  );

  const handleSelectSuggestion = useCallback(
    (selectedSuggestion: Maybe<Suggestion>) => {
      if (selectedSuggestion) {
        switch (selectedSuggestion.suggestionType) {
          case 'movie':
            router.push(`/movie/${selectedSuggestion.id}`);
            break;
          case 'person':
            router.push(`/person/${selectedSuggestion.id}`);
            break;
          default:
            return;
        }
      }
    },
    [router],
  );

  let suggestions = useMemo<Suggestion[]>(
    () =>
      [
        ...(movies?.results.map((movie) => ({
          ...movie,
          suggestionType: 'movie' as SuggestionType,
        })) || []),
        ...(people?.results.map((person) => ({
          ...person,
          suggestionType: 'person' as SuggestionType,
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
