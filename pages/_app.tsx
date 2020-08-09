import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@/theme';
import ConfigurationProvider, {
  fetchConfiguration,
} from '@/contexts/ConfigurationContext';
import App, { AppProps, AppContext } from 'next/app';
import AppLayout from '@/components/AppLayout';
import NProgress from 'nprogress';
import { Router, useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import { api } from '@/utils';
import { appTitle } from '@/constants';
import { DefaultSeo } from 'next-seo';
import { APIConfiguration } from '@/types';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getDefaultSeoConfig = (pathname: string) => {
  const url = `${baseUrl}${pathname}`;
  const description = `${appTitle} is a client application for TMDb API. It's created with Next.js.`;
  return {
    titleTemplate: `%s | ${appTitle}`,
    description,
    canonical: url,
    openGraph: {
      title: appTitle,
      description,
      type: 'website',
      locale: 'en_IE',
      url,
      site_name: appTitle,
      images: [
        // TODO
      ],
    },
    additionalMetaTags: [
      {
        property: 'dc:creator',
        content: 'Onur ÖNDER',
      },
      {
        name: 'application-name',
        content: appTitle,
      },
    ],
  };
};

const swrConfig = { fetcher: api.get };

type MyAppProps = AppProps & {
  configuration: APIConfiguration;
};

function MyApp({ Component, pageProps, configuration }: MyAppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>TMDb Explorer</title>
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <DefaultSeo {...getDefaultSeoConfig(router.asPath)} />
      <SWRConfig value={swrConfig}>
        <ThemeProvider theme={theme}>
          <ConfigurationProvider configuration={configuration}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ConfigurationProvider>
        </ThemeProvider>
      </SWRConfig>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const [appProps, configuration] = await Promise.all([
    App.getInitialProps(appContext),
    fetchConfiguration(),
  ]);

  return { ...appProps, configuration };
};

export default MyApp;
