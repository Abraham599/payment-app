import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataAtom } from "./store/atoms/UserDataAtom";

const Signup = () => {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("https://65ca2e69eab65d000860f9b9--payment-app-backend.netlify.app/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const { fetchToken } = await response.json();
        setUserData((prevUserData) => ({ ...prevUserData, token: fetchToken }));
        navigate("/dashboard");
      } else {
        // Signup failed, extract and display the error message
        const errorResponse = await response.json();
        setError(errorResponse.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="w-full h-screen dark:bg-slate-800 flex items-center justify-center">
      <div className="w-80 h-max border rounded-md text-center bg-slate-50 p-2 ">
        <div>
          <div className="text-3xl font-bold text-center">Sign Up</div>
          <div className="text-sm font-light text-center">Enter your information to create an account</div>
        </div>

        <div className="pt-11 ">
          <div className="text-left text-sm font-bold py-2">First Name</div>
          <input placeholder="John" value={userData.firstName} onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, firstName: e.target.value }))} className="w-full px-2 py-1 border rounded border-slate-200 text-sm" />
        </div>

        <div className="pt-3 ">
          <div className="text-left text-sm font-bold py-2">Last Name</div>
          <input placeholder="Doe" value={userData.lastName} onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, lastName: e.target.value }))} className="w-full px-2 py-1 border rounded border-slate-200 text-sm" />
        </div>

        <div className="pt-3 ">
          <div className="text-left text-sm font-bold py-2">Email</div>
          <input placeholder="johndoe@example.com" value={userData.username} onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, username: e.target.value }))} className="w-full px-2 py-1 border rounded border-slate-200 text-sm" />
        </div>

        <div className="pt-3">
          <div className="text-left text-sm font-bold py-2">Password</div>
          <input value={userData.password} onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, password: e.target.value }))} className="w-full px-2 py-1 border rounded border-slate-200 text-sm" />
        </div>

        <button onClick={handleSignup} className="bg-slate-950 w-full text-center px-2 py-1 mt-6 text-white rounded-md">Sign Up</button>
        {error && (<div className="text-red-600 font-bold text-center mt-2 p-2 border border-red-600 w-auto h-auto">{error}</div>)}

        <div className="text-center text-sm ">Already have an account ? <span className="underline cursor-pointer" onClick={() => navigate("/signin")}>Link</span></div>
      </div>
    </div>
  );
};

export default Signup;
