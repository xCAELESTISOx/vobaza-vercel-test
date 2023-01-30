import { useState, useEffect } from 'react';

export const useMatchScreen = (width) => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window?.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth === null ? null : screenWidth <= width;
};