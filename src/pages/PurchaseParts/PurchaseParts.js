import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PurchaseModal from './PurchaseModal';
import SingleItem from './SingleItem';

const PurchaseParts = () => {
    const { id } = useParams();
    const [modalData, setModalData] = useState(null);

    const { data: part, isLoading, refetch } = useQuery(['part', id], () =>
        fetch(`http://localhost:5000/parts/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    )

    if (isLoading) {
        return <p>Loading...</p>
    }

    const minQuantity = parseInt(part.minimumOrderQuantity);

    return (
        <>
            <SingleItem part={part}
                modalData={modalData}
                setModalData={setModalData}
                minQuantity={minQuantity}
                refetch={refetch}>
            </SingleItem>
        </>

    );
};

export default PurchaseParts;