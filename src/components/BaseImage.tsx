import React, { useState, CSSProperties } from 'react';
import { Box, useTheme, makeStyles, Theme } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';
import AspectRatio, { getAspectRatioString } from './AspectRatio';
import { Maybe } from '@/types';
import Image from 'next/image';

const ORIGINAL = 'original';
const DEFAULT_ASPECT_RATIO = getAspectRatioString(1, 1);

interface BaseImageStyleProps {
  objectFit?: CSSProperties['objectFit'];
  aspectRatio?: string;
}

const useStyles = makeStyles<Theme, BaseImageStyleProps>((theme) => ({
  imgWrapper: {
    display: 'block',
    backgroundColor: theme.palette.background.default,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: ({ objectFit }) => objectFit,
    // To make next/image work with AspectRatio
    position: ({ aspectRatio }) => (aspectRatio ? 'absolute' : 'initial'),
  },
}));

type BaseImageProps = BaseImageStyleProps & {
  src: string;
  alt?: string;
  showFallbackWhileLoading?: boolean;
};

function BaseImage({
  src,
  alt,
  aspectRatio = ORIGINAL,
  objectFit = 'cover',
  showFallbackWhileLoading,
}: BaseImageProps) {
  const classes = useStyles({ objectFit, aspectRatio });
  const theme = useTheme();
  const [imgHeight, setImgHeight] = useState<Maybe<number>>();
  const [imgWidth, setImgWidth] = useState<Maybe<number>>();
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const isOriginalAspectRatio = aspectRatio === ORIGINAL;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleLoad(e: any) {
    if (isOriginalAspectRatio) {
      const img = e.target;
      setImgHeight(img.naturalHeight);
      setImgWidth(img.naturalWidth);
    }

    setIsImgLoaded(true);
  }

  return (
    <AspectRatio
      // TODO: Let's say we view a movie (/movie/123).
      // When we navigate to another movie (/movie/456) from recommendations
      // or by using searchbar, the main poster of the movie does not change.
      // So, to reset the component based on the image URL,
      // we use this "key" prop here.
      // This is probably a bug of next/image of Next.js 10.0.0.
      // If we use regular img, this bug doesn't happen.
      // Will check this behavior with further releases of Next.js.
      key={src}
      aspectRatio={
        isOriginalAspectRatio
          ? typeof imgWidth === 'number' && typeof imgHeight === 'number'
            ? getAspectRatioString(imgWidth, imgHeight)
            : DEFAULT_ASPECT_RATIO
          : aspectRatio
      }
    >
      <Box className={classes.imgWrapper}>
        <Image
          className={classes.img}
          src={src ?? '/placeholder.png'}
          alt={alt}
          unsized
          onLoad={handleLoad}
        />
      </Box>
      {!isImgLoaded && showFallbackWhileLoading && (
        <Box
          display="flex"
          alignItems="center"
          bgcolor={theme.palette.grey[900]}
        >
          <LoadingIndicator loading />
        </Box>
      )}
    </AspectRatio>
  );
}

export default BaseImage;
