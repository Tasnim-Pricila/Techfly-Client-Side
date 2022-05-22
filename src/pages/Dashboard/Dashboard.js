import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../CustomHook/useAdmin';
import auth from '../../firebase.init';

const Dashboard = () => {

    const [user, loading] = useAuthState(auth);
    const [admin] = useAdmin(user);
    console.log(user.email)

    if (loading) {
        <p>Loading...</p>
    }

    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ml-12">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        {!admin &&
                            <>
                                <li><Link to='/dashboard'>My Orders</Link></li>
                                <li><Link to='/dashboard/review'>Add a Review</Link></li>
                            </>
                        }
                        {
                            admin &&
                            <>
                                <li>
                                    <Link to='/dashboard/manageOrders'>Manage All Orders</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/addProduct'>Add a Product</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/makeAdmin'>Make Admin</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/manageProducts'>Manage Products</Link>
                                </li>

                            </>
                        }
                        <li>
                            <Link to='/dashboard/myProfile'>My Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;