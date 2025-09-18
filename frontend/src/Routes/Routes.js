import Dashboard from "../components/pages/Dashoard.js";
import Home from "../components/pages/Homepage";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register.js";
import PrivateRoute from "./PrivetRoutes.js";

const Approutes =[
    {path : "/" ,element: <Home />},
    {path : "/Dashboard" ,element: ( <PrivateRoute ><Dashboard /></PrivateRoute>)},
    {path : "/Login" ,element: <Login />},
    {path : "/Register" ,element: <Register />},
];

export default Approutes;