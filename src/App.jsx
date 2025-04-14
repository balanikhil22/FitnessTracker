import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import WaterIntakeTracker from "./components/features/WaterIntakeTracker";
import BMICalculate from "./components/features/BMICalculate";
import EditProfile from "./components/features/EditProfile";
import Weather from "./components/features/Weather";
import AdminManagement from "./components/admin/AdminManagement";
import WorkoutManagement from "./components/admin/WorkoutManagement";
import SearchWorkouts from "./components/features/SearchWorkouts";
import ForgotPassword from "./components/auth/ForgotPassword";
import MyWorkouts from "./components/features/MyWorkouts";
import Goals from "./components/features/Goals";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect based on role at root */}
          <Route
            path="/"
            element={
              userRole === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          {/* Login and Signup routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Register />} />

          {/* Protected Routes for Users */}
          <Route
            path="/home"
            element={
              <ProtectedRoute element={<Dashboard />} requiredRole="user" />
            }
          >
            <Route path="water-intake" element={<WaterIntakeTracker />} />
            <Route path="bmi-calculator" element={<BMICalculate />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="weather" element={<Weather />} />
            <Route path="myworkouts" element={<MyWorkouts />} />
            <Route path="workouts" element={<SearchWorkouts />} />
            <Route path="goals" element={<Goals />} />
          </Route>

          {/* Protected Routes for Admins */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                requiredRole="admin"
              />
            }
          >
            <Route path="manage-admins" element={<AdminManagement />} />
            <Route path="manage-workouts" element={<WorkoutManagement />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
