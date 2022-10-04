import { DialogTitle, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Maybe } from '@/common/CommonTypes';
import { useBaseDialogContext } from './BaseDialogContext';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
})) as typeof DialogTitle;

interface BaseDialogTitleProps {
  title: Maybe<string>;
}

function BaseDialogTitle({ title }: BaseDialogTitleProps) {
  const { closeDialog } = useBaseDialogContext();

  return (
    <StyledDialogTitle component="div">
      <Typography variant="h6" component="h2" noWrap>
        {title}
      </Typography>
      <IconButton aria-label="Close dialog" onClick={closeDialog}>
        <CloseIcon />
      </IconButton>
    </StyledDialogTitle>
  );
}

export default BaseDialogTitle;
