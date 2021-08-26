import React, { useMemo, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  DialogProps,
  useTheme,
  useMediaQuery,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BaseDialogTitle from './BaseDialogTitle';

const DEFAULT_CONTENT_PADDING_Y = 1;
const DEFAULT_CONTENT_PADDING_X = 3;

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
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
  title,
  titleRight,
  onClose,
  TransitionProps,
  zeroPaddingContent,
  children,
}: BaseDialogProps) {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const closeDialog = useCallback(() => {
    onClose?.({}, 'backdropClick');
  }, [onClose]);

  const contextValue = useMemo(
    () => ({ fullScreen, closeDialog }),
    [closeDialog, fullScreen],
  );

  return (
    <Dialog
      open={open}
      scroll="body"
      fullWidth
      fullScreen={fullScreen}
      maxWidth="lg"
      onClose={onClose}
      TransitionProps={TransitionProps}
    >
      <DialogContext.Provider value={contextValue}>
        {!fullScreen && (
          <IconButton className={classes.closeButton} onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
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

export default BaseDialog;
