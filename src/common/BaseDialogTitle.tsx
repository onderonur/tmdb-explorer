import React, { useContext } from 'react';
import { DialogContext } from './BaseDialog';
import {
  DialogTitle,
  Typography,
  Box,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Maybe } from '@/common/CommonTypes';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(1, 2),
}));

const Title = styled(Typography)({
  flex: 1,
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

interface BaseDialogTitleProps {
  title: Maybe<string>;
  titleRight: React.ReactNode;
}

function BaseDialogTitle({ title, titleRight }: BaseDialogTitleProps) {
  const { fullScreen, closeDialog } = useContext(DialogContext);

  return (
    <StyledDialogTitle>
      <Box display="flex" alignItems="center">
        {fullScreen && (
          <CloseButton onClick={closeDialog}>
            <CloseIcon />
          </CloseButton>
        )}
        <Title variant="h6" noWrap>
          {title}
        </Title>
        {titleRight}
      </Box>
    </StyledDialogTitle>
  );
}

export default BaseDialogTitle;
