import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../firebase.init";

const useAdmin = (user) => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState('');
    const [adminLoading, setAdminLoading] = useState(true);
    const accessToken = `${localStorage.getItem('accessToken')}`
    const email = user?.email;
    // console.log(email, accessToken)

    useEffect(() => {
        if (email) {
            fetch(`https://techfly-api.onrender.com/user/isAdmin/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(`${accessToken}`);
                    // console.log(data);
                    if (data?.status === 'success') {
                        setAdmin(data?.data?.admin);
                        setAdminLoading(false);
                    }
                    else {
                        signOut(auth);
                        navigate('/login')
                    }
                })
        }
    }, [accessToken])

    return [admin, adminLoading];
};

export default useAdmin;