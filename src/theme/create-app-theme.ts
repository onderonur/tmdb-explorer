import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';

export function createAppTheme(mode: PaletteMode) {
  return responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: 'var(--font-roboto)',
      },
      palette: {
        mode,
        // TODO: Fix theme
        // primary: { main: '#ff0000' },
        // secondary: { main: '#ec5187' },
        // ...(mode === 'dark'
        //   ? {
        //       background: {
        //         default: '#141f29',
        //         paper: '#151f28',
        //       },
        //     }
        //   : {}),
        background: {
          default: '#141f29',
          paper: '#151f28',
        },
      },
    }),
  );
}
