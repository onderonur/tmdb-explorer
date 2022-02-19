import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import BaseDialog from '@/common/BaseDialog';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { HotKeys } from 'react-hotkeys';
import { useRouter } from 'next/router';
import useRouterPath from '@/routing/useRouterPath';
import { Maybe } from '@/common/CommonTypes';
import useIsMobile from '@/common/useIsMobile';
import Steppers from '@/common/Steppers';

const keyMap = {
  NEXT: ['right', 'd'],
  PREVIOUS: ['left', 'a'],
  FULLSCREEN: ['f'],
};

interface MediaGalleryModalProps {
  title: string;
  dataSource: Maybe<string[]>;
  queryParamName: string;
  renderMedia: (props: {
    mediaSrc: string;
    isFullScreen: boolean;
    toggleFullScreen: VoidFunction;
  }) => React.ReactNode;
}

function MediaGalleryModal({
  title,
  dataSource = [],
  queryParamName,
  renderMedia,
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

  function goToPath(toKey: Maybe<string>) {
    if (toKey) {
      const query = { [queryParamName]: toKey };
      router.push({ pathname: asHref, query }, undefined, { shallow: true });
    }
  }

  function goToNextPath() {
    goToPath(nextKey);
  }

  function goToPreviousPath() {
    goToPath(previousKey);
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

  const isMobile = useIsMobile();

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
            {currentMediaKey
              ? renderMedia({
                  mediaSrc: currentMediaKey,
                  isFullScreen: fullScreenHandler.active,
                  toggleFullScreen,
                })
              : null}
            <Steppers
              size={isMobile ? 'medium' : 'large'}
              onClickPrevious={previousKey ? goToPreviousPath : null}
              onClickNext={nextKey ? goToNextPath : null}
            />
          </Box>
        </HotKeys>
      </FullScreen>
    </BaseDialog>
  );
}

export default MediaGalleryModal;
