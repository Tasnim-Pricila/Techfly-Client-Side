import { faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Contact = () => {
    return (
        <div className='mb-28'>
            <p className='text-center text-secondary text-2xl mt-16 mb-12 uppercase font-bold'>Contact</p>
            <div className='grid md:grid-cols-3 grid-cols-1 md:px-36 px-8 gap-20'>
                <div>
                    <p className='text-2xl pb-8'>Call Us or Fill the Form</p>
                    <div>
                        <div className='grid grid-cols-6 items-center'>
                            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                            <div className='col-span-5'>
                                <p className='font-bold'>123-456-789</p>
                                <p>Don't hesitate to contact us</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-6 mt-4 items-center'>
                            <FontAwesomeIcon icon={faLocationPin}></FontAwesomeIcon>
                            <div className='col-span-5'>
                                <p className='font-bold'>Working Time</p>
                                <p>Mon-Fri: 9:00 - 18:00 / Closed on weekends</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <input type="text" placeholder="Name" class="input input-bordered input-primary w-full max-w-xs mr-4 mb-4" />
                    <input type="text" placeholder="Email" class="input input-bordered input-primary w-full max-w-xs mb-4" />
                    <input type="text" placeholder="Company" class="input input-bordered input-primary w-full max-w-xs mr-4 mb-4" />
                    <input type="number" placeholder="Phone" class="input input-bordered input-primary w-full max-w-xs mb-4" />
                    <textarea class="textarea textarea-primary block md:w-[655px] mb-4" placeholder="How Can We Help?"></textarea>
                    <button class="btn btn-outline btn-primary md:w-[655px]">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Contact;