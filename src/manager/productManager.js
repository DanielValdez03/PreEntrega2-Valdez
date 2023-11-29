import { promises as fs } from "fs";
import { nanoid } from "nanoid";

export class ProducManager {
    
  constructor() {
    this.path = "./src/modules/products.json";
    
  }
  async escritorProductos(producto) {
    await fs.writeFile(this.path, JSON.stringify(producto, null, 2));
  }
  
  async lectorProductos() {
    let productos = await fs.readFile(this.path, "utf-8");
    return JSON.parse(productos);
  }
  
  async buscadorPorId(id){
    let listadoProductos = await this.lectorProductos()
    return listadoProductos.find((prod)=> prod.id === id)
  }
  async agregarProducto(producto) {
    let listadoProductos = await this.lectorProductos();
    producto.id = nanoid()
    listadoProductos = [...listadoProductos, producto];
    await this.escritorProductos(listadoProductos)
    return "USTED AGREGO CON EXITO ESTE PRODUCTO";
  }

  async verListaProductos() {
    return await this.lectorProductos();
  }
  

  async verProductoPorId(id){
let productoPorId = await this.buscadorPorId(id)
if(!productoPorId){
return "este producto no existe"
}else{
  return productoPorId
}
  }
  async eliminarProdPorId(id) {
    let listaProductos = await this.lectorProductos();
    let nuevaLista = listaProductos.filter((prod) => prod.id !== id);
    await this.escritorProductos(nuevaLista);
    return "Producto eliminado";
  }
  async actualizarProducto(id, datosNuevos) {
    let productoPorId = await this.buscadorPorId(id);
    if (!productoPorId) {
      return "Este producto no existe";
    }
    let listaProductos = await this.lectorProductos();
    let productoActualizado = { ...productoPorId, ...datosNuevos };
    let listaProductoActualizados = listaProductos.map((producto) =>
      producto.id === id ? productoActualizado : producto
    );
    await this.escritorProductos(listaProductoActualizados);
    return "Actualizado con exito"
  }
}
