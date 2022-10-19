import {
  IconButton,
  styled,
  alpha,
  SxProps,
  Theme,
  IconButtonProps,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.8),
  },
}));

export type StepperButtonProps = Pick<
  IconButtonProps,
  'className' | 'disabled' | 'onClick'
> &
  Pick<React.ComponentPropsWithoutRef<typeof ChevronLeftIcon>, 'fontSize'> & {
    direction: 'next' | 'previous';
  };

const iconSx: SxProps<Theme> = {
  color: (theme) => theme.palette.grey[300],
};

function StepperButton({
  className,
  direction,
  fontSize,
  disabled,
  onClick,
}: StepperButtonProps) {
  return (
    <StyledIconButton
      aria-label={direction}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {direction === 'previous' ? (
        <ChevronLeftIcon fontSize={fontSize} sx={iconSx} />
      ) : (
        <ChevronRightIcon fontSize={fontSize} sx={iconSx} />
      )}
    </StyledIconButton>
  );
}

export default StepperButton;
