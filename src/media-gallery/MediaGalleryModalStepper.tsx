import React from 'react';
import { Box, IconButton, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Maybe } from '@/common/CommonTypes';

const Stepper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  marginTop: theme.spacing(-4),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

interface MediaGalleryModalStepperProps {
  onClickPrevious: Maybe<VoidFunction>;
  onClickNext: Maybe<VoidFunction>;
}

function MediaGalleryModalStepper({
  onClickPrevious,
  onClickNext,
}: MediaGalleryModalStepperProps) {
  return (
    <>
      {onClickPrevious && (
        <Stepper left={0} justifyContent="flex-start">
          <IconButton size="large" onClick={onClickPrevious}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </Stepper>
      )}
      {onClickNext && (
        <Stepper right={0} justifyContent="flex-end" onClick={onClickNext}>
          <IconButton size="large" onClick={onClickNext}>
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </Stepper>
      )}
    </>
  );
}

export default MediaGalleryModalStepper;
