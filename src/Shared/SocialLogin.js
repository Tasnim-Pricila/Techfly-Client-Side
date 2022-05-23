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
    }, [ navigate, token])

    if (googleUser) {
        // console.log(googleUser);
    }
    if (googleLoading) {
        return <p>Loading</p>
    }
   
    return (
        <div>
            <div className='divider w-1/2'>OR</div>
            <button className='btn btn-primary btn-outline w-1/2'  
            onClick={() => signInWithGoogle()}>
                <FontAwesomeIcon icon={faGoogle} className='pr-10'></FontAwesomeIcon>
                 Sign In With Google   
            </button>
        </div>
    );
};

export default SocialLogin;