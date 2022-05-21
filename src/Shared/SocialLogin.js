import { faGoogle } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if(googleLoading){
        return <p> Loading...</p>
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