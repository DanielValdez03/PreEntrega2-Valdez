import productModel from "./models/products.model.js";

class ProductDaoMongo {
  constructor() {
    this.model = productModel;
  }

  async get() {
    return this.model.find({});
  }

  async getBy(filter) {
    return this.model.findOne(filter);
  }

  async create(newProduct) {
    return this.model.create(newProduct);
  }

  async update(pid, updatedProduct) {
    return this.model.updateOne({ _id: pid }, updatedProduct);
  }

  async delete(pid) {
    return this.model.deleteOne({ _id: pid });
  }
}

export default ProductDaoMongo;
