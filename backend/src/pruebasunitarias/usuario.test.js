import controller from '../controllers/usuario.js';
const { login } = controller;

import usuarioService from '../services/usuario.js';

jest.mock('../services/usuario.js', () => ({
  authenticateUser: jest.fn(),
}));

describe('Método login', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@mail.com',
        password: '12345678',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debe devolver 200 y el usuario si el correo y contraseña son correctos', async () => {
    usuarioService.authenticateUser.mockResolvedValue({
      id: 1,
      email: 'test@mail.com',
    });

    await login(req, res);

    expect(usuarioService.authenticateUser).toHaveBeenCalledWith('test@mail.com', '12345678');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      email: 'test@mail.com',
    });
  });

  it('Debe devolver 500 si el usuario no existe', async () => {
    usuarioService.authenticateUser.mockResolvedValue(null);

    await login(req, res);

    expect(usuarioService.authenticateUser).toHaveBeenCalledWith('test@mail.com', '12345678');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario o contraseña incorrectos.',
    });
  });

  it('Debe devolver 500 si la contraseña es incorrecta', async () => {
    usuarioService.authenticateUser.mockResolvedValue(null);

    req.body.password = 'contraincorrecta';

    await login(req, res);

    expect(usuarioService.authenticateUser).toHaveBeenCalledWith('test@mail.com', 'contraincorrecta');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario o contraseña incorrectos.',
    });
  });

  it('Debe devolver 500 si ocurre un error en el servidor', async () => {
    usuarioService.authenticateUser.mockRejectedValue(new Error('Error en el servidor'));

    await login(req, res);
    expect(usuarioService.authenticateUser).toHaveBeenCalledWith('test@mail.com', '12345678');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error en el servidor.',
    });
  });
});

  