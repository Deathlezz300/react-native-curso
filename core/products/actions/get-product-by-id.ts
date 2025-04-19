import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, Product } from "@/core/interfaces";

const emptyProduct: Product = {
  title: "",
  slug: "",
  description: "",
  price: 0,
  stock: 0,
  images: [],
  sizes: [],
  gender: Gender.Unisex,
  tags: [],
  id: "",
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    if (id === "new") return emptyProduct;

    const { data } = await productsApi.get<Product>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/product/${image}`),
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
