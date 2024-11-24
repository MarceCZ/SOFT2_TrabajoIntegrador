jest.mock('../models/usuario', () => ({
  findOne: jest.fn(),
}));

const User = require('../models/usuario');
const { authenticateUser } = require('../services/usuario');

describe('authenticateUser', () => {
  // Limpia los mocks después de cada test
  afterEach(() => {
      jest.clearAllMocks();
  });

  test('Debe retornar el usuario si las credenciales son correctas', async () => {
      // Configurar el mock para devolver un usuario válido
      User.findOne.mockResolvedValue({
          email: 'test@example.com',
          password: '123456',
      });

      const result = await authenticateUser('test@example.com', '123456');
      expect(result).toEqual({
          email: 'test@example.com',
          password: '123456',
      });

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });

  test('Debe retornar null si el usuario no existe', async () => {
      // Configurar el mock para devolver null
      User.findOne.mockResolvedValue(null);

      const result = await authenticateUser('nonexistent@example.com', '123456');
      expect(result).toBeNull();

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
  });

  test('Debe retornar null si la contraseña es incorrecta', async () => {
      // Configurar el mock para devolver un usuario con contraseña diferente
      User.findOne.mockResolvedValue({
          email: 'test@example.com',
          password: '123456',
      });

      const result = await authenticateUser('test@example.com', 'wrongpassword');
      expect(result).toBeNull();

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });

  test('Debe lanzar un error si ocurre un problema con la base de datos', async () => {
      // Configurar el mock para simular un error
      User.findOne.mockRejectedValue(new Error('Database error'));

      await expect(authenticateUser('test@example.com', '123456')).rejects.toThrow('Database error');

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });
});