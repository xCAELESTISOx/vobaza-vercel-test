import { useState, useEffect, RefObject } from 'react';

interface Options {
  initialVal?: boolean;
  duration?: number;
}

export const useCollapse = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  options: Options = {}
) => {
  const { initialVal, duration } = options;

  const [state, setState] = useState<boolean>(!!initialVal);

  useEffect(() => {
    ref.current.style.transition = `height ${+duration || 200}ms ease-in-out`;
    ref.current.style.height = state ? 'auto' : '0px';
    ref.current.style.overflow = 'hidden';
  }, []);

  const setAuto = () => (ref.current.style.height = 'auto');

  useEffect(() => {
    let timer: NodeJS.Timeout = null;

    requestAnimationFrame(() => {
      ref.current.style.height = ref.current.scrollHeight + 'px';

      requestAnimationFrame(() => {
        if (state) {
          timer = setTimeout(setAuto, +duration || 200);
        } else {
          ref.current.style.height = '0px';
        }
      });
    });

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  const toggle = (bool?: boolean) => {
    if (typeof bool === 'boolean') {
      setState(bool);
    } else {
      setState(!state);
    }
  };

  return [state, toggle];
};
