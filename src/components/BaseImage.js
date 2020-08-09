import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, useTheme } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';
import { useTrackVisibility } from 'react-intersection-observer-hook';
import AspectRatio, { getAspectRatioString } from './AspectRatio';

const ORIGINAL = 'original';
const DEFAULT_ALT = 'Not Loaded';
const DEFAULT_ASPECT_RATIO = getAspectRatioString(1, 1);

const useStyles = makeStyles((theme) => ({
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

function BaseImage({
  src,
  alt = DEFAULT_ALT,
  aspectRatio = ORIGINAL,
  lazyLoad = true,
  objectFit = 'cover',
  showFallbackWhileLoading,
}) {
  const classes = useStyles({ objectFit });
  const theme = useTheme();
  const [imgHeight, setImgHeight] = useState();
  const [imgWidth, setImgWidth] = useState();
  const [ref, { isVisible }] = useTrackVisibility();
  const [lazyLoaded, setLazyLoaded] = useState(isVisible);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const isOriginalAspectRatio = aspectRatio === ORIGINAL;

  function handleLoad(e) {
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
          ? imgWidth && imgHeight
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
