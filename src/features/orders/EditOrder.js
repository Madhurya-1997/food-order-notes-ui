import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectAllUsers, selectUserById } from '../users/usersApiSlice';
import EditOrderForm from './EditOrderForm'
import { selectOrderById } from './ordersApiSlice';

const EditOrder = () => {
    const { id } = useParams();
    const order = useSelector(state => selectOrderById(state, id))
    const users = useSelector(selectAllUsers);

    console.log(users)

    const content = users && order ? <EditOrderForm order={order} users={users} /> : <p>Loading...</p>
    return content;
}

export default EditOrder;