import React, {  useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading';
import SingleItem from './SingleItem';

const PurchaseParts = () => {
    const { id } = useParams();

    const { data: part, isLoading, refetch } = useQuery(['part', id], () =>
        fetch(`https://techfly-api.onrender.com/parts/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    const minQuantity = parseInt(part.minimumOrderQuantity);

    return (
        <>
            <SingleItem part={part}
                minQuantity={minQuantity}
                refetch={refetch}>
            </SingleItem>
        </>

    );
};

export default PurchaseParts;