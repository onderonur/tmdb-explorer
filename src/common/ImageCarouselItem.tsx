import BaseImage from '@/common/BaseImage';
import NextLink from '@/routing/NextLink';
import useRouterPath from '@/routing/useRouterPath';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import { styled } from '@mui/material';

const Thumbnail = styled(BaseImage)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

interface ImageCarouselItemProps {
  filePath: string;
  imageAlt: string;
  width: number;
  height: number;
}

function ImageCarouselItem({
  filePath,
  imageAlt,
  width,
  height,
}: ImageCarouselItemProps) {
  const { getImageUrl } = useApiConfiguration();
  const { asHref } = useRouterPath();

  return (
    <NextLink href={{ pathname: asHref, query: { view: filePath } }}>
      <Thumbnail
        src={getImageUrl(filePath)}
        alt={imageAlt}
        width={width}
        height={height}
        layout="responsive"
        objectFit="contain"
      />
    </NextLink>
  );
}

export default ImageCarouselItem;
