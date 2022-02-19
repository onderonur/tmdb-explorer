import React from 'react';
import {
  DialogTitle,
  Typography,
  Box,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Maybe } from '@/common/CommonTypes';
import { useBaseDialogContext } from './BaseDialogContext';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(1, 2),
}));

const Title = styled(Typography)({
  flex: 1,
});

interface BaseDialogTitleProps {
  title: Maybe<string>;
  titleRight: React.ReactNode;
}

function BaseDialogTitle({ title, titleRight }: BaseDialogTitleProps) {
  const { closeDialog } = useBaseDialogContext();

  return (
    <StyledDialogTitle>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <Title variant="h6" noWrap>
          {title}
        </Title>
        {titleRight}
        <IconButton onClick={closeDialog}>
          <CloseIcon />
        </IconButton>
      </Box>
    </StyledDialogTitle>
  );
}

export default BaseDialogTitle;
