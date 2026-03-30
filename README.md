API RESTful para gestión de facturación con autenticación JWT y pruebas automatizadas integradas.

Este proyecto combina desarrollo backend con aseguramiento de calidad (QA), permitiendo validar automáticamente el funcionamiento de la API.
## Tecnologías
- Node.js
- Express
- MongoDB
- JWT (Autenticación)
- Swagger (OpenAPI)
- Postman + Newman (Automatización de pruebas)

  ## Enfoque QA

Este proyecto implementa automatización de pruebas como parte del desarrollo, permitiendo:

- Validar endpoints automáticamente
- Detectar errores de forma temprana
- Ejecutar pruebas completas con un solo comando

## Instalación
npm install

## Variables de entorno
Crea un archivo `.env` usando `.env.example`

## Ejecutar
npm run dev

## Autenticación
1. Inicia sesión en `/api/auth/login`
2. Copia el token JWT
3. Usa el token como `Bearer` en Swagger o Postman

## Documentación
Swagger disponible en:
http://localhost:3000/api/docs

##  Pruebas QA con Postman

El proyecto incluye una colección de Postman para probar la API.

 Ruta:
postman/mini-erp.postman_collection.json

### Cómo usarla
1. Importar la colección en Postman
2. Crear un Environment con:
    - baseUrl = http://localhost:3000
    - token = (JWT obtenido al hacer login)
3. Ejecutar los endpoints protegidos

### Pruebas automáticas con Postman (Newman)

- El proyecto incluye una colección de Postman para ejecutar pruebas de la API de forma automática desde la consola usando Newman.

### Archivos incluidos

- postman/mini-erp.postman_collection.json

- postman/environment.json

### Configurar el Environment

- En el archivo postman/environment.json asegúrate de tener:

{
"key": "baseUrl",
"value": "http://localhost:3000",
"enabled": true
}

### El token JWT se genera automáticamente durante la ejecución de la colección (login), no es necesario ponerlo manualmente.

### Instalar Newman (una sola vez)
- npm install -g newman
### Ejecutar las pruebas automáticamente

- Desde la raíz del proyecto ejecuta:

 newman run postman/mini-erp.postman_collection.json -e postman/environment.json

### Esto:

- Ejecuta toda la colección

- Valida códigos de estado (200, 201, etc.)

- Muestra resultados de cada endpoint en consola

### Resultado esperado

- Si todo está correcto, verás algo como:

✔ Registrar un nuevo usuario
✔ Login
✔ Crear factura
✔ Listar facturas
