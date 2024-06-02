'use client';

import { AppTitle } from '@/core/layouts/app-title';
import { NextLink } from '@/core/routing/components/next-link';
import { useIsMobile } from '@/core/ui/ui.hooks';
import { SearchAutocomplete } from '@/features/search/components/search-autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { Suspense, useState } from 'react';

type AppHeaderOffsetProps = {
  children: React.ReactNode;
};

export function AppHeaderOffset({ children }: AppHeaderOffsetProps) {
  return (
    <div>
      <Toolbar />
      <Box sx={{ paddingTop: { md: 2 } }}>{children}</Box>
    </div>
  );
}

export function AppHeader() {
  const isMobile = useIsMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }

  if (!isMobile && isMobileSearch) {
    hideMobileSearch();
  }

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
  });

  return (
    <AppBar
      color="transparent"
      sx={{
        transition: 'background-color 300ms ease-in-out',
        bgcolor: scrollTrigger ? 'background.default' : undefined,
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        {!isMobileSearch && <AppTitle />}

        <Box sx={{ display: { xs: 'flex', md: 'none', flex: 1 } }}>
          {isMobileSearch && (
            <>
              <IconButton
                aria-label="Hide search"
                sx={{ marginRight: 2 }}
                onClick={hideMobileSearch}
              >
                <CloseIcon />
              </IconButton>
              <SearchAutocomplete autoFocus />
            </>
          )}
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            marginX: 2,
            justifyContent: 'center',
          }}
        >
          {/* Since we use `useSearchParams` in `<SearchAutocomplete>`, we wrap it with `<Suspense>` */}
          <Suspense>
            <SearchAutocomplete sx={{ maxWidth: 'sm' }} />
          </Suspense>
        </Box>

        {!isMobileSearch && (
          <Stack spacing={1} direction="row">
            <IconButton
              aria-label="Show search"
              onClick={showMobileSearch}
              sx={{ display: { md: 'none' } }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-label="Toggle theme"
              href="https://github.com/onderonur/next-movie-explorer"
              LinkComponent={NextLink}
            >
              <GitHubIcon />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
