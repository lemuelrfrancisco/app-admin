import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./pages/Main/Main";
import Dashboard from "./pages/Main/Dashboard/Dasboard";
import Products from "./pages/Main/Products/Products";

import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./Contexts/AuthContext";
import ProductContextProvider from "./Contexts/ProductContext";
import ProductForm from "./pages/Main/Products/ProductForm/ProductForm";

function AuthNavigation() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
    </Routes>
  );
}

function AuthenticatedNavigation() {
  return (
    <Routes>
      <Route path="/main" element={<Main />}>
        <Route exact path="dashboard" element={<Dashboard />} />
        <Route
          path="products"
          element={
            <ProductContextProvider>
              <Products />
            </ProductContextProvider>
          }
        ></Route>
        <Route
          path="products/form/:id?"
          element={
            <ProductContextProvider>
              <ProductForm />
            </ProductContextProvider>
          }
        ></Route>
      </Route>
      <Route path="/" element={<Navigate replace to="/main/dashboard" />} />
    </Routes>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (
      !authCtx.isAuthenticated &&
      (accessToken !== undefined || accessToken !== "" || accessToken !== null)
    ) {
      authCtx.authenticate(accessToken);
    }
  }, []);
  return (
    <BrowserRouter>
      {authCtx.isAuthenticated ? (
        <AuthenticatedNavigation />
      ) : (
        <AuthNavigation />
      )}
    </BrowserRouter>
  );
}

function App() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="App">
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </div>
  );
}

export default App;
