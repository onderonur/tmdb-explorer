import React, { useEffect } from 'react';
import Head from 'next/head';
import ConfigurationProvider, {
  fetchApiConfiguration,
} from '@/modules/api-configuration/ApiConfigurationContext';
import App, { AppProps, AppContext } from 'next/app';
import AppLayout from '@/modules/layout/AppLayout';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { SWRConfig, ConfigInterface } from 'swr';
import { api } from '@/modules/shared/SharedUtils';
import { APIConfiguration } from '@/modules/api-configuration/ApiConfigurationTypes';
import BaseDefaultSeo from '@/modules/seo/BaseDefaultSeo';
import { appTitle } from '@/modules/shared/SharedConstants';
import BaseThemeProvider from '@/modules/theme/BaseThemeProvider';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const swrConfig: ConfigInterface = { fetcher: api.get };

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

  return (
    <>
      <Head>
        <title>{appTitle}</title>
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <BaseDefaultSeo />
      <SWRConfig value={swrConfig}>
        <BaseThemeProvider>
          <ConfigurationProvider configuration={configuration}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ConfigurationProvider>
        </BaseThemeProvider>
      </SWRConfig>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const [appProps, configuration] = await Promise.all([
    App.getInitialProps(appContext),
    fetchApiConfiguration(),
  ]);

  return { ...appProps, configuration };
};

export default MyApp;
