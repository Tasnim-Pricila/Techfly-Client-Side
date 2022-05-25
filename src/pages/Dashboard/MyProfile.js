import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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
    // console.log(user, image)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);

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
                    setShow(!show);
                    setHide(true);
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
        <div className='w-1/2 border-4 border-purple-400 py-6 px-8 rounded-lg mb-12' >
            <div >
                <div className='flex justify-between border-b-2 border-slate-700 pb-2 items-center mb-6'>
                    <p className='text-xl font-bold text-primary basis-1/2'>My Profile</p>
                    <FontAwesomeIcon icon={faEdit} className='text-right w-full cursor-pointer basis-1/2 text-primary' onClick={handleEdit}></FontAwesomeIcon>
                </div>

                <div className='flex flex-col gap-2 justify-center items-center'>
                    <img src={image} alt="" className='w-28 rounded-full mb-2' />
                    <p className='text-xl font-semibold'> Name: {userName}</p>
                    <p> <b> Email: </b> {email}</p>
                    {userInfo[0].phone &&
                        <p> <b> Phone: </b>  {userInfo[0].phone}</p>
                    }
                    {userInfo[0].city &&
                        <p> <b> City: </b> {userInfo[0].city}</p>
                    }
                    {userInfo[0].district &&
                        <p> <b> District: </b>  {userInfo[0].district}</p>
                    }
                    {userInfo[0].address &&
                        <p> <b> Address: </b> {userInfo[0].address}</p>
                    }
                    {userInfo[0].linkedIn &&
                        <p> <b> Linkedin: </b>
                            <a href={`${userInfo[0].linkedIn}`} className='text-blue-600 underline' alt=''>
                                <button>{userInfo[0].linkedIn}</button>
                            </a>
                        </p>
                    }
                </div>
            </div>
            <div className='mb-8 flex flex-col  items-center'>
                {
                    !hide &&
                    <button className='text-xl font-bold text-primary mb-8 mt-8 border-slate-700 border px-4 py-2 rounded' onClick={() => setShow(!show)}>Add More Information</button>
                }
                
                {show &&
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <input placeholder='Phone' type="text" className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("phone", { required: true })} />
                        {errors.phone?.type === 'required' && "phone is required"}

                        <input placeholder='Education' type="text" className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("education", { required: true })} />
                        {errors.education?.type === 'required' && "education is required"}

                        <input placeholder='City' type="text" className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("city", { required: true })} />
                        {errors.city?.type === 'required' && "city is required"}

                        <input type="text" placeholder='District' className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("district", { required: true })} />
                        {errors.district?.type === 'required' && "district is required"}

                        <input type='url' placeholder='linkedIn Profile Link' className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("linkedIn", {})} />
                        {errors.linkedIn?.type === 'required' && "linkedIn is required"}


                        <textarea placeholder='Write Your Address Here...' className='input input-bordered input-info w-full max-w-xs font-semibold self-center' {...register("address", { required: true })} />
                        {errors.address?.type === 'required' && "address is required"}

                        <input type="submit" className="btn btn-primary w-[320px]" value='Submit'/>
                    </form>
                }

            </div>
        </div>

    );
};

export default MyProfile;