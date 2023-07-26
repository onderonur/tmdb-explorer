import { APP_TITLE } from '@/common/CommonConstants';
import { Maybe } from '@/common/CommonTypes';
import { Metadata } from 'next';

const APP_DESCRIPTION = `${APP_TITLE} is a client application for TMDb API. It's created with Next.js.`;

export function getMetadata({
  title,
  description,
  pathname,
}: {
  title: string;
  description: Maybe<string>;
  pathname: string;
}): Metadata {
  const metaTitle = `${title} | ${APP_TITLE}`;
  const metaDescription = description ?? APP_DESCRIPTION;
  // const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
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
