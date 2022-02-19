import React, { useContext } from 'react';
import { BaseDialogProps } from './BaseDialog';

interface BaseDialogContextValue {
  fullScreen: BaseDialogProps['fullScreen'];
  closeDialog: VoidFunction;
}

const BaseDialogContext = React.createContext({} as BaseDialogContextValue);

export function useBaseDialogContext() {
  return useContext(BaseDialogContext);
}

const BaseDialogProvider = BaseDialogContext.Provider;

export default BaseDialogProvider;
