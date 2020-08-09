import React, { useState, useEffect, CSSProperties } from 'react';
import { Box, useTheme, makeStyles, Theme } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';
import { useTrackVisibility } from 'react-intersection-observer-hook';
import AspectRatio, { getAspectRatioString } from './AspectRatio';
import { Maybe } from '@/types';

const ORIGINAL = 'original';
const DEFAULT_ALT = 'Not Loaded';
const DEFAULT_ASPECT_RATIO = getAspectRatioString(1, 1);

interface BaseImageStyleProps {
  objectFit?: CSSProperties['objectFit'];
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
  },
}));

type BaseImageProps = BaseImageStyleProps & {
  src: string;
  alt?: string;
  aspectRatio?: string;
  lazyLoad?: boolean;
  objectFit?: string;
  showFallbackWhileLoading?: boolean;
};

function BaseImage({
  src,
  alt = DEFAULT_ALT,
  aspectRatio = ORIGINAL,
  lazyLoad = true,
  objectFit = 'cover',
  showFallbackWhileLoading,
}: BaseImageProps) {
  const classes = useStyles({ objectFit });
  const theme = useTheme();
  const [imgHeight, setImgHeight] = useState<Maybe<number>>();
  const [imgWidth, setImgWidth] = useState<Maybe<number>>();
  const [ref, { isVisible }] = useTrackVisibility();
  const [lazyLoaded, setLazyLoaded] = useState(isVisible);
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

  useEffect(() => {
    if (isVisible) {
      setLazyLoaded(true);
    }
  }, [isVisible]);

  return (
    <AspectRatio
      ref={lazyLoad ? ref : undefined}
      aspectRatio={
        isOriginalAspectRatio
          ? typeof imgWidth === 'number' && typeof imgHeight === 'number'
            ? getAspectRatioString(imgWidth, imgHeight)
            : DEFAULT_ASPECT_RATIO
          : aspectRatio
      }
    >
      {lazyLoad && !lazyLoaded ? null : (
        <>
          <Box className={classes.imgWrapper}>
            <img
              className={classes.img}
              src={src || '/placeholder.png'}
              alt={alt}
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
        </>
      )}
    </AspectRatio>
  );
}

export default BaseImage;
