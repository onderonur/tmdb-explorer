import React from 'react';
import BaseImage from '@/common/BaseImage';
import { Box, Typography, Theme, makeStyles } from '@material-ui/core';
import { useApiConfiguration } from '@/api-configuration/ApiConfigurationContext';

interface IntroductionStyleProps {
  backgroundImageSrc: string;
}

const useStyles = makeStyles<Theme, IntroductionStyleProps>(() => ({
  backdrop: {
    backgroundImage: ({ backgroundImageSrc }) => `url(${backgroundImageSrc})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'opacity(100) grayscale(100%) contrast(130%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundImage:
      'radial-gradient(circle at 20% 50%, rgba(12.55%, 24.71%, 34.51%, 0.98) 0%, rgba(12.55%, 24.71%, 34.51%, 0.88) 100%)',
  },
}));

type IntroductionProps = IntroductionStyleProps & {
  imageSrc: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

function Introduction({
  backgroundImageSrc,
  imageSrc,
  title,
  content,
}: IntroductionProps) {
  const { getImageUrl } = useApiConfiguration();
  const classes = useStyles({
    backgroundImageSrc: getImageUrl(backgroundImageSrc),
  });

  return (
    <Box position="relative">
      <div className={classes.backdrop} />
      <Box
        className={classes.container}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        position="relative"
        zIndex={1}
      >
        <Box flexBasis={300}>
          <BaseImage
            src={getImageUrl(imageSrc)}
            width={2}
            height={3}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
        <Box padding={2} flex={1} flexBasis={300}>
          {typeof title === 'string' ? (
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
          ) : (
            title
          )}
          {content}
        </Box>
      </Box>
    </Box>
  );
}

export default Introduction;
