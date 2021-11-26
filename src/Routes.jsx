import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navibar from "./components/Navibar";
import MainPage from "./pages/MainPage";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Navibar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
