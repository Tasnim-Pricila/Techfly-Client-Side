import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const { id } = useParams();

    const { data: orders, isLoading, refetch } = useQuery(['orders'], () =>
        fetch(`http://localhost:5000/purchase/${id}`)
            .then(res => res.json()))
        
    
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
       <>
       </>
    );
};

export default Payment;