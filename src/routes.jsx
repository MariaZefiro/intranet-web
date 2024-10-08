import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Ramais from "./components/Ramais";
import About from "./components/About";
import { ChakraProvider } from '@chakra-ui/react';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ramais" element={<Ramais />} />
      <Route path="/sobre" element={<About />} />
    </Routes>
  );
}