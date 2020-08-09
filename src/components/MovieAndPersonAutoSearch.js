import React, { useState } from 'react';
import AutoSearch from '@/components/AutoSearch';
import PersonListItem from './PersonListItem';
import MovieListItem from './MovieListItem';
import useFetch from '@/hooks/useFetch';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/router';

function MovieAndPersonAutoSearch({ className, autoFocus }) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  const { data: movies, loading: isLoadingMovies } = useFetch(
    debouncedSearchValue ? '/search/movie' : undefined,
    {
      query: debouncedSearchValue,
    },
  );
  const { data: people, loading: isLoadingPeople } = useFetch(
    debouncedSearchValue ? '/search/person' : undefined,
    {
      query: debouncedSearchValue,
    },
  );

  const isLoading =
    debouncedSearchValue && (isLoadingMovies || isLoadingPeople);

  function handleInputValueChange(inputValue) {
    setSearchValue(inputValue);
  }

  const router = useRouter();

  function handleRedirect(inputValue) {
    if (inputValue) {
      router.push({
        pathname: '/search',
        query: { searchType: 'movie', query: inputValue },
      });
    }
  }

  function handleSelectSuggestion(selectedSuggestion) {
    if (selectedSuggestion) {
      switch (selectedSuggestion.suggestionType) {
        case 'movie':
          router.push('/movie/[movieId]', `/movie/${selectedSuggestion.id}`);
          break;
        case 'person':
          router.push('/person/[personId]', `/person/${selectedSuggestion.id}`);
          break;
        default:
          return;
      }
    }
  }

  let suggestions = [
    ...(movies?.results.map((movie) => ({
      ...movie,
      suggestionType: 'movie',
    })) || []),
    ...(people?.results.map((person) => ({
      ...person,
      suggestionType: 'person',
    })) || []),
  ].sort((a, b) =>
    a[a.suggestionType === 'movie' ? 'title' : 'name'].localeCompare(
      b[b.suggestionType === 'movie' ? 'title' : 'name'],
    ),
  );

  return (
    <AutoSearch
      className={className}
      extractSuggestionKey={(suggestion) =>
        `${suggestion.suggestionType}_${suggestion.id}`
      }
      placeholder="Search Movies & People"
      suggestions={suggestions}
      renderSuggestion={(suggestion) => {
        return suggestion.suggestionType === 'movie' ? (
          <MovieListItem movie={suggestion} />
        ) : (
          <PersonListItem person={suggestion} />
        );
      }}
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
