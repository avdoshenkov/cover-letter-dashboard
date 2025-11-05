import { useEffect } from 'react';

type TUsePreventNavigationProps = {
  shouldPrevent: boolean;
};

export const usePreventNavigation = ({ shouldPrevent }: TUsePreventNavigationProps) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldPrevent) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldPrevent]);
};
