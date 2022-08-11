import { DialogContent, styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

export type BaseDialogContentProps = {
  zeroPaddingContent: boolean;
};

const BaseDialogContent = styled(DialogContent, {
  shouldForwardProp: (prop) => isPropValid(prop as string),
})<BaseDialogContentProps>(({ zeroPaddingContent }) => ({
  padding: zeroPaddingContent ? 0 : undefined,
}));

export default BaseDialogContent;
