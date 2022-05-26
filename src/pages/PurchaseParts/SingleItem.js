import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import PurchaseModal from './PurchaseModal';

const SingleItem = ({ part, setModalData, minQuantity, modalData, refetch }) => {
    const [user, loading] = useAuthState(auth);
   
    const email = user?.email;
    const userName = user?.displayName;
    const [quantity, setQuantity] = useState(minQuantity);

    const { title, price, availableQuantity, image, minimumOrderQuantity, description } = part;
    const availableQty = parseInt(availableQuantity);
    const minQty = parseInt(minimumOrderQuantity);

    

    const handleQuantity = (e) => {
        const quantity = e.target.value;
        setQuantity(quantity);
    }

    const handlePurchase = (parts) => {
        setModalData(parts);
        refetch();
    }

    return (
        <div>
            <div className='min-h-screen'>
                <div className="card lg:card-side shadow-xl md:mx-20 mt-28 md:px-20">
                    <figure><img src={image} alt="Album" className='w-52' /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">{title}</h2>
                        <h2 className="card-title">$ {price}</h2>
                        <p className='py-8'>{description}</p>
                        <p> <b> Purchasing By: </b> {userName}</p>
                        <p> <b> Email: </b>{email}</p>
                        <p><b> Available In Stock:  </b>{availableQty}</p>
                        <p className='pb-8'> <b>Minimun Order Quantity:</b> {minQty}</p>
                        <div className='flex font-semibold w-[100px] items-center gap-4'>
                            <input type='number' name="quantity" defaultValue={quantity} className='input input-bordered input-primary w-[150px]' onChange={handleQuantity} />

                            <label htmlFor="purchase-modal" className='btn btn-primary' disabled={quantity < minQty || quantity > availableQty} onClick={() => handlePurchase(part)}>Purchase</label>
                        </div>
                    </div>
                </div>

            </div>
            {
                modalData &&
                <PurchaseModal
                    part={part}
                    quantity={quantity}
                    refetch={refetch}
                    setModalData={setModalData}
                    email={email}
                    userName={userName}>
                </PurchaseModal>
            }
        </div>
    );
};

export default SingleItem;