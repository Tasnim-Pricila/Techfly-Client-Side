import { TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../../Shared/Loading';
import DeleteModal from './DeleteModal';

const ManageProducts = () => {

    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: products, isLoading, refetch } = useQuery('products', () =>
        fetch('https://techfly-api.onrender.com/parts', {
        })
            .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDelete = async (id) => {
        fetch(`https://techfly-api.onrender.com/parts/${id}`, {
            method: 'DELETE',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
           
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.deletedCount > 0) {
                    toast.success('Product Deleted Successfully', {
                        theme: 'colored',
                        delay: 0,
                    });
                    setDeletingProduct(null);
                    refetch();
                }
                else{
                    toast.error('Something Went Wrong', {
                        theme: 'colored',
                        delay: 0,
                    });
                }
            })
    }

    return (
        <div>
            <p className='text-xl font-bold text-primary mb-8'>Manage Products</p>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th> No.</th>
                            <th> Image </th>
                            <th> Product Name</th>
                            <th> Price</th>
                            <th> In Stock </th>
                            <th> Manage </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.data.map((product, index) =>
                                <tr key={product._id}>
                                    <th>{index + 1}</th>
                                    <td className='font-semibold text-secondary w-[80px]'> <img src={product.image} alt="" /> </td>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.availableQuantity}</td>
                                    <td>
                                        <label htmlFor="deleteModal"className="btn btn-error btn-outline" onClick={() => setDeletingProduct(product)}>
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

            {deletingProduct &&
                <DeleteModal
                    deletingProduct={deletingProduct}
                    handleDelete={handleDelete}
                />
            }
        </div>
    );
};

export default ManageProducts;