import { Navigate } from "react-router-dom";
import { useUser } from "./useUser"
import Signin from "./Signin";
import Dashboard from "./Dashboard";

export const Index = ()=>{
    const user = useUser();

    if(user.loading){
        return "loading";
    }
    if(!user.userDetails){
        return <Navigate to={"/signin"}/>
    }
    return <Navigate to={"/dashboard"}/>
}