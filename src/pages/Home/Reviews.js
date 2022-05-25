import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import Rating from 'react-rating';
import auth from '../../firebase.init';
import proofile from '../../images/proofile.png';

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
            <p className='text-2xl text-center font-semibold mt-20 mb-12 text-secondary uppercase '>Reviews</p>
            <div className='md:px-24 mb-12 grid md:grid-cols-3 grid-cols-1 gap-8 px-4'>
                {
                    reviews.map(review =>
                        <div key={review._id} >
                            <div className="card card-compact shadow-xl border px-4 py-6 flex flex-col justify-center items-center gap-4">
                                <figure><img src={image ? image : proofile} alt="" className='h-[80px] rounded-full w-[80px] object-cover mb-2' /></figure>
                                <h2 className="card-title ">{review.reviewedBy}</h2>
                                <Rating
                                    initialRating={review.rating}
                                    emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'black' }} />}
                                    fullSymbol={<FontAwesomeIcon style={{ color: 'goldenrod' }} icon={faStar} />}
                                    readonly>
                                </Rating>
                                <h2 className="card-title">{review.rating}</h2>
                                <p>{review.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Reviews;