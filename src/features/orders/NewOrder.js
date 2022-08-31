import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewOrderForm from './NewOrderForm'

const NewOrder = () => {
    const users = useSelector(state => selectAllUsers(state))

    const content = users ? <NewOrderForm users={users} /> : <p>Loading...</p>

    return content;
}

export default NewOrder