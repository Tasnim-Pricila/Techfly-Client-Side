import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../CustomHook/useToken';
import auth from '../firebase.init';
import Loading from '../Shared/Loading';
import SocialLogin from '../Shared/SocialLogin';

const Signup = () => {
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        others: ""
    })

    const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async data => {
        const userData = data;
        const { name, email, password, cpassword } = userData;
        if (password === cpassword) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            reset();
            setSignupError({});
        }
        else if (password !== cpassword) {
            // setMyError('Password Does not match')
            setSignupError({ ...signupError, confirmPassword: "Password Does not match" });
        }

    };
    const [token] = useToken(emailUser);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate])

    useEffect(() => {
        if (emailError) {
            switch (emailError.code) {
                case "auth/email-already-in-use":
                    setSignupError({ ...signupError, email: "Email already exists" });
                    break;
                case "auth/invalid-password":
                    setSignupError({ ...signupError, password: "Invalid Password" });
                    break;
                default:
                    setSignupError({ ...signupError, others: emailError.message });
            }
        }
    }, [emailError]);

    if (emailLoading || updating) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='h-screen'>
                <div className='md:w-1/4 mx-auto py-16 rounded-lg mt-4 shadow-xl'>
                    <p className='text-2xl mb-8 uppercase font-bold text-center'>Signup</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                        <input placeholder='Name' type="text" className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' {...register("name", { required: true })} />
                        <small className='text-error font-semibold px-10'>
                            {errors.name?.type === 'required' && "Name is required"}
                        </small>

                        <input placeholder='Email' type="email" className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
                        <small className='text-error font-semibold px-10'>
                            {errors.email?.type === 'required' && "Email is required"}
                            {errors.email?.type === 'pattern' && "Email pattern is wrong"}
                            {signupError.email}
                        </small>



                        <input placeholder='Password' type="password" className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' {...register("password", { required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/, minLength: 8 })} />
                        <small className='text-error font-semibold px-10'>
                            {errors.password?.type === 'required' && "Password is required"}
                            {errors.password?.type === 'pattern' && "Must use 1 uppercase, 1 lowercase, 1 number and 1 special character"}
                            {errors.password?.type === 'minLength' && "Password must be 8 characters long"}
                            {signupError.password}
                        </small>


                        <input placeholder='Confirm Password' type="password" className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' {...register("cpassword", { required: true })} />
                        <small className='text-error font-semibold px-10'>
                            {errors.cpassword?.type === 'required' && "Confirm Password is required"}
                            {signupError.confirmPassword}
                        </small>

                        <input type="submit" className="btn btn-warning w-[320px] self-center" value='Signup' />
                        <small className='text-error font-semibold px-10'>
                            {signupError.others}
                        </small>
                    </form>
                    <p className='text-right pr-12 py-1'>Already Have an Account on TechFly? <Link to='/login' className='text-yellow-800 font-semibold'>Login</Link></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Signup;