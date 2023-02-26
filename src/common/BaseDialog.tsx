import { Dialog, DialogProps } from '@mui/material';
import { useMemo, useCallback } from 'react';
import BaseDialogProvider from './BaseDialogContext';
import { useIsMobile } from './CommonHooks';

type BaseDialogProps = DialogProps;

function BaseDialog({
  open,
  TransitionProps,
  children,
  onClose,
}: BaseDialogProps) {
  const isMobile = useIsMobile();

  const closeDialog = useCallback(() => {
    onClose?.({}, 'backdropClick');
  }, [onClose]);

  const contextValue = useMemo(() => ({ closeDialog }), [closeDialog]);

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
      <BaseDialogProvider value={contextValue}>{children}</BaseDialogProvider>
    </Dialog>
  );
}

export default BaseDialog;
