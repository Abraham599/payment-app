import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataAtom } from "./store/atoms/UserDataAtom";

const Signin = ()=>{
    const [userData,setUserData] = useRecoilState(userDataAtom);
    const[error, setError] = useState("");
    const {username,password} = useRecoilValue(userDataAtom);
    const navigate = useNavigate();
    const handleSignin = async ()=>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/user/signin`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            username,
            password
        }),
        
    });
    if(response.ok){
        const data = await response.json();
        localStorage.setItem('token', data.token);

        setUserData((prevUserData) => ({ ...prevUserData, token: data.token }));
        navigate("/dashboard");
    }
    else{
       // Signup failed, extract and display the error message
       const errorResponse = await response.json();
       setError(errorResponse.message);
    
    }
    }

return (
    <div className="w-full h-screen dark:bg-slate-800 flex items-center justify-center">
        <div className="w-80 h-max border rounded-md text-center bg-slate-50 p-2 ">
            <div > 
            <div className="text-3xl font-bold text-center">Sign In</div>
            <div className="text-sm font-light text-center">Enter your credentials to access your account</div></div>

            <div className="pt-3 ">
                <div className="text-left text-sm font-bold py-2">Email</div>
                <input placeholder="johndoe@example.com" value={username} onChange={(e)=>setUserData((prevUserData)=>({...prevUserData,username:e.target.value}))} className="w-full px-2 py-1 border rounded border-slate-200 text-sm"/>
            </div>

            <div className="pt-3">
                <div className="text-left text-sm font-bold py-2">Password</div>
                <input value={password} onChange={(e)=>setUserData((prevUserData)=>({...prevUserData,password:e.target.value}))} className="w-full px-2 py-1 border rounded border-slate-200 text-sm"/>
            </div>
            <button onClick={handleSignin} className="bg-slate-950	w-full text-center px-2 py-1 mt-6 text-white rounded-md">Sign In</button>
            {error && (<div className="text-red-600 font-bold text-center mt-2 p-2 border border-red-600 w-auto h-auto">{error}</div>)}


            <div className="text-center text-sm ">Don't have an account ? <span className="underline cursor-pointer" onClick={()=>navigate("/signup")}>Sign Up</span></div>
        </div>
    </div>
)
};

export default Signin;