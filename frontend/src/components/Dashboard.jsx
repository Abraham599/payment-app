import { useEffect, useState } from "react";
import { successAtom } from "./store/atoms/UserDataAtom";
import { useRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

const Dashboard = () => {
    const user = useUser();
    const [success, setSuccess] = useRecoilState(successAtom);
    const [filterUser, setFilterUser] = useState("");
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        if (success) {
            const timeoutId = setTimeout(() => {
                setSuccess('');
            }, 4000);

            return () => clearTimeout(timeoutId);
        }
    }, [success, setSuccess]);

    useEffect(() => {
        const filteredUsers = user.userDetails?.otherUsers.filter(u =>
            u.firstName.toLowerCase().includes(filterUser.toLowerCase()) ||
            u.lastName.toLowerCase().includes(filterUser.toLowerCase())  ||
            `${u.firstName.toLowerCase()} ${u.lastName.toLowerCase()}`.includes(filterUser.toLowerCase())
        );

        setUserList(filteredUsers);
    }, [filterUser, user.userDetails]);
    

    




    const balance = user.userDetails?.account?.balance ?? null;
    
    if (user.loading) {
        return "loading...";
    }

    if (!user.userDetails) {
        return <Navigate to="/signin" />;
    }

    return (
        <div>
            <div className="w-full h-screen">
                <div className="w-full h-32 flex flex-row justify-between border-b-4">
                    <div className="text-2xl font-bold p-6">Payments App</div>
                    <div className="text-lg font-medium	pt-6 pr-11">Hello, {user.userDetails.user.firstName}</div>
                </div>
                <div className="text-lg font-bold pl-10 pt-10 pb-6">{`Your Balance $${balance || 'Loading...'}`}</div>
                {success && (
                    <div className="flex items-center justify-center">
                        <div className="text-green-500 font-bold text-center mt-2 p-2 border border-green-500 w-max h-min rounded-md">{success}</div>
                    </div>
                )}
                <div className="text-lg font-bold pl-10 pb-6">Users</div>
                <input
                    placeholder="Search Users..."
                    value={filterUser}
                    className="w-11/12 ml-11 px-6 py-2 border rounded border-slate-200 text-sm"
                    onChange={(e) => setFilterUser(e.target.value)}
                />
                <UserList users={userList} />
            </div>
        </div>
    );
};

function UserList({ users }) {
    const navigate = useNavigate();

    if (!users || users.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div>
            {users.map((user, index) => (
                <div key={index} className="my-2 mx-4 flex flex-row justify-between">
                    <div className="flex flex-row space-x-2 items-center">
                        <div className="rounded-full bg-slate-200 py-2 px-4">{user.firstName[0]}</div>
                        <div className="">{user.firstName} {user.lastName}</div>
                    </div>
                    <button onClick={() => navigate(`/send?id=${user.id}&&name=${user.firstName}`)} className="bg-black text-white p-2 rounded-md">Send Money</button>
                </div>
            ))}
        </div>
    );
}


export default Dashboard;
