import { faArrowRight, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../../Shared/Loading';
import DeleteMyOrder from './DeleteMyOrder';

const MyOrders = () => {

    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const [deletingOrder, setDeletingOrder] = useState(null);

    const { data: orders, isLoading, refetch } = useQuery(['orders', email], () =>
        fetch(`https://vast-fjord-23349.herokuapp.com/purchase?email=${email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    if (loading) {
        return <Loading></Loading>
    }

    const handleDelete = async (id) => {
        fetch(`https://vast-fjord-23349.herokuapp.com/purchase/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    toast.success('Order Deleted Successfully', {
                        theme: 'colored',
                        delay: 0,
                    });
                    setDeletingOrder(null);
                    refetch();
                }
                else {
                    toast.error('Something Went Wrong', {
                        theme: 'colored',
                        delay: 0,
                    });
                }
            })
    }

    return (
        <div>
            <p className='text-xl font-bold text-primary mb-8'>My Orders</p>
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