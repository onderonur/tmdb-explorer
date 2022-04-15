import { Box, styled } from '@mui/material';
import { Maybe } from '@/common/CommonTypes';
import StepperButton, { StepperButtonProps } from './StepperButton';

const StepperRoot = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  zIndex: theme.zIndex.fab,
}));

type SteppersProps = Pick<StepperButtonProps, 'size' | 'onClick'> & {
  onClickPrevious: Maybe<VoidFunction>;
  onClickNext: Maybe<VoidFunction>;
};

function Steppers({ size, onClickPrevious, onClickNext }: SteppersProps) {
  return (
    <>
      <StepperRoot left={0} justifyContent="flex-start">
        <StepperButton
          size={size}
          disabled={!onClickPrevious}
          direction="previous"
          onClick={onClickPrevious ?? undefined}
        />
      </StepperRoot>
      <StepperRoot right={0} justifyContent="flex-end">
        <StepperButton
          size={size}
          disabled={!onClickNext}
          direction="next"
          onClick={onClickNext ?? undefined}
        />
      </StepperRoot>
    </>
  );
}

export default Steppers;
