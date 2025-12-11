import React,{createContext,useContext,useState, useEffect} from "react";
import axios from "axios";
const Authcontext = createContext();

export function AuthProvider({children}){
    const gettoken= () => localStorage.getItem("authtoken");
    const getrefreshtoken = () => localStorage.getItem("refreshtoken");
    const getuser = () => {
        try{
            const u = localStorage.getItem("authuser");
            return u ? JSON.parse(u):null;
        }
        catch{
            return null;
        }
    }

    const [token,settoken]=useState(gettoken);
    const [user,setuser] = useState(getuser);
    const [isLoggedin,setLoggedin] = useState(!!gettoken());

    const handleLogin =({token:newtoken,user:newuser})=>{
        if(!newtoken) return;
        localStorage.setItem("authtoken",newtoken);
        localStorage.setItem("authuser",JSON.stringify(newuser));
        
        // Store refresh token if provided
        if(newuser.refreshToken){
            localStorage.setItem("refreshtoken",newuser.refreshToken);
        }
        
        settoken(newtoken);
        setuser(newuser);
        setLoggedin(true);
    }

    const handleLogout = ()=>{
        localStorage.removeItem("authtoken");
        localStorage.removeItem("authuser");
        localStorage.removeItem("refreshtoken");
        setLoggedin(false);
        settoken(null);
        setuser(null);
    }

    // Refresh token when it expires
    const refreshAccessToken = async () => {
        try{
            const refreshToken = getrefreshtoken();
            if(!refreshToken) return false;
            
            const response = await axios.post(
                "http://localhost:8000/api/token/refresh/",
                { refresh: refreshToken }
            );
            
            const newAccessToken = response.data.access;
            localStorage.setItem("authtoken", newAccessToken);
            settoken(newAccessToken);
            return true;
        }
        catch(err){
            console.error("Token refresh failed:", err);
            handleLogout();
            return false;
        }
    }

    return(
        <Authcontext.Provider value = {{isLoggedin,token,user, handleLogin, handleLogout, refreshAccessToken}}>
            {children}
        </Authcontext.Provider>
    );
}

export function useAuth (){
    const ctx= useContext(Authcontext);
    if (!ctx) throw new Error("useAuth Failed");
    return ctx;
}

// Setup axios interceptor to attach JWT token to all requests
export function setupAxiosInterceptors() {
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("authtoken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            
            // Handle 401 errors by refreshing token
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                
                try {
                    const refreshToken = localStorage.getItem("refreshtoken");
                    const response = await axios.post(
                        "http://localhost:8000/api/token/refresh/",
                        { refresh: refreshToken }
                    );
                    
                    const newAccessToken = response.data.access;
                    localStorage.setItem("authtoken", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    
                    return axios(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem("authtoken");
                    localStorage.removeItem("refreshtoken");
                    localStorage.removeItem("authuser");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }
            
            return Promise.reject(error);
        }
    );
}

export default Authcontext;
