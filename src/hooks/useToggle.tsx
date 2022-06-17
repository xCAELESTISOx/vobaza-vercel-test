import { useCallback, useState } from 'react';

export default function useToggle(initialState: boolean = false): [boolean, (value?: any) => void] {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback((value?: any): void => {
    if (typeof value === 'boolean') {
      setState(value);
    } else {
      setState((prev) => !prev);
    }
  }, []);
  return [state, toggle];
}
