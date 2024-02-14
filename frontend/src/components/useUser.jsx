import { useEffect, useState } from "react";

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    async function getDetails() {
        const token = localStorage.getItem("token");
        console.log("Stored Token:", token); // Log the retrieved token

        if (!token) {
            console.error("Token is missing or invalid");
            // Handle the case where the token is missing or invalid
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}api/v1/user/me`, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token // Use the retrieved token directly
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            setUserDetails(data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getDetails();
    }, []);

    return {
        loading,
        userDetails
    };
};
