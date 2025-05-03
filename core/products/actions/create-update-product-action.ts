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

  const checkedImages = await prepareImages(images || []);

  console.log("checkedImages", checkedImages);

  const { data } = await productsApi.patch(`/products/${id}`, {
    ...rest,
    images: checkedImages,
  });

  return data;
};

const createProduct = async (product: Partial<Product>) => {
  const { images, id, ...rest } = product;

  const checkedImages = await prepareImages(images || []);

  const { data } = await productsApi.post("/products", {
    ...rest,
    images: checkedImages,
  });

  return data;
};

const prepareImages = async (images: string[]): Promise<string[]> => {
  const fileImages = images.filter((image) => image.includes("file"));

  const currentImages = images.filter((image) => !image.includes("file"));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(uploadImage);
    const uploadedImages = await Promise.all(uploadPromises);
    return [...currentImages, ...uploadedImages];
  }

  return currentImages.map((image) => image.split("/").pop()!);
};

const uploadImage = async (image: string): Promise<string> => {
  const formData = new FormData() as any;

  formData.append("file", {
    uri: image,
    type: "image/jpeg",
    name: image.split("/").pop()!,
  });

  const { data } = await productsApi.post<{ image: string }>(
    "/files/product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.image;
};
