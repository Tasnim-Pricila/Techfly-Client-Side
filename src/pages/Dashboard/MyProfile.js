import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const userName = user?.displayName;
    const image = user?.photoURL;
    const phone = user?.phoneNumber;
    console.log(user);

    return (
        <div className='border-4 my-12'>
            <p><FontAwesomeIcon icon={faEdit} className='text-right w-full'></FontAwesomeIcon></p>
            <div className='m-12 border-4'>
                <img src={image} alt="" />
                <p>User ID: </p>
                <p className='text-2xl font-semibold'>{userName}</p>
                <p>Email:{email}</p>
                <p>Phone: {phone ? 'phone' : 'Not Provided Yet'} </p>
            </div> 
        </div>
    );
};

export default MyProfile;