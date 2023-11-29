// Importamos Express
import express from "express";
import ProductosRouter from "./router/productos.routes.js"
import CarritoRouter from "./router/carritos.routes.js";
// Instanciamos la app de Express con la que manejaremos el servidor
const app = express();
// puerto donde correrá nuestro servidor
const puerto = 8080;
// Le decimos a nuestra app que utilizaremos el formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", ProductosRouter)
app.use("/api/carritos", CarritoRouter)
app.listen(puerto, () => {
  console.log(`Servidor funcionando en puerto: ${puerto} `);
});

