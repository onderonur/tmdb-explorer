import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Maybe } from '@/types';

const SIZE = 60;

const useStyles = makeStyles((theme) => ({
  stepper: {
    position: 'absolute',
    top: '50%',
    marginTop: -SIZE / 2,
    width: SIZE,
    height: SIZE,
    cursor: 'pointer',
    opacity: 0.4,
    '&:hover': {
      opacity: 0.7,
    },
  },
  stepperIcon: {
    fontSize: theme.typography.h2.fontSize,
  },
}));

interface MediaGalleryModalStepperProps {
  onClickPrevious: Maybe<VoidFunction>;
  onClickNext: Maybe<VoidFunction>;
}

function MediaGalleryModalStepper({
  onClickPrevious,
  onClickNext,
}: MediaGalleryModalStepperProps) {
  const classes = useStyles();

  return (
    <>
      {onClickPrevious && (
        <Box
          className={classes.stepper}
          left={0}
          justifyContent="flex-start"
          onClick={onClickPrevious}
        >
          <ChevronLeftIcon className={classes.stepperIcon} />
        </Box>
      )}
      {onClickNext && (
        <Box
          className={classes.stepper}
          right={0}
          justifyContent="flex-end"
          onClick={onClickNext}
        >
          <ChevronRightIcon className={classes.stepperIcon} />
        </Box>
      )}
    </>
  );
}

export default MediaGalleryModalStepper;
