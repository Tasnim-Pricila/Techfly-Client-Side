import React from 'react';
import about from '../../images/about.jpg'
import { BriefcaseIcon, StarIcon, UserGroupIcon } from '@heroicons/react/solid';

const About = () => {
    return (
        <div>
            <div className='bg-no-repeat bg-cover bg-center bg-blend-overlay bg-[#24212115]
             text-black' >
                <div className='md:w-1/2 mx-auto text-center flex flex-col justify-center h-full py-16'>
                    <p className='text-2xl uppercase tracking-wider text-slate-900'>Welcome To</p>
                    <p className='text-5xl uppercase tracking-widest font-bold text-secondary'>Techfly</p>
                    <p className='mx-auto my-10 text-2xl md:px-24 px-6 text-slate-800 font-[400] italic'>Our product portfolio is comprised of the most trusted brands and we offering the finest customer service. We offer top quality products at reasonable prices, provide unparalleled technical assistance, and back it all up with outstanding customer support.</p>
                    <button className='btn btn-secondary btn-outline md:w-1/6 mx-auto '>About Us</button>
                </div>
            </div>
            <div style={{ backgroundImage: `url('${about}')` }}
                className='min-h-screen bg-no-repeat bg-cover bg-center bg-blend-overlay 
            bg-slate-900 text-white bg-fixed' >
                <div className='grid md:grid-cols-2 grid-cols-1 md:px-20 px-4 gap-20 py-28'>
                    <div>
                        <p className='uppercase text-2xl mb-12 leading-10'>About <br />
                            <span className='font-bold text-5xl tracking-wider text-secondary'>Techfly</span>
                        </p>
                        <p className='text-2xl md:pr-32'>
                            <span className='italic font-bold'>TechFly</span> helps manufacturers maximize the productivity they gain from their pneumatic tools, diaphragm pumps, chain hoists and related supplies. We dedicated to helping our customers andreduce operating costs.
                        </p>
                    </div>
                    <div>
                        <div className='grid md:grid-cols-10 grid-cols-5 mb-12'>
                            <UserGroupIcon className='w-10 basis-[10%] text-cyan-400' ></UserGroupIcon>
                            <div className='md:col-span-9 col-span-4 md:pr-20'>
                                <p className='mb-4 pt-1 text-2xl font-bold text-cyan-400' >WE ARE PROFESSIONALS</p>
                                <p > How all this mistakens idea of denouncing pleasures and completed account. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren. </p>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-10 grid-cols-5 mb-12'>
                            <BriefcaseIcon className='w-10 basis-[10%] text-green-500'></BriefcaseIcon> 
                            <div className='md:col-span-9 col-span-4 md:pr-20'>
                                <p className='mb-4 pt-1 text-2xl font-bold text-green-500' >WE ARE TRUSTED</p>
                                <p > Idea denouncing pleasures and praisings pain was born great explorer. No sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-10 grid-cols-5 mb-12'>
                            <StarIcon className='w-10 basis-[10%] text-yellow-300'></StarIcon> 
                            <div className='md:col-span-9 col-span-4 md:pr-20'>
                                <p className='mb-4 pt-1 text-2xl font-bold text-yellow-300' >WE ARE EXPERTS</p>
                                <p>
                                    Denouncing pleasures and was born work will give you a complete masters. Eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua vero eos et accusam.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;