'use client';

import { createSafeContext } from '@/common/safe-context';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect, useMemo } from 'react';

type AppDrawerContextValue = {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
};

const [AppDrawerContext, useAppDrawerContext] =
  createSafeContext<AppDrawerContextValue>({ displayName: 'AppDrawerContext' });

export { useAppDrawerContext };

type AppDrawerProviderProps = React.PropsWithChildren<unknown>;

function AppDrawerProvider({ children }: AppDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    return () => {
      close();
    };
  }, [pathname, close]);

  const contextValue = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [close, isOpen, open, toggle],
  );

  return (
    <AppDrawerContext.Provider value={contextValue}>
      {children}
    </AppDrawerContext.Provider>
  );
}

export default AppDrawerProvider;
