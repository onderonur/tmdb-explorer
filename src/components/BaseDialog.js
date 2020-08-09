import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  withMobileDialog,
  DialogContent,
  Box,
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

export const DialogContext = React.createContext();

function BaseDialog({
  open,
  fullScreen,
  title,
  titleRight,
  onClose,
  onExited,
  zeroPaddingContent,
  children,
}) {
  const classes = useStyles();

  const contextValue = useMemo(() => ({ fullScreen, closeDialog: onClose }), [
    fullScreen,
    onClose,
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
          <CloseIcon className={classes.closeButton} onClick={onClose} />
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
