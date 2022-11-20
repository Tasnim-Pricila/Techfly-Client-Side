import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import Rating from 'react-rating';
import auth from '../../firebase.init';
import proofile from '../../images/proofile.png';
import Slider from "react-slick";
import Loading from '../../Shared/Loading';

const Reviews = () => {
    const [user, loading] = useAuthState(auth);
    const image = user?.photoURL;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                
              }
            },
          ]
    };

    const { data: reviews, isLoading } = useQuery('reviews', () =>
        fetch(`https://techfly-api.onrender.com/review`)
            .then(res => res.json())
    )

    if (isLoading || loading) {
        return <Loading></Loading>
    }

    return (
        <div className='px-20'>
            <p className='text-2xl text-center font-semibold mt-20 mb-12 text-secondary uppercase '>Reviews</p>

            <Slider {...settings} className='mb-28'>
                {
                    reviews.data.slice(0).reverse().map(review =>
                        <div key={review._id} >
                            <div className="border-2 border-yellow-400 rounded-lg px-4 py-6 flex flex-col justify-center items-center gap-6 mr-5 ">

                                <img src={image ? image : proofile} alt="" className='h-[80px] rounded-full w-[80px] object-cover mb-2' />
                                <h2 className="card-title ">{review.reviewedBy}</h2>
                                <Rating
                                    initialRating={review.rating}
                                    emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'black' }} />}
                                    fullSymbol={<FontAwesomeIcon style={{ color: 'goldenrod' }} icon={faStar} />}
                                    readonly>
                                </Rating>
                                <h2 className="card-title">{review.rating}</h2>
                                <p className='h-28'>{review.description}</p>
                            </div>
                        </div>
                    )
                }
            </Slider>
        </div>
    );
};

export default Reviews;