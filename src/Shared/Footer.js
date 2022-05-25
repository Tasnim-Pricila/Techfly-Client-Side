import { faFacebookF, faGooglePlusG, faInstagram, faYoutube } from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-slate-200'>
            <div className='grid md:grid-cols-4 grid-cols-1 py-20 px-28 gap-8 justify-center'>
                <div className='justify-self-cente'>
                    <p className='uppercase text-secondary  font-bold'>
                        <span className='text-xl'>  &copy; 2022 TechFly </span> <br />
                    All Rights Reserved</p>
                    <div className='pt-6'>
                        <p>
                           Techfly - Computer Parts  <br />
                            Manufacturing Website
                        </p>
                    </div>
                    <div className='pt-10 flex gap-8 text-slate-500'>
                        <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faGooglePlusG}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </div>
                </div>
                <div className='justify-self-center'>
                    <p className='text-slate-800 text-xl font-semibold'>Company</p>
                    <div className='pt-6 flex flex-col gap-4 text-slate-700'>
                        <Link to='/' className='hover:text-primary'> Home </Link>
                        <Link to='/' className='hover:text-primary'> Our Factories </Link>
                        <Link to='/' className='hover:text-primary'> Mission and strategy </Link>
                        <Link to='/' className='hover:text-primary'> Charitable Actions </Link>
                        <Link to='/' className='hover:text-primary'> Environment </Link>
                    </div>
                </div>
                <div className='justify-self-center'>
                    <p className='text-slate-800 text-xl font-semibold'>Production</p>
                    <div className='pt-6 flex flex-col gap-4 text-slate-700'>
                        <Link to='/' className='hover:text-primary'> Technology </Link>
                        <Link to='/' className='hover:text-primary'> Products </Link>
                        <Link to='/' className='hover:text-primary'> Quality </Link>
                        <Link to='/' className='hover:text-primary'> Sales Geography </Link>
                        <Link to='/' className='hover:text-primary'> Our Customers </Link>
                    </div>
                </div>
                <div className='justify-self-end'>
                    <p className='text-slate-800 text-xl font-semibold'>Production</p>
                    <div className='pt-6 flex flex-col gap-4 text-slate-700'>
                        <Link to='/' className='hover:text-primary'> Addresses of factories </Link>
                        <Link to='/' className='hover:text-primary'> Dealers </Link>
                        <Link to='/' className='hover:text-primary'> Trading houses </Link>
                        <Link to='/' className='hover:text-primary'> Brand Shops </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;