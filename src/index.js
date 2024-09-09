const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const productController = require("./product/product.controller");

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
