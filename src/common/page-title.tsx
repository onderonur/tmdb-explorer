import { Box, Typography } from '@mui/material';

type PageTitleProps = {
  title: string;
  extra?: React.ReactNode;
};

export default function PageTitle({ title, extra }: PageTitleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        marginBottom: 2,
      }}
    >
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      {extra && <div>{extra}</div>}
    </Box>
  );
}
