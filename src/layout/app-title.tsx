import { Box } from '@mui/material';
import AppDrawerToggleButton from '@/layout/app-drawer-toggle-button';
import NextLink from '@/routing/next-link';
import { APP_TITLE } from '@/common/common-constants';

function AppTitle() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <AppDrawerToggleButton />
      </Box>
      <NextLink
        href="/"
        color="inherit"
        sx={{
          typography: 'h6',
          fontWeight: 'bold',
        }}
      >
        {APP_TITLE}
      </NextLink>
    </Box>
  );
}

export default AppTitle;
