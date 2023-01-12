import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';

export function createAppTheme(mode: PaletteMode) {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: { main: 'hsl(231 80% 68%)' },
        secondary: { main: 'hsl(339 80% 62%)' },
        ...(mode === 'dark'
          ? {
              background: {
                default: 'hsl(210 34% 12%)',
                paper: 'hsl(210 30% 12%)',
              },
            }
          : {}),
      },
    }),
  );
}
