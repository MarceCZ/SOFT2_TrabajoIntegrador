import service from '../services/usuario.js'; 
import Usuario from '../models/usuario.js'; 
import Cliente from '../models/cliente.js'; 

jest.mock('../models/Usuario', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../models/Cliente', () => ({
  create: jest.fn(),
}));

jest.mock('../config/database', () => ({
  transaction: jest.fn().mockReturnValue({
    commit: jest.fn(),
    rollback: jest.fn(),
  }),
}));

describe('Crear usuario y cliente', () => {
  let payload;

  beforeEach(() => {
    // Datos de ejemplo para el payload
    payload = {
      email: 'usuario@ejemplo.com',
      password: 'contraseña123',
      dni: '12345678',
      nombre: 'Juan',
      apellido1: 'Pérez',
      apellido2: 'Gómez',
      celular: '987654321',
      distrito: 'Lima',
      referencias: 'Cerca de la plaza principal',
      direccion: 'Av. Los Olivos 123',
    };
  });

  it('debe crear un usuario y un cliente correctamente', async () => {
    // Simular que el usuario no existe
    Usuario.findOne.mockResolvedValue(null);

    // Simular que el método de creación funciona correctamente
    Usuario.create.mockResolvedValue({ id: 1 });
    Cliente.create.mockResolvedValue({});

    const result = await service.crearUsuarioCliente(payload);

    // Verificar que los métodos fueron llamados correctamente
    expect(Usuario.findOne).toHaveBeenCalledWith({ where: { email: payload.email } });
    expect(Usuario.create).toHaveBeenCalledWith({ email: payload.email, password: payload.password }, { transaction: expect.any(Object) });
    expect(Cliente.create).toHaveBeenCalledWith({
      dni: payload.dni,
      nombre: payload.nombre,
      apellido1: payload.apellido1,
      apellido2: payload.apellido2,
      direccion: payload.direccion,
      distrito: payload.distrito,
      referencias: payload.referencias,
      celular: payload.celular,
      idUsuario: 1,
    }, { transaction: expect.any(Object) });
    expect(result).toEqual({
      message: 'Usuario y cliente creados con éxito.',
      idUsuario: 1,
      status: 200,
    });
  });

  it('debe lanzar un error si falta algún dato obligatorio', async () => {
    // Simular falta de datos en el payload
    const incompletePayload = { ...payload };
    delete incompletePayload.email;

    await expect(service.crearUsuarioCliente(incompletePayload)).rejects.toThrow('Faltan datos obligatorios.');
  });

  it('debe lanzar un error si el correo ya está registrado', async () => {
    // Simular que ya existe un usuario con el correo proporcionado
    Usuario.findOne.mockResolvedValue({ id: 1 });

    await expect(service.crearUsuarioCliente(payload)).rejects.toThrow(`El correo ${payload.email} ya está registrado.`);
  });

  it('debe manejar errores de transacción correctamente', async () => {
    // Simular que el usuario no existe
    Usuario.findOne.mockResolvedValue(null);

    // Simular error al crear el usuario
    Usuario.create.mockRejectedValue(new Error('Error al crear usuario'));

    await expect(service.crearUsuarioCliente(payload)).rejects.toThrow('Error al crear el usuario y cliente: Error al crear usuario');
  });
});