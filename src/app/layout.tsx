import AppProviders from '@/layout/app-providers';
import AppLayout from '@/layout/app-layout';
import { getMetadata } from '@/seo/seo-utils';
import { Metadata } from 'next';

// TODO: Gereksiz package'ları sil.

// TODO: Şu hatayı verio: metadata.metadataBase is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase

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
    <html lang="en">
      <body>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
