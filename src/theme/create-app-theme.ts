import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  // TODO: swap'a gerek var mı bi bak
  display: 'swap',
});

export function createAppTheme(mode: PaletteMode) {
  return responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: roboto.style.fontFamily,
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
