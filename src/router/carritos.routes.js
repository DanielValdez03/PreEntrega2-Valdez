import { Router } from "express";
import CartManager from "../manager/cartManager.js";
const CarritoRouter = Router()
const manager = new CartManager
CarritoRouter.post("/", async (req, res)=>{
    res.send(await manager.agregarCarrito())
})
CarritoRouter.get("/", async(req, res)=>{
    res.send(await manager.verCarritos())
} )
CarritoRouter.get("/:id", async(req, res)=>{
    let id = req.params.id
    res.send(await manager.verCarritoPorId(id))
} )
CarritoRouter.post("/:carrid/productos/:prodid", async (req,res)=>{
    let idCarrito = req.params.carrid
    let idProd = req.params.prodid
    res.send(await manager.agregarProdEnCarr(idCarrito, idProd))
})
export default CarritoRouter