import {
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  styled,
} from '@mui/material';
import React, { useMemo, useCallback } from 'react';
import BaseDialogTitle from './BaseDialogTitle';
import useIsMobile from './useIsMobile';
import CloseIcon from '@mui/icons-material/Close';
import isPropValid from '@emotion/is-prop-valid';

type BaseDialogContentProps = {
  zeroPaddingContent: boolean;
};

const BaseDialogContent = styled(DialogContent, {
  shouldForwardProp: (prop) => isPropValid(prop),
})<BaseDialogContentProps>(({ zeroPaddingContent }) =>
  zeroPaddingContent ? { padding: 0 } : {},
);

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(1),
  right: theme.spacing(1),
  cursor: 'pointer',
}));

type BaseDialogProps = DialogProps &
  BaseDialogContentProps & {
    titleRight?: React.ReactNode;
  };

interface DialogContextValue {
  fullScreen: BaseDialogProps['fullScreen'];
  closeDialog: VoidFunction;
}

export const DialogContext = React.createContext({} as DialogContextValue);

function BaseDialog({
  open,
  title,
  titleRight,
  onClose,
  TransitionProps,
  zeroPaddingContent,
  children,
}: BaseDialogProps) {
  const isMobile = useIsMobile();

  const closeDialog = useCallback(() => {
    onClose?.({}, 'backdropClick');
  }, [onClose]);

  const contextValue = useMemo(
    () => ({ fullScreen: isMobile, closeDialog }),
    [closeDialog, isMobile],
  );

  return (
    <Dialog
      open={open}
      scroll="body"
      fullWidth
      fullScreen={isMobile}
      maxWidth="lg"
      onClose={onClose}
      TransitionProps={TransitionProps}
    >
      <DialogContext.Provider value={contextValue}>
        {!isMobile && (
          <CloseButton onClick={closeDialog}>
            <CloseIcon />
          </CloseButton>
        )}
        <BaseDialogTitle title={title} titleRight={titleRight} />
        <BaseDialogContent zeroPaddingContent={zeroPaddingContent}>
          {children}
        </BaseDialogContent>
      </DialogContext.Provider>
    </Dialog>
  );
}

export default BaseDialog;
