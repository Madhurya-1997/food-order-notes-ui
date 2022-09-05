import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewOrderForm from './NewOrderForm'

const NewOrder = () => {
    const users = useSelector(state => selectAllUsers(state))

    if (users?.length === 0) return <p className='errmsg'>Not currently available !</p>

    const content = users ? <NewOrderForm users={users} /> : <p>Loading...</p>

    return content;
}

export default NewOrder