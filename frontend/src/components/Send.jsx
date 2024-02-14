import { useState } from "react";
import {useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { successAtom } from "./store/atoms/UserDataAtom";

const Send = ()=>{
    const [amt,setAmt] = useState(0);
    const [searchParam] = useSearchParams();
    const setSuccess = useSetRecoilState(successAtom);
    const navigate = useNavigate();
    const id = searchParam.get("id");
    const name = searchParam.get("name");
    const initiateTransfer = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/account/transfer`, {
                method: 'POST',
                body: JSON.stringify({
                    to: id,
                    amount: amt
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to initiate transfer');
            }
            
                setSuccess("Transfer was successful !");
                navigate("/dashboard");
            
    
        } catch (error) {
            console.error('Error initiating transfer:', error.message);
        }
    };
    
return(
    <div className="w-full h-screen flex items-center justify-center bg-slate-200">
        <div className="w-96 h-min bg-white rounded-md"> 
        <div className="p-6">
            <p className="text-center font-bold text-2xl pb-24">Send Money</p>
            <div className="pb-4">
            <div className=" flex flex-row space-x-2"> 
                <div className="rounded-full bg-green-500 py-2 px-4 text-white">A</div>
                <p className="text-2xl font-semibold text-center">{name} Name</p>
            </div>
            </div>
            <p className="pt-2 font-semibold text-base">Amount (in RS)</p>
            <input type="text" value={amt} placeholder="Enter Amount" className="rounded-md border w-full p-2" onChange={(e)=>setAmt(parseFloat(e.target.value))} />
            <button className="w-full rounded-md text-white bg-green-500 mt-2 p-2" onClick={initiateTransfer}>Initiate Transfer</button>
        </div>
    </div>
    </div>
)
};

export default Send;