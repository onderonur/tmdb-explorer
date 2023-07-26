'use client';

// TODO: Refactor this

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Stack,
  useScrollTrigger,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AppTitle from './app-title';
import { usePaletteMode } from '@/theme/BaseThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExternalLink from '@/routing/external-link';
import { useIsMobile } from '@/common/CommonHooks';
import SearchAutocomplete from '@/search/search-autocomplete';

export default function AppHeader() {
  const isMobile = useIsMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  if (!isMobile && isMobileSearch) {
    setIsMobileSearch(false);
  }

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }

  const { mode, toggleMode } = usePaletteMode();

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
          <SearchAutocomplete sx={{ maxWidth: 'sm' }} />
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
            <IconButton aria-label="Toggle theme" onClick={toggleMode}>
              {mode === 'light' ? (
                <DarkModeIcon />
              ) : (
                <Brightness5OutlinedIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="Toggle theme"
              href="https://github.com/onderonur/tmdb-explorer"
              LinkComponent={ExternalLink}
            >
              <GitHubIcon />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
