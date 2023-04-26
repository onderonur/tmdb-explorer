import { createContext, useContext } from 'react';

interface BaseDialogContextValue {
  closeDialog: VoidFunction;
}

const BaseDialogContext = createContext({} as BaseDialogContextValue);

export function useBaseDialogContext() {
  return useContext(BaseDialogContext);
}

const BaseDialogProvider = BaseDialogContext.Provider;

export default BaseDialogProvider;
