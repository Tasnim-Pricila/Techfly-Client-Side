import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const AddProduct = () => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const userName = user?.displayName;

    const imgStorageKey = '966d2411c1e18d4935625f7409fb75e7';

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { description, title, price, minqty, availableQty } = data;

        // Upload Photo 
        const img = data.image[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const image = result.data.url;

                    const productData = {
                        title,
                        description,
                        price,
                        minimumOrderQuantity: minqty,
                        availableQuantity: availableQty,
                        addedBy: userName,
                        email,
                        image
                    }

                    // Post to database 
                    fetch(`https://techfly-api.onrender.com/parts`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                             authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(productData)
                    })
                        .then(res => res.json())
                        .then(insertedData => {
                            if (insertedData.data.acknowledged === true) {
                                toast.success('Product Added Successfully', {
                                    theme: 'colored',
                                    delay: 0,
                                });
                                reset();
                            }
                            else {
                                toast.error('Something Went Wrong', {
                                    theme: 'colored',
                                    delay: 0,
                                });
                            }
                        })
                }

            })
    };
    return (
        <div>
            <div className='mx-auto mb-12'>
                
                    <p className='text-xl font-bold text-primary mb-8'>Add a Product</p>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                        <input placeholder='Product Name' type="text" className='input input-bordered input-info w-full max-w-xs' {...register("title")} />
                        {errors.title?.type === 'required' && "Product Name is required"}

                        <input type="number" placeholder='Price' className='input input-bordered input-info w-full max-w-xs' {...register("price", { required: true })} />
                        {errors.price?.type === 'required' && "Price is required"}

                        <input type="number" placeholder='Minimum Quantiy need to be ordered' className='input input-bordered input-info w-full max-w-xs' {...register("minqty", { required: true })} />
                        {errors.minqty?.type === 'required' && "This field is required"}

                        <input type="number" placeholder='Available Quantity' className='input input-bordered input-info w-full max-w-xs' {...register("availableQty", { required: true })} />
                        {errors.availableQty?.type === 'required' && "This field is required"}

                        <textarea placeholder='Description' className='input input-bordered input-info w-full max-w-xs' {...register("description", { required: true })} />
                        {errors.description?.type === 'required' && "Description is required"}

                        <input placeholder='Name' type="text" defaultValue={userName} disabled className='input input-bordered input-info w-full max-w-xs' {...register("name")} />

                        <input placeholder='Email' type="email" defaultValue={email} disabled className='input input-bordered input-info w-full max-w-xs' {...register("email")} />

                        <label htmlFor="image" className='font-semibold block'>Upload a Photo:</label>
                        <input type='file' placeholder='Upload Product Photo' {...register("image", { required: true, })} />
                        {errors.image?.type === 'required' && "Password is required"}

                        <input type="submit" className="btn btn-primary w-[320px]" value='Add Product' />
                    </form>
               
            </div>
        </div>
    );
};

export default AddProduct;