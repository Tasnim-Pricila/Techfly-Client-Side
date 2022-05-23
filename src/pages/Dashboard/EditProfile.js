import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const EditProfile = () => {
    const { email } = useParams();
    const [user, loading] = useAuthState(auth);
    const userName = user?.displayName;

    const { data: userInfo, isLoading, refetch } = useQuery(['userInfo', email], () =>
        fetch(`http://localhost:5000/user/${email}`, {
        })
            .then(res => res.json()))


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
                    // reset();
                }
                else {
                    console.log(data);
                }
            })
    }
    if (isLoading) {
        return <p>Loading...</p>
    }

    const { phone, city, district, address, linkedIn, education,  } = userInfo[0];

    return (
        <div>
            <p>Edit Profile</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                <input placeholder='Name' type="text" className='input input-bordered input-info w-full max-w-xs' defaultValue={userName} {...register("name", { required: true })} />

                <input placeholder='Phone' type="text" className='input input-bordered  input-info w-full max-w-xs' defaultValue={phone} {...register("phone", { required: true })} />


                <input placeholder='Education' type="text" className='input input-bordered input-info w-full max-w-xs' defaultValue={education} {...register("education", { required: true })} />


                <input placeholder='City' type="text" className='input input-bordered input-info w-full max-w-xs'defaultValue={city} {...register("city", { required: true })} />


                <input type='url' placeholder='linkedIn Profile Link' className='input input-bordered input-info w-full max-w-xs' defaultValue={linkedIn} {...register("linkedIn", { required: true })} />



                <input type="text" placeholder='District' className='input input-bordered input-info w-full max-w-xs' defaultValue={district} {...register("district", { required: true })} />


                <textarea placeholder='Write Your Address Here...' className='input input-bordered input-info w-full max-w-xs' defaultValue={address} {...register("address", { required: true })} />



                <input type="submit" className="btn btn-info w-1/3" value='Submit Review' />
            </form>
        </div>
    );
};

export default EditProfile;