import React from 'react';
import { Typography, Link, Box, styled } from '@mui/material';
import AppDrawerToggleButton from '@/layout/AppDrawerToggleButton';
import NextLink from '@/routing/NextLink';
import { APP_TITLE } from '@/common/CommonConstants';
import useIsMobile from '@/common/useIsMobile';

const TitleLink = styled(Link)({
  '&:hover': {
    textDecoration: 'none',
  },
}) as typeof Link;

function AppTitle() {
  const isMobile = useIsMobile();

  return (
    <Box display="flex" gap={1} alignItems="center">
      {isMobile && <AppDrawerToggleButton />}
      <TitleLink color="inherit" href="/" component={NextLink} underline="none">
        <Typography variant="h6">{APP_TITLE}</Typography>
      </TitleLink>
    </Box>
  );
}

export default AppTitle;
