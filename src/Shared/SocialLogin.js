import { faGoogle } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import useToken from '../CustomHook/useToken';
import auth from '../firebase.init';
import Loading from './Loading';

const SocialLogin = () => {

    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [token] = useToken(googleUser);

    const handleGoogleLogin = () => {
        signInWithGoogle();
    }

    useEffect(() => {
        if (token) {
            // setLoading(false);
            navigate('/dashboard');
        }
    }, [token])

    if (googleLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex flex-col items-center px-4'>
            <div className='divider w-full self-center'>OR</div>
            <div className='group'>
                <button className='capitalize border-2 border-yellow-500 rounded-md py-2 font-semibold hover:bg-yellow-500 group-hover:text-white sm:px-12 px-6'
                    onClick={() => handleGoogleLogin()}>
                    <FontAwesomeIcon icon={faGoogle} className='pr-2 sm:pr-10 text-orange-500 group-hover:text-white'></FontAwesomeIcon>
                    Sign In With Google
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;