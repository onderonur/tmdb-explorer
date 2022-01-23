import React from 'react';
import theme from '@/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

type BaseThemeProviderProps = React.PropsWithChildren<unknown>;

function BaseThemeProvider({ children }: BaseThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default BaseThemeProvider;
