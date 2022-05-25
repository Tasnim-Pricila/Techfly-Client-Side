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
                <div className="drawer-content ml-12">
                    <p className='text-2xl font-bold my-4'>
                        Welcome Back, {user?.displayName.split(' ')[0]}
                    </p>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="p-4 px-16 overflow-y-auto w-80 text-base-content bg-warning">
                        {
                            !admin &&
                            <>
                                <li className='py-2 font-semibold text-xl mb-2'><NavLink to='/dashboard' >My Orders</NavLink></li>
                                <li className='font-semibold text-xl py-2 mb-2'><NavLink to='/dashboard/review' >Add a Review</NavLink></li>
                            </>
                        }
                        {
                            admin &&
                            <>
                                <li className='py-2 font-semibold text-xl mb-2'>
                                    <NavLink to='/dashboard'>Manage Products</NavLink>
                                </li>
                                <li className='py-2 font-semibold text-xl mb-2'>
                                    <NavLink to='/dashboard/manageOrders'>Manage All Orders</NavLink>
                                </li>
                                <li className='py-2 font-semibold text-xl mb-2'>
                                    <NavLink to='/dashboard/addProduct'>Add a Product</NavLink>
                                </li>
                                <li className='py-2 font-semibold text-xl mb-2'>
                                    <NavLink to='/dashboard/makeAdmin'>Make Admin</NavLink>
                                </li>
                            </>
                        }
                        <li className='font-semibold text-xl py-2 mb-2'>
                            <NavLink to='/dashboard/myProfile'  >My Profile</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;