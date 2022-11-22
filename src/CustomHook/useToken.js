import { useEffect, useState } from 'react';

const useToken = (user) => {

    const [token, setToken] = useState('');

    useEffect(() => {
        const email = user?.user?.email;
        const userEmail = { email: email };

        if (email) {
            fetch(`https://techfly-api.onrender.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userEmail)
            })
            .then(res => res.json())
            .then(data => {
                const accessToken = data?.data?.accessToken;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })
        }
    }, [user])
    
    return [token, setToken];
};
export default useToken;