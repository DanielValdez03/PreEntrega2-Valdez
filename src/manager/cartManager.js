import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import { ProducManager } from "../manager/productManager.js";
const managerProd = new ProducManager
class CartManager {
    constructor(){
        this.path = "./src/modules/carritos.json"
    }
    async escritorCarritos(carrito) {
        await fs.writeFile(this.path, JSON.stringify(carrito, null, 2));
      }
      async buscadorPorId(id){
        let listaCarritos = await this.lectorCarritos()
        return listaCarritos.find((carr)=> carr.id === id) 
      }
      async lectorCarritos() {
        let carritos = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carritos);
      }
      async agregarCarrito() {
        let listadoCarritos = await this.lectorCarritos();
        let id = nanoid()
       let carritosActualizados = [{id : id, productos: []}, ...listadoCarritos];
        await this.escritorCarritos(carritosActualizados)
        return "USTED AGREGO CON EXITO ESTE CARRITO";
      }
      async verCarritos(){
        return this.lectorCarritos()
      }

      async verCarritoPorId(id){

           let carritoById = await this.buscadorPorId(id)
           if(!carritoById){
            return "este carrito no existe"
           }
           return carritoById
      }
      async agregarProdEnCarr( cartId, prodId){
let carritoPorId = await this.buscadorPorId(cartId)
if(!carritoPorId){return "no existe este carrito"}
let productoPorId = await managerProd.buscadorPorId(prodId)
if(!productoPorId) {return "este producto no existe"}

let totalCarritos = await this.lectorCarritos()
let carritosfiltrados = totalCarritos.filter((carr)=> carr.id != cartId)

if(carritoPorId.productos.some((prod)=> prod.id === prodId)){
  let productoEnCarrito = carritoPorId.productos.find((prod)=> prod.id === prodId)
  productoEnCarrito.cantidad += 1
  let carritoActualizado = [productoEnCarrito, ...carritosfiltrados]
  await this.escritorCarritos(carritoActualizado)
  return "se agrego + 1 al carrito"
}
let carritoActualizado = [{id : cartId, productos : [{id : productoPorId.id, cantidad: 1, }]} , ...carritosfiltrados]
  await this.escritorCarritos(carritoActualizado)
  return "se agrego el producto al carrito"
      }
}

export default CartManager