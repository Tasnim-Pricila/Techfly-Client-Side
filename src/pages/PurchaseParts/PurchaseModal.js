import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const PurchaseModal = ({part, quantity, refetch, setModalData}) => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const userName = user?.displayName;
    const {title} = part;

    const handleSubmit = e => {
        e.preventDefault();
        const purchase = {
            productName : title,
            quantity,
            bookedBy: userName,
            email,
            address: e.target.address.value,
            phone: e.target.phone.value,
        }
        console.log(purchase);
        fetch('http://localhost:5000/purchase', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(purchase)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {

                    console.log(data);
                }
                else {
                    console.log(data);
                }
                refetch();
                setModalData(null);
            })
    }

    return (
        <div>
            <div>
            <input type="checkbox" id="purchase-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="purchase-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg mb-6 text-center">Purchasing <span className='text-primary'>{title}</span></h3>

                    <form className='flex flex-col items-center' 
                    onSubmit={handleSubmit}>             
                        <input type="text" name='product' defaultValue={title} disabled placeholder="Product Name" className="input input-bordered input-primary w-full max-w-xs mb-4" />
                        <input type="number" name='quantity' defaultValue={quantity} disabled placeholder="Product Name" className="input input-bordered input-primary w-full max-w-xs mb-4" />
                        <input type="text" name='name' defaultValue={userName} disabled placeholder="Your Name" className="input input-bordered input-primary w-full max-w-xs mb-4" />
                        <input type="email" name='email' defaultValue={email} disabled placeholder="Your Email" className="input input-bordered input-primary w-full max-w-xs mb-4" />
                        <input type="text" name='phone' placeholder="Your Phone" className="input input-bordered input-primary w-full max-w-xs mb-4" />
                        <input type="textarea" name='address' placeholder="Address" className="input input-bordered input-primary w-full max-w-xs mb-4" />

                        <input type="submit" value="Purchase Now" className="btn btn-primary w-full max-w-xs mb-4" />
                    </form>

                </div>
            </div>
        </div>
        </div>
    );
};

export default PurchaseModal;