jest.mock('../services/producto', () => ({
    findAllComplete: jest.fn(),
    findOneComplete: jest.fn(),
  }));
  
  const controller = require('../controllers/producto');  // Importa el controlador correctamente
  const { findAllComplete, findOneComplete } = require('../services/producto');  // Importa las funciones mockeadas
  
  describe('Controller: findAllComplete', () => {
    let mockReq, mockRes;
  
    beforeEach(() => {
      mockReq = {}; // Solicitud vacía ya que no se necesitan parámetros
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('debería devolver 200 con una lista de productos', async () => {
      const mockProductos = [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto 2' },
      ];
  
      // Mock de la respuesta exitosa
      findAllComplete.mockResolvedValue(mockProductos);
  
      // Llamada al controlador correctamente
      await controller.findAllComplete(mockReq, mockRes);
  
      expect(findAllComplete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProductos);
    });
  
    it('debería devolver 500 si no hay productos', async () => {
      // Mock de la respuesta con null (sin productos)
      findAllComplete.mockResolvedValue(null);
  
      await controller.findAllComplete(mockReq, mockRes);
  
      expect(findAllComplete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error al obtener productos.' });
    });
  
    it('debería devolver 500 si ocurre un error', async () => {
      // Mock de la respuesta con error
      findAllComplete.mockRejectedValue(new Error('Error inesperado'));
  
      await controller.findAllComplete(mockReq, mockRes);
  
      expect(findAllComplete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error al obtener productos.' });
    });
  });
  
  describe('Controller: findOneComplete', () => {
    let mockReq, mockRes;
  
    beforeEach(() => {
      mockReq = { params: { id: 1 } }; // Simula una solicitud con ID
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('debería devolver 200 con un producto válido', async () => {
      const mockProducto = { id: 1, nombre: 'Producto 1' };
  
      // Mock de la respuesta exitosa
      findOneComplete.mockResolvedValue(mockProducto);
  
      await controller.findOneComplete(mockReq, mockRes);
  
      expect(findOneComplete).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProducto);
    });
  
    it('debería devolver 404 si no se encuentra el producto', async () => {
      // Mock de la respuesta con null (producto no encontrado)
      findOneComplete.mockResolvedValue(null);
  
      await controller.findOneComplete(mockReq, mockRes);
  
      expect(findOneComplete).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Producto no encontrado.' });
    });
  
    it('debería devolver 500 si ocurre un error en el servicio', async () => {
      // Mock de la respuesta con error
      findOneComplete.mockRejectedValue(new Error('Error inesperado'));
  
      await controller.findOneComplete(mockReq, mockRes);
  
      expect(findOneComplete).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error al obtener producto.' });
    });
  });
  