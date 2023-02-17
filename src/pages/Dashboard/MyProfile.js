import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading';

const MyProfile = () => {

    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const userName = user?.displayName;
    const image = user?.photoURL;
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const { data: userInfo, isLoading, refetch } = useQuery(['userInfo', email], () =>
        fetch(`https://techfly-api.onrender.com/user/${email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
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
        fetch(`https://techfly-api.onrender.com/user/${email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    toast.success('Info Added Successfully', {
                        theme: 'colored',
                        delay: 0,
                    });
                    refetch();
                    reset();
                    setShow(!show);
                }
                else {
                    toast.error('Something Went Wrong', {
                        theme: 'colored',
                        delay: 0,
                    });
                }
            })
    }
    if (isLoading || loading) {
        return <Loading></Loading>
    }
    const handleEdit = () => {
        navigate(`/dashboard/editProfile/${email}`);
    }

    return (
        <div className='lg:w-2/3 border-4 border-purple-400 py-6 px-8 rounded-lg mb-12 mr-4 lg:mr-0' >
            <div className='flex justify-between border-b-2 border-slate-700 pb-2 items-center mb-6'>
                <p className='text-xl font-bold text-primary basis-1/2 '>My Profile</p>
                <div className='flex items-centerbasis-1/2 justify-end'>
                    <button className='flex btn btn-primary btn-outline group pt-1 btn-sm' onClick={handleEdit}>Edit
                        <FontAwesomeIcon icon={faEdit} className='text-primary pl-4 group-hover:text-white' ></FontAwesomeIcon>
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-2 justify-center items-center'>
                <img src={image} alt="" className='w-28 rounded-full mb-2' />
                <p className='text-xl font-semibold'> Name: {userName}</p>
                <p> <b> Email: </b> {email}</p>
                {userInfo?.data?.phone &&
                    <p> <b> Phone: </b>  {userInfo.data.phone}</p>
                }
                {userInfo?.data?.city &&
                    <p> <b> City: </b> {userInfo.data.city}</p>
                }
                {userInfo?.data?.district &&
                    <p> <b> District: </b>  {userInfo.data.district}</p>
                }
                {userInfo?.data?.address &&
                    <p> <b> Address: </b> {userInfo.data.address}</p>
                }
                {userInfo?.data?.linkedIn &&
                    <p> <b> Linkedin: </b>
                        <a href={`${userInfo.data.linkedIn}`} className='text-blue-600 underline' alt=''>
                            <button>{userInfo.data.linkedIn}</button>
                        </a>
                    </p>
                }
            </div>
            <div className='mb-8 flex flex-col items-center'>
                {

                    userInfo?.data?.education ? '' :

                        <button className='text-xl font-bold text-primary mb-8 mt-8 border-slate-700 border px-4 py-2 rounded' onClick={() => setShow(!show)}>Add More Information</button>
                }

                {show &&
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        {
                            userInfo?.data?.phone ? '' :
                                <>
                                    <input placeholder='Phone' type="text" className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("phone", { required: true })} />
                                    <small className='text-error font-semibold px-10'>
                                        {errors.phone?.type === 'required' && "Phone is required"}
                                    </small>

                                    <input placeholder='Education' type="text" className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("education", { required: true })} />
                                    <small className='text-error font-semibold px-10'>
                                        {errors.education?.type === 'required' && "education is required"}
                                    </small>

                                    <input type="text" placeholder='City' className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("city", { required: true })} />
                                    <small className='text-error font-semibold px-10'>
                                        {errors.city?.type === 'required' && "City is required"}
                                    </small>

                                    <input type="text" placeholder='District' className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("district", { required: true })} />
                                    <small className='text-error font-semibold px-10'>
                                        {errors.district?.type === 'required' && "district is required"}
                                    </small>

                                    <input type='url' placeholder='linkedIn Profile Link' className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("linkedIn", { required: true })} />
                                    <small className='text-error font-semibold px-10'>
                                        {errors.linkedIn?.type === 'required' && "linkedIn is required"}
                                    </small>

                                    <textarea placeholder='Write Your Address Here...' className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("address", { required: true })} />
                                    <small className='text-error font-semibold px-10'>
                                        {errors.address?.type === 'required' && "address is required"}
                                    </small>
                                </>
                        }
                        <input type="submit" className="btn btn-primary w-[320px]" value='Submit' />
                    </form>
                }
            </div>
        </div>

    );
};

export default MyProfile;