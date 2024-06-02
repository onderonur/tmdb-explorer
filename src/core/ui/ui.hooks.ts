import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState, useSyncExternalStore } from 'react';

export function useDebounce<Value>(value: Value, wait = 250) {
  const [debouncedValue, setDebouncedValue] = useState<Value>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      clearTimeout(timer);
    };
  }, [value, wait]);

  return debouncedValue;
}

// We can use this hook to implement a behavior like `getDerivedStateFromProps`
// and update some state **during** render.
// https://react.dev/reference/react/useState#storing-information-from-previous-renders
export function useHasChanged<Val>(val: Val) {
  const [prevVal, setPrevVal] = useState(val);

  if (val !== prevVal) {
    setPrevVal(val);
    return true;
  }
}

export function useIsMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile;
}

const windowScrollYStore = {
  subcribe: (callback: VoidFunction) => {
    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  },
  getSnapshot: () => {
    return window.scrollY;
  },
  getServerSnapshot: () => {
    return 0;
  },
};

export function useWindowScrollY() {
  const windowScrollY = useSyncExternalStore(
    windowScrollYStore.subcribe,
    windowScrollYStore.getSnapshot,
    windowScrollYStore.getServerSnapshot,
  );

  return windowScrollY;
}
