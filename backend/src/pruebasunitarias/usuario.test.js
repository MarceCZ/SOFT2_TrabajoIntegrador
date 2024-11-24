jest.mock('../services/usuario', () => ({
  authenticateUser: jest.fn(),
}));

const usuarioService = require('../services/usuario');
const { login } = require('../controllers/usuario');

describe('Método login', () => {
  let mockReq, mockRes;

  beforeEach(() => {
      mockReq = {
          body: {},
      };

      mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      };
  });

  afterEach(() => {
      jest.clearAllMocks();
  });

  test('Debe devolver 200 y el usuario si el correo y contraseña son correctos', async () => {
      const mockUser = { id: 1, email: 'test@mail.com'};
      usuarioService.authenticateUser.mockResolvedValue(mockUser);

      mockReq.body = { email: 'test@mail.com', password: '12345678' };

      await login(mockReq, mockRes);

      expect(usuarioService.authenticateUser).toHaveBeenCalledWith('test@mail.com', '12345678');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
  });

  test('Debe devolver 500 si el usuario no existe', async () => {
      usuarioService.authenticateUser.mockResolvedValue(null);

      mockReq.body = { email: 'noexiste@mail.com', password: '12345678' };

      await login(mockReq, mockRes);

      expect(usuarioService.authenticateUser).toHaveBeenCalledWith('noexiste@mail.com', '12345678');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario o contraseña incorrectos.' });
  });

  test('Debe devolver 500 si la contraseña es incorrecta', async () => {
      usuarioService.authenticateUser.mockResolvedValue(null);

      mockReq.body = { email: 'test@mail.com', password: 'contraincorrecta' };

      await login(mockReq, mockRes);

      expect(usuarioService.authenticateUser).toHaveBeenCalledWith('test@mail.com', 'contraincorrecta');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuario o contraseña incorrectos.' });
  });

  test('Debe devolver 500 si ocurre un error en el servidor', async () => {
      usuarioService.authenticateUser.mockRejectedValue(new Error('Error al conectarse al servidor'));

      mockReq.body = { email: 'test@mail.com', password: '12345678' };

      await login(mockReq, mockRes);

      expect(usuarioService.authenticateUser).toHaveBeenCalledWith('test@mail.com', '12345678');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error en el servidor.' });
  });
});
