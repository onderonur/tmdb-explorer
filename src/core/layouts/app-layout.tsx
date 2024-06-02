import { AppDrawer, AppDrawerProvider } from '@/core/layouts/app-drawer';
import { APP_DRAWER_WIDTH } from '@/core/layouts/app-drawer.utils';
import { AppHeader } from '@/core/layouts/app-header';
import type { Genre } from '@/features/movies/movies.types';
import { Box, Container } from '@mui/material';
import { Suspense } from 'react';

type AppLayoutProps = {
  genres: Genre[];
  children: React.ReactNode;
};

export function AppLayout({ genres, children }: AppLayoutProps) {
  return (
    <AppDrawerProvider>
      <AppHeader />
      <Box sx={{ display: 'flex' }}>
        {/* Since we use `useSearchParams` in `<AppDrawer>`, we wrap it with `<Suspense>` */}
        <Suspense>
          <AppDrawer genres={genres} />
        </Suspense>
        <Box
          sx={{
            flex: 1,
            padding: { xs: 0, md: 0 },
            marginBottom: 6,
            marginLeft: { lg: APP_DRAWER_WIDTH },
          }}
        >
          <Container maxWidth="xl" sx={{ padding: { xs: 0, md: 0 } }}>
            {children}
          </Container>
        </Box>
      </Box>
    </AppDrawerProvider>
  );
}
