import { TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DeleteModal from './DeleteModal';

const ManageProducts = () => {

    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: products, isLoading, refetch } = useQuery('products', () =>
        fetch('http://localhost:5000/parts', {
        })
            .then(res => res.json()))

    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleDelete = async (id) => {
        fetch(`http://localhost:5000/parts/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    setDeletingProduct(null);
                    refetch();
                }
                else{
                    console.log(data);
                }
            })
    }

    return (
        <div>
            <p className='text-2xl text-primary'>Manage Products</p>
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
                            products.map((product, index) =>
                                <tr key={product._id}>
                                    <th>{index + 1}</th>
                                    <td className='font-semibold text-secondary w-[80px]'> <img src={product.image} alt="" /> </td>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.availableQuantity}</td>
                                    <td>
                                        <label htmlFor="deleteModal" class="btn btn-error btn-outline" onClick={() => setDeletingProduct(product)}>
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