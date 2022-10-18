import { Box, Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
  extra?: React.ReactNode;
}

function PageTitle({ title, extra }: PageTitleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        mb: 2,
      }}
    >
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      {extra && <div>{extra}</div>}
    </Box>
  );
}

export default PageTitle;
