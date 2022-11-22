
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading';

const SingleItem = ({ part, setModalData, minQuantity, refetch }) => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const email = user?.email;
    const userName = user?.displayName;
    const [quantity, setQuantity] = useState(minQuantity);
    const [error, setError] = useState('');
    if (loading) {
        return <Loading></Loading>
    }
    // console.log(part);
    const { title, price, availableQuantity, image, minimumOrderQuantity, description } = part;

    const availableQty = parseInt(availableQuantity);
    const minQty = parseInt(minimumOrderQuantity);

    const handleQuantity = (e) => {
        const quantity = e.target.value;
        setQuantity(quantity);
        if (quantity < minQty) {
            setError(`You must be order at least ${minQty} products `)
        }
        else if (quantity > availableQty) {
            setError(`You can not order more than ${availableQty} products `)
        }
        else if (quantity <= availableQty || quantity >= minQty) {
            setError('');
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const purchase = {
            productName: title,
            quantity,
            price,
            purchasedBy: userName,
            email,
            address: e.target.address.value,
            phone: e.target.phone.value,
        }
        fetch('https://techfly-api.onrender.com/purchase', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(purchase)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.data?.acknowledged === true) {
                    toast.success('Your order is placed', {
                        theme: 'colored',
                        delay: 0,
                    });
                    e.target.reset();
                    navigate('/dashboard')
                }
                else {
                    toast.error('Something Went Wrong', {
                        theme: 'colored',
                        delay: 0,
                    });
                }
                refetch();
                // setModalData(null);
            })
    }


    return (
        <div>
            <div className=''>
                <div className="card lg:card-side shadow-xl md:mx-20 mt-20 md:px-20">
                    <figure><img src={image} alt="Album" className='w-52' /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">{title}</h2>
                        <h2 className="card-title py-4">$ {price}</h2>
                        <p className='pb-8'>{description}</p>
                        <p> <b> Purchasing By: </b> {userName}</p>
                        <p> <b> Email: </b>{email}</p>
                        <p><b> Available In Stock:  </b>{availableQty}</p>
                        <p className='pb-8'> <b>Minimun Order Quantity:</b> {minQty}</p>
                        <div className='flex font-semibold w-[100px] items-center gap-4'>
                            {/* <form>
                                <input type='number' name="quantity" defaultValue={quantity} className='input input-bordered input-primary w-[150px]'
                                    onChange={handleQuantity} />
                                <label htmlFor="purchase-modal" className='btn btn-primary mt-2' disabled={quantity < minQty || quantity > availableQty} onClick={() => handlePurchase(part)}>Purchase</label>
                            </form> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:w-1/3 mx-auto border-4 my-8'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-8 '>
                    <label htmlFor="Quantity" className='font-semibold md:pl-24 pl-8'>Quantity</label>
                    <input placeholder='quantity' name='quantity' type="number" defaultValue={minQty} className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' onKeyUp={handleQuantity} required />
                    <small className='text-center text-error font-bold'>
                        {error}
                    </small>

                    <input type="text" name='title' defaultValue={title} disabled className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' required />

                    <input type="number" name='price' defaultValue={price} disabled className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' required />

                    <input type="text" name='username' defaultValue={userName} disabled className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' required />

                    <input type="email" name='email' defaultValue={email} disabled className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' required />

                    <input type="number" name='phone' placeholder='Phone' className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' required />


                    <input type="text" name='address' placeholder='Address' className='input input-bordered border-black w-full max-w-xs self-center focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent' required />


                    <input type="submit" className="btn btn-warning w-[320px] self-center" value='Purchase' disabled={quantity < minQty || quantity > availableQty} />
                </form>
            </div>

        </div>
    );
};

export default SingleItem;