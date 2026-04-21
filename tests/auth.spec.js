const { test, expect } = require('@playwright/test');

// 🧪 Registro
test('Registro de usuario', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'Julian Test',
            email: `julian${Date.now()}@test.com`,
            password: '123456'
        }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty('email');
});


// 🔐 Login
test('Login de usuario', async ({ request }) => {

    const email = `julian${Date.now()}@test.com`;

    // Crear usuario primero
    await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'Julian Test',
            email,
            password: '123456'
        }
    });

    // Luego hacer login
    const response = await request.post('http://localhost:3000/api/auth/login', {
        data: {
            email,
            password: '123456'
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty('token');
});


// 🔥 Ruta protegida
test('Acceso a ruta protegida con JWT', async ({ request }) => {

    const email = `julian${Date.now()}@test.com`;

    // ✅ Crear usuario (CORRECCIÓN)
    await request.post('http://localhost:3000/api/auth/register', {
        data: {
            name: 'Julian Test',
            email,
            password: '123456'
        }
    });

    // ✅ Login con el mismo usuario (CORRECCIÓN)
    const login = await request.post('http://localhost:3000/api/auth/login', {
        data: {
            email,
            password: '123456'
        }
    });

    const loginBody = await login.json();
    console.log("LOGIN BODY:", loginBody);

    const token = loginBody.token;
    expect(token).toBeDefined();

    console.log("TOKEN:", token);

    const response = await request.get('http://localhost:3000/api/users/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log(await response.text());

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
});