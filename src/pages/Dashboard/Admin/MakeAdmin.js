import React from 'react';
import { useQuery } from 'react-query';

const MakeAdmin = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () =>
        fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
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
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td className='font-semibold text-secondary'> {user.email} </td>
                                        <td>
                                            <button className='btn btn-success'>Make Admin</button>
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