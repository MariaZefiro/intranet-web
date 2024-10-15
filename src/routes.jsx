import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Ramais from "./components/Ramais";
import About from "./components/About";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Team from "./components/Team";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ramais" element={<Ramais />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
      <Route path="/time" element={<Team />} />
    </Routes>
  );
}
