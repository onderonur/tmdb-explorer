import { useRef, useState } from 'react';
import { Box, DialogContent } from '@mui/material';
import BaseDialog from '@/common/BaseDialog';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { HotKeys } from 'react-hotkeys';
import { useRouter } from 'next/router';
import { Maybe } from '@/common/CommonTypes';
import Steppers from '@/common/Steppers';
import BaseSeo from '@/seo/BaseSeo';
import BaseDialogTitle from '@/common/BaseDialogTitle';
import { useHasChanged, useIsMobile } from '@/common/CommonHooks';

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

  const shouldBeVisible = !!activeStep;
  const [isVisible, setIsVisible] = useState(shouldBeVisible);
  if (useHasChanged(shouldBeVisible)) {
    setIsVisible(shouldBeVisible);
  }

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
      router.push(
        { query: { ...router.query, [queryParamName]: toKey } },
        undefined,
        { shallow: true },
      );
    }
  }

  function goToNextPath() {
    goToPath(nextKey);
  }

  function goToPreviousPath() {
    goToPath(previousKey);
  }

  const fullScreenHandler = useFullScreenHandle();

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
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [queryParamName]: omitted,
      ...restQuery
    } = router.query;
    router.push({ query: restQuery }, undefined, { shallow: true });
  }

  const isMobile = useIsMobile();

  return (
    <>
      {isVisible && <BaseSeo title={title} />}
      <BaseDialog
        title={title}
        open={!!isVisible}
        onClose={() => setIsVisible(false)}
        TransitionProps={{
          onEntered: handleEntered,
          onExited: handleExited,
        }}
      >
        <FullScreen handle={fullScreenHandler}>
          <HotKeys
            innerRef={hotKeysRef}
            keyMap={keyMap}
            handlers={keyHandlers}
            allowChanges={true}
          >
            <BaseDialogTitle>{title}</BaseDialogTitle>
            <DialogContent sx={{ padding: 0 }}>
              <Box position="relative">
                {currentMediaKey
                  ? renderMedia({
                      mediaSrc: currentMediaKey,
                      isFullScreen: fullScreenHandler.active,
                      toggleFullScreen,
                    })
                  : null}
                <Steppers
                  fontSize={isMobile ? 'medium' : 'large'}
                  onClickPrevious={previousKey ? goToPreviousPath : null}
                  onClickNext={nextKey ? goToNextPath : null}
                />
              </Box>
            </DialogContent>
          </HotKeys>
        </FullScreen>
      </BaseDialog>
    </>
  );
}

export default MediaGalleryModal;
