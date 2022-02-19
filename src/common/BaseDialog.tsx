import { Dialog, DialogProps } from '@mui/material';
import React, { useMemo, useCallback } from 'react';
import BaseDialogTitle from './BaseDialogTitle';
import useIsMobile from './useIsMobile';
import BaseDialogProvider from './BaseDialogContext';
import BaseDialogContent, { BaseDialogContentProps } from './BaseDialogContent';

export type BaseDialogProps = DialogProps &
  BaseDialogContentProps & {
    titleRight?: React.ReactNode;
  };

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
      <BaseDialogProvider value={contextValue}>
        <BaseDialogTitle title={title} titleRight={titleRight} />
        <BaseDialogContent zeroPaddingContent={zeroPaddingContent}>
          {children}
        </BaseDialogContent>
      </BaseDialogProvider>
    </Dialog>
  );
}

export default BaseDialog;
