// layer untuk handle request dan response
// biasanya juga handle validasi body

const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    //   if (typeof id !== "string") {
    //     throw Error("Parameter 'id' must be a string");
    //   }
    const product = await getProductById(req.params.id);

    res.send(product);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.send({
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteProductById(req.params.id);

    res.send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.description &&
      productData.image &&
      productData.price
    )
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const product = await editProductById(productId, productData);

  await res.send({
    data: product,
    message: "Product updated successfully",
  });
});

router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await editProductById(productId, productData);

  res.send({
    data: product,
    message: "Product updated successfully",
  });
});

module.exports = router;
