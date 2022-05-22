import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useToken from '../CustomHook/useToken';
import auth from '../firebase.init';
import SocialLogin from '../Shared/SocialLogin';

const Signup = () => {
    const navigate = useNavigate();
    const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async data => {
        // console.log(data);
        const userData = data;
        const { name, email, password, cpassword } = userData;
        if (password === cpassword) {
            console.log(userData);
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            reset();
        }

    };
    const [token] = useToken(emailUser);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

    if (emailUser) {
        console.log(emailUser);
    }
    if (emailLoading || updating) {
        return <p>Loading</p>
    }

    return (
        <div>
            <div className='w-1/3 mx-auto'>
                <div>
                    <p className='text-2xl my-12'>Signup</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <input placeholder='Name' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("name", { required: true })} />
                        {errors.name?.type === 'required' && "Name is required"}
                        <input placeholder='Email' type="email" className='input input-bordered input-info w-full max-w-xs' {...register("email", { required: true })} />
                        {errors.email?.type === 'required' && "Email is required"}
                        <input placeholder='Password' type="password" className='input input-bordered input-info w-full max-w-xs' {...register("password", { required: true })} />
                        {errors.password?.type === 'required' && "Password is required"}
                        <input placeholder='Confirm Password' type="password" className='input input-bordered input-info w-full max-w-xs' {...register("cpassword", { required: true })} />
                        {errors.cpassword?.type === 'required' && "Confirm Password is required"}

                        <input type="submit" className="btn btn-info w-1/3" value='Signup' />
                    </form>
                </div>
                <SocialLogin></SocialLogin>

            </div>
        </div>
    );
};

export default Signup;