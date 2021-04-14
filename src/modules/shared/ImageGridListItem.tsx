import React from 'react';
import BaseImage from '@/modules/shared/BaseImage';
import { useApiConfiguration } from '@/modules/api-configuration/ApiConfigurationContext';
import NextLink from '@/modules/routing/NextLink';
import { useRouter } from 'next/router';

interface ImageGridListItemProps {
  filePath: string;
  aspectRatio: string;
}

function ImageGridListItem({ filePath, aspectRatio }: ImageGridListItemProps) {
  const { getImageUrl } = useApiConfiguration();
  const router = useRouter();
  const query = `?view=${filePath}`;
  return (
    <li>
      <NextLink href={`${router.asPath}${query}`}>
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
