import { Router } from "express";
import ProductController from "../../controllers/products.controller.js";

const productRouter = Router();
const {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
} = new ProductController();

productRouter
  .get("/", getProducts)

  .get("/:pid", getProductById)

  .post("/", createProduct)

  .put("/:pid", updateProduct)

  .delete("/:pid", deleteProduct);

export default productRouter;
