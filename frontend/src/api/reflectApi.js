import api from "./axios";

export const reflectApi = (text) => api.post("/api/reflect", { text });

export const fetchHistory = () => api.get("/api/reflect/history");

export const clearHistory = () => api.delete("/api/reflect/history");