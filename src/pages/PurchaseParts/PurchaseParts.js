import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PurchaseModal from './PurchaseModal';

const PurchaseParts = () => {
    const { id } = useParams();
    const [modalData, setModalData] = useState(null);


    const { data: part, isLoading, refetch } = useQuery('part', () =>
        fetch(`http://localhost:5000/parts/${id}`)
            .then(res => res.json())
    )

    const [quantity, setQuantity] = useState(4);

    if (isLoading) {
        return <p>Loading...</p>
    }

    let minQuantity = part.minimumOrderQuantity;
    let availableQuantity = part.availableQuantity;

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrease = () => {
        setQuantity(quantity - 1);
    }

    return (
        <div className='px-24 my-24'>
            <div className="card lg:card-side shadow-xl">
                <figure><img src={part.img} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{part.title}</h2>
                    <h6 className='pb-8'>{part.description}</h6>
                    <div className='flex font-semibold w-[100px] items-center gap-4'>
                        <button className='btn btn-primary' disabled={quantity === availableQuantity} onClick={handleIncrease}> + </button>
                        <p>
                            {quantity}
                        </p>
                        <button className='btn btn-primary' disabled={quantity === minQuantity} onClick={handleDecrease} >
                            -
                        </button>
                    </div>
                    <div class="card-actions justify-end">
                        <label htmlFor="purchase-modal" class="btn btn-primary" 
                        onClick={()=>setModalData(part)}>Purchase</label>
                    </div>
                </div>
            </div>
            {modalData && 
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

export default PurchaseParts;