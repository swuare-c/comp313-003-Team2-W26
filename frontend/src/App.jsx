import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Tutorial from "./pages/Tutorial";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordReset from "./pages/PasswordReset";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";


export default function App() {
  const { user } = useAuth();

  // 🔹 Manage Global Theme (Dark/Light Mode)
  useEffect(() => {
    const currentTheme = user?.settings?.theme || "light";
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
  }, [user?.settings?.theme]);

  return (
    <Routes>
      {/* Guest Welcome Page */}
      <Route path="/" element={<Welcome />} />

      {/* Auth-related public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/reset-password-request" element={<PasswordResetRequest />} />
      <Route path="/reset-password" element={<PasswordReset />} />

      {/* Main app (Registered User Dashboard/Home) */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Active Chat Session */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
