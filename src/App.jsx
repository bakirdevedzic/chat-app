import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./services/ProtectedRoute";
import MainContextProvider from "./context/MainContext";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
