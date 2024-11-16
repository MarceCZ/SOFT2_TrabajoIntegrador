import { useState } from 'react';

const useUserDrawer = () => {
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);

  const toggleUserDrawer = (open) => () => {
    setIsUserDrawerOpen(open);
  };

  return {
    isUserDrawerOpen,
    toggleUserDrawer,
  };
};

export default useUserDrawer;
