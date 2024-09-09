//service layer untuk handle business logic
// kenapa dipisah? uspaya tanggung jawabnya ter-isolate dan function nya reusable

const prisma = require("../db");
const {
  findProductsById,
  findProducts,
  insertProduct,
  findProductsByName,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  //   if (typeof id !== "string") {
  //     throw Error("Parameter 'id' must be a string");
  //   }

  const product = await findProductsById(id);
  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const findProduct = await findProductsByName(newProductData.name);
  if (findProduct) {
    throw Error("Product already exists");
  }

  return await insertProduct(newProductData);
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);
  return await editProduct(id, productData);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
