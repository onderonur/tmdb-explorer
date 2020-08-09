import React from 'react';
import { NextSeo } from 'next-seo';

function BaseSeo({ title, description, openGraph, ...rest }) {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{ title, description, ...openGraph }}
      {...rest}
    />
  );
}

export default BaseSeo;
