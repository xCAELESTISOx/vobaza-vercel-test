import { useRef } from 'react';

export default function useDebounce(func: (...args: any[]) => any, delay: number) {
  const ref = useRef<NodeJS.Timer | null>(null);

  return (...args: any) => {
    clearTimeout(ref.current!);
    ref.current = setTimeout(() => func(...args), delay);
  };
}
