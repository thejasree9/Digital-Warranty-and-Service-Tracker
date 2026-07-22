import API from "./api";

export const getProfile = async () => {
  const response = await API.get("/api/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await API.put("/api/profile", profileData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await API.post(
    "/api/profile/change-password",
    passwordData
  );

  return response.data;
};