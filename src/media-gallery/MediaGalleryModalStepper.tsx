import React from 'react';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Maybe } from '@/common/CommonTypes';

const useStyles = makeStyles((theme) => ({
  stepper: {
    position: 'absolute',
    top: '50%',
    marginTop: theme.spacing(-4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
        <Box className={classes.stepper} left={0} justifyContent="flex-start">
          <IconButton onClick={onClickPrevious}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}
      {onClickNext && (
        <Box
          className={classes.stepper}
          right={0}
          justifyContent="flex-end"
          onClick={onClickNext}
        >
          <IconButton onClick={onClickNext}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}

export default MediaGalleryModalStepper;
