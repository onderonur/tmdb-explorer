import React, { useContext } from 'react';
import { DialogContext } from './BaseDialog';
import { DialogTitle, Typography, Box, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  title: {
    flex: 1,
  },
  closeButton: {
    marginRight: theme.spacing(1),
  },
}));

function BaseDialogTitle({ title, titleRight }) {
  const classes = useStyles();
  const { fullScreen, closeDialog } = useContext(DialogContext);

  return (
    <DialogTitle className={classes.root} disableTypography>
      <Box display="flex" alignItems="center">
        {fullScreen && (
          <IconButton className={classes.closeButton} onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        )}
        <Typography className={classes.title} variant="h6" noWrap>
          {title}
        </Typography>
        {titleRight}
      </Box>
    </DialogTitle>
  );
}

export default BaseDialogTitle;
