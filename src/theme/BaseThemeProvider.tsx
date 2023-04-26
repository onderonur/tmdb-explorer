import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createAppTheme } from '@/theme/createAppTheme';
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import nookies, { setCookie } from 'nookies';
import { NextPageContext } from 'next';

export function getInitialPaletteMode(ctx: NextPageContext) {
  const { paletteMode } = nookies.get(ctx);

  if (['light', 'dark'].includes(paletteMode)) {
    return paletteMode;
  }

  return 'dark';
}

interface PaletteModeContextValue {
  mode: PaletteMode;
  toggleMode: VoidFunction;
}

const PaletteModeContext = createContext<PaletteModeContextValue>(
  {} as PaletteModeContextValue,
);

export function usePaletteMode() {
  return useContext(PaletteModeContext);
}

type BaseThemeProviderProps = React.PropsWithChildren<{
  initialPaletteMode: PaletteMode;
}>;

function BaseThemeProvider({
  initialPaletteMode,
  children,
}: BaseThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(initialPaletteMode);

  useEffect(() => {
    setCookie(null, 'paletteMode', mode, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });
  }, [mode]);

  const paletteModeContextValue = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const currentTheme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <PaletteModeContext.Provider value={paletteModeContextValue}>
      <ThemeProvider theme={currentTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline enableColorScheme />
        <Head>
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={currentTheme.palette.background.default}
          />
        </Head>
        {children}
      </ThemeProvider>
    </PaletteModeContext.Provider>
  );
}

export default BaseThemeProvider;
