import { createTheme, responsiveFontSizes } from '@mui/material';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  // TODO: swap'a gerek var mı bi bak veya ne işe yarıyor bak.
  display: 'swap',
});

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#141f29',
        paper: '#151f28',
      },
    },
  }),
);

export default theme;
