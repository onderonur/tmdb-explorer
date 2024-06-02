import { createTheme, responsiveFontSizes } from '@mui/material';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#030303',
        paper: '#0f0f0f',
      },
    },
  }),
);
