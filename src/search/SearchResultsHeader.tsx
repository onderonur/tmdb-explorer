import React from 'react';
import { Typography, Box } from '@mui/material';

interface SearchResultsHeaderProps {
  searchQuery: string;
  totalResults: number;
}

function SearchResultsHeader({
  searchQuery,
  totalResults,
}: SearchResultsHeaderProps) {
  return (
    <Box
      display="flex"
      flexDirection={{ md: 'row', xs: 'column' }}
      alignItems={{ md: 'center', xs: 'flex-start' }}
      justifyContent={{ md: 'space-between', xs: 'flex-start' }}
      flexWrap="wrap"
      mb={1}
    >
      <Typography variant="h6">Search Results For: {searchQuery}</Typography>
      <Typography color={(theme) => theme.palette.text.secondary}>
        Total {totalResults} Results
      </Typography>
    </Box>
  );
}

export default SearchResultsHeader;
