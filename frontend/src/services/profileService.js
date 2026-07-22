import API from "./api";

// Get Profile
export const getProfile = async () => {
  const response = await API.get("/api/profile");
  return response.data;
};

// Update Profile
export const updateProfile = async (profile) => {
  const response = await API.put("/api/profile", profile);
  return response.data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const response = await API.post(
    "/api/profile/change-password",
    passwordData
  );

  return response.data;
};