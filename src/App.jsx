import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./services/ProtectedRoute";
import MainContextProvider from "./context/MainContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <MainContextProvider>
                <AppLayout />
              </MainContextProvider>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
