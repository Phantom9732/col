import { useEffect } from 'react';

export const RestoreScroll = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return null;
};
