import React from 'react';

const DeleteModal = ({ deletingProduct, handleDelete }) => {
    const { title, _id } = deletingProduct;
    return (
        <div>
            <div>
                <input type="checkbox" id="deleteModal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                    <h3 className="font-bold text-lg my-4">Confirmation</h3>
                    <div className='divider'></div>
                        <h3 className='text-black'>Are You Sure you want to delete Product  <span className='text-primary font-semibold'>{title}</span> ?</h3>
                        <div className="modal-action">
                            <button className='btn btn-success px-8' 
                            onClick={() => handleDelete(_id)}>Yes</button>
                            <label htmlFor="deleteModal" className="btn">Cancel</label>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default DeleteModal;