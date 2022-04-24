import { useState } from 'react';
import Head from 'next/head';
import App, { AppContext, AppProps } from 'next/app';
import AppLayout from '@/layout/AppLayout';
import BaseDefaultSeo from '@/seo/BaseDefaultSeo';
import { APP_TITLE } from '@/common/CommonConstants';
import BaseThemeProvider, {
  getInitialPaletteMode,
} from '@/theme/BaseThemeProvider';
import PageProgressBar from '@/common/PageProgressBar';
import ErrorMessage from '@/error-handling/ErrorMessage';
import { ServerSideProps } from '@/error-handling/ErrorHandlingTypes';
import createEmotionCache from '@/theme/createEmotionCache';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Hydrate, QueryClientProvider } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PaletteMode } from '@mui/material';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
  initialPaletteMode: PaletteMode;
};

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  initialPaletteMode,
}: MyAppProps) {
  const [queryClient] = useState(() => createQueryClient());

  let content = <Component {...pageProps} />;

  const { error } = pageProps as ServerSideProps;
  if (error) {
    content = (
      <ErrorMessage message={error.message} statusCode={error.statusCode} />
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>{APP_TITLE}</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            {process.env.GOOGLE_SITE_VERIFICATION && (
              <meta
                name="google-site-verification"
                content={process.env.GOOGLE_SITE_VERIFICATION}
              />
            )}
          </Head>
          <BaseDefaultSeo />
          <BaseThemeProvider initialPaletteMode={initialPaletteMode}>
            <PageProgressBar />
            <AppLayout>{content}</AppLayout>
          </BaseThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
    initialPaletteMode: getInitialPaletteMode(appContext.ctx),
  };
};

export default MyApp;
