import { Dialog, DialogProps } from '@mui/material';
import { useMemo, useCallback } from 'react';
import BaseDialogTitle from './BaseDialogTitle';
import useIsMobile from './useIsMobile';
import BaseDialogProvider from './BaseDialogContext';
import BaseDialogContent, { BaseDialogContentProps } from './BaseDialogContent';

export type BaseDialogProps = DialogProps & BaseDialogContentProps;

function BaseDialog({
  open,
  title,
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
      <BaseDialogProvider value={contextValue}>
        <BaseDialogTitle title={title} />
        <BaseDialogContent zeroPaddingContent={zeroPaddingContent}>
          {children}
        </BaseDialogContent>
      </BaseDialogProvider>
    </Dialog>
  );
}

export default BaseDialog;
