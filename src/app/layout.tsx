import AppProviders from '@/common/app-providers';
import AppLayout from '@/layout/app-layout';
import { getMetadata } from '@/seo/seo-utils';
import { Metadata } from 'next';
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

export function generateMetadata(): Metadata {
  return getMetadata({
    title: 'Home',
    description: null,
    pathname: '/',
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
