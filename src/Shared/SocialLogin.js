import { faGoogle } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../CustomHook/useToken';
import auth from '../firebase.init';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [token] = useToken(googleUser);

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate, token])

    if (googleUser) {
        // console.log(googleUser);
    }
    if (googleLoading) {
        return <p>Loading</p>
    }

    return (
        <div className='flex flex-col items-center px-4'>
            <div className='divider md:w-[320px] w-full self-center'>OR</div>
            <div className='group'>
                <button className='md:w-[320px] capitalize border-2 border-yellow-500 rounded-md py-2 font-semibold hover:bg-yellow-500 group-hover:text-white px-12'
                    onClick={() => signInWithGoogle()}>
                    <FontAwesomeIcon icon={faGoogle} className='pr-10 text-orange-500 group-hover:text-white'></FontAwesomeIcon>
                    Sign In With Google
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;