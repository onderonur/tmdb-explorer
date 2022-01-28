import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: 'hsl(231, 80%, 47%)' },
    secondary: { main: 'hsl(339, 80%, 47%)' },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
