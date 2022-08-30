import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { store } from '../../app/store'
import { ordersApiSlice } from '../orders/ordersApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'

const Prefetch = () => {

    useEffect(() => {
        console.log("Subscribing...")

        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const orders = store.dispatch(ordersApiSlice.endpoints.getOrders.initiate())


        return () => {
            console.log("Unsubscribing...")
            users.unsubscribe()
            orders.unsubscribe()
        }

    }, [])



    return <Outlet />
}

export default Prefetch