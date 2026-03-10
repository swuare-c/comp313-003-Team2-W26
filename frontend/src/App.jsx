import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";

function Placeholder({ title }) {
  return (
    <div className="min-h-screen bg-background-light text-slate-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Placeholder title="Login" />} />
      <Route path="/register" element={<Placeholder title="Registration" />} />
      <Route path="/guest-tutorial" element={<Placeholder title="Guest Tutorial" />} />
      <Route path="/reset-password" element={<Placeholder title="Reset Password" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
