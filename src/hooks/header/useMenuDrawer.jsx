import { useState } from 'react';

const useMenuDrawer = () => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  const toggleMenuDrawer = (open) => () => {
    setIsMenuDrawerOpen(open);
  };

  return {
    isMenuDrawerOpen,
    toggleMenuDrawer,
  };
};

export default useMenuDrawer;
