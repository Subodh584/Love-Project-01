import React from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PrivateComponent from "./PrivateComponent";
import LoginPage from "./components/LoginPage";
import Chat from "./components/Chat";

import Test from "./components/Test";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/complaints" element={<Chat fName={"Complaints"} />} />
          <Route path="/reasons" element={<Chat fName={"Reasons"} />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
