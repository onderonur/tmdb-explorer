import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
