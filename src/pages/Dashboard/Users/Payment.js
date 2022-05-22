import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L2D2EKZuhtVgyM7S2CeyD5YrpaY7x1Ab3pNWv4hqTyRbvblNQ2KZhgUz71r0JbCZCytaYDey0oYNYlZ1t3QNseW00ZewuwFk9');

const Payment = () => {
    const { id } = useParams();

    const { data: orders, isLoading, refetch } = useQuery(['orders', id], () =>
        fetch(`http://localhost:5000/purchase/${id}`)
            .then(res => res.json()))

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Payment for {orders.productName} </h2>
                    <p>Pay $ {orders.price} </p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div class="card w-96 bg-base-100 shadow-xl mt-12">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm orders={orders} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Payment;