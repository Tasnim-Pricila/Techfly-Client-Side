import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Services = () => {
    return (
        <div>
            <div className='grid md:grid-cols-3 grid-cols-1'>
                <div className='flex gap-8 justify-center items-center bg-yellow-400 p-8 px-12'>
                    <FontAwesomeIcon icon={faShippingFast} className='fa-3x border-8 
                     border-yellow-300 rounded-full p-6 bg-white text-yellow-400'></FontAwesomeIcon>
                    <p className='md:text-3xl text-2xl uppercase font-bold text-white'>Shipping Worldwide</p>
                </div>
                <div className='flex gap-8 justify-center items-center bg-secondary p-8'>
                    <FontAwesomeIcon icon={faShippingFast} className='fa-3x fa-3x border-8 
                     border-fuchsia-300 rounded-full p-6 bg-white text-secondary'></FontAwesomeIcon>
                    <p className='md:text-3xl text-2xl uppercase font-bold text-white'>Partnership Program</p>
                </div>
                <div className='flex gap-8 justify-center items-center bg-yellow-400 p-8'>
                    <FontAwesomeIcon icon={faShippingFast} className='fa-3x fa-3x border-8 
                     border-yellow-300 rounded-full p-6 bg-white text-yellow-400'></FontAwesomeIcon>
                    <p className='md:text-3xl text-2xl uppercase font-bold text-white'>Discounts and Sale</p>
                </div>

            </div>
        </div>
    );
};

export default Services;