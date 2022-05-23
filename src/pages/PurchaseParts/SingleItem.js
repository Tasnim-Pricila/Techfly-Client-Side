import React, { useState } from 'react';
import PurchaseModal from './PurchaseModal';

const SingleItem = ({ part, setModalData, minQuantity, modalData, refetch }) => {

    const [quantity, setQuantity] = useState(minQuantity);

    const { title, price, availableQuantity, image, minimumOrderQuantity, description } = part
    const availableQty = parseInt(availableQuantity);
    const minQty = parseInt(minimumOrderQuantity);

    const handleIncrease = () => {
        setQuantity(parseInt(quantity) + 1);
    }
    const handleDecrease = () => {
        setQuantity(parseInt(quantity) - 1);
    }

    return (
        <div>
            <div className='px-24 my-24'>
                <div className="card lg:card-side shadow-xl">
                    <figure><img src={image} alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{title}</h2>
                        <h2 className="card-title">{price}</h2>
                        <h6 className='pb-8'>{description}</h6>
                        <div className='flex font-semibold w-[100px] items-center gap-4'>
                            <button className='btn btn-primary' disabled={quantity === availableQty} onClick={handleIncrease}> + </button>
                            <p>
                                {quantity}
                            </p>
                            <button className='btn btn-primary' disabled={quantity === minQty} onClick={handleDecrease} >
                                -
                            </button>
                        </div>
                        <div className="card-actions justify-end">
                            <label htmlFor="purchase-modal" className="btn btn-primary"
                                onClick={() => setModalData(part)}>Purchase</label>
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
                    setModalData={setModalData}>
                </PurchaseModal>
            }
        </div>
    );
};

export default SingleItem;