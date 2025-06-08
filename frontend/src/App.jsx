import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminClinics from "./pages/AdminClinics";
import AdminTreatments from "./pages/AdminTreatments";
import AdminFiles from "./pages/AdminFiles";
import ClinicTreatments from "./pages/ClinicTreatments"; 
import Navbar from "./components/Navbar";

export default function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["USER", "ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinic-dashboard"
          element={
            <ProtectedRoute roles={["CLINIC_ADMIN", "ADMIN"]}>
              <ClinicDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin pages */}
        <Route
          path="/admin-users"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-clinics"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminClinics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-treatments"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminTreatments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-files"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminFiles />
            </ProtectedRoute>
          }
        />

        {/* Clinic admin treatments route */}
        <Route
          path="/clinic-treatments"
          element={
            <ProtectedRoute roles={["CLINIC_ADMIN", "ADMIN"]}>
              <ClinicTreatments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}