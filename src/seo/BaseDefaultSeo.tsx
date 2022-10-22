import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
import { APP_TITLE } from '@/common/CommonConstants';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const url = `${baseUrl}${pathname}`;
  const description = `${APP_TITLE} is a client application for TMDb API. It's created with Next.js.`;
  return {
    titleTemplate: `%s | ${APP_TITLE}`,
    description,
    canonical: url,
    openGraph: {
      title: APP_TITLE,
      description,
      type: 'website',
      locale: 'en_IE',
      url,
      site_name: APP_TITLE,
      images: [
        { url: `${baseUrl}/tmdb-explorer.jpg`, width: 640, height: 422 },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        property: 'dc:creator',
        content: 'Onur ÖNDER',
      },
      {
        name: 'application-name',
        content: APP_TITLE,
      },
    ],
  };
};

function BaseDefaultSeo() {
  const router = useRouter();
  return <DefaultSeo {...getDefaultSeoConfig(router.asPath)} />;
}

export default BaseDefaultSeo;
