import { TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import DeleteMyOrder from './DeleteMyOrder';

const MyOrders = () => {

    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const [deletingOrder, setDeletingOrder] = useState(null);

    const { data: orders, isLoading, refetch } = useQuery(['orders', email], () =>
        fetch(`http://localhost:5000/purchase?email=${email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    const handleDelete = async (id) => {
        fetch(`http://localhost:5000/purchase/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    setDeletingOrder(null);
                    refetch();
                }
                else {
                    console.log(data);
                }
            })
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
                                            <p className='uppercase text-primary font-bold'>Paid <br />
                                                <small className='text-black'> Transaction ID:
                                                    <br /> {order.transactionID}
                                                </small>
                                            </p>
                                        }
                                    </td>
                                    <td>
                                        {
                                            !order.paid &&
                                            <label htmlFor="deleteMyOrder" className="btn btn-error btn-outline" onClick={() => setDeletingOrder(order)}>
                                                Delete
                                                <TrashIcon className='w-6 h-5'></TrashIcon>
                                            </label>
                                        }
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
            {deletingOrder &&
                <DeleteMyOrder
                    deletingOrder={deletingOrder}
                    handleDelete={handleDelete}
                />
            }
        </div>
    );
};

export default MyOrders;