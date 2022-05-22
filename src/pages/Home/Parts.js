import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Parts = () => {
    const navigate = useNavigate();
    const { data: parts, isLoading, refetch } = useQuery('parts', () =>
        fetch(`http://localhost:5000/parts`)
            .then(res => res.json())

    )
    if (isLoading) {
        return <p>Loading...</p>
    }
    const handlePurchase = (id) => {
        navigate(`/purchase/${id}`);
    }
    return (
        <>
            <p className='text-2xl text-center font-semibold my-12'>Parts</p>
            <div className='px-24 mb-12 grid grid-cols-3'>
                {
                    parts.map(part =>
                        <div key={part._id} >
                            <div className="card card-compact w-96 bg-base-100 shadow-xl'>">
                                <figure><img src={part.image} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{part.title}</h2>
                                    <p>{part.description}</p>
                                    <p>{part.price}</p>
                                    <p>Minimum Order Quantity: {part.minimumOrderQuantity}</p>
                                    <p>Available Quantity: {part.availableQuantity}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={() => handlePurchase(part._id)}>Purchase</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>

    );
};

export default Parts;