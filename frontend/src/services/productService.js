import API from "./api";

// Get all products
export const getProducts = async () => {
  const response = await API.get("/api/products");
  return response.data;
};

// Get one product
export const getProduct = async (id) => {
  const response = await API.get(`/api/products/${id}`);
  return response.data;
};

// Add product
export const addProduct = async (product, file) => {

  const formData = new FormData();

  formData.append(
    "product",
    new Blob(
      [JSON.stringify(product)],
      { type: "application/json" }
    )
  );

  if (file) {
    formData.append("file", file);
  }

  const response = await API.post(
    "/api/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update product
export const updateProduct = async (id, product) => {
  const response = await API.put(`/api/products/${id}`, product);
  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await API.delete(`/api/products/${id}`);
  return response.data;
};

// Search products
export const searchProducts = async (name) => {
  const response = await API.get(`/api/products/search?name=${name}`);
  return response.data;
};

// Get products by brand
export const getProductsByBrand = async (brand) => {
  const response = await API.get(`/api/products/brand?brand=${brand}`);
  return response.data;
};