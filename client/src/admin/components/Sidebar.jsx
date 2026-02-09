import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-red-700 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <NavLink to="/admin/dashboard" className="mb-3 hover:underline">
        Dashboard
      </NavLink>

      <NavLink to="/admin/resources" className="mb-3 hover:underline">
        Resources
      </NavLink>

      <NavLink to="/admin/news" className="mb-3 hover:underline">
        News
      </NavLink>

      <button
        onClick={logout}
        className="mt-auto bg-white text-red-700 px-4 py-2 rounded hover:cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
