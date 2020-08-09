import React from 'react';
import BaseImage from './BaseImage';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import NextLink from './NextLink';
import { useRouter } from 'next/router';

function ImageGridListItem({ filePath, aspectRatio }) {
  const { getImageUrl } = useConfiguration();
  const router = useRouter();
  return (
    <li>
      <NextLink
        href={`${router.pathname}?view=${filePath}`}
        as={`${router.asPath}?view=${filePath}`}
        shallow
      >
        <BaseImage
          src={getImageUrl(filePath)}
          aspectRatio={aspectRatio}
          objectFit="contain"
        />
      </NextLink>
    </li>
  );
}

export default ImageGridListItem;
