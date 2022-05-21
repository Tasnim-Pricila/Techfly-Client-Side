import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        const { email, password } = data;
        signInWithEmailAndPassword(email, password);
    };

    const [signInWithEmailAndPassword, loginUser, loginLoading, loginError] = useSignInWithEmailAndPassword(auth);

    return (
        <div className='w-1/3 mx-auto'>
            <div>
            <p className='text-2xl my-12'>Login</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <input placeholder='Email' type="email" className='input input-bordered input-info w-full max-w-xs' {...register("email", { required: true})} />
                {errors.email?.type === 'required' && "Email is required"}
                <input placeholder='Password' type="password" className='input input-bordered input-info w-full max-w-xs' {...register("password", {required: true})} />
                {errors.password?.type === 'required' && "Password is required"}

                <input type="submit" className="btn btn-info w-1/3" value='Login' />
            </form>
            </div>
            
        </div>
    );
};

export default Login;