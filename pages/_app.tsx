import React, { useEffect } from 'react';
import Head from 'next/head';
import ConfigurationProvider, {
  fetchApiConfiguration,
} from '@/api-configuration/ApiConfigurationContext';
import App, { AppProps, AppContext } from 'next/app';
import AppLayout from '@/layout/AppLayout';
import { SWRConfig } from 'swr';
import { api } from '@/common/CommonUtils';
import { APIConfiguration } from '@/api-configuration/ApiConfigurationTypes';
import BaseDefaultSeo from '@/seo/BaseDefaultSeo';
import { APP_TITLE } from '@/common/CommonConstants';
import BaseThemeProvider from '@/theme/BaseThemeProvider';
import PageProgressBar from '@/common/PageProgressBar';

type SWRConfigProps = React.ComponentProps<typeof SWRConfig>;
const swrConfig: SWRConfigProps['value'] = {
  fetcher: api.get,
};

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
        <title>{APP_TITLE}</title>
      </Head>
      <BaseDefaultSeo />
      <SWRConfig value={swrConfig}>
        <BaseThemeProvider>
          <PageProgressBar />
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
