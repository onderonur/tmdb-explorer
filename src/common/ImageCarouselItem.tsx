import BaseImage from '@/common/BaseImage';
import NextLink from '@/routing/NextLink';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import { styled } from '@mui/material';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <NextLink
      href={{ query: { ...router.query, view: filePath } }}
      scroll={false}
    >
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
