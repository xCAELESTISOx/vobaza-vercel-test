import { useRef } from 'react';

export default function useDebounce(func: (...args: unknown[]) => any, delay: number) {
  const ref = useRef<NodeJS.Timer | null>(null);

  return (...args) => {
    clearTimeout(ref.current!);
    ref.current = setTimeout(() => func(...args), delay);
  };
}
