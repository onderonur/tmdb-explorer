import { APP_TITLE } from '@/common/CommonConstants';
import { Maybe } from '@/common/CommonTypes';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import { Metadata } from 'next';

const APP_DESCRIPTION = `${APP_TITLE} is a client application for TMDb API. It's created with Next.js.`;

export async function getMetadata({
  title,
  description,
  pathname,
}: {
  title: string;
  description: Maybe<string>;
  pathname: string;
}): Promise<Metadata> {
  // TODO: Refactor edilebilir belki bu
  const apiConfiguration = await getTmdbConfiguration();

  const metaTitle = `${title} | ${APP_TITLE}`;
  const metaDescription = description ?? APP_DESCRIPTION;
  // const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(apiConfiguration.images.secure_base_url),
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      // TODO: Bu doğru mu bi bak
      locale: 'en_IE',
      url: pathname,
      siteName: APP_TITLE,
    },
    twitter: {
      title: metaTitle,
      description: metaDescription,
      card: 'summary_large_image',
    },
  };
}
