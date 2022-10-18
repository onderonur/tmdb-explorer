import {
  DialogTitle,
  Typography,
  IconButton,
  styled,
  DialogTitleProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useBaseDialogContext } from './BaseDialogContext';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
})) as typeof DialogTitle;

type BaseDialogTitleProps = DialogTitleProps;

function BaseDialogTitle({ children, ...rest }: BaseDialogTitleProps) {
  const { closeDialog } = useBaseDialogContext();

  return (
    <StyledDialogTitle component="div" {...rest}>
      <Typography variant="h6" component="h2" noWrap>
        {children}
      </Typography>
      <IconButton aria-label="Close dialog" onClick={closeDialog}>
        <CloseIcon />
      </IconButton>
    </StyledDialogTitle>
  );
}

export default BaseDialogTitle;
