import BaseImage from '@/common/BaseImage';
import NextLink from '@/routing/NextLink';
import useApiConfiguration from '@/api-configuration/ApiConfigurationHooks';
import { Box, styled } from '@mui/material';
import { useRouter } from 'next/router';

const Thumbnail = styled(BaseImage)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover',
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
      <Box sx={{ position: 'relative', aspectRatio: `${width} / ${height}` }}>
        <Thumbnail src={getImageUrl(filePath)} alt={imageAlt} fill />
      </Box>
    </NextLink>
  );
}

export default ImageCarouselItem;
