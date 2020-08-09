import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash/debounce';

function useDebounce(value, wait = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const changeHandlerRef = useRef();

  useEffect(() => {
    changeHandlerRef.current = debounce(
      (newValue) => setDebouncedValue(newValue),
      wait,
    );

    return () => changeHandlerRef.current.cancel();
  }, [wait]);

  useEffect(() => {
    changeHandlerRef.current(value);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
