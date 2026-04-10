import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",   // backend port
    withCredentials: true,              // IMPORTANT for HTTPOnly JWT cookie
});

export default api;
