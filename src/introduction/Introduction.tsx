import BaseImage from '@/common/BaseImage';
import { Box, Typography, styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

interface BackdropProps {
  backgroundImageSrc: string;
}

const Backdrop = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop as string),
})<BackdropProps>(({ backgroundImageSrc }) => ({
  backgroundImage: `url(${backgroundImageSrc})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  filter: 'opacity(100) grayscale(100%) contrast(130%)',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}));

const Container = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
  backgroundImage:
    'radial-gradient(circle at 20% 50%, rgba(12.55%, 24.71%, 34.51%, 0.95) 0%, rgba(12.55%, 24.71%, 34.51%, 0.88) 100%)',
});

type IntroductionProps = BackdropProps & {
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

function Introduction({
  backgroundImageSrc,
  imageSrc,
  imageAlt,
  title,
  content,
}: IntroductionProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        color: (theme) => theme.palette.grey[100],
      }}
    >
      <Backdrop
        backgroundImageSrc={getImageUrl(backgroundImageSrc, {
          quality: 'original',
        })}
      />
      <Container>
        <Box sx={{ flexBasis: 300 }}>
          <BaseImage
            src={getImageUrl(imageSrc)}
            alt={imageAlt}
            width={2}
            height={3}
            layout="responsive"
            objectFit="cover"
            priority
          />
        </Box>
        <Box sx={{ padding: 2, flex: 1, flexBasis: 300 }}>
          {typeof title === 'string' ? (
            <Typography variant="h5" component="h1" gutterBottom>
              {title}
            </Typography>
          ) : (
            title
          )}
          {content}
        </Box>
      </Container>
    </Box>
  );
}

export default Introduction;
