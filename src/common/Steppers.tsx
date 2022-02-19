import React from 'react';
import { Box, styled, IconButtonProps } from '@mui/material';
import { Maybe } from '@/common/CommonTypes';
import StepperButton from './StepperButton';

const StepperRoot = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

type SteppersProps = Pick<IconButtonProps, 'size'> & {
  onClickPrevious: Maybe<VoidFunction>;
  onClickNext: Maybe<VoidFunction>;
};

function Steppers({ size, onClickPrevious, onClickNext }: SteppersProps) {
  return (
    <>
      {onClickPrevious && (
        <StepperRoot left={0} justifyContent="flex-start">
          <StepperButton
            size={size}
            direction="previous"
            onClick={onClickPrevious}
          />
        </StepperRoot>
      )}
      {onClickNext && (
        <StepperRoot right={0} justifyContent="flex-end">
          <StepperButton size={size} direction="next" onClick={onClickNext} />
        </StepperRoot>
      )}
    </>
  );
}

export default Steppers;
