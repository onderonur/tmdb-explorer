import { AppLayout } from '@/layout/app-layout';
import { AppProviders } from '@/layout/app-providers';
import { getMetadata } from '@/seo/seo-utils';
import type { Viewport } from 'next';

// TODO: Gereksiz package'ları sil.

// TODO: Buna gerek var mı bi dene.
export const metadata = getMetadata({});

export const viewport: Viewport = {
  themeColor: '#141f29',
};

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
