import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const MyOrders = () => {

    const [user, loading] = useAuthState(auth);
    const email = user?.email;

    const [orders, setOrders] = useState([]);


    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/purchase?email=${email}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => setOrders(data));
        }
    }, [email])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th> No.</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Payment Status</th>
                            <th> Manage </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td className='font-semibold text-secondary'>{order.productName}</td>
                                    <td>{order.quantity} </td>
                                    <td> 
                                        {
                                            !order.paid &&
                                            <Link to={`/dashboard/payment/${order._id}`} className='btn btn-success btn-outline'>Pay</Link> 
                                        }
                                        {
                                            order.paid &&
                                            <p className='btn btn-success btn-outline'>Paid</p> 
                                        }
                                        
                                    </td>
                                    <td> Delete </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;