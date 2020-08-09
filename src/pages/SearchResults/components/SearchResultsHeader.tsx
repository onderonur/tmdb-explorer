import React from 'react';
import { Typography, Box } from '@material-ui/core';

interface SearchResultsHeader {
  query: string;
  totalResults: number;
}

function SearchResultsHeader({ query, totalResults }: SearchResultsHeader) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Typography variant="h6">Search Results For: {query}</Typography>
      <Typography color="textSecondary">
        Total {totalResults} Results
      </Typography>
    </Box>
  );
}

export default SearchResultsHeader;
