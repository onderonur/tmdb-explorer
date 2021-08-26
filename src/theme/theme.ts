import { createTheme, responsiveFontSizes } from '@material-ui/core';

let theme = createTheme({ palette: { type: 'dark' } });

theme = responsiveFontSizes(theme);

export default theme;
