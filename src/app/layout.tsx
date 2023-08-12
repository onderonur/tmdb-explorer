import AppProviders from '@/layout/app-providers';
import AppLayout from '@/layout/app-layout';
import { getMetadata } from '@/seo/seo-utils';

// TODO: Gereksiz package'ları sil.

export const metadata = getMetadata({});

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
