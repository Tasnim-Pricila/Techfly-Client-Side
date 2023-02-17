import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import SocialLogin from '../Shared/SocialLogin';
import useToken from '../CustomHook/useToken';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({
        email: "",
        password: "",
        others: ""
    })

    const [signInWithEmailAndPassword, loginUser, loginLoading, loginError] = useSignInWithEmailAndPassword(auth);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const { email, password } = data;
        signInWithEmailAndPassword(email, password);
        setError({});
    };

    const [token] = useToken(loginUser);

    const from = location.state?.from?.pathname || '/';
    useEffect(() => {
        if (token) {
            setLoading(false);
            reset();
            toast.success('Login Successful ', {
                theme: 'colored',
            });
            navigate(from, { replace: true });
        }
    }, [token])

    useEffect(() => {
        if (loginError) {
            switch (loginError.code) {
                case "auth/user-not-found":
                    setError({ ...error, email: "User Not Found" });
                    break;
                case "auth/wrong-password":
                    setError({ ...error, password: "Wrong Password" });
                    break;
                default:
                    setError({ ...error, others: loginError.message });
            }
        }
    }, [loginError]);

    if (loginLoading || loading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-10'>
            <div className='h-full px-2 sm:px-10'>
                <div className='lg:w-2/4 mx-auto py-20 px-2 rounded-lg my-20 shadow-2xl'>
                    <p className='text-2xl mb-8 uppercase font-bold text-center'>Login</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='sm:px-10'>

                        <input placeholder='Email' type="email" className='input input-bordered border-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent block w-full ' 
                        {...register("email", { required: true })} />
                        <small className='text-error font-semibold'>
                            {errors.email?.type === 'required' && "Email is required"}
                            {error.email}
                        </small>

                        <input placeholder='Password' type="password" className='input input-bordered border-black focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent block w-full mt-4' 
                        {...register("password", { required: true })} />
                        <small className='text-error font-semibold'>
                            {errors.password?.type === 'required' && "Password is required"}
                            {error.password}
                        </small>

                        <input type="submit" className="btn btn-warning block w-full mt-4" value='Login' />
                        <small className='text-error font-semibold px-10'>
                            {error.others}
                        </small>

                    </form>
                  
                    <p className='text-right py-1 sm:px-10'>New to TechFly? <Link to='/signup' className='text-yellow-800 font-semibold'>Sign Up</Link></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;