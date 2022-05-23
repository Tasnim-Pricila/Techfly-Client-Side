import { TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DeleteOrderModal from './DeleteOrderModal';

const ManageOrder = () => {
    const [deletingOrder, setDeletingOrder] = useState(null);
    const { data: purchases, isLoading, refetch } = useQuery('purchase', () =>
        fetch('http://localhost:5000/purchase', {
        })
            .then(res => res.json()))

    if (isLoading) {
        return <p>Loading...</p>
    }
    const handleDelete = async (id) => {
        fetch(`http://localhost:5000/purchase/${id}`, {
            method: 'DELETE',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
           
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    setDeletingOrder(null);
                    refetch();
                }
                else{
                    console.log(data);
                }
            })
    }
    return (
        <div>
            <div>
                <p className='text-2xl text-primary'>Manage Orders</p>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-center">
                        <thead>
                            <tr>
                                <th> No.</th>
                                <th> purchase Name</th>
                                <th> Price</th>
                                <th> Quantity </th>
                                <th> Purchased By </th>
                                <th> Status </th>
                                <th> Manage </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                purchases.map((purchase, index) =>
                                    <tr key={purchase._id}>
                                        <th>{index + 1}</th>
                                        <td>{purchase.productName}</td>
                                        <td>{purchase.price}</td>
                                        <td>{purchase.quantity}</td>
                                        <td>{purchase.purchasedBy} <br /> {purchase.email}</td>
                                        <td>
                                            <button className='btn btn-success'>Pending</button>
                                        </td>
                                        <td>
                                            <label htmlFor="deleteOrderModal" className="btn btn-error btn-outline" onClick={() => setDeletingOrder(purchase)}>
                                                Delete
                                                <TrashIcon className='w-6 h-5'></TrashIcon>
                                            </label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {deletingOrder &&
                    <DeleteOrderModal
                        deletingOrder={deletingOrder}
                        handleDelete={handleDelete}
                    />
                }
            </div>
        </div>
    );
};

export default ManageOrder;