import Dashboard from "../components/pages/Dashoard.js";
import FlipkartProofing from "../components/pages/Flikart.js";
import Home from "../components/pages/Homepage";
import Login from "../components/pages/Login";
import MeeshoProofing from "../components/pages/Meesho.js";
import Register from "../components/pages/Register.js";
import PrivateRoute from "./PrivetRoutes.js";

const Approutes =[
    {path : "/" ,element: <Home />},
    {path : "/Dashboard" ,element: ( <PrivateRoute ><Dashboard /></PrivateRoute>)},
    {path : "/Flipkart" ,element: ( <PrivateRoute ><FlipkartProofing /></PrivateRoute>)},
    {path : "/Meesho" ,element: ( <PrivateRoute ><MeeshoProofing /></PrivateRoute>)},
    {path : "/Login" ,element: <Login />},
    {path : "/Register" ,element: <Register />},
];

export default Approutes;