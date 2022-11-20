import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading';

const EditProfile = () => {
    const { email } = useParams();
    const [user, loading] = useAuthState(auth);
    const userName = user?.displayName;
    const navigate = useNavigate();

    const { data: userInfo, isLoading, refetch } = useQuery(['userInfo', email], () =>
        fetch(`https://techfly-api.onrender.com/user/${email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))


    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const { phone, education, city, district, linkedIn, address, name } = data;
        const details = {
            name,
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
                    toast.success('User Updated Successfully', {
                        theme: 'colored',
                        delay: 0,
                    });
                    refetch();
                    reset();
                    navigate('/dashboard/myProfile')
                }
                else if (data.data.modifiedCount === 0) {
                    toast.error('Change anything to update', {
                        theme: 'colored',
                        delay: 0,
                    });
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

    const { phone, city, district, address, linkedIn, education, } = userInfo.data;

    return (
        <div>
            <p className='text-xl font-bold text-primary basis-1/2 mb-8'>Edit Profile</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                <input placeholder='Name' type="text" className='input input-bordered input-info w-full max-w-xs' defaultValue={userName} {...register("name", { required: true })} />

                <input placeholder='Phone' type="text" className='input input-bordered  input-info w-full max-w-xs' defaultValue={phone} {...register("phone", { required: true })} />


                <input placeholder='Education' type="text" className='input input-bordered input-info w-full max-w-xs' defaultValue={education} {...register("education", { required: true })} />


                <input placeholder='City' type="text" className='input input-bordered input-info w-full max-w-xs' defaultValue={city} {...register("city", { required: true })} />


                <input type='url' placeholder='linkedIn Profile Link' className='input input-bordered input-info w-full max-w-xs' defaultValue={linkedIn} {...register("linkedIn", { required: true })} />

                <input type="text" placeholder='District' className='input input-bordered input-info w-full max-w-xs' defaultValue={district} {...register("district", { required: true })} />

                <textarea placeholder='Write Your Address Here...' className='input input-bordered input-info w-full max-w-xs' defaultValue={address} {...register("address", { required: true })} />

                <input type="submit" className="btn btn-primary w-[320px]" value='Update' />
            </form>
        </div>
    );
};

export default EditProfile;