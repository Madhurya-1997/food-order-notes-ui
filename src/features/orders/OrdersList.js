import React from 'react'
import Order from './Order';
import { useGetOrdersQuery } from './ordersApiSlice';

const OrdersList = () => {
    const {
        data: orders,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOrdersQuery();

    let content;

    if (isLoading) return <div>Loading...</div>

    if (isError) {
        console.log(error)

    }

    if (isSuccess) {
        const { ids } = orders;

        const tableContent = ids?.length ? ids.map(orderId => <Order key={orderId} orderId={orderId} />) : null;


        content = (
            <table className="table table--orders">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th order__status">Username</th>
                        <th scope="col" className="table__th order__created">Created</th>
                        <th scope="col" className="table__th order__updated">Updated</th>
                        <th scope="col" className="table__th order__title">Title</th>
                        <th scope="col" className="table__th order__username">Owner</th>
                        <th scope="col" className="table__th order__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content;
}

export default OrdersList