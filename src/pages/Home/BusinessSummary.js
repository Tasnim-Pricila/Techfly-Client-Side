import { ChatAlt2Icon, LocationMarkerIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/solid';
import React from 'react';
import summary from '../../images/summary.jpg'

const BusinessSummary = () => {
    return (
        <div style={{ backgroundImage: `url('${summary}')`}} className='bg-no-repeat bg-cover bg-center'>
            <div className='px-20 py-12'>
                <p className='text-3xl font-bold text-center w-1/2 mx-auto'>Our professional team works to increase productivity and cost effectiveness on the market</p>
                <div className='grid grid-cols-4 gap-12 mt-16'>
                    <div className='flex flex-col items-center'>
                        <UserGroupIcon className='w-12 mb-4 Techfly'></UserGroupIcon>
                        <p className='font-bold text-5xl text-yellow-500'>250+</p>
                        <p className='text-2xl pt-2 Techfly'>Trsusted Customers</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <LocationMarkerIcon className='w-12 mb-4 Techfly'></LocationMarkerIcon>
                        <p className='font-bold text-5xl text-yellow-500'>90+</p>
                        <p className='text-2xl pt-2 Techfly'>Store Location</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <ChatAlt2Icon className='w-12 mb-4 Techfly'></ChatAlt2Icon>
                        <p className='font-bold text-5xl text-yellow-500'>350+</p>
                        <p className='text-2xl pt-2 Techfly'> Reviews </p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <SparklesIcon className='w-12 mb-4 Techfly'></SparklesIcon>
                        <p className='font-bold text-5xl text-yellow-500'>50+</p>
                        <p className='text-2xl pt-2 Techfly'> Awards </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;