import { GlobalStyles, useTheme } from '@mui/material';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function PageProgressBar() {
  const theme = useTheme();
  const color = theme.palette.secondary.main;

  return (
    <GlobalStyles
      styles={(theme) => ({
        '#nprogress': {
          '&& .bar': {
            backgroundColor: color,
            zIndex: theme.zIndex.tooltip + 1,
          },
          '&& .peg': {
            boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
          },
          '.spinner-icon': {
            display: 'none',
          },
        },
      })}
    />
  );
}

export default PageProgressBar;
