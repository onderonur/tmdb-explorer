import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IconButton, Box, styled } from '@mui/material';
import BaseDialog from '@/common/BaseDialog';
import YouTubePlayer from './YouTubePlayer';
import MediaGalleryModalStepper from './MediaGalleryModalStepper';
import MediaGalleryModalImageViewer from './MediaGalleryModalImageViewer';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { HotKeys } from 'react-hotkeys';
import { useRouter } from 'next/router';
import useRouterPath from '@/routing/useRouterPath';
import { Maybe } from '@/common/CommonTypes';

const keyMap = {
  NEXT: ['right', 'd'],
  PREVIOUS: ['left', 'a'],
  FULLSCREEN: ['f'],
};

const FullScreenButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
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
  const router = useRouter();
  const activeStep = router.query[queryParamName];
  const activeStepIndex = dataSource?.indexOf(activeStep as string);

  const [isVisible, setIsVisible] = useState(false);

  const fullScreenHandler = useFullScreenHandle();

  useEffect(() => {
    setIsVisible(!!activeStep);
  }, [activeStep]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const { asHref } = useRouterPath();

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
      router.push({ pathname: asHref, query }, undefined, { shallow: true });
    }
  }

  function goToPreviousPath() {
    if (previousKey) {
      const query = { [queryParamName]: previousKey };
      router.push({ pathname: asHref, query }, undefined, { shallow: true });
    }
  }

  function toggleFullScreen() {
    if (fullScreenHandler.active) {
      fullScreenHandler.exit();
    } else {
      fullScreenHandler.enter();
    }
  }

  const keyHandlers = {
    NEXT: goToNextPath,
    PREVIOUS: goToPreviousPath,
    FULLSCREEN: toggleFullScreen,
  };

  const currentMediaKey =
    typeof activeStepIndex === 'number' ? dataSource?.[activeStepIndex] : null;

  const hotKeysRef = useRef<HTMLElement>(null);

  function handleEntered() {
    hotKeysRef.current?.focus();
  }

  function handleExited() {
    router.push(asHref, undefined, { shallow: true });
  }

  return (
    <BaseDialog
      title={title}
      open={!!isVisible}
      onClose={handleClose}
      TransitionProps={{
        onEntered: handleEntered,
        onExited: handleExited,
      }}
      zeroPaddingContent
    >
      <FullScreen handle={fullScreenHandler}>
        <HotKeys
          innerRef={hotKeysRef}
          keyMap={keyMap}
          handlers={keyHandlers}
          allowChanges={true}
        >
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
              <FullScreenButton onClick={toggleFullScreen}>
                {fullScreenHandler.active ? (
                  <FullscreenExitIcon />
                ) : (
                  <FullscreenIcon />
                )}
              </FullScreenButton>
            )}
          </Box>
        </HotKeys>
      </FullScreen>
    </BaseDialog>
  );
}

export default MediaGalleryModal;
