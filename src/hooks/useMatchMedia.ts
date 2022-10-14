import { useState, useEffect } from 'react';

export const useMatchMedia = (width) => {
  const [isMatch, setIsMatch] = useState(false);

  const checkMatches = (e) => {
    setIsMatch(Boolean(e.matches));
  };

  useEffect(() => {
    setIsMatch(window.innerWidth < width);

    const mediaQueryMax = window.matchMedia(`(max-width: ${width}px)`);
    mediaQueryMax.onchange = checkMatches;

    return () => {
      mediaQueryMax.onchange = null;
    };
  }, []);

  return isMatch;
};
