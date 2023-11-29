import { promises as fs } from "fs";
import { nanoid } from "nanoid";
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
      async agregarProdEnCarr(prodId, cartId){

      }
}

export default CartManager