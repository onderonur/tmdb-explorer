import React from 'react';
import { Typography, Box } from '@material-ui/core';

interface SearchResultsHeaderProps {
  query: string;
  totalResults: number;
}

function SearchResultsHeader({
  query,
  totalResults,
}: SearchResultsHeaderProps) {
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
