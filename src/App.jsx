import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { AuthProvider, ProtectedRoute } from "./AuthProvider";
import Places from "./components/Places";
import Layout from "./components/Layout";
import Items from "./components/Items";

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
            path="/places"
            element={
              <ProtectedRoute>
                <Places />
              </ProtectedRoute>
            }
          >
            <Route path=":placeUID" element={<Places />} />
          </Route>
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}
