import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../../Shared/Loading';

const MakeAdmin = () => {
    // GEt USers 
    const { data: users, isLoading, refetch } = useQuery('users', () =>
        fetch('https://techfly-api.onrender.com/user', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    // MAke Admin 
    const makeAdmin = (email) => {
        fetch(`https://techfly-api.onrender.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    toast.success('User Added as Admin Successfully', {
                        theme: 'colored',
                        delay: 0,
                    });
                    refetch();
                }
            })
    }
    return (
        <div>
            <p className='text-xl font-bold text-primary mb-8'> Make Admin </p>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-center">
                        <thead>
                            <tr>
                                <th> No.</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.data.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td className='font-semibold text-secondary'> {user.email} </td>
                                        <td>
                                            {
                                                user.role !== 'admin' &&
                                                <button className='btn btn-success' onClick={() => makeAdmin(user.email)}>Make Admin</button>
                                            }

                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MakeAdmin;