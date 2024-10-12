
const useDrawerToggle = (isOpen, toggleDrawer) => {
    return {
      isOpen,
      closeDrawer: () => toggleDrawer(false),
    }
  }
  
  export default useDrawerToggle
  