import React, { useMemo, useCallback } from 'react';
import {
  Dialog,
  withMobileDialog,
  DialogContent,
  Box,
  makeStyles,
  DialogProps,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BaseDialogTitle from './BaseDialogTitle';

const DEFAULT_CONTENT_PADDING_Y = 1;
const DEFAULT_CONTENT_PADDING_X = 3;

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(3),
    cursor: 'pointer',
  },
}));

type BaseDialogProps = DialogProps & {
  titleRight?: React.ReactNode;
  zeroPaddingContent: boolean;
};

interface DialogContextValue {
  fullScreen: BaseDialogProps['fullScreen'];
  closeDialog: VoidFunction;
}

export const DialogContext = React.createContext({} as DialogContextValue);

function BaseDialog({
  open,
  fullScreen,
  title,
  titleRight,
  onClose,
  onExited,
  zeroPaddingContent,
  children,
}: BaseDialogProps) {
  const classes = useStyles();

  const closeDialog = useCallback(() => {
    onClose?.({}, 'backdropClick');
  }, [onClose]);

  const contextValue = useMemo(() => ({ fullScreen, closeDialog }), [
    closeDialog,
    fullScreen,
  ]);

  return (
    <Dialog
      open={open}
      scroll="body"
      fullWidth
      fullScreen={fullScreen}
      maxWidth="lg"
      onClose={onClose}
      onExited={onExited}
    >
      <DialogContext.Provider value={contextValue}>
        {!fullScreen && (
          <CloseIcon className={classes.closeButton} onClick={closeDialog} />
        )}
        <BaseDialogTitle title={title} titleRight={titleRight} />
        <DialogContent>
          {zeroPaddingContent ? (
            <Box
              marginY={-DEFAULT_CONTENT_PADDING_Y}
              marginX={-DEFAULT_CONTENT_PADDING_X}
            >
              {children}
            </Box>
          ) : (
            children
          )}
        </DialogContent>
      </DialogContext.Provider>
    </Dialog>
  );
}

export default withMobileDialog()(BaseDialog);
