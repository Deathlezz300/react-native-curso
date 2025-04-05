import { API_URL, productsApi } from "@/core/api/productsApi";
import { Product } from "@/core/interfaces";

export const getProducts = async (
  limit = 20,
  offset = 0
): Promise<Product[]> => {
  try {
    const { data } = await productsApi.get<Product[]>("/products", {
      params: {
        limit,
        offset,
      },
    });

    return data?.map((product) => ({
      ...product,
      images: product.images.map(
        (image) => `${API_URL}/files/product/${image}`
      ),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
