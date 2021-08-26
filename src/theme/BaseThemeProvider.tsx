import React from 'react';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@/theme/theme';

type BaseThemeProviderProps = React.PropsWithChildren<unknown>;

function BaseThemeProvider({ children }: BaseThemeProviderProps) {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StylesProvider>
  );
}

export default BaseThemeProvider;
