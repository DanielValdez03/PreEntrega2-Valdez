import { Router } from "express";
const ProductosRouter = Router()
// Importamos nuestro Manager 
import { ProducManager } from "../manager/productManager.js";
// Instanciamos nuestro manager para hacer llamado a nuestros metodos en ProductManager.js
const manager = new ProducManager();
// Metodo GET con el el servidor nos dara como respuesta el listado(array) de nuestros productos
ProductosRouter.get("/", async (req, res) => {
    res.send(await manager.verListaProductos())
})
// Metodo GET que devuelve el producto cuyo id especifiquemos en la url
ProductosRouter.get("/:id", async (req, res) => {
  let id = req.params.id
  res.send(await manager.verProductoPorId(id))
})
// Metdo Post el cual agregará un producto y actualizará nuestra lista de productos
ProductosRouter.post("/", async (req, res) => {
  const productoNuevo = {
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status || true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || [],
  };
  res.send(await manager.agregarProducto(productoNuevo));
});
//Metodo PUT con el que actualizaremos un producto ya existente en nuestro listado
ProductosRouter.put("/:id", async (req, res) => {
  let id = req.params.id
  let productoActualizado = req.body
  res.send(await manager.actualizarProducto(id, productoActualizado))
})
// Metodo DELETE el cual eliminará el producto cuyo id especifiquemos en la url
ProductosRouter.delete("/:id", async (req, res) => {
  let id = req.params.id
  res.send(await manager.eliminarProdPorId(id))
})
export default ProductosRouter