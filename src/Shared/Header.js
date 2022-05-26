import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MenuAlt1Icon, MenuIcon, XIcon } from '@heroicons/react/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';
import Loading from './Loading';

const Header = () => {

    const [menuIcon, setMenuIcon] = useState(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setMenuIcon(false);
    }

    if (loading) {
        return <Loading></Loading>
    }
    const logOut = () => {
        signOut(auth);
        navigate('/');
        handleScroll();
    }

    return (
        <div>
            <div className='flex justify-between items-center md:px-20 px-4 py-4 bg-[#1B1E1E] text-white sticky top-0 z-50'>
                {
                    user &&
                    <div className='md:hidden'>
                        <label htmlFor="dashboard-drawer" className="drawer-button">
                            <MenuAlt1Icon className='w-6'></MenuAlt1Icon>
                        </label>
                    </div>
                }

                <div>
                    <Link to='/home' className='uppercase font-bold tracking-wider text-secondary text-xl'>TechFly</Link>
                </div>
                <div onClick={() => setMenuIcon(!menuIcon)} className='w-6 h-6 md:hidden'>
                    {menuIcon ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
                </div>
                <div className={`flex md:flex-row md:gap-8 flex-col md:static duration-1000 absolute bg-[#333636] h-[100vh] md:h-auto md:bg-transparent text-center uppercase items-center gap-2 overflow-hidden
                ${menuIcon ? 'right-0 left-0 top-14 py-4 gap-2' : 'right-0 left-[500px] top-14'} `}>
                    <NavLink to='/'
                        className={({ isActive }) => (isActive ? "text-secondary pb-1 relative before:inline-block before:absolute before:bg-secondary before:w-full before:h-[0.1rem] before:bottom-0 " : "pb-1")} onClick={handleScroll}>
                        Home
                    </NavLink>
                    <NavLink to='/blogs'
                        className={({ isActive }) => (isActive ? "text-secondary pb-1 relative before:inline-block before:absolute before:bg-secondary before:w-full before:h-[0.1rem] before:bottom-0 " : "pb-1")} onClick={handleScroll}>
                        Blogs
                    </NavLink>
                    <NavLink to='/portfolio'
                        className={({ isActive }) => (isActive ? "text-secondary pb-1 relative before:inline-block before:absolute before:bg-secondary before:w-full before:h-[0.1rem] before:bottom-0 " : "pb-1")} onClick={handleScroll}>
                        My Portfolio
                    </NavLink>
                    {
                        user &&
                        <NavLink to='/dashboard'
                            className={({ isActive }) => (isActive ? "text-secondary pb-1 relative before:inline-block before:absolute before:bg-secondary before:w-full before:h-[0.1rem] before:bottom-0 " : "pb-1")} onClick={handleScroll}>
                            Dashboard
                        </NavLink>
                    }
                    <NavLink to='/contact'
                        className={({ isActive }) => (isActive ? "text-secondary pb-1 relative before:inline-block before:absolute before:bg-secondary before:w-full before:h-[0.1rem] before:bottom-0 " : "pb-1")} onClick={handleScroll}>
                        Contact
                    </NavLink> 
                    {
                        !user ?
                            <NavLink to='/login'
                                className={({ isActive }) => (isActive ? "text-secondary pb-1 relative before:inline-block before:absolute before:bg-secondary before:w-full before:h-[0.1rem] before:bottom-0 " : "pb-1")} onClick={handleScroll}>
                                Login
                            </NavLink>
                            :
                            <>
                                <button className='btn btn-secondary' onClick={logOut}>Logout</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;