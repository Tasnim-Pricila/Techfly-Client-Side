import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Services = () => {
    return (
        <div>
            <div className='grid grid-cols-3'>
                <div className='flex gap-8 justify-center items-center bg-green-400 p-8'>
                    <FontAwesomeIcon icon={faShippingFast} className='fa-3x border-8 
                     border-green-300 rounded-full p-6 bg-white text-green-400'></FontAwesomeIcon>
                    <p className='text-4xl uppercase font-bold text-white'>Shipping Worldwide</p>
                </div>
                <div className='flex gap-8 justify-center items-center bg-cyan-400 p-8'>
                    <FontAwesomeIcon icon={faShippingFast} className='fa-3x fa-3x border-8 
                     border-cyan-300 rounded-full p-6 bg-white text-cyan-400'></FontAwesomeIcon>
                    <p className='text-4xl uppercase font-bold text-white'>Partnership Program</p>
                </div>
                <div className='flex gap-8 justify-center items-center bg-yellow-400 p-8'>
                    <FontAwesomeIcon icon={faShippingFast} className='fa-3x fa-3x border-8 
                     border-yellow-300 rounded-full p-6 bg-white text-yellow-400'></FontAwesomeIcon>
                    <p className='text-4xl uppercase font-bold text-white'>Discounts and Sale</p>
                </div>

            </div>
        </div>
    );
};

export default Services;