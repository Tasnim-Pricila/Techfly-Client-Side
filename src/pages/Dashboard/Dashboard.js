import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../CustomHook/useAdmin';
import auth from '../../firebase.init';

const Dashboard = () => {

    const [user, loading] = useAuthState(auth);
    const [admin] = useAdmin(user);
    
    if (loading) {
        <p>Loading...</p>
    }

    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content lg:ml-12 ml-4">
                    <p className='text-2xl font-bold my-4'>
                        Welcome Back, <span className='text-primary'> 
                        {user?.displayName.split(' ')[0]}</span>
                    </p>
                    <Outlet></Outlet>
                </div>
               
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay "></label>
                    <ul className="overflow-y-auto w-80 text-base-content bg-warning px-12 py-2">
                        {
                            !admin &&
                            <>
                                <li className='py-2 font-semibold text-xl mb-2' >
                                    <NavLink to='/dashboard'>My Orders</NavLink>
                                </li>
                                <li className='font-semibold text-xl py-2 mb-2'>
                                    <NavLink to='/dashboard/review' className={({ isActive }) => (isActive ? "text-primary" : "")} > Add a Review </NavLink>
                                </li>
                            </>
                        }
                        {
                            admin &&
                            <>
                                <li 
                                className='py-2 font-semibold text-xl mb-2'
                                 >
                                    <NavLink to='/dashboard'>Manage Products</NavLink>
                                </li>
                                <li className='py-2 font-semibold text-xl mb-2'>
                                    <NavLink to='/dashboard/manageOrders' className={({ isActive }) => (isActive ? "text-primary" : "")}>Manage All Orders</NavLink>
                                </li>
                                <li className='py-2 font-semibold text-xl mb-2'>
                                    <NavLink to='/dashboard/addProduct' className={({ isActive }) => (isActive ? "text-primary" : "")}>Add a Product</NavLink>
                                </li>
                                <li className='py-2 font-semibold text-xl mb-2'>
                                    <NavLink to='/dashboard/makeAdmin' className={({ isActive }) => (isActive ? "text-primary" : "")}>Make Admin</NavLink>
                                </li>
                            </>
                        }
                        <li className='font-semibold text-xl py-2 mb-2'>
                            <NavLink to='/dashboard/myProfile' className={({ isActive }) => (isActive ? "text-primary" : "")}>My Profile</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;