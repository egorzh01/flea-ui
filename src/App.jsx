import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { AuthProvider, ProtectedRoute } from "./AuthProvider";
import Admin from "./components/Admin";
import Layout from "./components/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}
