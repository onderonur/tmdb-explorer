import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@/modules/theme/theme';

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
