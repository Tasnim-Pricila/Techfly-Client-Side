import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../../firebase.init';

const AddReview = () => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const userName = user?.displayName;
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const{description, rating} = data;
        const reviewData = { 
            description, 
            rating, 
            reviewedBy: userName, 
            email, 
        } 
        // console.log(reviewData);
        fetch('http://localhost:5000/review',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(reviewData)
        })
        
        .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    console.log(data);
                    reset();
                }
                else {
                    console.log(data);
                }   
            })
    };

    return (
        <div>
            <div className='mx-auto'>
                <div>
                    <p className='text-xl font-bold text-primary mb-8'>Add a Review</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4  w-1/3'>

                        <input placeholder='Name' type="text" defaultValue={userName} disabled className='input input-bordered input-info w-full max-w-xs' {...register("name")} />

                        <input placeholder='Email' type="email" defaultValue={email} disabled className='input input-bordered input-info w-full max-w-xs' {...register("email")} />
               

                        <input type="number" placeholder='Give star rating out of 5' className='input input-bordered input-info w-full max-w-xs' {...register("rating", { required: true })} />
                        {errors.rating?.type === 'required' && "Rating is required"}

                        <textarea placeholder='Write Your Review Here...' className='input input-bordered input-info w-full max-w-xs' {...register("description", { required: true })}/> 
                        {errors.description?.type === 'required' && "Description is required"}

                        <input type="submit" className="btn btn-primary w-[320px]" value='Submit Review' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;