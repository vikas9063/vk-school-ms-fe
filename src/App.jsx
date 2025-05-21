// src/App.tsx
import { Button } from "flowbite-react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./components/AuthLayout";
import Dashboard from "./pages/user/Dashboard";
import InstituteProfile from "./pages/user/general-settings/InstituteProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="general-settings/institute-profile" element={<InstituteProfile />} />
        {/* Optional: add an index route for /auth */}
        {/* <Route index element={<SomeAuthHome />} /> */}
      </Route>
    </Routes>
  );
}
