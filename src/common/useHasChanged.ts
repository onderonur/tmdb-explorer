import { useState } from 'react';

// We can use this hook to implement a behavior like `getDerivedStateFromProps`
// and update some state **during** render.
// https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
function useHasChanged<Val>(val: Val) {
  const [prevVal, setPrevVal] = useState(val);

  if (val !== prevVal) {
    setPrevVal(val);
    return true;
  }
}

export default useHasChanged;
