import BaseImage from '@/common/BaseImage';
import { Box, Typography, styled } from '@mui/material';
import useApiConfiguration from '@/api-configuration/ApiConfigurationHooks';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

type IntroductionProps = {
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

function Introduction({
  imageSrc,
  imageAlt,
  title,
  content,
}: IntroductionProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <Container>
      <Box
        sx={{
          flexBasis: 300,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2 / 3' }}>
          <BaseImage
            src={getImageUrl(imageSrc)}
            alt={imageAlt}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      </Box>
      <Box sx={{ flex: 1, flexBasis: 300 }}>
        {typeof title === 'string' ? (
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
          >
            {title}
          </Typography>
        ) : (
          title
        )}
        {content}
      </Box>
    </Container>
  );
}

export default Introduction;
