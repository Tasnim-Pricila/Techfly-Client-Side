import React from 'react';

const DeleteModal = ({ deletingProduct, handleDelete }) => {
    const { title, _id } = deletingProduct;
    return (
        <div>
            <div>
                <input type="checkbox" id="deleteModal" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                    <h3 class="font-bold text-lg my-4">Confirmation</h3>
                    <div className='divider'></div>
                        <h3 className='text-black'>Are You Sure you want to delete Product  <span className='text-primary font-semibold'>{title}</span> ?</h3>
                        <div class="modal-action">
                            <button className='btn btn-success px-8' 
                            onClick={() => handleDelete(_id)}>Yes</button>
                            <label for="deleteModal" class="btn">Cancel</label>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default DeleteModal;