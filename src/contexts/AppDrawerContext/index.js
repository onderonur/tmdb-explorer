import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
// import { useLocation } from "react-router-dom";

const AppDrawerContext = React.createContext();

export function useAppDrawer() {
  const value = useContext(AppDrawerContext);
  return value;
}

function AppDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  // const location = useLocation();

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const router = useRouter();

  // We close the drawer when a route change gets completed.
  useEffect(() => {
    const eventType = 'routeChangeComplete';

    router.events.on(eventType, close);

    return () => {
      router.events.off(eventType, close);
    };
  }, [close, router.events]);

  const contextValue = useMemo(() => ({ isOpen, open, close, toggle }), [
    close,
    isOpen,
    open,
    toggle,
  ]);

  return (
    <AppDrawerContext.Provider value={contextValue}>
      {children}
    </AppDrawerContext.Provider>
  );
}

export default AppDrawerProvider;
