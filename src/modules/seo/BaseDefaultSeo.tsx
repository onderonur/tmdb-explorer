import React from 'react';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { appTitle } from '../shared/SharedConstants';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getDefaultSeoConfig = (pathname: string) => {
  const url = `${baseUrl}${pathname}`;
  const description = `${appTitle} is a client application for TMDb API. It's created with Next.js.`;
  return {
    titleTemplate: `%s | ${appTitle}`,
    description,
    canonical: url,
    openGraph: {
      title: appTitle,
      description,
      type: 'website',
      locale: 'en_IE',
      url,
      site_name: appTitle,
      images: [
        // TODO
      ],
    },
    additionalMetaTags: [
      {
        property: 'dc:creator',
        content: 'Onur ÖNDER',
      },
      {
        name: 'application-name',
        content: appTitle,
      },
    ],
  };
};

function BaseDefaultSeo() {
  const router = useRouter();
  return <DefaultSeo {...getDefaultSeoConfig(router.asPath)} />;
}

export default BaseDefaultSeo;
