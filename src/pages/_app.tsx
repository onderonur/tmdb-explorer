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
import createEmotionCache from '@/theme/createEmotionCache';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import {
  DehydratedState,
  Hydrate,
  QueryClientProvider,
} from '@tanstack/react-query';
import { createQueryClient } from '@/http-client/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PaletteMode } from '@mui/material';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type PageProps = { dehydratedState: DehydratedState };

type MyAppProps = AppProps<PageProps> & {
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
          </Head>
          <BaseDefaultSeo />
          <BaseThemeProvider initialPaletteMode={initialPaletteMode}>
            <PageProgressBar />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
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
