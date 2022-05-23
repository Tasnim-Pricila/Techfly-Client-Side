import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyProfile = () => {

    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const userName = user?.displayName;
    const image = user?.photoURL;
    const navigate = useNavigate();

    const { data: userInfo, isLoading, refetch } = useQuery(['userInfo', email], () =>
        fetch(`http://localhost:5000/user/${email}`, {
        })
            .then(res => res.json()))

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { phone, education, city, district, linkedIn, address } = data;
        const details = {
            phone,
            education,
            city,
            district,
            linkedIn,
            address
        }
        // console.log(details)

        fetch(`http://localhost:5000/user/${email}`, {
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
                    refetch();
                    reset();
                }
                else {
                    console.log(data);
                }
            })
    }
    if (isLoading) {
        return <p>Loading...</p>
    }
    const handleEdit = () => {
        navigate(`/dashboard/editProfile/${email}`);
    }
    return (
        <>
            <div className='border-4 my-12'>
                <p><FontAwesomeIcon icon={faEdit} className='text-right w-full cursor-pointer' onClick={handleEdit}></FontAwesomeIcon></p>
                <div className='m-12 border-4'>
                    <img src={image} alt="" />
                    <p className='text-2xl font-semibold'>{userName}</p>
                    <p>Email: {email}</p>
                    {userInfo[0].phone &&
                        <p>Phone: {userInfo[0].phone}</p>
                    }
                    {userInfo[0].city &&
                        <p>City: {userInfo[0].city}</p>
                    }
                    {userInfo[0].district &&
                        <p>District: {userInfo[0].district}</p>
                    }
                    {userInfo[0].address &&
                        <p>Address: {userInfo[0].address}</p>
                    }
                    {userInfo[0].linkedIn &&
                        <p>Linkedin Profile:
                            <a href={`${userInfo[0].linkedIn}`} className='text-blue-600 underline' alt=''>
                                <button>{userInfo[0].linkedIn}</button>
                            </a>
                        </p>
                    }
                </div>
            </div>
            <div>
                <p>Add More Information</p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                    <input placeholder='Phone' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("phone", { required: true })} />
                    {errors.phone?.type === 'required' && "phone is required"}

                    <input placeholder='Education' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("education", { required: true })} />
                    {errors.education?.type === 'required' && "education is required"}

                    <input placeholder='City' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("city", { required: true })} />
                    {errors.city?.type === 'required' && "city is required"}

                    <input type='url' placeholder='linkedIn Profile Link' className='input input-bordered input-info w-full max-w-xs' {...register("linkedIn", { required: true })} />
                    {errors.linkedIn?.type === 'required' && "linkedIn is required"}


                    <input type="text" placeholder='District' className='input input-bordered input-info w-full max-w-xs' {...register("district", { required: true })} />
                    {errors.district?.type === 'required' && "district is required"}

                    <textarea placeholder='Write Your Address Here...' className='input input-bordered input-info w-full max-w-xs' {...register("address", { required: true })} />
                    {errors.address?.type === 'required' && "address is required"}


                    <input type="submit" className="btn btn-info w-1/3" value='Submit Review' />
                </form>
            </div>
        </>

    );
};

export default MyProfile;