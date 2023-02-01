import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading';

const Parts = () => {
    const navigate = useNavigate();
    const { data: parts, isLoading } = useQuery('parts', () =>
        fetch(`https://techfly-api.onrender.com/parts`)
            .then(res => res.json())

    )
    if (isLoading) {
        return <Loading></Loading>
    }
    const handlePurchase = (id) => {
        navigate(`/purchase/${id}`);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const handleClick = () => {
        navigate('/allParts');
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            <p className='text-3xl text-center font-semibold mb-12 mt-20 uppercase text-secondary' id='parts'>Parts</p>
            <div className='md:px-24 px-4 mb-12 grid md:grid-cols-3 grid-cols-1 gap-8'
            >
                {
                    parts.data.slice(-6).reverse().map(part =>
                        <div key={part._id} >
                            <div className="card card-compact shadow-xl border px-4 py-6"
                              data-aos="zoom-in-up" data-aos-easing="ease-out-cubic" data-aos-duration = "2000" data-aos-delay="80">
                                <figure><img src={part.image} alt="Shoes" className='h-[300px] rounded-lg w-full object-cover' /></figure>
                                <div className="card-body md:h-[400px]">
                                    <h2 className="card-title md:h-16">{part.title}</h2>
                                    <p className='h-28'>{part.description.slice(0,150)}</p>
                                    <p className='text-2xl font-bold'>$ {part.price}</p>
                                    <p>Minimum Order Quantity: {part.minimumOrderQuantity}</p>
                                    <p>Available Quantity: {part.availableQuantity}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-warning" onClick={() => handlePurchase(part._id)}>Purchase</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
               
                
            </div>
            <div className='flex justify-center mb-8'>
                    <button className='btn btn-secondary btn-outline' onClick={handleClick}>All Parts</button>
                </div>
        </>

    );
};

export default Parts;