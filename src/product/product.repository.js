//tugasnya berkomunikasi dengan database
// boleh pake ORM, boleh pake raw query
// supaya apa? supaya kalo mau ganti-ganti ORM tinggal edit di file ini

const prisma = require("../db");

const findProducts = async () => {
  return await prisma.product.findMany();
};

const findProductsById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

const findProductsByName = async (name) => {
  return await prisma.product.findFirst({
    where: {
      name,
    },
  });
};

const insertProduct = async (productData) => {
  return await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};

const editProduct = async (id, productData) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
};

module.exports = {
  findProducts,
  findProductsById,
  findProductsByName,
  insertProduct,
  deleteProduct,
  editProduct,
};
