import API from "./api";

// Get all products (with pagination)
export const getProducts = async (
  page = 0,
  size = 5,
  sortBy = "productName",
  direction = "asc"
) => {

  const response = await API.get(
    `/api/products?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
  );

  return response.data;
};

// Get single product
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
export const updateProduct = async (id, product, file) => {

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

  const response = await API.put(
    `/api/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {

  const response = await API.delete(`/api/products/${id}`);

  return response.data;
};

// Search by product name
export const searchProducts = async (name) => {

  const response = await API.get(
    `/api/products/search?name=${name}`
  );

  return response.data;
};

// Search by brand
export const getProductsByBrand = async (brand) => {

  const response = await API.get(
    `/api/products/brand?brand=${brand}`
  );

  return response.data;
};