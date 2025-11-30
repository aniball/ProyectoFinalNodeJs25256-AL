Proyecto Final de Node.js — API REST para gestión de productos

**Descripción**
- **Proyecto**: API REST básica para administrar productos usando Express y Firestore.
- **Propósito**: Ejemplo de integración de autenticación con JWT y persistencia en Firebase Firestore.

**Tecnologías**
- **Runtime**: `Node.js` (proyecto usa módulos ES `type: "module"`).
- **Framework**: `express`.
- **Base de datos**: `Firebase Firestore` (SDK web `firebase`).
- **Autenticación**: `jsonwebtoken` (JWT).

**Estructura del proyecto (resumen)**
- **`index.js`**: Punto de entrada; monta rutas en `/api` y configura middlewares.
- **`src/routes`**: Rutas de autenticación (`auth.routes.js`) y productos (`products.routes.js`).
- **`src/controllers`**: Lógica de controladores (`auth.controllers.js`, `products.controllers.js`).
- **`src/services`**: Lógica de negocio/validaciones para productos (`products.services.js`).
- **`src/models`**: Acceso a Firestore (`products.models.js`).
- **`src/middlewares/authentication.js`**: Middleware que valida el token Bearer.
- **`src/data`**: Configuración de Firebase (`data.js`) y generador de tokens (`token-generator.js`).

**Requisitos**
- Tener `Node.js` instalado (recomendado v16+ o v18+).
- Cuenta de Firebase con Firestore y credenciales configuradas en variables de entorno.

**Variables de entorno**
Colocar un archivo `.env` en la raíz del proyecto con (al menos) estas variables:

- `JWT_SECRET_KEY` — clave secreta para firmar/verificar tokens JWT (si no existe, hay un valor por defecto en el código).
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_APP_ID`

Nota: en `src/data/data.js` el `projectId` está fijado como `backnode-test`. Ajusta si usas otro proyecto.

**Instalación**
1. Clona el repositorio.
2. Instala dependencias:

```
npm install
```

3. Crea `.env` con las variables necesarias (ver sección anterior).

**Scripts disponibles** (en `package.json`)
- `npm start` — ejecuta `node index.js` (producción/simple).
- `npm run dev` — ejecuta `nodemon index.js` (desarrollo).

**Cómo ejecutar**

```
npm install
npm run dev
```

Por defecto el servidor corre en `http://localhost:3000` (puedes cambiar `PORT` mediante la variable de entorno `PORT`).

**Endpoints principales**

- **POST /api/login**
	- **Descripción**: Autentica usuario con email/password y devuelve un JWT.
	- **Request** (JSON): `{ "email": "test@gmail.com", "password": "123456" }` (usuario por defecto en `auth.controllers.js`).
	- **Response**: `200 OK` `{ "token": "<JWT>" }` o `401` si credenciales inválidas.

- **GET /api/products**
	- **Descripción**: Obtiene la lista de productos.
	- **Auth**: No requerida.
	- **Response**: `200 OK` — array de productos.

- **GET /api/products/:id**
	- **Descripción**: Obtiene un producto por su `id` (ID de documento Firestore).
	- **Auth**: No requerida.
	- **Response**: `200 OK` — objeto producto, o `404` si no existe.

- **POST /api/products/create**
	- **Descripción**: Crea un nuevo producto en la colección `products` de Firestore.
	- **Auth**: Requiere token Bearer en cabecera `Authorization: Bearer <token>`.
	- **Request** (JSON) ejemplo:
		`{ "title": "Cafetera", "price": 49.99, "category": "hogar", "description": "Cafetera eléctrica" }`
	- **Response**: `201 Created` con mensaje y objeto creado.

- **DELETE /api/products/:id**
	- **Descripción**: Elimina un producto por `id`.
	- **Auth**: Requiere token Bearer.
	- **Response**: `200 OK` con mensaje o `404` si no existe.

**Autenticación (JWT)**
- El token se obtiene en `/api/login` y vence en 1 hora (ver `src/data/token-generator.js`).
- Para rutas protegidas, enviar cabecera:

```
Authorization: Bearer <TU_TOKEN>
```

**Ejemplos rápido con curl**

- Obtener token (login):

```
curl -X POST http://localhost:3000/api/login \
	-H "Content-Type: application/json" \
	-d '{"email":"test@gmail.com","password":"123456"}'
```

- Crear producto (requiere token):

```
curl -X POST http://localhost:3000/api/products/create \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <TU_TOKEN>" \
	-d '{"title":"Taza","price":5.5,"category":"hogar"}'
```

**Persistencia y Firestore**
- La colección utilizada es `products`.
- Las operaciones usan funciones de la SDK: `getDocs`, `getDoc`, `addDoc`, `deleteDoc`.
- Asegúrate de configurar correctamente las variables de entorno para que `src/data/data.js` inicialice Firebase.

**Errores y manejo**
- Respuestas HTTP usadas en el proyecto: `200`, `201`, `400`, `401`, `403`, `404`, `500`.
- El middleware de autenticación devuelve `401` si no hay token y `403` si el token es inválido/expirado.


**Licencia**
- `ISC` (según `package.json`).
