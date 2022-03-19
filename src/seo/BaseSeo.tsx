import { NextSeo, NextSeoProps } from 'next-seo';

type BaseSeoProps = NextSeoProps;

function BaseSeo({ title, description, openGraph, ...rest }: BaseSeoProps) {
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
