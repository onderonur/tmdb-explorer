import React, { useState, useEffect, useCallback } from 'react';
import { IconButton, Box, makeStyles } from '@material-ui/core';
import BaseDialog from '@/components/BaseDialog';
import YouTubePlayer from './YouTubePlayer';
import MediaGalleryModalStepper from './MediaGalleryModalStepper';
import MediaGalleryModalImageViewer from './MediaGalleryModalImageViewer';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { HotKeys } from 'react-hotkeys';
import { useRouter } from 'next/router';
import useRouterPaths from '@/hooks/useRouterPaths';
import { Maybe } from '@/types';

const keyMap = {
  NEXT: ['right', 'd'],
  PREVIOUS: ['left', 'a'],
};

const useStyles = makeStyles((theme) => ({
  fullScreenButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

interface MediaGalleryModalProps {
  title: string;
  dataSource: Maybe<string[]>;
  queryParamName: string;
  isVideoPlayer?: boolean;
}

function MediaGalleryModal({
  title,
  dataSource = [],
  queryParamName,
  isVideoPlayer = false,
}: MediaGalleryModalProps) {
  const classes = useStyles();
  const router = useRouter();
  const activeStep = router.query[queryParamName];
  const activeStepIndex = dataSource?.indexOf(activeStep as string);

  const [isVisible, setIsVisible] = useState(false);

  const handle = useFullScreenHandle();

  useEffect(() => {
    setIsVisible(!!activeStep);
  }, [activeStep]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const { href, asHref } = useRouterPaths();

  function handleExited() {
    const query = {};
    router.push(
      { pathname: href, query },
      { pathname: asHref, query },
      { shallow: true },
    );
  }

  const nextKey =
    typeof activeStepIndex === 'number'
      ? dataSource?.[activeStepIndex + 1]
      : null;
  const previousKey =
    typeof activeStepIndex === 'number'
      ? dataSource?.[activeStepIndex - 1]
      : null;

  function goToNextPath() {
    if (nextKey) {
      const query = { [queryParamName]: nextKey };
      router.push(
        { pathname: href, query },
        { pathname: asHref, query },
        { shallow: true },
      );
    }
  }

  function goToPreviousPath() {
    if (previousKey) {
      const query = { [queryParamName]: previousKey };
      router.push(
        { pathname: href, query },
        { pathname: asHref, query },
        { shallow: true },
      );
    }
  }

  const keyHandlers = {
    NEXT: goToNextPath,
    PREVIOUS: goToPreviousPath,
  };

  const currentMediaKey =
    typeof activeStepIndex === 'number' ? dataSource?.[activeStepIndex] : null;

  return (
    <BaseDialog
      title={title}
      open={!!isVisible}
      onClose={handleClose}
      onExited={handleExited}
      zeroPaddingContent
    >
      <FullScreen handle={handle}>
        <HotKeys keyMap={keyMap} handlers={keyHandlers} allowChanges={true}>
          <Box position="relative">
            {currentMediaKey ? (
              isVideoPlayer ? (
                <YouTubePlayer youTubeId={currentMediaKey} />
              ) : (
                <MediaGalleryModalImageViewer filePath={currentMediaKey} />
              )
            ) : null}
            <MediaGalleryModalStepper
              onClickPrevious={previousKey ? goToPreviousPath : null}
              onClickNext={nextKey ? goToNextPath : null}
            />
            {!isVideoPlayer && (
              <IconButton
                className={classes.fullScreenButton}
                onClick={handle.active ? handle.exit : handle.enter}
              >
                {handle.active ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            )}
          </Box>
        </HotKeys>
      </FullScreen>
    </BaseDialog>
  );
}

export default MediaGalleryModal;
