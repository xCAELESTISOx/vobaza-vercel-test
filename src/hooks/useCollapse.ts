import { useState, useEffect, RefObject } from 'react';

interface Options {
  initialVal?: boolean;
  duration?: number;
  autoDuration?: boolean;
}
// Шаг на каждую тысячу пикселей
const AUTODURATION_STEP = 200;

export const useCollapse = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, options: Options = {}) => {
  const { initialVal, duration, autoDuration } = options;

  const [isOpen, setIsOpen] = useState(Boolean(initialVal));
  const [innerDuration, setInnerDuration] = useState(+duration || 200);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transition = `height ${innerDuration}ms ease-in-out`;
      ref.current.style.height = isOpen ? 'auto' : '0px';
      ref.current.style.overflow = 'hidden';
      ref.current.style.willChange = 'height';
    }
  }, [ref, innerDuration]);

  useEffect(() => {
    if (autoDuration) {
      const heightMultiplier = Math.floor(ref.current.scrollHeight / 500);
      setInnerDuration(200 + heightMultiplier * AUTODURATION_STEP);
    } else {
      setInnerDuration(+duration || 200);
    }
  }, [ref, options]);

  const setAuto = () => (ref.current.style.height = 'auto');

  useEffect(() => {
    let timer: NodeJS.Timeout = null;

    requestAnimationFrame(() => {
      if (ref.current) ref.current.style.height = ref.current.scrollHeight + 'px';

      requestAnimationFrame(() => {
        if (isOpen) {
          timer = setTimeout(setAuto, innerDuration);
        } else {
          if (ref.current) ref.current.style.height = '0px';
        }
      });
    });

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  const toggle = (bool?: boolean) => {
    if (typeof bool === 'boolean') {
      setIsOpen(bool);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return [isOpen, toggle];
};
