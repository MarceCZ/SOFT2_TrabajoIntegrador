import controller from '../controllers/suscripcion.js';
import service from '../services/suscripcion.js';

// Mockear el servicio
jest.mock('../services/suscripcion.js', () => ({
  createSubswithKit: jest.fn(),
}));

describe('Crear suscripción', () => {
  let req;
  let res;

  beforeEach(() => {
    // Mock de la solicitud (req) y respuesta (res)
    req = {
      body: {
        userId: 1,
        subsType: '6meses',
        totalCartPrice: 100,
        recetaLink: null,
        cartProducts: [{ productId: 1, cantidad: 1 }],
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('debe crear una nueva suscripción correctamente', async () => {
    // Mock de la respuesta esperada del servicio
    service.createSubswithKit.mockResolvedValue({
      message: 'Subscripción creada con éxito.',
      status: 200,
      id: 1,
    });

    // Ejecutamos el controlador
    await controller.create(req, res);

    // Verificar que el servicio fue llamado
    expect(service.createSubswithKit).toHaveBeenCalledWith(req.body);

    // Verificar la respuesta
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Subscripción creada con éxito.',
      status: 200,
      id: 1,
    });
  });

  it('debe manejar errores durante la creación de la suscripción', async () => {
    // Mock de un error del servicio
    service.createSubswithKit.mockRejectedValue(new Error('Error al crear la suscripción'));

    // Ejecutamos el controlador
    await controller.create(req, res);

    // Verificar la respuesta de error
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error en la creacion de la subscripcion.',
    });
  });

  it('debe devolver un error 400 cuando faltan campos obligatorios', async () => {
    // Simula que falta información en la solicitud
    req.body = {
      userId: null, // Este campo debería ser obligatorio
      subsType: '6meses',
      totalCartPrice: 100,
      recetaLink: null,
      cartProducts: [{ productId: 1, cantidad: 1 }],
    };

    // Ejecutar la función
    await controller.create(req, res);

    // Verificar la respuesta de error
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Los campos obligatorios están incompletos.',
    });
  });

  it('debe manejar errores inesperados en el controlador', async () => {
    // Mock de un error inesperado en el controlador
    service.createSubswithKit.mockRejectedValue(new Error('Error inesperado'));

    // Ejecutamos el controlador
    await controller.create(req, res);

    // Verificar la respuesta de error
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error en la creacion de la subscripcion.',
    });
  });
});
