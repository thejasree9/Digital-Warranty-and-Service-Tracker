import API from "./api";

export const getProducts = async (
  page = 0,
  size = 5,
  sortBy = "productName",
  direction = "asc"
) => {
  const response = await API.get("/api/products", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};

export const getProduct = async (id) => {

    const response = await API.get(`/api/products/${id}`);

    return response.data;
};

export const addProduct = async (product) => {

    const response = await API.post(
        "/api/products",
        product
    );

    return response.data;
};

export const updateProduct = async (id, product) => {

    const response = await API.put(
        `/api/products/${id}`,
        product
    );

    return response.data;
};

export const deleteProduct = async (id) => {

    const response = await API.delete(
        `/api/products/${id}`
    );

    return response.data;
};

export const searchByName = async (name) => {

    const response = await API.get(
        "/api/products/search",
        {
            params: { name }
        }
    );

    return response.data;
};

export const searchByBrand = async (brand) => {

    const response = await API.get(
        "/api/products/brand",
        {
            params: { brand }
        }
    );

    return response.data;
};