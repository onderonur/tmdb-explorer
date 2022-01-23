import React from 'react';
import BaseImage from '@/common/BaseImage';
import NextLink from '@/routing/NextLink';
import useRouterPath from '@/routing/useRouterPath';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

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
  const { asHref } = useRouterPath();
  return (
    <li>
      <NextLink href={{ pathname: asHref, query: { view: filePath } }}>
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
