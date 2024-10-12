import { useEffect } from 'react'

const useRedirectOnResize = (isOpen, navigate, toggleDrawer) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && isOpen) {
        navigate('/cart');  // Redirige a la página del carrito
        toggleDrawer(false); // Cierra el Drawer
      }
    }

    // Agrega el event listener se requiere el componente
    window.addEventListener('resize', handleResize);

    // Llama al handler de inmediato para verificar el tamaño inicial
    handleResize();

    // Limpia el event listener cuando no se requiere el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isOpen, navigate, toggleDrawer])
}

export default useRedirectOnResize
