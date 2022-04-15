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
  'className' | 'size' | 'disabled' | 'onClick'
> & {
  direction: 'next' | 'previous';
};

const iconStyle: SxProps<Theme> = {
  color: (theme) => theme.palette.grey[300],
};

function StepperButton({
  className,
  direction,
  size,
  disabled,
  onClick,
}: StepperButtonProps) {
  return (
    <StyledIconButton
      aria-label={direction}
      className={className}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {direction === 'previous' ? (
        <ChevronLeftIcon fontSize={size} sx={iconStyle} />
      ) : (
        <ChevronRightIcon fontSize={size} sx={iconStyle} />
      )}
    </StyledIconButton>
  );
}

export default StepperButton;
