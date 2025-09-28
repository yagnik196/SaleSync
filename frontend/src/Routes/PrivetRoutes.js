import { useAuth } from "../Contex/Authcontext";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isLoggedin } = useAuth();  
  const location=useLocation();
 if (!isLoggedin) {
    // If the user is not logged in, redirect them to the /Login page
    // We also pass the original location they tried to visit, so we can redirect back after login
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // If the user is logged in, render the child components
  return children;
}

export default PrivateRoute;
