import { useAuth } from "../Contex/Authcontext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isLoggedin } = useAuth();  
  return isLoggedin ? children : <Navigate to="/Login" />;
}

export default PrivateRoute;
