import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
