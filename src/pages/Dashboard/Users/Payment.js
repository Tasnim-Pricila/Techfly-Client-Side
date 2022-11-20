import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Loading from '../../../Shared/Loading';

const stripePromise = loadStripe('pk_test_51L2D2EKZuhtVgyM7S2CeyD5YrpaY7x1Ab3pNWv4hqTyRbvblNQ2KZhgUz71r0JbCZCytaYDey0oYNYlZ1t3QNseW00ZewuwFk9');

const Payment = () => {
    const { id } = useParams();
    const url = (`https://techfly-api.onrender.com/purchase/${id}`);

    const { data: orders, isLoading, refetch } = useQuery(['orders', id], () =>
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <>
        <div className='md:w-1/2 mt-12'>
            <div className="shadow-xl mr-2">
                <div className="card-body border-2 rounded-lg border-purple-400">
                    <h2 className="card-title">Payment for <span className='text-secondary'> {orders.data.productName} </span> </h2>
                    <p className='pt-8 font-bold'> Pay: <span className='text-primary font-semibold text-xl'> ${orders.data.price}</span>   </p>
                </div>
            </div>
            <div className="shadow-xl mt-12 mr-2">
                <div className="card-body border-2 rounded-lg border-purple-400">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm orders={orders.data} />
                    </Elements>
                </div>
            </div>
        </div>

        </>
    );
};

export default Payment;