import React, { useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import AppLayout from '@/layout/AppLayout';
import BaseDefaultSeo from '@/seo/BaseDefaultSeo';
import { APP_TITLE } from '@/common/CommonConstants';
import BaseThemeProvider from '@/theme/BaseThemeProvider';
import PageProgressBar from '@/common/PageProgressBar';
import ErrorMessage from '@/error-handling/ErrorMessage';
import { ServerSideProps } from '@/error-handling/ErrorHandlingTypes';
import createEmotionCache from '@/theme/createEmotionCache';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Hydrate, QueryClientProvider } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
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
          </Head>
          <BaseDefaultSeo />
          <BaseThemeProvider>
            <PageProgressBar />
            <AppLayout>{content}</AppLayout>
          </BaseThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
