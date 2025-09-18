import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Contex/Authcontext";

function Navbar() {

  const navigate = useNavigate();
  const { isLoggedin, user, handleLogout } = useAuth();
  const location = useLocation();
  return (
    <nav className="bg-white shadow-lg px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Left side: Logo + Site name + Tagline */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
          S
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">SaleSync</h1>
          <p className="text-sm text-gray-500 italic">Your Selling Supporter</p>
        </div>
      </div>

      {/* Right side: User Profile or Register button */}
      <div>
        {isLoggedin ? (
          <div className="flex items-center gap-3 cursor-pointer relative group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {user?.name ? user.name[0].toUpperCase() : "U"}  // first letter of name
            </div>
            <span className="text-gray-800 font-medium hover:text-gray-600 transition">{user?.name || "User"}
            </span>

            {/* Dropdown placeholder */}
            <div className="absolute right-0 mt-20 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          (location.pathname === "/Login") ?
            (<button className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 shadow-md transition duration-200"
              onClick={() => navigate("/Register")}
            >
              Register
            </button>) : (<button className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 shadow-md transition duration-200"
              onClick={() => navigate("/Login")}
            >
              Login
            </button>)

        )}
      </div>
    </nav>
  );
}

export default Navbar;
