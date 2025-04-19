import { productsApi } from "@/core/api/productsApi";
import { Product } from "../../interfaces";

export const updateOrCreateProduct = async (product: Partial<Product>) => {
  try {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);

    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    product.gender = Array.isArray(product.gender)
      ? product.gender?.[0]
      : product.gender;

    let data;

    if (product.id && product.id !== "new") {
      data = await updateProduct(product);
    } else {
      data = await createProduct(product);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (product: Partial<Product>) => {
  const { id, images, user, ...rest } = product;

  const { data } = await productsApi.patch(`/products/${id}`, {
    ...rest,
  });

  return data;
};

const createProduct = async (product: Partial<Product>) => {
  const { images, id, ...rest } = product;

  const { data } = await productsApi.post("/products", {
    ...rest,
    images: [],
  });

  return data;
};
