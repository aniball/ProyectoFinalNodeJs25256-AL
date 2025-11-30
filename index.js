import express from "express"
import cors from "cors"
import rutasLog from "./src/routes/auth.routes.js"
import rutasProductos from "./src/routes/products.routes.js"
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 3000;
const corsConfig = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                  // métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],          // cabeceras permitidas
    exposedHeaders: ['Content-Length'],                         // cabeceras visibles al cliente
    credentials: true,                                          // habilitar credenciales
    maxAge: 600,                                                // cache preflight
    optionsSuccessStatus: 204                                   // respuesta preflight exitosa
}

// --- 1. Middlewares Globales
app.use(cors(corsConfig));
app.use(express.json());

// --- 2. Ruta HOME ---
app.get('/', (req, res) => {
    res.status(200).json({
        message: '¡Bienvenido a la API REST de Gestión de Productos!',
        status: 'Servidor Operativo',
        documentacion: 'Consulta /api/login para obtener tu Bearer Token.'
    });
});

// --- 3. Middlewares de Rutas (Routers) ---
app.use("/api", rutasLog);
app.use("/api", rutasProductos)

app.use((req, res, next) => {
    console.log(`Datos received at: ${req.method} ${req.url}`);
    next();
});

// --- 4. Middleware 404 ---
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

