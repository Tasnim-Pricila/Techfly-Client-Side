import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ orders }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionID, seTransactionID] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { price, purchasedBy, productName, email, _id } = orders;

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.clientSecret) {
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

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        setCardError(error?.message || '');

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment
            (clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: purchasedBy,
                            productName: productName,
                            email: email
                        },
                    },
                })

        // Handle result.error or result.paymentIntent
        if (intentError) {
            setCardError(intentError.message);
            setSuccess('');
        }
        else {
            setCardError('');
            setSuccess('Your payment is completed');
            seTransactionID(paymentIntent.id);

            const payment = {
                purchaseId: _id,
                transactionID: transactionID,
            }

            fetch(`http://localhost:5000/purchase/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => console.log(data));
        }
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
                disabled={!stripe || !clientSecret}>
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