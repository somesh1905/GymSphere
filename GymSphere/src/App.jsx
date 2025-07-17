import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Gym-Management-System" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
