const { test, expect } = require('@playwright/test');

//Helper para generar emails únicos
function generarEmail() {
    return `test${Date.now()}@mail.com`;
}

test('Registro exitoso de usuario', async ({ request }) => {
    const email = generarEmail();

    const response = await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'Julian Test',
            email: email,
            password: '123456'
        }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('_id');
    expect(body.email).toBe(email);
    expect(body.role).toBe('USER');
});


test('No permite registrar email duplicado', async ({ request }) => {
    const email = generarEmail();

    // Primer registro
    await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'User1',
            email,
            password: '123456'
        }
    });

    // Segundo registro con el mismo email
    const response = await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'User2',
            email,
            password: '123456'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.message).toContain('email');
});


test('Login exitoso', async ({ request }) => {
    const email = generarEmail();

    // Crear usuario
    await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'Login User',
            email,
            password: '123456'
        }
    });

    // Login
    const response = await request.post('http://localhost:3000/api/auth/login', {
        data: {
            email,
            password: '123456'
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('token');
});


test('Login con contraseña incorrecta', async ({ request }) => {
    const email = generarEmail();

    await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'User Error',
            email,
            password: '123456'
        }
    });

    const response = await request.post('http://localhost:3000/api/auth/login', {
        data: {
            email,
            password: 'wrongpassword'
        }
    });

    expect(response.status()).toBe(401);
});