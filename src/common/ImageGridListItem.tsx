import React from 'react';
import BaseImage from '@/common/BaseImage';
import { useApiConfiguration } from '@/api-configuration/ApiConfigurationContext';
import NextLink from '@/routing/NextLink';
import { useRouter } from 'next/router';

interface ImageGridListItemProps {
  filePath: string;
  width: number;
  height: number;
}

function ImageGridListItem({
  width,
  height,
  filePath,
}: ImageGridListItemProps) {
  const { getImageUrl } = useApiConfiguration();
  const router = useRouter();
  const query = `?view=${filePath}`;
  return (
    <li>
      <NextLink href={`${router.asPath}${query}`}>
        <BaseImage
          src={getImageUrl(filePath)}
          width={width}
          height={height}
          layout="responsive"
          objectFit="contain"
        />
      </NextLink>
    </li>
  );
}

export default ImageGridListItem;
