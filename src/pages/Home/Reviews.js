import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';

const Reviews = () => {

    const [user, loading] = useAuthState(auth);
    const image = user?.photoURL;

    const { data: reviews, isLoading, refetch } = useQuery('reviews', () =>
        fetch(`http://localhost:5000/reviews`)
            .then(res => res.json())

    )
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <p className='text-2xl text-center font-semibold my-12'>Parts</p>
            <div className='px-24 mb-12 grid grid-cols-3 gap-8'>
                {
                    reviews.map(review =>
                        <div key={review._id} >
                            <div className="card card-compact shadow-xl border px-4 py-6">
                                <figure><img src={image} alt="Shoes" className='h-[100px] rounded-full w-[100px] object-cover' /></figure>
                                <div className="card-body flex flex-col justify-center items-center">
                                    <h2 className="card-title ">{review.reviewedBy}</h2>
                                    <h2 className="card-title">{review.rating}</h2>
                                    <p>{review.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Reviews;