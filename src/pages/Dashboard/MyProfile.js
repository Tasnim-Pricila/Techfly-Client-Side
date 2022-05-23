import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const userName = user?.displayName;
    const image = user?.photoURL;
 
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const{ phone, education, city, district, linkedIn, address} = data;
        const details = { 
            phone, 
            education, 
            city,
            district, 
            linkedIn,
            address
        } 
        console.log(data);
        fetch(`http://localhost:5000/user/${email}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(details)
        })
        
        .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data);
                    reset();
                }
                else {
                    console.log(data);
                }   
            })
    }
    return (
        <>
            <div className='border-4 my-12'>
                <p><FontAwesomeIcon icon={faEdit} className='text-right w-full'></FontAwesomeIcon></p>
                <div className='m-12 border-4'>
                    <img src={image} alt="" />
                    <p>User ID: </p>
                    <p className='text-2xl font-semibold'>{userName}</p>
                    <p>Email:{email}</p>

                </div>
            </div>
            <div>
                <p>Add More Information</p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                        <input placeholder='Phone' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("phone")} />

                        <input placeholder='Education' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("education")} />

                        <input placeholder='City' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("city")} />
                        
                        <input type='url' placeholder='LinkedIn Profile Link' className='input input-bordered input-info w-full max-w-xs' {...register("linkedIn", { required: true })} />
                        {errors.rating?.type === 'required' && "Rating is required"}

                        <input type="text" placeholder='District' className='input input-bordered input-info w-full max-w-xs' {...register("district", { required: true })} />
                        {errors.rating?.type === 'required' && "Rating is required"}

                        <textarea placeholder='Write Your Address Here...' className='input input-bordered input-info w-full max-w-xs' {...register("address", { required: true })}/> 
                        {errors.description?.type === 'required' && "Description is required"}


                        <input type="submit" className="btn btn-info w-1/3" value='Submit Review' />
                    </form>
            </div>
        </>

    );
};

export default MyProfile;