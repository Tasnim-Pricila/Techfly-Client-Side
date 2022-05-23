import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ orders }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionID, setTransactionID] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const { price, purchasedBy, productName, email, _id } = orders;
    console.log(price);
    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');
        setSuccess('');
        setProcessing(true);

        stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: purchasedBy,
                        email: email
                    },
                },
            })
            .then(function (result) {
                // Handle result.error or result.paymentIntent
                if (result.paymentIntent) {
                    setCardError('');
                    console.log(result.paymentIntent);
                    setSuccess('Your payment is completed');
                    setTransactionID(result.paymentIntent.id);

                    const payment = {
                        purchaseId: _id,
                        transactionID: result.paymentIntent.id,
                        status: 'Pending'
                    }

                    fetch(`http://localhost:5000/purchase/${_id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(payment)
                    })
                        .then(res => res.json())
                        .then(data => {
                            setProcessing(false);
                            console.log(data);
                        });
                }
                if (result.error) {
                    setCardError(result.error.message);
                    setProcessing(false);

                }
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn btn-info btn-sm mt-4'
                    disabled={!stripe || !clientSecret || success}>
                    Pay
                </button>

            </form>
            {
                cardError && <p>{cardError}</p>
            }
            {
                success && <p>{success} Transaction ID: {transactionID} </p>
            }
        </div>
    );
};

export default CheckoutForm;