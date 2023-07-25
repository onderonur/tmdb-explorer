import { Typography, Box } from '@mui/material';

type SearchResultsHeaderProps = {
  query: string;
};

function SearchResultsHeader({ query }: SearchResultsHeaderProps) {
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
      <Typography variant="h6">Search Results for: {query}</Typography>
    </Box>
  );
}

export default SearchResultsHeader;
