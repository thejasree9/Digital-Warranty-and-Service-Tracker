import API from "./api";

// Get all services
export const getServices = async () => {
  const response = await API.get("/api/services");
  return response.data;
};

// Get one service
export const getService = async (id) => {
  const response = await API.get(`/api/services/${id}`);
  return response.data;
};

// Add service with file upload
export const addService = async (service, file) => {

  const formData = new FormData();

  formData.append(
    "service",
    new Blob(
      [JSON.stringify(service)],
      {
        type: "application/json",
      }
    )
  );

  if (file) {
    formData.append("file", file);
  }

  const response = await API.post(
    "/api/services",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update service with file upload
export const updateService = async (id, service, file) => {

  const formData = new FormData();

  formData.append(
    "service",
    new Blob(
      [JSON.stringify(service)],
      {
        type: "application/json",
      }
    )
  );

  if (file) {
    formData.append("file", file);
  }

  const response = await API.put(
    `/api/services/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete service
export const deleteService = async (id) => {
  const response = await API.delete(`/api/services/${id}`);
  return response.data;
};

// Get services by product
export const getServicesByProduct = async (productId) => {
  const response = await API.get(`/api/services/product/${productId}`);
  return response.data;
};