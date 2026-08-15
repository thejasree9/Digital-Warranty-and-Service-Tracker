import API from "./api";

// Get all warranties
export const getWarranties = async () => {

  const response = await API.get("/api/warranty");

  return response.data;

};

// Get warranty by product id
export const getWarranty = async (productId) => {

  const response = await API.get(
    `/api/warranty/${productId}`
  );

  return response.data;

};

// Add warranty
export const addWarranty = async (warranty, file) => {

  const formData = new FormData();

  formData.append(
    "warranty",
    new Blob(
      [JSON.stringify(warranty)],
      {
        type: "application/json",
      }
    )
  );

  if (file) {

    formData.append("file", file);

  }

  const response = await API.post(
    "/api/warranty",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};

// Update warranty
export const updateWarranty = async (
  productId,
  warranty,
  file
) => {

  const formData = new FormData();

  formData.append(
    "warranty",
    new Blob(
      [JSON.stringify(warranty)],
      {
        type: "application/json",
      }
    )
  );

  if (file) {

    formData.append("file", file);

  }

  const response = await API.put(
    `/api/warranty/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};

// Delete warranty
export const deleteWarranty = async (productId) => {

  const response = await API.delete(
    `/api/warranty/${productId}`
  );

  return response.data;

};