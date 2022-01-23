import React from 'react';
import { Typography, Box } from '@mui/material';
import useIsMobile from '@/common/useIsMobile';

interface SearchResultsHeaderProps {
  query: string;
  totalResults: number;
}

function SearchResultsHeader({
  query,
  totalResults,
}: SearchResultsHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      alignItems={isMobile ? 'flex-start' : 'center'}
      justifyContent={isMobile ? 'flex-start' : 'space-between'}
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
