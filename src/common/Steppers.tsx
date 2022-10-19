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

type SteppersProps = Pick<StepperButtonProps, 'fontSize'> & {
  onClickPrevious: Maybe<VoidFunction>;
  onClickNext: Maybe<VoidFunction>;
};

function Steppers({ fontSize, onClickPrevious, onClickNext }: SteppersProps) {
  return (
    <>
      <StepperRoot sx={{ left: 0, justifyContent: 'flex-start' }}>
        <StepperButton
          fontSize={fontSize}
          disabled={!onClickPrevious}
          direction="previous"
          onClick={onClickPrevious ?? undefined}
        />
      </StepperRoot>
      <StepperRoot sx={{ right: 0, justifyContent: 'flex-end' }}>
        <StepperButton
          fontSize={fontSize}
          disabled={!onClickNext}
          direction="next"
          onClick={onClickNext ?? undefined}
        />
      </StepperRoot>
    </>
  );
}

export default Steppers;
