import api from "./axios";

export const registerApi = (payload) => api.post("/api/auth/register", payload);
export const loginApi = (payload) => api.post("/api/auth/login", payload);
export const logoutApi = () => api.post("/api/auth/logout");
export const meApi = () => api.get("/api/auth/me");
export const updateProfileApi = (payload) => api.put("/api/auth/update-profile", payload);
export const deleteAccountApi = () => api.delete("/api/auth/delete-account");

export const requestPasswordResetApi = (email) =>
  api.post("/api/auth/request-password-reset", { email });

export const resetPasswordApi = (payload) =>
  api.post("/api/auth/reset-password", payload);