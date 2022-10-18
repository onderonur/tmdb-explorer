import { Typography, Box } from '@mui/material';

interface SearchResultsHeaderProps {
  searchQuery: string;
}

function SearchResultsHeader({ searchQuery }: SearchResultsHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { md: 'row', xs: 'column' },
        alignItems: { md: 'center', xs: 'flex-start' },
        justifyContent: { md: 'space-between', xs: 'flex-start' },
        flexWrap: 'wrap',
      }}
    >
      <Typography variant="h6">Search Results For: {searchQuery}</Typography>
    </Box>
  );
}

export default SearchResultsHeader;
