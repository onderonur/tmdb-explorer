import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash/debounce';

function useDebounce<Value>(value: Value, wait: number = 250) {
  const [debouncedValue, setDebouncedValue] = useState<Value>(value);
  const changeHandlerRef = useRef<ReturnType<typeof debounce>>();

  useEffect(() => {
    changeHandlerRef.current = debounce(
      (newValue) => setDebouncedValue(newValue),
      wait,
    );

    return () => changeHandlerRef.current?.cancel();
  }, [wait]);

  useEffect(() => {
    changeHandlerRef.current?.(value);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
