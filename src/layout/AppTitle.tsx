import { Typography, Link, Box } from '@mui/material';
import AppDrawerToggleButton from '@/layout/AppDrawerToggleButton';
import NextLink from '@/routing/NextLink';
import { APP_TITLE } from '@/common/CommonConstants';

function AppTitle() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <AppDrawerToggleButton />
      </Box>
      <Link color="inherit" href="/" component={NextLink} underline="none">
        <Typography variant="h6">{APP_TITLE}</Typography>
      </Link>
    </Box>
  );
}

export default AppTitle;
