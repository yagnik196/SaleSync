import React,{createContext,useContext,useState} from "react";
const Authcontext = createContext();

export function AuthProvider({children}){
    const gettoken= () => localStorage.getItem("authtoken");
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
        settoken(newtoken);
        setuser(newuser);
        setLoggedin(1);
    }

    const handleLogout = ()=>{
        localStorage.removeItem("authtoken");
        localStorage.removeItem("authuser");
        setLoggedin(0);
        settoken(null);
        setuser(null);
    }

    return(
        <Authcontext.Provider value = {{isLoggedin,token,user, handleLogin, handleLogout}}>
            {children}
        </Authcontext.Provider>
    );
}

export function useAuth (){
    const ctx= useContext(Authcontext);
    if (!ctx) throw new Error("useAuth Failed");
    return ctx;
}

export default Authcontext;
