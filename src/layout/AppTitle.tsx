import { Link, Box } from '@mui/material';
import AppDrawerToggleButton from '@/layout/AppDrawerToggleButton';
import NextLink from '@/routing/NextLink';
import { APP_TITLE } from '@/common/CommonConstants';

function AppTitle() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box sx={{ display: { xs: 'block' } }}>
        <AppDrawerToggleButton />
      </Box>
      <Link
        color="inherit"
        href="/"
        component={NextLink}
        underline="none"
        sx={{
          typography: 'h6',
        }}
      >
        {APP_TITLE}
      </Link>
    </Box>
  );
}

export default AppTitle;
