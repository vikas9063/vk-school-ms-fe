import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./components/AuthLayout";
import Dashboard from "./pages/user/Dashboard";
import InstituteProfile from "./pages/user/general-settings/InstituteProfile";
import AddInstituteDetails from "./pages/user/general-settings/AddInstituteDetails";
import ViewInstituteDetails from "./pages/user/general-settings/ViewInstituteDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="general-settings">
          <Route path="institute-profile" element={<InstituteProfile />} />
          <Route path="add-institute-details" element={<AddInstituteDetails />} />
          <Route path="view-institute-details/:instituteId" element={<ViewInstituteDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}
