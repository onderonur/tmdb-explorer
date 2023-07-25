import { APP_TITLE } from '@/common/CommonConstants';
import AppProviders from '@/common/app-providers';
import AppLayout from '@/layout/AppLayout';
import ThemeRegistry from '@/theme/theme-registry';
import { Roboto } from 'next/font/google';

// TODO: Gereksiz package'ları sil.

// TODO: Şu hatayı verio: metadata.metadataBase is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  // TODO: swap'a gerek var mı bi bak
  display: 'swap',
});

const title = APP_TITLE;
// TODO: Fix
const description = `${APP_TITLE} is a URL shortener which makes it easy to shorten and share your URLs.`;

// TODO: Fix these.
export const metadata = {
  title,
  description,
  themeColor: '#e2f0ec',
  //   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  creator: 'Onur Önder',
  applicationName: APP_TITLE,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    type: 'website',
    url: '/',
    description,
    siteName: APP_TITLE,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description,
    creator: '@onderonur_',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        {/* TODO: ThemeRegistry de AppProviders'a alınabilir. */}
        <ThemeRegistry options={{ key: 'mui' }}>
          <AppProviders>
            <AppLayout>{children}</AppLayout>
          </AppProviders>
        </ThemeRegistry>
      </body>
    </html>
  );
}
